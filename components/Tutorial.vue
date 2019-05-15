<template lang="md">
  <div class="markdown-wrapper" v-html="page"></div>
</template>

<script>
const pages = require('../static/lib/tutorials/')

export default {
    props: ["language"],
    computed: {
      page() {
        return this.$store.getters.loadPage
      }
    }
};

</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/markdown.scss";

</style>
