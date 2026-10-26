<template>
    <pre v-if="failed"><code>{{ source }}</code></pre>
    <div v-else class="mermaid" role="button" tabindex="0" aria-label="Open diagram viewer" v-html="svg" />
</template>

<script setup>
import { useData } from 'vitepress';
import { onMounted, ref, useId, watch } from 'vue';

const props = defineProps({ code: { required: true, type: String } });

const { isDark } = useData();
const id = `mermaid-${useId()}`;
const source = decodeURIComponent(props.code);
const svg = ref('');
const failed = ref(false);

let fontFamily = '';
let pass = 0;

// Colors come from VitePress variables, so light and dark mode share this stylesheet.
const themeCSS = `
    .node rect, .node polygon, .node circle, .node path {
        fill: var(--vp-c-brand-soft);
        stroke: var(--vp-c-brand-1);
        stroke-width: 1.5px;
    }
    .node rect { rx: 6px; ry: 6px; }
    .nodeLabel, .node .label { color: var(--vp-c-text-1); fill: var(--vp-c-text-1); }
    .node.highlight rect, .node.highlight polygon, .node.highlight circle, .node.highlight path {
        fill: var(--vp-c-brand-3);
        stroke: var(--vp-c-brand-3);
    }
    .node.highlight .nodeLabel { color: #fff; }
    .flowchart-link { stroke: var(--vp-c-text-3); stroke-width: 1.5px; }
    marker path, .arrowheadPath { fill: var(--vp-c-text-3); stroke: var(--vp-c-text-3); }
    .edgeLabel, .edgeLabel p, .labelBkg { background-color: var(--vp-c-bg-soft); color: var(--vp-c-text-2); }
    .edgeLabel rect { fill: var(--vp-c-bg-soft); }
    rect.actor { fill: var(--vp-c-brand-soft); stroke: var(--vp-c-brand-1); stroke-width: 1.5px; rx: 6px; ry: 6px; }
    text.actor, text.actor tspan { fill: var(--vp-c-text-1); }
    .actor-line { stroke: var(--vp-c-divider); stroke-dasharray: 4 4; }
    .messageLine0, .messageLine1 { stroke: var(--vp-c-text-3); stroke-width: 1.5px; }
    .messageText { fill: var(--vp-c-text-1); }
    rect.note { fill: var(--vp-c-bg); stroke: var(--vp-c-divider); rx: 4px; ry: 4px; }
    .noteText, .noteText tspan { fill: var(--vp-c-text-2); }
`;

const render = async () => {
    const { default: mermaid } = await import('mermaid');
    mermaid.initialize({
        fontFamily,
        startOnLoad: false,
        suppressErrorRendering: true,
        theme: isDark.value ? 'dark' : 'default',
        themeCSS,
    });

    try {
        // A fresh id per pass: mermaid removes any element with the id it renders under.
        const result = await mermaid.render(`${id}-${pass++}`, source);
        svg.value = result.svg;
    } catch (err) {
        failed.value = true;
        console.error('Mermaid diagram failed to render', err);
    }
};

onMounted(async () => {
    fontFamily = getComputedStyle(document.documentElement).getPropertyValue('--vp-font-family-base').trim();

    // Mermaid sizes each box by measuring its label, so the font has to be loaded first.
    await Promise.allSettled([
        document.fonts.load(`400 16px ${fontFamily}`),
        document.fonts.load(`700 16px ${fontFamily}`),
    ]);
    await render();
});

watch(isDark, render);
</script>
