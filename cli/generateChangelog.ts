import fs from 'node:fs/promises';
import path from 'node:path';

import { Semaphore } from 'es-toolkit';
import { Feed } from 'feed';
import Semver from 'semver';

import { getMilestoneIssues, getMilestones } from './gh.js';
import { modules } from './modules.js';
import { getExisting, getModuleChangelogPath, getModuleMarkdownChangelogPath, PUBLIC_ATOM_DIR } from './paths.js';

import type { ChangelogItem } from './types.js';

export const generateChangelog = async (moduleName: string) => {
  let foundNewMilestones = false;

  const filePath = getModuleChangelogPath(moduleName);
  const existing = await getExisting<ChangelogItem[]>(filePath);
  const existingMap = new Map<string, ChangelogItem>(existing?.map((c) => [c.version, c]));

  console.info(`[changelog] Generating for ${moduleName}`);

  const milestones = await getMilestones(moduleName);

  const changelog: ChangelogItem[] = [];

  const limit = new Semaphore(10);
  const tasks = milestones.map(async (milestone) => {
    if (existingMap.has(milestone.title)) {
      console.info(`[changelog] Skipping ${moduleName}@${milestone.title}`);
      return existingMap.get(milestone.title)!;
    }

    await limit.acquire();
    try {
      console.info(`[changelog] Getting issues for ${moduleName}@${milestone.title}`);

      const issues = await getMilestoneIssues(moduleName, milestone.number);

      foundNewMilestones = true;

      return {
        date: milestone.closed_at,
        id: milestone.id,
        issues: issues.map((issue) => ({
          id: issue.id,
          labels: issue.labels.map((label) => label.name),
          number: issue.number,
          title: issue.title,
          url: issue.html_url,
        })),
        number: milestone.number,
        url: milestone.html_url,
        version: milestone.title,
      };
    } finally {
      limit.release();
    }
  });

  changelog.push(...(await Promise.all(tasks)));

  const sortedChangelog = changelog.toSorted((a, b) => {
    const aCoerced = Semver.coerce(a.version);
    const bCoerced = Semver.coerce(b.version);
    if (aCoerced && bCoerced) {
      return Semver.compare(bCoerced, aCoerced);
    }
    return b.version.localeCompare(a.version);
  });

  if (foundNewMilestones) {
    await fs.writeFile(filePath, JSON.stringify(sortedChangelog, null, 2));
  }

  await generateModuleMarkdownChangelog(moduleName, sortedChangelog);
  await generateModuleAtom(moduleName, sortedChangelog);
};

const generateModuleAtom = async (moduleName: string, sortedChangelog: ChangelogItem[]) => {
  const isHapi = moduleName === 'hapi';
  const spec = modules[moduleName];
  const fullModuleName = spec?.package ?? moduleName;
  const baseLink = isHapi ? 'https://hapi.dev' : `https://hapi.dev/module/${moduleName}`;
  const changelogLink = isHapi
    ? 'https://hapi.dev/resources/changelog'
    : `https://hapi.dev/module/${moduleName}/changelog`;

  const feed = new Feed({
    favicon: 'https://hapi.dev/favicon.png',
    id: baseLink,
    image: 'https://hapi.dev/img/logo.png',
    language: 'en',
    link: baseLink,
    title: `${fullModuleName} changelog`,
    updated: new Date(sortedChangelog[0]?.date ?? Date.now()),
  });

  const items = sortedChangelog.slice(0, 50);

  for (const item of items) {
    const title = `${fullModuleName} v${item.version}`;
    const link = `${changelogLink}#${item.version}`;
    const date = new Date(item.date);

    let content = '<ul>';
    for (const issue of item.issues) {
      content += `<li><a href="${issue.url}">[#${issue.number}]</a> ${escapeHtml(issue.title)}</li>`;
    }
    content += '</ul>';

    feed.addItem({
      content,
      date,
      description: title,
      id: item.url,
      link,
      title,
    });
  }

  const atomPath = path.join(PUBLIC_ATOM_DIR, `${moduleName}.atom`);
  await fs.mkdir(path.dirname(atomPath), { recursive: true });
  await fs.writeFile(atomPath, feed.atom1());
};

const generateModuleMarkdownChangelog = async (moduleName: string, sortedChangelog: ChangelogItem[]) => {
  const majorVersions = new Set<string>();
  sortedChangelog.forEach((m) => {
    const [major] = m.version.split('.');
    if (major) {
      majorVersions.add(major);
    }
  });

  const changelogPath = getModuleMarkdownChangelogPath(moduleName);
  await fs.mkdir(path.dirname(changelogPath), { recursive: true });
  let content = '';

  const sortedMajors = [...majorVersions].toSorted((a, b) => parseInt(b, 10) - parseInt(a, 10));

  for (const major of sortedMajors) {
    content += `## Version ${major} {#v${major}}\n\n`;

    const milestones = sortedChangelog.filter((m) => m.version.startsWith(`${major}.`));

    for (const milestone of milestones) {
      const hasBreaking = milestone.issues.some((issue) => issue.labels.some((label) => label === 'breaking changes'));

      const releaseNotesIssue = milestone.issues.find((issue) =>
        issue.labels.some((label) => label === 'release notes'),
      );

      content += `### [${milestone.version}](${milestone.url}) `;

      if (releaseNotesIssue) {
        content += `<a class="release-notes-link" href="${releaseNotesIssue.url}" target="_blank" title="View Release Notes"><img class="release-notes-img" src="/img/ui/release-notes.png" alt="" /></a> `;
      }

      if (hasBreaking) {
        content += `<span class="breaking-badge"></span> `;
      }

      content += `{#${milestone.version}} `;

      content += `\n\n`;

      for (const issue of milestone.issues) {
        content += `- [#${issue.number}](${issue.url}) ${escapeHtml(issue.title)}\n`;
      }
      content += '\n';
    }
  }

  await fs.writeFile(changelogPath, content);
};

const escapeHtml = (text: string) => text.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
