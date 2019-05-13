<template lang="md">
  <div class="markdown-wrapper" v-html="page"></div>
</template>

<script>
const pages = require('../static/lib/tutorials/')


export default {
    props: ["tutorial", "language"],
    computed: {
      page() {
        return pages[this.$props.language][this.$props.tutorial].default
      }
    }
};

</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/markdown.scss";

</style>
