<template>
  <div class="container">
    <ResourcesNav :list=true />
    <div class="markdown-window">
      <Resources/>
    </div>
  </div>
</template>

<script>
import Resources from "../../components/resources/Resources.vue";
import ResourcesNav from "../../components/resources/ResourcesNav.vue";
export default {
  components: {
    Resources,
    ResourcesNav
  },
  head() {
    return {
      title: "hapi.js - Resources"
    };
  },
  created() {
    this.$store.commit("setDisplay", "resources");
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";

.markdown-window {
  position: relative;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0;
}
</style>