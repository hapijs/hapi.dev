<template>
  <div class="container">
    <ApiNav @change="onChildChange" @input="onChildInput" :menu="menu" :search="search"/>
    <div class="tutorial-markdown-window">
      <HTML :display="htmlDisplay"/>
    </div>
  </div>
</template>

<script>
import HTML from "~/components/HTML.vue";
import ApiNav from "~/components/api/ApiNav.vue";

export default {
  components: {
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
      htmlDisplay: "",
      version: "18.3.1",
      menu: "",
      search: ""
    };
  },
  methods: {
    async onChildChange(value) {
      this.$data.version = await value;
      this.$data.htmlDisplay = this.apis[value];
      this.$data.menu = this.menus[value];
      window.scrollTo(0, 0);
    },
    async onChildInput(value) {
      this.$data.search = await value;
    }
  },
  async asyncData({ params, $axios }) {
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };
    const versions = ["18.3.1", "17.9.0", "16.7.0"];
    let apis = {};
    let menus = {};

    for (let version of versions) {
      try {
        const res = await $axios.$get(
          "https://api.github.com/repos/hapijs/hapi/contents/API.md?ref=v" +
            version,
          options
        );
        let raw = await res;
        let rawString = await raw.toString();
        let finalDisplay = await rawString
          .replace(/\/>/g, "></a>")
          .replace(/-\s\[(?:.+[\n\r])+/, "");
        let finalMenu = await rawString.match(/-\s\[(?:.+[\n\r])+/).pop();
        menus[version] = await finalMenu;
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
        apis[version] = await finalHtmlDisplay;
      } catch (err) {
        console.log(err);
      }
    }
    return {
      apis,
      menus
    };
  },
  created() {
    this.$data.htmlDisplay = this.apis["18.3.1"];
    this.$data.menu = this.menus["18.3.1"];
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/api.scss";
</style>