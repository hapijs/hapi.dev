<template>
    <div class="plugins-wrapper">
        <div class="controls">
            <input v-model="search" placeholder="Search plugins..." class="search-input form-control" />
            <select v-model="selectedCategory" class="category-select form-control">
                <option value="">All Categories</option>
                <option v-for="category in PluginsData" :key="category.anchor" :value="category.anchor">
                    {{ category.name }}
                </option>
            </select>
        </div>

        <div v-for="category in filteredCategories" :key="category.anchor" class="category-section">
            <h2 :id="category.anchor">{{ category.name }}</h2>
            <div class="plugins-grid">
                <div v-for="plugin in category.filteredModules" :key="plugin.name" class="plugin-card card">
                    <img
                        v-if="plugin.isHapi"
                        class="helmet-icon"
                        src="/img/ui/helmet.png"
                        alt="official hapi plugin"
                        title="Official hapi plugin"
                    />
                    <div class="plugin-header">
                        <a
                            v-if="plugin.isHapi"
                            :href="`/module/${plugin.name}/api/${ModulesData[plugin.name]?.latestVersion}`"
                            class="plugin-name"
                        >
                            {{ plugin.name }}
                        </a>
                        <a v-else :href="plugin.link" target="_blank" class="plugin-name">
                            {{ plugin.name }}
                        </a>
                    </div>
                    <div class="plugin-description">{{ plugin.description }}</div>
                    <div class="plugin-footer">
                        <div class="plugin-links">
                            <a v-if="plugin.github" :href="plugin.github" target="_blank" class="plugin-link">
                                <img src="/img/ui/githubLogo.png" alt="github" class="github-icon" />
                            </a>
                            <a v-else-if="plugin.link" :href="plugin.link" target="_blank" class="plugin-link">
                                <img src="/img/ui/githubLogo.png" alt="github" class="github-icon" />
                            </a>
                        </div>
                        <div class="plugin-stats" v-if="getModuleStats(plugin)">
                            <span class="stat">
                                <img src="/img/ui/star.png" alt="stars" class="stat-icon" />
                                {{ getModuleStats(plugin).stars }}
                            </span>
                            <span class="stat">
                                <img src="/img/ui/fork.png" alt="forks" class="stat-icon" />
                                {{ getModuleStats(plugin).forks }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import ModulesData from '../generated/metadata/modules.json' with { type: 'json' };
import PluginsData from '../src/plugins.json' with { type: 'json' };

const search = ref('');
const selectedCategory = ref('');

const filteredCategories = computed(() => {
    const searchTerm = search.value.trim().toLowerCase();
    const catFilter = selectedCategory.value;

    return PluginsData.filter((cat) => !catFilter || cat.anchor === catFilter)
        .map((cat) => {
            const filteredModules = cat.modules.filter(
                (mod) =>
                    !searchTerm ||
                    mod.name.toLowerCase().includes(searchTerm) ||
                    mod.description.toLowerCase().includes(searchTerm),
            );
            return { ...cat, filteredModules };
        })
        .filter((cat) => cat.filteredModules.length > 0);
});

const getModuleStats = (plugin) => {
    if (!plugin.isHapi) {
        return null;
    }
    const mod = ModulesData[plugin.name];
    return mod ? { forks: mod.forks, stars: mod.stars } : null;
};
</script>

<style scoped>
.plugins-wrapper {
    padding: 20px 0;
}

.controls {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

.search-input {
    flex-grow: 1;
    min-width: 0;
}

.category-section {
    margin-bottom: 40px;
}

.plugins-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-gap: 18px;
}

.plugin-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.helmet-icon {
    position: absolute;
    top: -8px;
    right: 8px;
    width: 28px;
    height: 28px;
    opacity: 0.8;
}

.plugin-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-right: 35px;
}

.plugin-name {
    color: var(--vp-c-brand-1);
    font-weight: bold;
    font-size: 1.1em;
    text-decoration: none;
}

.plugin-name:hover {
    text-decoration: underline;
}

.plugin-description {
    color: var(--vp-c-text-2);
    font-size: 0.9em;
    flex-grow: 1;
}

.plugin-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
}

.plugin-stats {
    display: flex;
    gap: 12px;
    font-size: 0.85em;
    color: var(--vp-c-text-2);
}

.stat {
    display: flex;
    align-items: center;
    gap: 4px;
}

.stat-icon {
    height: 14px;
}

.plugin-links {
    display: flex;
    gap: 10px;
}

.github-icon {
    height: 16px;
}
</style>
