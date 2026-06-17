import Semver from 'semver';

import ModulesData from '../../generated/metadata/modules.json' with { type: 'json' };
import HapiInfo from '../../generated/modules/hapi/info.json' with { type: 'json' };
import { formatVersion } from '../utils.js';

const tutorialRenames: Record<string, string> = {
    expresstohapi: 'express-to-hapi',
    gettingstarted: 'getting-started',
    servermethods: 'server-methods',
    servingfiles: 'serving-files',
};

export const getRedirectPath = (toPath: string) => {
    const [urlPath, hash] = toPath.split('#');
    const path = urlPath.replace(/\/$/, '').replace(/\.html$/, '') || '/';
    const suffix = hash ? `#${hash}` : '';

    // Handle /api with optional version
    const apiMatch = path.match(/^\/api(?:\/([^/]+))?$/);
    if (apiMatch) {
        return resolveHapiVersion(apiMatch.at(1), 'api', suffix);
    }

    // Handle /family/{name} -> /module/{name}/api/{version}
    const familyMatch = path.match(/^\/family\/([^/]+)(?:\/(.*))?$/);
    if (familyMatch) {
        const [, name, rest] = familyMatch;
        if (rest === 'api') {
            return `/module/${name}/api${suffix}`;
        }
        if (rest) {
            return `/module/${name}/${rest}${suffix}`;
        }
        return resolveModuleLatest(name, suffix);
    }

    // Handle /module/{name} without subpath -> /module/{name}/api/{version}
    const moduleMatch = path.match(/^\/module\/([^/]+)$/);
    if (moduleMatch) {
        return resolveModuleLatest(moduleMatch[1], suffix);
    }

    // Handle /module/{name}/install -> /module/{name}/api/{version}
    const installMatch = path.match(/^\/module\/([^/]+)\/install$/);
    if (installMatch) {
        return resolveModuleLatest(installMatch[1], suffix);
    }

    // Handle old tutorial URLs -> new /tutorials/{locale}/{slug} format
    const tutorialMatch = path.match(/^\/tutorials\/([^/]+)$/);
    if (tutorialMatch) {
        const oldName = tutorialMatch.at(1)!;
        // If it's a locale code, skip (it's a directory)
        if (['en_US', 'ko_KR', 'pt_BR', 'tr_TR', 'zh_CN'].includes(oldName)) {
            return null;
        }
        const newName = tutorialRenames[oldName] ?? oldName;
        return `/tutorials/en_US/${newName}${suffix}`;
    }

    // Handle /resources -> /resources/changelog
    if (path === '/resources') {
        return `/resources/changelog${suffix}`;
    }

    // Handle /policies -> /policies/coc
    if (path === '/policies') {
        return `/policies/coc${suffix}`;
    }

    return null;
};

const resolveModuleLatest = (name: string, suffix: string) => {
    const mod = ModulesData[name as keyof typeof ModulesData];
    if (!mod) {
        return null;
    }
    return `/module/${name}/api/${mod.latestVersion}${suffix}`;
};

const resolveHapiVersion = (version: string | undefined, type: string, suffix: string) => {
    const [latestVersion] = HapiInfo.versionsArray;
    const latestMasked = formatVersion(latestVersion);

    if (!version) {
        return `/${type}/${latestMasked}${suffix}`;
    }

    const maskedVersions = HapiInfo.versionsArray.map(formatVersion);
    if (maskedVersions.includes(version)) {
        return null;
    }

    let targetVersion = latestVersion;
    try {
        const coerced = Semver.coerce(version);
        if (coerced) {
            const major = Semver.major(coerced);
            const sameMajor = HapiInfo.versionsArray.find((v) => Semver.major(v) === major);
            if (sameMajor) {
                targetVersion = sameMajor;
            }
        }
    } catch {
        // Keep targetVersion as latest if coercion fails
    }

    const finalTarget = formatVersion(targetVersion);

    if (finalTarget === version) {
        return null;
    }

    return `/${type}/${finalTarget}${suffix}`;
};
