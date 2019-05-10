<template lang="md">
  <div class="markdown-wrapper" v-html="page"></div>
</template>

<script>
const pages = require('../static/lib/tutorials/en_US')

export default {
    computed: {
      page() {
        return pages.gettingStarted.default
      }
    }
};

</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/markdown.scss";

</style>
