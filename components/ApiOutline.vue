<script setup>
import { useMutationObserver } from '@vueuse/core';
import { onMounted, ref } from 'vue';

const outline = ref(null);

const onActiveChange = (mutations) => {
  for (const { target, type, attributeName } of mutations) {
    if (
      type === 'attributes' &&
      attributeName === 'class' &&
      target.classList.contains('active') &&
      target.classList.contains('outline-link')
    ) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
};

onMounted(() => {
  outline.value = document.querySelector('.VPDocAsideOutline');
});

useMutationObserver(outline, onActiveChange, {
  attributeFilter: ['class'],
  subtree: true,
});
</script>

<template>
  <span class="api-outline-marker" />
</template>

<style>
.api-outline-marker {
  display: none;
}

.VPDoc:has(.api-outline-marker) .VPDocAsideOutline .outline-link + ul {
  display: none;
}

.VPDoc:has(.api-outline-marker) .VPDocAsideOutline li:has(.outline-link.active) > ul,
.VPDoc:has(.api-outline-marker) .VPDocAsideOutline li.expanded > ul {
  display: block;
}

.VPDoc:has(.api-outline-marker) .VPDocAsideOutline .outline-link {
  display: flex;
  line-height: 28px;
  position: relative;
}

.VPDoc:has(.api-outline-marker) .VPDocAsideOutline .outline-link::before {
  content: '';
  width: 15px;
  flex-shrink: 0;
}

.VPDoc:has(.api-outline-marker) .VPDocAsideOutline li:has(> ul) > .outline-link::before {
  width: 15px;
  height: 30px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 20 20' fill='none' stroke='%23ed7d31' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='8 4 14 10 8 16'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.VPDoc:has(.api-outline-marker) .VPDocAsideOutline li:has(> ul) > .outline-link {
  color: var(--vp-c-brand-1);
}

.VPDoc:has(.api-outline-marker) .VPDocAsideOutline li:has(.outline-link.active) > .outline-link::before,
.VPDoc:has(.api-outline-marker) .VPDocAsideOutline li.expanded > .outline-link::before {
  transform: rotate(90deg);
}
</style>
