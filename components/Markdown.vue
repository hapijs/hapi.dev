<template>
  <div class="markdown-wrapper" v-html="$md.render(this.$props.display)"></div>
</template>

<script>
export default {
  props: ["display"],
  data() {
    return {
      page: this.$props.display
    };
  }
};
</script>

<style lang="scss">
@import "../assets/styles/markdown.scss";

.octicon {
  display: none;
}
</style>