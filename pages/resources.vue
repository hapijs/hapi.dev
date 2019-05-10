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
.spacer {
  width: 100%;
  height: 96px;
}

.container {
  position: relative;
  width: 100%;
  max-width: 1260px;
  margin: 96px auto 0 auto;
  display: flex;
  justify-content: space-between;
}

.markdown-window {
  position: relative;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0;
}
</style>