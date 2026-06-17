import DefaultOxfmtConfig from '@hapi/oxc-plugin/oxfmt';
import { defineConfig } from 'oxfmt';

import type { OxfmtConfig } from 'oxfmt';

export default defineConfig({
    ...DefaultOxfmtConfig,
    overrides: [
        {
            files: ['generated/**'],
            options: {
                printWidth: 80,
            },
        },
    ],
}) as OxfmtConfig;
