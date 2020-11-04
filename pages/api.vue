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
import { copyToClipboard, setCodeClipboards } from "~/utils/clipboard";
const moduleInfo = require("~/static/lib/moduleInfo.json");

let Toc = require("markdown-toc");
let Semver = require("semver");

export default {
  components: {
    HTML,
    ApiNav
  },
  head() {
    return {
      title: this.$route.query.v + " API Reference" + " - hapi.dev",
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
          this.setClipboards();
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
        header.classList.add("api-doc-header", "api-main-doc-header");
        header.innerHTML =
          header.innerHTML +
          "<span class='api-clipboardCheck api-clipboard' title='Copy link to clipboard'></span>";
      }

      let clipboards = document.querySelectorAll(".api-clipboard");

      for (let clipboard of clipboards) {
        clipboard.addEventListener("click", function(event) {
          let copyLink = clipboard.parentNode.firstElementChild.href;
          copyToClipboard(copyLink);
          clipboard.classList.remove("api-clipboard");
          clipboard.classList.add("api-clipboardCheck");
          setTimeout(function() {
            clipboard.classList.add("api-clipboard");
            clipboard.classList.remove("api-clipboardCheck");
          }, 3000);
        });
      }
    }
  },
  async asyncData({ params, $axios }) {
    let versions = [];
    let branchVersions = {};
    let apis = {};
    let menus = {};
    for (let version of moduleInfo['hapi'].versions) {
      branchVersions[version.name] = version.branch;
    }
    // need to sort them so that the newest is on top
    versions = await moduleInfo['hapi'].versionsArray.sort((a, b) => Semver.compare(b, a));
    for (let version of versions) {
      apis[version] = moduleInfo['hapi'][version].api;
      menus[version] = moduleInfo['hapi'][version].menu;
    }
    return {
      apis,
      menus,
      versions
    };
  },
  created() {
    let apiVersion = this.versions[0];
    if (!this.$route.query.v) {
      this.$router.push({
        query: { v: this.versions[0] },
        hash: this.$route.hash
      });
    } else {
      for (let v of this.versions) {
        let version = this.$route.query.v.match(/^([^.]+)/);
        if (v.startsWith(version[0])) {
          apiVersion = v;
          if (!this.versions.includes(this.$route.query.v)) {
            this.$router.push({
              query: { v: v },
              hash: this.$route.hash
            });
          }
          break;
        } else if (!this.versions.includes(this.$route.query.v)) {
          this.$router.push({
            query: { v: this.versions[0] },
            hash: this.$route.hash
          });
        }
      }
    }

    this.$data.version = apiVersion;
    this.$data.htmlDisplay = this.apis[this.$data.version];
    this.$data.menu = this.menus[this.$data.version];
    this.$store.commit("setDisplay", "api");
  },
  mounted() {
    this.goToAnchor();
    this.setClipboards();
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

.api-clipboardCheck {
  position: relative;
  display: inline-block;
  width: 17px;
  height: 17px;
  margin: 0 0 0 5px;
  opacity: 0.7;
  background: url("/img/clipboardCheck.png");
  background-size: contain;
  transition: all 0.2s;
}

code ~ .api-clipboardCheck {
  margin-left: 0;
}

.api-clipboard {
  position: relative;
  display: inline-block;
  width: 17px;
  height: 17px;
  margin: 0 0 0 5px;
  background: url("/img/clipboard.png");
  background-size: contain;
  opacity: 0.3;
  cursor: pointer;
  transition: all 0.2s;
}

code ~ .api-clipboard {
  margin-left: 0;
}

.api-clipboard:hover {
  opacity: 0.7;
}
</style>
