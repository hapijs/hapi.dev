<template>
  <div class="container">
    <ResourcesNav/>
    <div class="markdown-window">
      <Resources/>
    </div>
  </div>
</template>

<script>
import Resources from "~/components/Resources.vue";
import ResourcesNav from "~/components/Navs/ResourcesNav.vue";
export default {
  components: {
    Resources,
    ResourcesNav
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";

.markdown-window {
  position: relative;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0;
}
</style>