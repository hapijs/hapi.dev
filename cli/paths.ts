import Fs from 'node:fs/promises';
import Path from 'node:path';

export const GENERATED_DIR = Path.join(import.meta.dirname, '../generated');
export const API_DIR = Path.join(import.meta.dirname, '../docs/api');
export const MARKDOWN_DIR = Path.join(GENERATED_DIR, 'markdown');
export const POLICIES_GENERATED_DIR = Path.join(MARKDOWN_DIR, 'policies');
export const METADATA_DIR = Path.join(GENERATED_DIR, 'metadata');
export const MODULES_DIR = Path.join(GENERATED_DIR, 'modules');
export const PUBLIC_ATOM_DIR = Path.join(import.meta.dirname, '../docs/public/atom');

export const getModuleMarkdownPath = (moduleName: string, major: string | number) =>
    Path.join(MARKDOWN_DIR, moduleName, major.toString(), 'api.md');

export const getModuleMarkdownChangelogPath = (moduleName: string) =>
    Path.join(MARKDOWN_DIR, moduleName, 'changelog.md');

export const getModuleStoragePath = (moduleName: string) => Path.join(MODULES_DIR, moduleName);

export const getModuleInfoPath = (moduleName: string) => Path.join(getModuleStoragePath(moduleName), 'info.json');

export const getModuleChangelogPath = (moduleName: string) =>
    Path.join(getModuleStoragePath(moduleName), 'changelog.json');

export const getExisting = async <T>(filePath: string): Promise<T | undefined> => {
    try {
        const content = await Fs.readFile(filePath, 'utf8');
        return JSON.parse(content) as T;
    } catch {
        // Ignore error
    }
};
