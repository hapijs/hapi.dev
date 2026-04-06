import fs from 'node:fs';
import path from 'node:path';

import { defineRoutes } from 'vitepress';

import hapiInfo from '../../generated/modules/hapi/info.json' with { type: 'json' };

import type { ModuleInfo } from '../../cli/types.js';

export default defineRoutes({
  paths() {
    const info = hapiInfo as ModuleInfo;

    return info.versions.flatMap((versionInfo) => {
      const major = parseInt(versionInfo.name.split('.')[0], 10);
      const version = `${major}.x.x`;
      const apiPath = path.resolve(`generated/markdown/hapi/${major}/api.md`);
      if (!fs.existsSync(apiPath)) {
        return [];
      }
      let content = fs.readFileSync(apiPath, 'utf8');
      content = content.replaceAll('{{', '&#123;&#123;').replaceAll('}}', '&#125;&#125;');
      return [
        {
          content,
          params: { fullVersion: versionInfo.name, version },
        },
      ];
    });
  },
});
