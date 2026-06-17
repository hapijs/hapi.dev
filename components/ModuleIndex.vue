<template>
    <div class="family-grid-wrapper">
        <div class="controls">
            <input v-model="search" placeholder="Search modules..." class="search-input form-control" />
            <select v-model="sort" class="sort-select form-control">
                <option value="name">Name</option>
                <option value="stars">Stars</option>
                <option value="forks">Forks</option>
                <option value="updated">Updated</option>
            </select>
        </div>

        <div class="family-grid">
            <div v-for="module in filteredModules" :key="module.name" class="family-grid-cell card">
                <div class="family-grid-text-wrapper">
                    <a :href="`/module/${module.name}/api/${module.latestVersion}`" class="family-grid-link">
                        <div class="family-grid-cell-name">
                            {{ module.name }}
                            <span v-if="module.isPlugin" class="plugin-badge">plugin</span>
                        </div>
                    </a>
                    <div class="family-grid-cell-slogan" v-html="module.sloganHtml"></div>
                </div>
                <div class="family-grid-cell-stats">
                    <div class="stats-wrapper">
                        <div class="family-stats">
                            <a class="status-link" :href="module.link">
                                <img class="stats-img-github" src="/img/ui/githubLogo.png" alt="github logo" />
                            </a>
                        </div>
                        <div class="family-stats">
                            <img class="stats-img-star" src="/img/ui/star.png" alt="star" />
                            {{ module.stars }}
                        </div>
                        <div class="family-stats">
                            <img class="stats-img-fork" src="/img/ui/fork.png" alt="fork" />
                            {{ module.forks }}
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

const search = ref('');
const sort = ref('name');

const filteredModules = computed(() => {
    const searchTerm = search.value.trim().toLowerCase();
    const modules = Object.entries(ModulesData)
        .filter(
            ([key, module]) =>
                key !== 'hapi' &&
                (!searchTerm || key.includes(searchTerm) || module.slogan.toLowerCase().includes(searchTerm)),
        )
        .map(([key, module]) => ({ ...module, name: key }));

    return modules.toSorted((a, b) => {
        if (sort.value === 'name') {
            return a.name.localeCompare(b.name);
        }
        if (sort.value === 'stars') {
            return b.stars - a.stars;
        }
        if (sort.value === 'forks') {
            return b.forks - a.forks;
        }
        if (sort.value === 'updated') {
            return new Date(b.updated) - new Date(a.updated);
        }
        return 0;
    });
});
</script>

<style scoped>
.family-grid-wrapper {
    padding: 20px 0;
}

.controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}
.search-input {
    flex-grow: 1;
}
.family-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-gap: 18px;
}
.family-grid-cell {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.family-grid-cell-name {
    color: var(--vp-c-brand-1);
    font-weight: bold;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    gap: 8px;
}
.plugin-badge {
    font-size: 0.6em;
    padding: 2px 6px;
    border-radius: 4px;
    background-color: var(--vp-c-brand-soft);
    color: var(--vp-c-brand-1);
    font-weight: 600;
    text-transform: uppercase;
}
.family-grid-link {
    text-decoration: none;
}
.family-grid-cell-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    font-size: 0.9em;
}
.stats-wrapper {
    display: flex;
    gap: 15px;
}
.family-stats {
    display: flex;
    align-items: center;
    gap: 5px;
}
.stats-img-github,
.stats-img-star,
.stats-img-fork {
    height: 16px;
}
</style>
