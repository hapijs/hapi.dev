import type { ModuleSpec } from './types.js';

export const modules: Record<string, ModuleSpec> = {
    accept: {
        compatibility: { 6: '>= 16' },
        hasApi: true,
        package: '@hapi/accept',
    },
    ammo: {
        compatibility: { 6: '>= 16' },
        hasApi: true,
        package: '@hapi/ammo',
    },
    b64: {
        compatibility: { 6: '>= 16' },
        hasApi: true,
        package: '@hapi/b64',
    },
    basic: {
        compatibility: { 7: '>= 16' },
        hasApi: true,
        isPlugin: true,
        package: '@hapi/basic',
    },
    bell: {
        compatibility: { 13: '>= 16' },
        hasApi: true,
        isPlugin: true,
        package: '@hapi/bell',
    },
    boom: {
        compatibility: { 10: '>= 16' },
        hasApi: true,
        package: '@hapi/boom',
    },
    bossy: {
        compatibility: { 5: '>= 16' },
        hasApi: true,
        package: '@hapi/bossy',
    },
    bounce: {
        compatibility: { 3: '>= 16' },
        hasApi: true,
        package: '@hapi/bounce',
    },
    bourne: {
        compatibility: { 3: '>= 16' },
        hasApi: true,
        package: '@hapi/bourne',
    },
    call: {
        compatibility: { 9: '>= 16' },
        hasApi: true,
        package: '@hapi/call',
    },
    catbox: {
        compatibility: { 12: '>= 16' },
        hasApi: true,
        package: '@hapi/catbox',
    },
    'catbox-memcached': {
        compatibility: { 4: '>= 16' },
        hasApi: true,
        package: '@hapi/catbox-memcached',
    },
    'catbox-memory': {
        compatibility: { 6: '>= 16' },
        hasApi: true,
        package: '@hapi/catbox-memory',
    },
    'catbox-object': {
        compatibility: { 3: '>= 16' },
        hasApi: true,
        package: '@hapi/catbox-object',
    },
    'catbox-redis': {
        compatibility: { 7: '>= 16' },
        hasApi: true,
        isPlugin: true,
        package: '@hapi/catbox-redis',
    },
    code: {
        compatibility: { 9: '>= 16' },
        hasApi: true,
        package: '@hapi/code',
    },
    content: {
        compatibility: { 6: '>= 16' },
        hasApi: true,
        package: '@hapi/content',
    },
    cookie: {
        compatibility: { 12: '>= 16' },
        hasApi: true,
        isPlugin: true,
        package: '@hapi/cookie',
    },
    crumb: {
        compatibility: { 9: '>= 16' },
        hasApi: true,
        isPlugin: true,
        package: '@hapi/crumb',
    },
    cryptiles: {
        compatibility: { 6: '>= 16' },
        hasApi: true,
        package: '@hapi/cryptiles',
    },
    'eslint-plugin': {
        compatibility: { 6: '>= 16' },
        hasApi: true,
        package: '@hapi/eslint-plugin',
    },
    file: {
        compatibility: { 3: '>= 16' },
        hasApi: true,
        package: '@hapi/file',
    },
    glue: {
        compatibility: { 9: '>= 16' },
        hasApi: true,
        package: '@hapi/glue',
    },
    h2o2: {
        compatibility: { 10: '>= 16' },
        hasApi: true,
        isPlugin: true,
        package: '@hapi/h2o2',
    },
    hapi: {
        compatibility: { 20: '>= 16', 21: '>= 16' },
        hasApi: true,
        package: '@hapi/hapi',
    },
    heavy: {
        compatibility: { 8: '>= 16' },
        hasApi: true,
        package: '@hapi/heavy',
    },
    hoek: {
        compatibility: { 11: '>= 16' },
        hasApi: true,
        package: '@hapi/hoek',
    },
    inert: {
        compatibility: { 7: '>= 16' },
        hasApi: true,
        isPlugin: true,
        package: '@hapi/inert',
    },
    iron: {
        compatibility: { 7: '>= 16' },
        hasApi: true,
        package: '@hapi/iron',
    },
    jwt: {
        compatibility: { 3: '>= 16' },
        hasApi: true,
        isPlugin: true,
        package: '@hapi/jwt',
    },
    lab: {
        compatibility: { 25: '>= 16' },
        hasApi: true,
        package: '@hapi/lab',
    },
    log: {
        compatibility: { 2: '>= 16' },
        hasApi: true,
        isPlugin: true,
        package: '@hapi/log',
    },
    mimos: {
        compatibility: { 7: '>= 16' },
        hasApi: true,
        package: '@hapi/mimos',
    },
    nes: {
        compatibility: { 13: '>= 16' },
        hasApi: true,
        isPlugin: true,
        package: '@hapi/nes',
    },
    nigel: {
        compatibility: { 5: '>= 16' },
        package: '@hapi/nigel',
    },
    oppsy: {
        compatibility: { 3: '>= 16' },
        hasApi: true,
        package: '@hapi/oppsy',
    },
    'oxc-plugin': {
        compatibility: { 1: '>= 22' },
        hasApi: true,
        package: '@hapi/oxc-plugin',
    },
    pez: {
        compatibility: { 6: '>= 16' },
        package: '@hapi/pez',
    },
    podium: {
        compatibility: { 5: '>= 16' },
        hasApi: true,
        package: '@hapi/podium',
    },
    scooter: {
        compatibility: { 7: '>= 16' },
        hasApi: true,
        isPlugin: true,
        package: '@hapi/scooter',
    },
    shot: {
        compatibility: { 6: '>= 16' },
        hasApi: true,
        package: '@hapi/shot',
    },
    somever: {
        compatibility: { 4: '>= 16' },
        package: '@hapi/somever',
    },
    sse: {
        compatibility: { 1: '>= 22' },
        hasApi: true,
        isPlugin: true,
        package: '@hapi/sse',
    },
    statehood: {
        compatibility: { 8: '>= 16' },
        package: '@hapi/statehood',
    },
    subtext: {
        compatibility: { 8: '>= 16' },
        hasApi: true,
        package: '@hapi/subtext',
    },
    teamwork: {
        compatibility: { 6: '>= 16' },
        package: '@hapi/teamwork',
    },
    topo: {
        compatibility: { 6: '>= 16' },
        hasApi: true,
        package: '@hapi/topo',
    },
    vise: {
        compatibility: { 5: '>= 16' },
        package: '@hapi/vise',
    },
    vision: {
        compatibility: { 7: '>= 16' },
        hasApi: true,
        isPlugin: true,
        package: '@hapi/vision',
    },
    wreck: {
        compatibility: { 18: '>= 16' },
        hasApi: true,
        package: '@hapi/wreck',
    },
    yar: {
        compatibility: { 11: '>= 16' },
        hasApi: true,
        isPlugin: true,
        package: '@hapi/yar',
    },
};
