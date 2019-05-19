<template lang="md">
  <div class="markdown-wrapper" v-html="page"></div>
</template>

<script>
import page from '../../static/lib/resources.md';

export default {
    computed: {
      page() {
        return page
      }
    }
};

</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/markdown.scss";

</style>