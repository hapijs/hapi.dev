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

.markdown-wrapper {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 20px 0 20px 100px;
}

</style>
