<template lang="md">
  <div class="markdown-wrapper" v-html="page"></div>
</template>

<script>
const page = require('../static/lib/resources.md');

export default {
    computed: {
      page() {
        return page
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