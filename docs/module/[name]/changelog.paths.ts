import Fs from 'node:fs';
import Path from 'node:path';

import { defineRoutes } from 'vitepress';

import ModulesData from '../../../generated/metadata/modules.json' with { type: 'json' };

import type { ModuleMetadata } from '../../../cli/types.js';

export default defineRoutes({
    paths() {
        return Object.keys(ModulesData as Record<string, ModuleMetadata>)
            .filter((name) => name !== 'hapi')
            .filter((name) => {
                const changelogPath = Path.resolve(`generated/markdown/${name}/changelog.md`);
                return Fs.existsSync(changelogPath);
            })
            .map((name: string) => {
                const content = Fs.readFileSync(Path.resolve(`generated/markdown/${name}/changelog.md`), 'utf8');
                return {
                    content,
                    params: { name },
                };
            });
    },
});
