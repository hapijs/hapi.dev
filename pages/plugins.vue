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
@import "../assets/styles/main.scss";

.tutorial-markdown-window {
  position: relative;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0;
}
</style>