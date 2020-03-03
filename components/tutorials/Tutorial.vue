<template lang="md">
  <div class="markdown-wrapper" v-html="page"></div>
</template>

<script>
const pages = require("../../static/lib/tutorials/");

export default {
  props: ["display", "language"],
  computed: {
    page() {
      return this.$props.display;
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/markdown.scss";
</style>
