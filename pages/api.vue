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
    <div class="preload">
      <img src="/img/clipboardCheck.png" alt="clipboard" />
    </div>
  </div>
</template>

<script>
import HTML from "~/components/HTML.vue";
import ApiNav from "~/components/api/ApiNav.vue";
import { copyToClipboard } from "~/utils/clipboard";

let Toc = require("markdown-toc");
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
      results: [],
      listeners: new Map()
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
          page.innerHTML
            .toLowerCase()
            .replace(/[^a-z]/g, "")
            .indexOf(this.search.toLowerCase().replace(/[^a-z]/g, "")) !== -1
        ) {
          headlines.push(page);
        } else if (
          headers.indexOf(page.nodeName) === -1 &&
          page.innerHTML
            .toLowerCase()
            .replace(/[^a-z]/g, "")
            .indexOf(this.search.toLowerCase().replace(/[^a-z]/g, "")) !== -1
        ) {
          text.push(page);
        }
      }

      this.results = headlines.concat(text);
      if (this.results.length) {
        document
          .querySelector(".api-search-results")
          .classList.add("nav-display");
        if (window.innerWidth <= 900) {
          document.body.scrollTo(
            0,
            this.results[this.indexResults].offsetTop + 166
          );
        } else {
          window.scrollTo(0, this.results[this.indexResults].offsetTop);
        }
      } else if (this.results.length === 0) {
        document
          .querySelector(".api-search-error")
          .classList.add("nav-display");
      }
    },
    setClipboards() {
      let headers = document.querySelectorAll(
        ".markdown-wrapper h2, .markdown-wrapper h3, .markdown-wrapper h4, .markdown-wrapper h5"
      );

      for (let header of headers) {
        header.classList.add("api-doc-header");

        const copyClipBoardElement = document.createElement("span");
        copyClipBoardElement.classList.add("copy-clipboard");
        copyClipBoardElement.title = "Copy link to clipboard";

        const eventListener = function() {
          const copyLink = this.parentNode.firstElementChild.href;
          copyToClipboard(copyLink);

          this.classList.add("copy-clipboard-checked");
          setTimeout(() => {
            this.classList.remove("copy-clipboard-checked");
          }, 3000);
        };
        copyClipBoardElement.addEventListener("click", eventListener);

        this.listeners.set(copyClipBoardElement, eventListener);
        header.appendChild(copyClipBoardElement);
      }
    }
  },
  async asyncData({ params, $axios }) {
    let versions = [];
    let branchVersions = {};
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

    let apis = {};
    let menus = {};

    //Grab and store APIs
    for (let branch of branches) {
      let v = "";
      try {
        if (branch.name.match(/^v+[0-9]+|\bmaster\b/g)) {
          v = await $axios.$get(
            "https://api.github.com/repos/hapijs/hapi/contents/package.json?ref=" +
              branch.name,
            options
          );
          if (versions.indexOf(v.version) === -1) {
            let branchVersion = v.version;
            versions.push(v.version);
            branchVersions[v.version] = branch.name;
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    versions = await versions.sort((a, b) => Semver.compare(b, a));
    for (let version of versions) {
      const res = await $axios.$get(
        "https://api.github.com/repos/hapijs/hapi/contents/API.md?ref=" +
          branchVersions[version],
        options
      );
      let raw = await res;
      let rawString = await raw.toString();

      //Auto generate TOC
      let apiTocString = "";
      let apiTocArray = await rawString.match(/\n#.+/g);

      for (let i = 0; i < apiTocArray.length; ++i) {
        apiTocString = apiTocString + apiTocArray[i];
      }
      let finalMenu = Toc(apiTocString, { bullets: "-" }).content;

      //Split API menu from content
      let finalDisplay = await rawString
        .replace(/\/>/g, "></a>")
        .replace(/-\s\[(?:.+[\n\r])+/, "");
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
    }
    return {
      apis,
      menus,
      versions
    };
  },
  created() {
    let apiVersion = this.versions[0];
    for (let v of this.versions) {
      let version = this.$route.query.v.match(/^([^.]+)/);
      if (!this.$route.query.v) {
        this.$router.push({
          query: { v: this.versions[0] },
          hash: this.$route.hash
        });
        break;
      }
      if (v.startsWith(version[0])) {
        apiVersion = v;
        if (!this.versions.includes(this.$route.query.v)) {
          this.$router.push({
            query: { v: v },
            hash: this.$route.hash
          });
        }
        break;
      }
      this.$router.push({
        query: { v: this.versions[0] },
        hash: this.$route.hash
      });
    }
    this.$data.version = apiVersion;
    // if (
    //   !this.versions.includes(this.$route.query.v) &&
    //   typeof this.$route.query.v === "string"
    // ) {
    //   return this.$nuxt.error({ statusCode: 404 });
    // }
    this.$data.htmlDisplay = this.apis[this.$data.version];
    this.$data.menu = this.menus[this.$data.version];
    this.$store.commit("setDisplay", "api");
  },
  mounted() {
    this.setClipboards();
    this.goToAnchor();
  },
  beforeDestroy() {
    for (const [element, listener] of this.listeners) {
      element.removeEventListener("click", listener);
    }
    this.listeners.clear();
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/api.scss";

.preload {
  display: none;
}

.api-doc-header {
  position: relative;
}

.copy-clipboard {
  top: 0 !important;
  right: 0 !important;
}

.copy-clipboard-absolute {
  top: 5px !important;
  right: 5px !important;
}

#-failaction-configuration ~ .copy-clipboard {
  margin-left: 5px;
}
</style>
