import Fs from 'node:fs';
import Path from 'node:path';

import { defineRoutes } from 'vitepress';

import HapiInfo from '../../generated/modules/hapi/info.json' with { type: 'json' };

import type { ModuleInfo } from '../../cli/types.js';

export default defineRoutes({
    paths() {
        const info = HapiInfo as ModuleInfo;

        return info.versions.flatMap((versionInfo) => {
            const major = parseInt(versionInfo.name.split('.')[0], 10);
            const version = `${major}.x.x`;
            const apiPath = Path.resolve(`generated/markdown/hapi/${major}/api.md`);
            if (!Fs.existsSync(apiPath)) {
                return [];
            }
            let content = Fs.readFileSync(apiPath, 'utf8');
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
