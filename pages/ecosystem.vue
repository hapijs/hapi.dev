<template>
  <div class="container">
    <EcosystemNav
      :page="getEcosystem"
      :moduleAPI="moduleAPI"
      :modules="modules"
    />
    <div class="tutorial-markdown-window">
      <HTML :display="getDisplay"/>
    </div>
  </div>
</template>

<script>
import HTML from "~/components/HTML.vue";
import EcosystemNav from "~/components/ecosystem/EcosystemNav.vue";

export default {
  components: {
    HTML,
    EcosystemNav
  },
  head() {
    return {
      title: "hapi.js - " + this.$store.getters.loadEcosystem
    };
  },
  data() {
    return {
      display: ""
    };
  },
  computed: {
    getEcosystem() {
      return this.$store.getters.loadEcosystem;
    },
    getDisplay() {
      this.$data.display = this.moduleAPI[
        this.$store.getters.loadEcosystem
      ].display;
      return this.$data.display;
    }
  },
  async asyncData({ params, $axios }) {
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };
    const modules = [
      "bell",
      "boom",
      "good",
      "hoek",
      "iron",
      "joi",
      "shot",
      "topo",
      "yar"
    ];
    let moduleAPI = {};

    for (let module of modules) {
      try {
        const res = await $axios.$get(
          "https://api.github.com/repos/hapijs/" + module + "/contents/API.md",
          options
        );
        let raw = await res;
        let rawString = await raw.toString();

        //Split API menu from content
        let finalDisplay = await rawString
          .replace(/\/>/g, "></a>")
          .replace(/.\s\[(?:.+[\n\r])+/, "");
        let finalMenu = await rawString.match(/.\s\[(?:.+[\n\r])+/).pop();
        const apiHTML = await $axios.$post(
          "https://api.github.com/markdown",
          {
            text: finalDisplay,
            mode: "markdown"
          },
          {
            headers: {
              authorization: "token " + process.env.GITHUB_TOKEN
            }
          }
        );
        let apiString = await apiHTML.toString();
        let finalHtmlDisplay = await apiString.replace(/user-content-/g, "");
        moduleAPI[module] = {
          display: await finalHtmlDisplay,
          menu: await finalMenu
        };
      } catch (err) {
        console.log(err);
      }
    }
    return { moduleAPI, modules };
  },
  created() {
    this.$data.display = this.moduleAPI.bell;
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";

.ecosystem-title {
  margin: 20px 0 -16px 100px;
  padding-bottom: 16px;
  box-sizing: border-box;
  border-bottom: 1px solid $dark-white;
  display: inline-block;
}

@media screen and (max-width: 900px) {
  .ecosystem-title {
    margin: 20px 0 0 0;
    padding-bottom: 16px;
  }
}
</style>