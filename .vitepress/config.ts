import { defineConfig } from 'vitepress';
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons';

import { formatVersion } from './utils.js';
import ModulesData from '../generated/metadata/modules.json' with { type: 'json' };
import HapiInfo from '../generated/modules/hapi/info.json' with { type: 'json' };
import PluginsData from '../src/plugins.json' with { type: 'json' };

const modulesItems = Object.keys(ModulesData)
    .filter((name) => name !== 'hapi')
    .map((name) => ({
        link: `/module/${name}/api/${ModulesData[name as keyof typeof ModulesData].latestVersion}`,
        text: name,
    }));

const getModuleSidebar = (moduleName: string) => {
    const moduleData = ModulesData[moduleName as keyof typeof ModulesData];

    const items: { link: string; text: string; items?: { link: string; text: string }[] }[] = [
        {
            items: [...moduleData.versions].toReversed().map((version) => ({
                link: `/module/${moduleName}/api/${formatVersion(version.name)}`,
                text: formatVersion(version.name),
            })),
            link: `/module/${moduleName}/api/${moduleData.latestVersion}`,
            text: 'API',
        },
        { link: `/module/${moduleName}/changelog`, text: 'Changelog' },
    ];

    if (moduleName === 'bell') {
        items.push({ link: '/module/bell/examples', text: 'Examples' });
        items.push({ link: '/module/bell/providers', text: 'Providers' });
    }

    return [
        {
            items,
            text: moduleName,
        },
        {
            collapsed: true,
            items: [{ link: '/module/', text: 'All Modules' }, ...modulesItems],
            text: 'Other Modules',
        },
    ];
};

const moduleSidebars = Object.fromEntries(
    Object.keys(ModulesData)
        .filter((name) => name !== 'hapi')
        .map((name) => [`/module/${name}/`, getModuleSidebar(name)]),
);

const tutorialItems = [
    { slug: 'getting-started', text: 'Getting Started' },
    { slug: 'auth', text: 'Authentication' },
    { slug: 'caching', text: 'Caching' },
    { slug: 'cookies', text: 'Cookies' },
    { slug: 'logging', text: 'Logging' },
    { slug: 'plugins', text: 'Plugins' },
    { slug: 'routing', text: 'Routing' },
    { slug: 'server-methods', text: 'Server Methods' },
    { slug: 'serving-files', text: 'Serving Files' },
    { slug: 'testing', text: 'Testing' },
    { slug: 'validation', text: 'Validation' },
    { slug: 'views', text: 'Views' },
    { slug: 'community', text: 'Community' },
    { slug: 'express-to-hapi', text: 'Express to hapi' },
];

const getTutorialSidebar = (locale: string) => [
    {
        items: tutorialItems.map((t) => ({
            link: `/tutorials/${locale}/${t.slug}`,
            text: t.text,
        })),
        text: 'Tutorials',
    },
];

export default defineConfig({
    appearance: true,
    cleanUrls: true,
    description: 'The Simple, Secure Framework Developers Trust',
    head: [['link', { href: '/favicon.png', rel: 'icon', type: 'image/png' }]],
    ignoreDeadLinks: true,
    markdown: {
        config(md) {
            md.use(groupIconMdPlugin);
        },
        lineNumbers: true,
        theme: {
            dark: 'vitesse-dark',
            light: 'vitesse-light',
        },
    },
    outDir: 'dist',
    srcDir: 'docs',
    themeConfig: {
        docFooter: {
            next: false,
            prev: false,
        },
        footer: {
            copyright: 'Copyright © 2012-present hapi.js team',
            message:
                '<a href="https://www.netlify.com" target="_blank"><img src="https://www.netlify.com/assets/badges/netlify-badge-dark.svg" alt="Deploys by Netlify" style="display: inline-block; vertical-align: middle; height: 30px; margin-left: 10px;" /></a>',
        },
        logo: '/img/hapi.svg',
        nav: [
            { link: '/', text: 'Home' },
            { activeMatch: '^/api/', link: `/api/${formatVersion(HapiInfo.versions.at(-1)!.name)}`, text: 'API' },
            { activeMatch: '^/tutorials/', link: '/tutorials/en_US/getting-started', text: 'Tutorials' },
            { activeMatch: '^/plugins', link: '/plugins', text: 'Plugins' },
            {
                activeMatch: '^/resources/',
                link: '/resources/changelog',
                text: 'Resources',
            },
            { activeMatch: '^/module/', link: '/module/', text: 'Modules' },
            { activeMatch: '^/policies/', link: '/policies/coc', text: 'Policies' },
            { link: '/support', text: 'Support' },
            { link: 'https://hapi.threadless.com', target: '_blank', text: 'Shop' },
        ],
        outline: {
            label: 'On this page',
            level: 'deep',
        },
        sidebar: {
            '/api/': [
                {
                    items: [
                        {
                            items: [...HapiInfo.versions].toReversed().map((version) => ({
                                link: `/api/${formatVersion(version.name)}`,
                                text: formatVersion(version.name),
                            })),
                            link: `/api/${formatVersion(HapiInfo.versions.at(-1)!.name)}`,
                            text: 'API',
                        },
                    ],
                    text: '@hapi/hapi',
                },
            ],
            '/module/': [
                {
                    items: [{ link: '/module/', text: 'All Modules' }, ...modulesItems],
                    text: 'Modules',
                },
            ],
            '/plugins': [
                {
                    items: PluginsData.map((category) => ({
                        link: `/plugins#${category.anchor}`,
                        text: category.name,
                    })),
                    text: 'Plugins',
                },
            ],
            '/policies/': [
                {
                    items: [
                        { link: '/policies/coc', text: 'Code of Conduct' },
                        { link: '/policies/contributing', text: 'Contributing' },
                        { link: '/policies/license', text: 'License' },
                        { link: '/policies/security', text: 'Security' },
                        { link: '/policies/sponsors', text: 'Sponsors' },
                        { link: '/policies/styleguide', text: 'Style Guide' },
                        { link: '/policies/support', text: 'Support' },
                    ],
                    text: 'Policies',
                },
            ],
            '/resources/': [
                {
                    items: [
                        { link: '/resources/changelog', text: 'Changelog' },
                        { link: '/resources/status', text: 'Module Status' },
                        { link: '/resources/list#books', text: 'Books' },
                        { link: '/resources/list#boilerplates', text: 'Boilerplates' },
                        { link: '/resources/list#projects', text: 'Projects' },
                        { link: '/resources/list#videos', text: 'Videos' },
                    ],
                    text: 'Resources',
                },
            ],
            '/tutorials/en_US/': getTutorialSidebar('en_US'),
            '/tutorials/ko_KR/': getTutorialSidebar('ko_KR'),
            '/tutorials/pt_BR/': getTutorialSidebar('pt_BR'),
            '/tutorials/tr_TR/': getTutorialSidebar('tr_TR'),
            '/tutorials/zh_CN/': getTutorialSidebar('zh_CN'),
            ...moduleSidebars,
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/hapijs/hapi' },
            {
                icon: 'slack',
                link: 'https://join.slack.com/t/hapihour/shared_invite/zt-g5ortpsk-ErlnRA2rUcPIWES21oXBOg',
            },
            { icon: 'discord', link: 'https://discord.gg/YYxZhpKKvu' },
        ],
    },
    title: 'hapi.dev',
    titleTemplate: 'hapi.dev - :title',
    vite: {
        plugins: [groupIconVitePlugin()],
    },
});
