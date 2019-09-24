<template>
  <div class="container">
    <ApiNav
      @change="onChildChange"
      @input="onChildInput"
      @search="onChildSearch"
      @previous="onChildIndex"
      @next="onChildIndex"
      :menu="menu"
      :search="search"
      :results="results"
      :indexResults="indexResults"
      :version="version"
      :versions="versions"
    />
    <div class="tutorial-markdown-window">
      <HTML :display="htmlDisplay" />
    </div>
  </div>
</template>

<script>
import HTML from "~/components/HTML.vue";
import ApiNav from "~/components/api/ApiNav.vue";
let Toc = require('markdown-toc');
let Semver = require("semver");

export default {
  components: {
    HTML,
    ApiNav
  },
  head() {
    return {
      title: "hapi.dev - " + this.version + " API Reference",
      meta: [
        { hid: "description", name: "description", content: "The hapi API" }
      ]
    };
  },
  data() {
    return {
      htmlDisplay: "",
      version: "",
      menu: "",
      search: "",
      indexResults: 0,
      results: []
    };
  },
  methods: {
    async onChildChange(value) {
      this.$data.version = await value;
      await this.$router.push({ path: this.$route.path, query: { v: value } });
      this.$data.htmlDisplay = await this.apis[value];
      this.$data.menu = await this.menus[value];
      this.$data.search = "";
      document
        .querySelector(".api-search-results")
        .classList.remove("nav-display");
      document
        .querySelector(".api-search-error")
        .classList.remove("nav-display");
      window.scrollTo(0, 0);
      const checkIfPageLoaded = setInterval(() => {
        if ((this.$data.version = value)) {
          this.$children[0].setClasses();
          clearInterval(checkIfPageLoaded);
        }
      }, 25);
    },
    onChildInput(value) {
      this.$data.search = value;
    },
    onChildIndex(value, uls, links) {
      this.$data.indexResults = value;
      window.scrollTo(0, this.results[this.indexResults].offsetTop);
      this.findActives(this.results[this.indexResults].offsetTop, uls, links);
    },
    findActives(position, uls, links) {
      const checkIfScrollToIsFinished = setInterval(() => {
        if (document.documentElement.scrollTop === position) {
          let active = document.querySelector(
            ".api-nav-select-wrapper .api-active"
          );
          const activePosition = links[active.hash];
          for (let key in uls) {
            if (
              activePosition > uls[key].top &&
              activePosition < uls[key].bottom
            ) {
              uls[key].name.classList.add("nav-display");
              uls[key].name.parentElement.children[0].classList.remove(
                "api-nav-plus"
              );
              uls[key].name.parentElement.children[0].classList.add(
                "api-nav-minus"
              );
            }
          }
          clearInterval(checkIfScrollToIsFinished);
        }
      }, 25);
    },
    goToAnchor() {
      let hash = document.location.hash;
      if (hash != "") {
        setTimeout(function() {
          if (location.hash) {
            window.scrollTo(0, 0);
            window.location.href = hash;
          }
        }, 1);
      } else {
        return false;
      }
    },
    onChildSearch(uls, links) {
      let headlines = [];
      let text = [];
      this.indexResults = 0;
      const headers = ["H2", "H3", "H4", "H5", "H6"];
      let pages = document
        .querySelector(".markdown-wrapper")
        .querySelectorAll("*");

      //Check if search item is in a headline
      for (let page of pages) {
        if (
          headers.indexOf(page.nodeName) !== -1 &&
          page.innerHTML.indexOf(this.search.toLowerCase()) !== -1
        ) {
          headlines.push(page);
        } else if (
          headers.indexOf(page.nodeName) === -1 &&
          page.innerHTML.indexOf(this.search.toLowerCase()) !== -1
        ) {
          text.push(page);
        }
      }

      this.results = headlines.concat(text);
      if (this.results.length) {
        document
          .querySelector(".api-search-results")
          .classList.add("nav-display");
        window.scrollTo(0, this.results[this.indexResults].offsetTop);
        this.findActives(this.results[this.indexResults].offsetTop, uls, links);
      } else if (this.results.length === 0) {
        document
          .querySelector(".api-search-error")
          .classList.add("nav-display");
      }
    }
  },
  async asyncData({ params, $axios }) {
    let versions = [];
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };

    let branches = await $axios.$get(
      "https://api.github.com/repos/hapijs/hapi/branches",
      options
    );

    for (let branch of branches) {
      if (branch.name.match(/^v+[0-9]+|\bmaster\b/g)) {
        const v = await $axios.$get(
          "https://api.github.com/repos/hapijs/hapi/contents/package.json?ref=" +
            branch.name,
          options
        );
        versions.push(v.version);
      }
      versions = await versions.sort((a, b) => 
        Semver.compare(b, a)
      )
    }

    let apis = {};
    let menus = {};
    const test = await $axios.$get(
          "https://api.github.com/repos/hapijs/hapi/contents/API.md?ref=v16-commercial",
          options
        );

    await console.log(test);

    //Grab and store APIs
    for (let version of versions) {
      try {
        const res = await $axios.$get(
          "https://api.github.com/repos/hapijs/hapi/contents/API.md?ref=v" +
            version,
          options
        );
        let raw = await res;
        let rawString = await raw.toString();

        let testMenu = "";
        let testToc = await rawString.match(/\n#.+/g);
        for (let t = 0; t < testToc.length; ++t) {
          testMenu = testMenu + testToc[t];
        }
        let finalMenu = Toc(testMenu, {bullets: '-'}).content

        //Split API menu from content
        let finalDisplay = await rawString
          .replace(/\/>/g, "></a>")
          .replace(/-\s\[(?:.+[\n\r])+/, "");
        // let finalMenu = await rawString.match(/-\s\[(?:.+[\n\r])+/).pop();
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
      menus,
      versions
    };
  },
  created() {
    this.$data.version = this.versions.includes(this.$route.query.v)
      ? this.$route.query.v
      : this.versions[0];
    !this.$route.query.v &&
      this.$router.push({
        query: { v: this.versions[0] },
        hash: this.$route.hash
      });
    if (!this.versions.includes(this.$route.query.v) && typeof this.$route.query.v === "string"){
      return this.$nuxt.error({ statusCode: 404 })
    }
    this.$data.htmlDisplay = this.apis[this.$data.version];
    this.$data.menu = this.menus[this.$data.version];
    this.$store.commit("setDisplay", "api");
  },
  mounted() {
    this.goToAnchor();
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/api.scss";
</style>