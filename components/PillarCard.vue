<template>
  <a :href="href" class="pillar">
    <span class="pillar-icon">
      <slot name="icon" />
    </span>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </a>
</template>

<script setup>
const { description, href, title } = defineProps({
  description: { required: true, type: String },
  href: { required: true, type: String },
  title: { required: true, type: String },
});
</script>

<style scoped>
.pillar {
  position: relative;
  display: block;
  padding: 28px 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  overflow: hidden;
}

.pillar::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, var(--vp-c-brand-soft), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.pillar:hover::after {
  opacity: 1;
}

.pillar:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--vp-c-brand-soft);
}

.pillar > * {
  position: relative;
  z-index: 1;
}

.pillar-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 11px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  margin-bottom: 18px;
  border: 1px solid var(--vp-c-brand-soft);
}

.pillar-icon svg {
  width: 22px;
  height: 22px;
}

.pillar h3 {
  font-size: 1.15em;
  font-weight: 800;
  margin: 0 0 8px;
}

.pillar p {
  font-size: 0.92em;
  line-height: 1.55;
  color: var(--vp-c-text-2);
  margin: 0;
}
</style>
