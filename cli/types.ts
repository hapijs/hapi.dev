export interface ChangelogItem {
  id: number;
  number: number;
  version: string;
  date: string;
  url: string;
  issues: {
    id: number;
    number: number;
    title: string;
    url: string;
    labels: string[];
  }[];
}

export interface Milestone {
  id: number;
  number: number;
  title: string;
  closed_at: string;
  html_url: string;
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  labels: { name: string }[];
}

export interface VersionInfo {
  nodeVersion: string;
  fullVersion: string;
  major: number;
}

export interface ModuleInfo {
  name: string;
  slogan: string;
  sloganHtml: string;
  forks: number;
  stars: number;
  updated: string;
  link: string;
  versions: {
    name: string;
    branch: string;
    license: string;
    node: string;
  }[];
  versionsArray: string[];
  latestVersion: string;
  api: boolean;
  isPlugin: boolean;
  package: string;
}

export interface ModuleMetadata {
  slogan: string;
  sloganHtml: string;
  link: string;
  stars: number;
  forks: number;
  updated: string;
  versionsArray: string[];
  latestVersion: string;
  versions: {
    name: string;
    branch: string;
    license: string;
    node: string;
  }[];
  isPlugin: boolean;
  package: string;
}

export interface ModuleSpec {
  package: string;
  compatibility: Record<number, string>;
  isPlugin?: boolean;
  hasApi?: boolean;
}
