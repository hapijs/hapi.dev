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
      title: "hapi.dev - Plugins",
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
  },
  mounted() {
    let header = document.querySelector(".markdown-wrapper h1");

    header.classList.add("hapi-header");
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/api.scss";

section {
  max-height: calc(100% - 88px);
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
