<script setup lang="ts">
import { useRoute } from 'vitepress';
import { onMounted, watch } from 'vue';

const route = useRoute();

const load = () => {
  const script = document.createElement('script');
  script.id = '_carbonads_js';
  script.src = `//cdn.carbonads.com/carbon.js?serve=CEBIC53U&placement=hapidev`;
  script.async = true;

  const container = document.querySelector('#carbon-ad');
  if (container) {
    container.innerHTML = '';
    container.append(script);
  }
};

onMounted(() => {
  load();
});

watch(
  () => route.path,
  () => {
    setTimeout(() => {
      if (
        '_carbonads' in window &&
        window._carbonads &&
        typeof window._carbonads === 'object' &&
        'refresh' in window._carbonads &&
        typeof window._carbonads.refresh === 'function'
      ) {
        window._carbonads.refresh();
      } else {
        load();
      }
    }, 0);
  },
);
</script>

<template>
  <div id="carbon-ad" class="carbon-ad-sidebar"></div>
</template>

<style>
.carbon-ad-sidebar {
  margin-top: auto;
  padding: 1rem;
  min-height: 150px;
}

#carbonads {
  display: block;
  overflow: hidden;
  max-width: 130px;
  text-align: left;
  font-size: 11px;
  font-family: var(--vp-font-family-base);
  line-height: 1.5;
  background-color: var(--vp-c-bg-soft);
  padding: 10px;
  border-radius: 4px;
}

#carbonads a {
  color: inherit;
  text-decoration: none;
}

#carbonads a:hover {
  color: inherit;
}

#carbonads span {
  position: relative;
  display: block;
  overflow: hidden;
}

.carbon-img {
  display: block;
  margin-bottom: 8px;
  line-height: 1;
}

.carbon-img img {
  display: block;
  margin: 0 auto;
}

.carbon-text {
  display: block;
  margin-bottom: 8px;
}

.carbon-poweredby {
  display: block;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 9px;
  line-height: 1;
}
</style>
