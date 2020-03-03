<template>
  <div class="markdown-wrapper" v-html="display"></div>
</template>

<script>
export default {
  props: ["display"]
};
</script>

<style lang="scss">
@import "../assets/styles/markdown.scss";

.octicon {
  display: none;
}
</style>