<template>
  <div class="container">
    <PluginsNav />
    <div class="tutorial-markdown-window">
      <Plugins />
    </div>
  </div>
</template>

<script>
import Plugins from "~/components/plugins/Plugins.vue";
import PluginsNav from "~/components/plugins/PluginsNav.vue";
export default {
  components: {
    Plugins,
    PluginsNav
  },
  head() {
    return {
      title: "hapi.js - Plugins",
      head() {
        return {
          title: "hapi.js - " + this.$route.params.family,
          meta: [
            {
              hid: "description",
              name: "description",
              content: "View the hapi plugins"
            }
          ]
        };
      }
    };
  },
  created() {
    this.$store.commit("setDisplay", "plugins");
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

.markdown-wrapper a {
  position: relative;
}

.plugins-logo {
  position: absolute;
  top: -8px;
  right: -40px;
  width: 35px;
  height: 35px;
  max-width: none;
}

.plugins-logo-top {
  position: relative;
  top: 10px;
  width: 35px;
  height: 35px;
  max-width: none;
}
</style>