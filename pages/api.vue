<template>
  <div class="container">
    <ApiNav @change="onChildChange" :menu="menu"/>
    <div class="tutorial-markdown-window">
      <Markdown :display="display" v-if="version !== '16.7.0'"/>
      <HTML :display="htmlDisplay" v-if="version === '16.7.0'"/>
    </div>
  </div>
</template>

<script>
import Markdown from "~/components/Markdown.vue";
import HTML from "~/components/HTML.vue"
import ApiNav from "~/components/api/ApiNav.vue";

export default {
  components: {
    Markdown,
    HTML,
    ApiNav
  },
  head() {
    return {
      title: "API"
    };
  },
  data() {
    return {
      display: "",
      htmlDisplay: "",
      version: "18.3.1",
      menu: ""
    };
  },
  methods: {
    async onChildChange(value) {
      this.$data.version = await value;
      console.log(value);
      await this.getAPI();
      window.scrollTo(0, 0);
    },
    async getAPI() {
      const options = {
        headers: {
          accept: "application/vnd.github.v3.raw+json",
          authorization: "token " + process.env.GITHUB_TOKEN
        }
      };

      try {
        const res = await this.$axios.$get(
          "https://api.github.com/repos/hapijs/hapi/contents/API.md?ref=v" +
            this.$data.version,
          options
        );
        let raw = await res;
        let rawString = await raw.toString();
        let finalDisplay = await rawString
          .replace(/\/>/g, "></a>")
          .replace(/-\s\[(?:.+[\n\r])+/, "");
        let finalMenu = await rawString.match(/-\s\[(?:.+[\n\r])+/).pop();
        this.$data.menu = await finalMenu;
        if (this.version === "18.3.1") {
          const apiHTML = await this.$axios.$post(
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
          this.htmlDisplay = await finalHtmlDisplay
        }
        this.$data.display = await finalDisplay;
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.getAPI();
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
</style>