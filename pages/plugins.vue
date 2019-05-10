<template>
  <div class="container">
    <PluginsNav />
    <div class="tutorial-markdown-window">
      <Plugins />
    </div>
  </div>
</template>

<script>
import Plugins from "~/components/Plugins.vue";
import PluginsNav from "~/components/Navs/PluginsNav.vue";
export default {
  components: {
    Plugins,
    PluginsNav
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

.tutorial-markdown-window {
  position: relative;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0;
}
</style>