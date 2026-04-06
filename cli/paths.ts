import fs from 'node:fs/promises';
import path from 'node:path';

export const GENERATED_DIR = path.join(import.meta.dirname, '../generated');
export const API_DIR = path.join(import.meta.dirname, '../docs/api');
export const MARKDOWN_DIR = path.join(GENERATED_DIR, 'markdown');
export const POLICIES_GENERATED_DIR = path.join(MARKDOWN_DIR, 'policies');
export const METADATA_DIR = path.join(GENERATED_DIR, 'metadata');
export const MODULES_DIR = path.join(GENERATED_DIR, 'modules');
export const PUBLIC_ATOM_DIR = path.join(import.meta.dirname, '../docs/public/atom');

export const getModuleMarkdownPath = (moduleName: string, major: string | number) =>
  path.join(MARKDOWN_DIR, moduleName, major.toString(), 'api.md');

export const getModuleMarkdownChangelogPath = (moduleName: string) =>
  path.join(MARKDOWN_DIR, moduleName, 'changelog.md');

export const getModuleStoragePath = (moduleName: string) => path.join(MODULES_DIR, moduleName);

export const getModuleInfoPath = (moduleName: string) => path.join(getModuleStoragePath(moduleName), 'info.json');

export const getModuleChangelogPath = (moduleName: string) =>
  path.join(getModuleStoragePath(moduleName), 'changelog.json');

export const getExisting = async <T>(filePath: string): Promise<T | undefined> => {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content) as T;
  } catch {
    // Ignore error
  }
};
