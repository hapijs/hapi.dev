<template>
  <div class="container">
    <ResourcesNav :page="getResource" />
    <div class="markdown-window">
      <Resources />
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
      title: "hapi.js - Resources",
      meta: [
        { hid: "description", name: "description", content: "Resources to learn about and get started with hapi" }
      ]
    };
  },
  computed: {
    getResource() {
      return this.$route.hash;
    }
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

.markdown-wrapper a {
  position: relative;
}

.resources-book {
  position: absolute;
  top: -12px;
  right: -50px;
  height: 50px;
  max-width: none;
  border: 1px solid $dark-white;
}
</style>