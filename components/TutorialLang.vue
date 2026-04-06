<template>
  <div class="tutorial-lang">
    <span class="tutorial-lang-label">Language:</span>
    <a
      v-for="lang in languages"
      :key="lang.locale"
      :href="langPath(lang.locale)"
      :class="['tutorial-lang-link', { active: isActive(lang.locale) }]"
      @click.prevent="selectLang(lang.locale)"
      >{{ lang.label }}</a
    >
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core';
import { useRoute, useRouter } from 'vitepress';
import { computed, watch } from 'vue';

const route = useRoute();
const router = useRouter();

const savedLang = useStorage('hapi-tutorial-lang', '');

const languages = [
  { label: 'English', locale: 'en_US' },
  { label: '한국어', locale: 'ko_KR' },
  { label: 'Português', locale: 'pt_BR' },
  { label: 'Türkçe', locale: 'tr_TR' },
  { label: '中文', locale: 'zh_CN' },
];

const currentSlug = computed(() => {
  const { path } = route;
  const match = path.match(/\/tutorials\/(?:en_US|ko_KR|pt_BR|tr_TR|zh_CN)\/(.+?)(?:\.html)?$/);
  return match ? match[1] : 'getting-started';
});

const currentLocale = computed(() => {
  const { path } = route;
  const match = path.match(/\/tutorials\/(en_US|ko_KR|pt_BR|tr_TR|zh_CN)\//);
  return match ? match[1] : 'en_US';
});

// Redirect to saved language on first visit if on the default locale
watch(
  () => route.path,
  (path) => {
    if (savedLang.value && currentLocale.value === 'en_US' && savedLang.value !== 'en_US') {
      const target = `/tutorials/${savedLang.value}/${currentSlug.value}`;
      if (target !== path) {
        router.go(target);
      }
    }
  },
  { immediate: true },
);

const langPath = (locale) => `/tutorials/${locale}/${currentSlug.value}`;

const isActive = (locale) => currentLocale.value === locale;

const selectLang = (locale) => {
  savedLang.value = locale;
  router.go(langPath(locale));
};
</script>

<style scoped>
.tutorial-lang {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.85em;
  flex-wrap: wrap;
  position: sticky;
  top: calc(var(--vp-nav-height) + 16px);
  z-index: 10;
  margin-bottom: 24px;
}

.tutorial-lang-label {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.tutorial-lang-link {
  padding: 2px 8px;
  border-radius: 4px;
  text-decoration: none;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.tutorial-lang-link:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.tutorial-lang-link.active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  font-weight: 600;
}
</style>
