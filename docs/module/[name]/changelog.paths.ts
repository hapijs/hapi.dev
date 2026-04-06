import fs from 'node:fs';
import path from 'node:path';

import { defineRoutes } from 'vitepress';

import modulesData from '../../../generated/metadata/modules.json' with { type: 'json' };

import type { ModuleMetadata } from '../../../cli/types.js';

export default defineRoutes({
  paths() {
    return Object.keys(modulesData as Record<string, ModuleMetadata>)
      .filter((name) => name !== 'hapi')
      .filter((name) => {
        const changelogPath = path.resolve(`generated/markdown/${name}/changelog.md`);
        return fs.existsSync(changelogPath);
      })
      .map((name: string) => {
        const content = fs.readFileSync(path.resolve(`generated/markdown/${name}/changelog.md`), 'utf8');
        return {
          content,
          params: { name },
        };
      });
  },
});
