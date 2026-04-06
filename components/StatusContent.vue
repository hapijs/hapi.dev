<template>
  <div class="module-status-table-wrapper">
    <table class="status-table">
      <thead>
        <tr>
          <th class="header-module">Module</th>
          <th>Version</th>
          <th>Links</th>
          <th>License</th>
          <th>Node.js</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(descr, moduleName) in modulesData" :key="moduleName">
          <tr v-for="(version, index) in descr.versions" :key="version.name">
            <td v-if="index === 0" class="module-name" :rowspan="descr.versions.length">
              {{ moduleName }}
            </td>
            <td class="module-version">
              {{ version.name }}
            </td>
            <td class="module-links">
              <a
                target="_blank"
                class="version-link"
                title="Documentation"
                :href="
                  moduleName === 'hapi'
                    ? `/api/${version.name.split('.')[0]}.x.x`
                    : `/module/${moduleName}/api/${version.name.split('.')[0]}.x.x`
                "
              >
                <span class="version-icon">📖</span>
              </a>
              <a
                :href="`https://github.com/hapijs/${moduleName}/tree/${version.branch}`"
                target="_blank"
                class="version-github"
                title="GitHub"
              >
                <span
                  class="vpi-social-github"
                  style="--icon: url('https://api.iconify.design/simple-icons/github.svg')"
                ></span>
              </a>
            </td>
            <td>{{ version.license }}</td>
            <td>{{ version.node }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import modulesData from '../generated/metadata/modules.json' with { type: 'json' };
</script>

<style scoped>
.module-status-table-wrapper {
  overflow-x: auto;
}

.module-links,
.module-version {
  white-space: nowrap;
}

.header-module {
  width: 100%;
}

.module-name {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.module-version {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.module-links {
  vertical-align: middle;
}

.version-link {
  text-decoration: none;
  margin-right: 10px;
}

.version-github {
  color: var(--vp-c-text-2);
  transition: color 0.15s ease;
}

.version-github:hover {
  color: var(--vp-c-brand-1);
}
</style>
