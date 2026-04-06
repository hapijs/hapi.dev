import { throttling } from '@octokit/plugin-throttling';
import { Octokit } from '@octokit/rest';
import Semver from 'semver';

import type { Issue, Milestone } from './types.js';

const MyOctokit = Octokit.plugin(throttling);

const gh = new MyOctokit({
  auth: process.env.GITHUB_TOKEN,
  throttle: {
    onRateLimit: (retryAfter, options, octokit, retryCount) => {
      octokit.log.warn(`Request quota exhausted for request ${options.method} ${options.url}`);

      if (retryCount < 1) {
        // Only retries once
        octokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onSecondaryRateLimit: (retryAfter, options, octokit) => {
      // Does not retry, only logs a warning
      octokit.log.warn(`Secondary quota exhausted for request ${options.method} ${options.url}`);
    },
  },
});

export const getRawContent = async (repoName: string, filePath: string, tagName?: string) =>
  (await gh.repos.getContent({
    mediaType: {
      format: 'raw',
    },
    owner: 'hapijs',
    path: filePath,
    ref: tagName,
    repo: repoName,
  })) as unknown as { data: string };

export const getDirectoryListing = async (repoName: string, dirPath: string, ref?: string) =>
  (await gh.repos.getContent({
    owner: 'hapijs',
    path: dirPath,
    ref,
    repo: repoName,
  })) as unknown as { data: { name: string; path: string; type: string }[] };

export const getRepoInfo = async (moduleName: string) =>
  await gh.repos.get({
    owner: 'hapijs',
    repo: moduleName,
  });

export const getMilestones = async (moduleName: string) => {
  const milestones: Milestone[] = [];
  for await (const response of gh.paginate.iterator(gh.issues.listMilestones, {
    owner: 'hapijs',
    per_page: 100,
    repo: moduleName,
    state: 'closed',
  })) {
    milestones.push(...(response.data as Milestone[]));
  }
  return milestones.toSorted((a, b) => {
    const aCoerced = Semver.coerce(a.title);
    const bCoerced = Semver.coerce(b.title);
    if (aCoerced && bCoerced) {
      return Semver.compare(aCoerced, bCoerced);
    }
    return a.title.localeCompare(b.title);
  });
};

export const getMilestoneIssues = async (moduleName: string, milestoneNumber: number) => {
  const issues: Issue[] = [];
  for await (const response of gh.paginate.iterator(gh.issues.listForRepo, {
    milestone: milestoneNumber.toString(),
    owner: 'hapijs',
    per_page: 100,
    repo: moduleName,
    state: 'closed',
  })) {
    issues.push(...(response.data as Issue[]));
  }
  return issues;
};
