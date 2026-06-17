import { execFileSync } from 'node:child_process';
import Fs from 'node:fs/promises';
import Path from 'node:path';

import { Semaphore, uniq } from 'es-toolkit';
import Semver from 'semver';
import { createMarkdownRenderer } from 'vitepress';

import { generateChangelog } from './generateChangelog.js';
import { getDirectoryListing, getRawContent, getRepoInfo } from './gh.js';
import { modules } from './modules.js';
import {
    API_DIR,
    MARKDOWN_DIR,
    METADATA_DIR,
    POLICIES_GENERATED_DIR,
    getExisting,
    getModuleInfoPath,
    getModuleMarkdownPath,
    getModuleStoragePath,
} from './paths.js';

import type { ModuleInfo, ModuleSpec, VersionInfo } from './types.js';

const getFilteredVersions = (specs: ModuleSpec, versions: string[]): VersionInfo[] => {
    const compatibilityVersions = Object.keys(specs.compatibility);
    const minVersion = Math.min(...compatibilityVersions.map((v) => parseInt(v, 10)));
    const prefilteredVersions = versions.filter((v) => Semver.satisfies(v, `>=${minVersion}`));
    const publishedMajorVersions = uniq(prefilteredVersions.map((v) => Semver.major(v)));
    const semveredMajors = compatibilityVersions.map((v) => `${v}.0.0`);

    return publishedMajorVersions.map((major) => {
        const closestMatchingVersion = Semver.maxSatisfying(semveredMajors, `<= ${major}`);
        return {
            fullVersion: Semver.maxSatisfying(prefilteredVersions, `^${major}`)!,
            major,
            nodeVersion: closestMatchingVersion ? specs.compatibility[Semver.major(closestMatchingVersion)] : '',
        };
    });
};

const md = await createMarkdownRenderer('.');

const repos: Record<string, Partial<ModuleInfo>> = {};

const limit = new Semaphore(4);

const processModule = async (moduleName: string, specs: ModuleSpec) => {
    console.info(`Processing ${moduleName}`);

    await Fs.mkdir(getModuleStoragePath(moduleName), {
        recursive: true,
    });

    const filePath = getModuleInfoPath(moduleName);

    const existing = await getExisting<ModuleInfo>(filePath);

    // Get published versions from npm
    const versions = JSON.parse(
        execFileSync('npm', ['view', specs.package, 'versions', '--json'], {
            encoding: 'utf8',
        }),
    ) as string[];

    const currentModule: ModuleInfo = {
        api: false,
        forks: 0,
        isPlugin: specs.isPlugin ?? false,
        latestVersion: '',
        link: '',
        name: moduleName,
        package: specs.package,
        slogan: '',
        sloganHtml: '',
        stars: 0,
        updated: '',
        versions: [],
        versionsArray: [],
    };
    repos[moduleName] = currentModule;

    // Keep only latest versions from majors listed in specs
    const filteredVersions = getFilteredVersions(specs, versions);

    currentModule.versionsArray = filteredVersions.map((v) => v.fullVersion).toSorted((a, b) => Semver.compare(b, a));
    currentModule.latestVersion = `${currentModule.versionsArray[0].split('.')[0]}.x.x`;

    const versionLimit = new Semaphore(10);
    const versionTasks = filteredVersions.map(async ({ nodeVersion, fullVersion, major }) => {
        const hasApi = specs.hasApi ?? false;

        if (!hasApi) {
            return {
                apiExists: false,
                branch: `v${fullVersion}`,
                license: 'BSD',
                name: fullVersion,
                node: nodeVersion,
            };
        }

        const apiPath = getModuleMarkdownPath(moduleName, major);
        const apiExists = await Fs.access(apiPath)
            .then(() => true)
            .catch(() => false);

        const existingVersion = existing?.versions.find((v) => v.name === fullVersion);

        if (existingVersion && apiExists) {
            console.info(`[docs] Skipping ${moduleName}@${major}`);
            return {
                apiExists: true,
                branch: existingVersion.branch,
                license: existingVersion.license,
                name: existingVersion.name,
                node: existingVersion.node,
            };
        }

        await versionLimit.acquire();
        try {
            console.info(`[docs] Processing ${moduleName}@${fullVersion}`);
            const tagName = `v${fullVersion}`;

            const api = await getRawContent(moduleName, 'API.md', tagName);

            await Fs.mkdir(Path.dirname(apiPath), { recursive: true });

            await Fs.writeFile(apiPath, api.data);
            console.info(`[docs] Wrote ${apiPath}`);

            return {
                apiExists: true,
                branch: tagName,
                license: 'BSD',
                name: fullVersion,
                node: nodeVersion,
            };
        } finally {
            versionLimit.release();
        }
    });

    const versionResults = await Promise.all(versionTasks);
    for (const result of versionResults) {
        currentModule.versions.push({
            branch: result.branch,
            license: result.license,
            name: result.name,
            node: result.node,
        });
        if (result.apiExists) {
            currentModule.api = true;
        }
    }

    currentModule.versions.sort((a, b) => Semver.compare(a.name, b.name));

    const [readme, repoInfo] = await Promise.all([
        existing ? Promise.resolve({ data: '' }) : getRawContent(moduleName, 'README.md'),
        getRepoInfo(moduleName),
    ]);

    const readmeMatch = readme.data.match(/####(.*)/gm);
    const rawSlogan =
        readmeMatch === null ? (existing?.slogan ?? 'Description coming soon...') : readmeMatch[0].slice(5);

    currentModule.slogan = rawSlogan.trim();
    currentModule.sloganHtml = md.renderInline(currentModule.slogan);
    currentModule.forks = repoInfo.data.forks_count;
    currentModule.stars = repoInfo.data.stargazers_count;
    currentModule.updated = repoInfo.data.pushed_at;
    currentModule.link = repoInfo.data.html_url;

    const moduleDir = getModuleStoragePath(moduleName);
    await Fs.mkdir(moduleDir, { recursive: true });

    await Fs.writeFile(filePath, JSON.stringify(currentModule, null, 2));

    if (moduleName === 'hapi') {
        await Fs.mkdir(API_DIR, { recursive: true });
    }

    await generateChangelog(moduleName);

    await Fs.writeFile(filePath, JSON.stringify(currentModule, null, 2));

    repos[moduleName] = {
        forks: currentModule.forks,
        isPlugin: currentModule.isPlugin,
        latestVersion: currentModule.latestVersion,
        link: currentModule.link,
        package: currentModule.package,
        slogan: currentModule.slogan,
        sloganHtml: currentModule.sloganHtml,
        stars: currentModule.stars,
        updated: currentModule.updated,
        versions: currentModule.versions,
        versionsArray: currentModule.versionsArray,
    };
};

const moduleTasks = Object.entries(modules).map(async ([moduleName, specs]) => {
    await limit.acquire();
    try {
        await processModule(moduleName, specs);
    } finally {
        limit.release();
    }
});

await Promise.all(moduleTasks);

const sortedRepos = Object.fromEntries(Object.keys(modules).map((name) => [name, repos[name]]));

const policies: [string, string, string?][] = [
    ['coc', 'CODE_OF_CONDUCT'],
    ['contributing', 'CONTRIBUTING'],
    ['license', 'LICENSE'],
    ['security', 'SECURITY'],
    ['sponsors', 'SPONSORS'],
    ['styleguide', 'STYLE', 'assets'],
    ['support', 'SUPPORT'],
];

await Fs.mkdir(POLICIES_GENERATED_DIR, { recursive: true });
await Promise.all(
    policies.map(async ([policy, fileName, repo]) => {
        const policyPath = Path.join(POLICIES_GENERATED_DIR, `${policy}.md`);
        const existingPolicy = await Fs.readFile(policyPath, 'utf8').catch(() => null);
        if (existingPolicy) {
            console.info(`[policy] Skipping ${policy}`);
            return;
        }
        const { data } = await getRawContent(repo ?? '.github', `${fileName}.md`, 'master');
        await Fs.writeFile(policyPath, data);
    }),
);

// Fetch bell-specific content (examples and providers)
const bellMarkdownDir = Path.join(MARKDOWN_DIR, 'bell');
await Fs.mkdir(bellMarkdownDir, { recursive: true });

const bellProvidersPath = Path.join(bellMarkdownDir, 'providers.md');
const existingProviders = await Fs.readFile(bellProvidersPath, 'utf8').catch(() => null);
if (existingProviders) {
    console.info('[bell] Skipping Providers.md');
} else {
    console.info('[bell] Fetching Providers.md');
    const { data: providersData } = await getRawContent('bell', 'Providers.md', 'master');
    await Fs.writeFile(bellProvidersPath, providersData);
}

const bellExamplesPath = Path.join(bellMarkdownDir, 'examples.md');
const existingExamples = await Fs.readFile(bellExamplesPath, 'utf8').catch(() => null);
if (existingExamples) {
    console.info('[bell] Skipping examples');
} else {
    console.info('[bell] Fetching examples');
    const { data: exampleFiles } = await getDirectoryListing('bell', 'examples', 'master');
    let examplesContent = '';
    for (const file of exampleFiles) {
        if (file.type === 'file' && file.name.endsWith('.js')) {
            const name = file.name.replace(/\.js$/, '');
            const label = name.charAt(0).toUpperCase() + name.slice(1);
            const { data: code } = await getRawContent('bell', file.path, 'master');
            examplesContent += `## ${label}\n\n\`\`\`js\n${code}\n\`\`\`\n\n`;
        }
    }
    await Fs.writeFile(bellExamplesPath, examplesContent);
}

await Fs.mkdir(METADATA_DIR, { recursive: true });
await Fs.writeFile(Path.join(METADATA_DIR, 'modules.json'), JSON.stringify(sortedRepos, null, 2));

console.info('Running oxfmt...');
try {
    execFileSync('oxfmt', ['./generated'], { stdio: 'inherit' });

    // Apparently oxfmt sometimes needs a 2nd pass
    execFileSync('oxfmt', ['./generated'], { stdio: 'inherit' });
} catch (error: unknown) {
    console.error('Failed to run oxfmt:', error instanceof Error ? error.message : error);
}
