import DefaultTheme from 'vitepress/theme';
import { defineAsyncComponent, h } from 'vue';

// oxfmt-ignore
import './variables.css';
import './main.css';
import 'virtual:group-icons.css';

import { getRedirectPath } from './redirect.js';

import type { Theme } from 'vitepress';

const ApiOutline = defineAsyncComponent(() => import('../../components/ApiOutline.vue'));
const CarbonAds = defineAsyncComponent(() => import('../../components/CarbonAds.vue'));
const HomeContent = defineAsyncComponent(() => import('../../components/HomeContent.vue'));
const ModuleIndex = defineAsyncComponent(() => import('../../components/ModuleIndex.vue'));
const PluginsDirectory = defineAsyncComponent(() => import('../../components/PluginsDirectory.vue'));
const StatusContent = defineAsyncComponent(() => import('../../components/StatusContent.vue'));
const TutorialLang = defineAsyncComponent(() => import('../../components/TutorialLang.vue'));

export default {
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'sidebar-nav-after': () => h(CarbonAds),
        });
    },
    enhanceApp({ app, router }) {
        app.component('ApiOutline', ApiOutline);
        app.component('HomeContent', HomeContent);
        app.component('ModuleIndex', ModuleIndex);
        app.component('PluginsDirectory', PluginsDirectory);
        app.component('StatusContent', StatusContent);
        app.component('TutorialLang', TutorialLang);

        if (typeof window !== 'undefined') {
            router.onBeforeRouteChange = (to) => {
                const target = getRedirectPath(to);
                if (target) {
                    router.go(target);
                    return false;
                }
            };

            const initialTarget = getRedirectPath(window.location.pathname);
            if (initialTarget) {
                router.go(initialTarget);
            }
        }
    },
    extends: DefaultTheme,
} satisfies Theme;
