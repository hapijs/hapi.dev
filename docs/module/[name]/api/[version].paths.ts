import Fs from 'node:fs';
import Path from 'node:path';

import { defineRoutes } from 'vitepress';

import { modules } from '../../../../cli/modules.js';
import ModulesData from '../../../../generated/metadata/modules.json' with { type: 'json' };

import type { ModuleMetadata } from '../../../../cli/types.js';

const renderCompatibility = (info: ModuleMetadata) => {
    let content = `
### Compatibility

| Major version | License | Node.js |
| ------------- | ------- | ------- |
`;

    const versions = [...info.versions].toReversed();
    for (const v of versions) {
        const [major] = v.name.split('.');
        content += `| ${major} | ${v.license} | ${v.node} |\n`;
    }

    return content;
};

export default defineRoutes({
    paths() {
        const data = ModulesData as Record<string, ModuleMetadata>;
        return Object.keys(data)
            .filter((name) => name !== 'hapi')
            .flatMap((name: string) => {
                const info = data[name];
                const hasApi = modules[name]?.hasApi ?? false;

                return info.versions.flatMap((versionInfo) => {
                    const major = parseInt(versionInfo.name.split('.')[0], 10);
                    const version = `${major}.x.x`;

                    let content = `${info.slogan}\n${renderCompatibility(info)}`;

                    if (hasApi) {
                        const apiPath = Path.resolve(`generated/markdown/${name}/${major}/api.md`);
                        if (Fs.existsSync(apiPath)) {
                            let apiContent = Fs.readFileSync(apiPath, 'utf8');
                            apiContent = apiContent.replaceAll('{{', '&#123;&#123;').replaceAll('}}', '&#125;&#125;');
                            content += `\n${apiContent}`;
                        }
                    }

                    return [
                        {
                            content,
                            params: { fullVersion: versionInfo.name, name, package: info.package, version },
                        },
                    ];
                });
            });
    },
});
