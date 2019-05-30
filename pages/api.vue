<template>
  <div class="container">
    <ApiNav
      @change="onChildChange"
      @input="onChildInput"
      :menu="menu"
      @search="onChildSearch"
      :search="search"
      :version="version"
    />
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
      search: "",
      found: false
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
    },
    onChildSearch() {
      this.found = false
      let pages = document
        .querySelector(".markdown-wrapper")
        .querySelectorAll("*");

      for (let page of pages) {
        if (page.innerHTML.indexOf(this.search) !== -1 && this.search !== "") {
          if (
            page.nodeName === "H2" ||
            page.nodeName === "H3" ||
            page.nodeName === "H4" ||
            page.nodeName === "H5" ||
            page.nodeName === "H6"
          ) {
            window.scrollTo(0, page.offsetTop);
            this.found = true
            break;
          }
          window.scrollTo(0, page.offsetTop);
          this.found = true
          break
        }
      }
      if (!this.found) {
        let error = document.querySelector(".api-search-error");
        error.classList.remove("hidden")
      }
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