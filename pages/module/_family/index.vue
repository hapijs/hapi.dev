<template>
  <div class="container">
    <LandingNav
      :version="getVersion"
      :results="results"
      :indexResults="indexResults"
      :search="search"
      :page="page"
      :moduleInfo="modules"
      :intro="intro"
      :example="example"
      :usage="usage"
      :faq="faq"
      :advanced="advanced"
      @search="onChildSearch"
      @previous="onChildIndex"
      @next="onChildIndex"
      @input="onChildInput"
    />
    <div class="landing-wrapper">
      <div class="landing-title-flex">
        <div class="landing-title-wrapper">
          <h1 class="landing-title">{{ name }}</h1>
          <h5
            class="landing-slogan"
            v-html="$md.render(modules[name].slogan)"
          ></h5>
          <div class="landing-latest-version">
            Latest Version:
            <span class="bold">{{ modules[name].versionsArray[0] }}</span>
          </div>
        </div>
        <img
          src="/img/family.svg"
          alt="hapi-family"
          class="landing-family-img"
        />
      </div>
      <div class="landing-install-wrapper">
        <div class="install-wrapper">
          <div class="landing-version-status-header">
            <a name="install" class="landing-link landing-anchor"></a>
            Installation:
          </div>
          <p class="install-how">
            <a
              class="install-link"
              target="__blank"
              :href="
                modules[name].versions[0].license === 'Commercial'
                  ? 'https://www.npmjs.com/package/@commercial/' + name
                  : 'https://www.npmjs.com/package/@hapi/' + name
              "
              >npm</a
            >:
            <span
              ><code>{{
                modules[name].versions[0].license === "Commercial"
                  ? "npm install @commercial/" + name
                  : "npm install @hapi/" + name
              }}</code></span
            >
          </p>
          <p class="install-how">
            <a
              class="install-link"
              target="__blank"
              :href="
                modules[name].versions[0].license === 'Commercial'
                  ? 'https://yarnpkg.com/en/package/@commercial/' + name
                  : 'https://yarnpkg.com/en/package/@hapi/' + name
              "
              >yarn</a
            >:
            <span
              ><code>{{
                modules[name].versions[0].license === "Commercial"
                  ? "yarn add @commercial/" + name
                  : "yarn add @hapi/" + name
              }}</code></span
            >
          </p>
        </div>
      </div>
      <div class="landing-version-status-header">
        <a name="status" class="landing-link landing-anchor"></a>Module Status:
      </div>
      <LandingTable :module="modules[name]" :name="name" />
      <div v-if="getIntro" class="intro-wrapper">
        <a name="introduction" class="landing-link2 landing-anchor"></a>
        <div v-html="$md.render(modules[name][getVersion].intro)"></div>
      </div>
      <div v-if="getExample" class="intro-wrapper">
        <a name="example" class="landing-link2 landing-anchor"></a>
        <div v-html="exampleHTML"></div>
      </div>
      <div v-if="getUsage" class="intro-wrapper">
        <a name="usage" class="landing-link2 landing-anchor"></a>
        <div v-html="usageHTML"></div>
      </div>
      <div v-if="getAdvanced" class="intro-wrapper">
        <a name="advanced" class="landing-link2 landing-anchor"></a>
        <div v-html="advancedHTML"></div>
      </div>
      <div v-if="getFaq" class="intro-wrapper">
        <a name="faq" class="landing-link2 landing-anchor"></a>
        <div v-html="faqHTML"></div>
      </div>
    </div>
  </div>
</template>

<script>
import LandingNav from "~/components/family/LandingNav.vue";
import LandingTable from "~/components/family/LandingTable.vue";
const moduleInfo = require("../../../static/lib/moduleInfo.json");
let Toc = require("markdown-toc");
let Semver = require("semver");
let Yaml = require("js-yaml");

export default {
  components: {
    LandingNav,
    LandingTable
  },
  head() {
    return {
      title: "hapi.dev - " + this.$route.params.family,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "View the APIs for the hapi modules"
        }
      ]
    };
  },
  data() {
    return {
      page: "home",
      display: "",
      modules: moduleInfo,
      version: "",
      menu: "",
      name: this.$route.params.family,
      indexResults: 0,
      search: "",
      results: [],
      uls: {},
      links: {},
      intro: false,
      example: false,
      usage: false,
      faq: false,
      advanced: false
    };
  },
  methods: {
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
    onChildSearch() {
      let headlines = [];
      let text = [];
      this.indexResults = 0;
      const headers = ["H2", "H3", "H4", "H5", "H6"];
      let pages = document
        .querySelector(".family-markdown-wrapper")
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
          .querySelector(".family-search-results")
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
          .querySelector(".family-search-error")
          .classList.add("nav-display");
      }
    },
    onChildIndex(value) {
      this.$data.indexResults = value;
      window.scrollTo(0, this.results[this.indexResults].offsetTop);
    },
    onChildInput(value) {
      this.$data.search = value;
    }
  },
  async asyncData({ $axios, params }) {
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };
    let exampleHTML = "";
    let usageHTML = "";
    let faqHTML = "";
    let advancedHTML = "";
    let version = moduleInfo[params.family].versionsArray[0];
    if (moduleInfo[params.family][version].example) {
      exampleHTML = await $axios.$post(
        "https://api.github.com/markdown",
        {
          text: moduleInfo[params.family][version].example,
          mode: "markdown"
        },
        {
          headers: {
            authorization: "token " + process.env.GITHUB_TOKEN
          }
        }
      );
    }
    if (moduleInfo[params.family][version].usage && moduleInfo[params.family][version].usage.length > 10) {
      usageHTML = await $axios.$post(
        "https://api.github.com/markdown",
        {
          text: moduleInfo[params.family][version].usage,
          mode: "markdown"
        },
        {
          headers: {
            authorization: "token " + process.env.GITHUB_TOKEN
          }
        }
      );
    }
    if (moduleInfo[params.family][version].faq) {
      faqHTML = await $axios.$post(
        "https://api.github.com/markdown",
        {
          text: moduleInfo[params.family][version].faq,
          mode: "markdown"
        },
        {
          headers: {
            authorization: "token " + process.env.GITHUB_TOKEN
          }
        }
      );
    }
    if (moduleInfo[params.family][version].advanced) {
      advancedHTML = await $axios.$post(
        "https://api.github.com/markdown",
        {
          text: moduleInfo[params.family][version].advanced,
          mode: "markdown"
        },
        {
          headers: {
            authorization: "token " + process.env.GITHUB_TOKEN
          }
        }
      );
    }
    return { exampleHTML, usageHTML, faqHTML, advancedHTML };
  },
  created() {
    this.$data.modules = moduleInfo;
    let module = this.$route.params.family;
    let versionsArray = moduleInfo[module].versionsArray;
    if (!this.$store.getters.loadModules.includes(module)) {
      return this.$nuxt.error({ statusCode: 404 });
    }
    let version = versionsArray.includes(this.$route.query.v)
      ? this.$route.query.v
      : versionsArray[0];
    this.$store.commit("setDisplay", "family");
    this.$store.commit("setVersion", version);
    this.$store.commit("setFamily", module);
    if (this.modules[module][version].intro) {
      this.$store.commit("setIntro", true);
    }
    if (this.modules[module][version].example) {
      this.$store.commit("setExample", true);
    }
    if (this.modules[module][version].usage && this.modules[module][version].usage.length > 10) {
      this.$store.commit("setUsage", true);
    }
    if (this.modules[module][version].faq) {
      this.$store.commit("setFaq", true);
    }
    if (this.modules[module][version].advanced) {
      this.$store.commit("setAdvanced", true);
    }
  },
  computed: {
    getDisplay() {
      return this.moduleAPI[this.$route.params.family].displays[
        this.getVersion
      ];
    },
    getVersion() {
      return this.$store.getters.loadVersion;
    },
    getMilestones() {
      return this.milestoneList;
    },
    getFamily() {
      return this.$store.getters.loadFamily;
    },
    getIntro() {
      return this.$store.getters.loadIntro;
    },
    getExample() {
      return this.$store.getters.loadExample;
    },
    getUsage() {
      return this.$store.getters.loadUsage;
    },
    getFaq() {
      return this.$store.getters.loadFaq;
    },
    getAdvanced() {
      return this.$store.getters.loadAdvanced;
    }
  },
  mounted() {
    this.goToAnchor();
  }
};
</script>

<style lang="scss">
@import "../../../assets/styles/main.scss";
@import "../../../assets/styles/api.scss";
@import "../../../assets/styles/markdown.scss";

.landing-wrapper {
  width: 100%;
  margin: 0;
  padding: 20px 40px;
}

.landing-title-flex {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: -10px;
}

.landing-title-wrapper {
  width: 100%;
  margin-bottom: 10px;
}

.landing-title {
  font-weight: 700;
  font-size: 2.3em;
  border-bottom: 1px solid $dark-white;
}

.landing-family-img {
  width: 170px;
  margin-left: 30px;
}

.landing-slogan {
  margin: 0;
  padding-top: 10px;
  font-size: 1.15em;
}

.landing-latest-version {
  padding: 10px 0 0 0;
}

.install-how {
  margin: 0 0 1em 0;
}

.install-link {
  font-size: 1.05em;
  font-weight: 700;
}

.landing-version-status-header {
  font-size: 1.5em;
  margin: 30px 0 15px 0;
  display: inline-block;
  border-bottom: 1px solid $dark-white;
}

.intro-wrapper h1,
.intro-wrapper h2,
.intro-wrapper h3,
.intro-wrapper h4 {
  font-size: 1.5em;
  border-bottom: 1px solid $dark-white;
  display: inline-block;
  border-top: none;
  margin: 30px 0 15px 0;
}

.intro-wrapper p {
  margin: 0;
}

.landing-link {
  display: block;
  position: relative;
  top: -116px;
  visibility: hidden;
}

.landing-link2 {
  display: block;
  position: relative;
  top: -76px;
  visibility: hidden;
}

h5 a {
  display: inline-block !important;
  position: relative !important;
  top: 0 !important;
  visibility: visible !important;
}

h5 p {
  margin: 0 !important;
}

@media screen and (max-width: 900px) {
  .landing-wrapper {
    padding: 10px;
    overflow-x: auto;
  }

  .landing-family-img {
    display: none;
  }

  .landing-table {
    margin-right: 10px;
  }
}
</style>
