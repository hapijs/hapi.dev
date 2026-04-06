<template>
  <div class="quote-wrapper">
    <div class="quote">{{ text }}</div>
    <div class="quote-footer">
      <div>
        <div class="quote-author">— {{ author }}</div>
        <div class="quote-company">{{ company }}</div>
      </div>
      <img
        class="quote-logo logo-light-only"
        :src="`/img/quotes/${logo}.svg`"
        :alt="logoAlt"
        :style="{ height: logoHeight }"
      />
      <img
        class="quote-logo logo-dark-only"
        :src="`/img/quotes/${logo}-dark.svg`"
        :alt="logoAlt"
        :style="{ height: logoHeight }"
      />
    </div>
  </div>
</template>

<script setup>
const { author, company, logo, logoAlt, logoHeight, text } = defineProps({
  author: { required: true, type: String },
  company: { required: true, type: String },
  logo: { required: true, type: String },
  logoAlt: { required: true, type: String },
  logoHeight: { default: '36px', type: String },
  text: { required: true, type: String },
});
</script>

<style scoped>
.quote-wrapper {
  position: relative;
  background: var(--vp-c-bg-soft);
  padding: 36px 40px 28px;
  margin: 40px 0 32px;
  border-radius: 14px;
  text-align: left;
  border: 1px solid var(--vp-c-divider);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.quote-wrapper::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--vp-c-brand-1), var(--vp-c-brand-soft));
}

.quote-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, var(--vp-c-brand-soft), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.quote-wrapper:hover::after {
  opacity: 1;
}

.quote-wrapper > * {
  position: relative;
  z-index: 1;
}

.quote {
  font-style: italic;
  line-height: 1.65;
  margin: 0 0 18px;
  font-size: 1.02em;
}

.quote-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

.quote-author {
  font-weight: 700;
}

.quote-company {
  font-size: 0.88em;
  color: var(--vp-c-text-2);
}

.quote-logo {
  object-fit: contain;
  opacity: 0.9;
}

.logo-dark-only {
  display: none;
}
.dark .logo-light-only {
  display: none;
}
.dark .logo-dark-only {
  display: inline-block;
}

@media screen and (max-width: 900px) {
  .quote-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
