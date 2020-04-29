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
          <h5 class="landing-slogan">{{ modules[name].slogan }}</h5>
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
                modules[name].versions[0].license === 'commercial'
                  ? 'https://www.npmjs.com/package/@commercial/' + name
                  : 'https://www.npmjs.com/package/@hapi/' + name
              "
              >npm</a
            >:
            <span
              ><code>{{
                modules[name].versions[0].license === "commercial"
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
                (modules[name].versions[0].license === 'commercial') ===
                'Commercial'
                  ? 'https://yarnpkg.com/en/package/@commercial/' + name
                  : 'https://yarnpkg.com/en/package/@hapi/' + name
              "
              >yarn</a
            >:
            <span
              ><code>{{
                modules[name].versions[0].license === "commercial"
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
      title: "hapi.dev - joi",
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
      name: "joi",
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
    setClasses() {
      let pre = document.querySelectorAll("pre");
      let count = 0;
      let store = this.$store;
      let router = this.$router;

      for (let p of pre) {
        let textContent = p.textContent;
        if (
          textContent.match(/schema\s=\s(Joi.*\{(.|\n)*?[^\)]\));/) ||
          textContent.match(/schema\s=\s(Joi.*\(\)([\s\S]*?\);))/)
        ) {
          p.insertAdjacentHTML(
            "afterend",
            "<img src='/img/joiTestIcon.png' class='test-icon' id='icon" +
              count +
              "' title='Import to joi Schema Tester'/>"
          );
          p.classList.add("pre-icon");
          p.id = "pre-icon" + count;
        }
        count++;
      }

      let testIcons = document.querySelectorAll(".test-icon");
      for (let icon of testIcons) {
        icon.addEventListener("click", function(event) {
          let text = document.getElementById("pre-" + icon.id).textContent;
          let schema = text.match(/schema\s=\s(Joi.*\(\)([\s\S]*?\);))/);
          if (!schema) {
            schema = text.match(/schema\s=\s(Joi.*\{(.|\n)*?[^\)]\));/);
          }
          schema = schema[1];
          store.commit(
            "setSchema",
            "//Insert your joi schema here \n" + schema
          );
          if (schema.includes("object")) {
            store.commit(
              "setValidate",
              "//Insert data to validate here \n" + "{ \n" + " \n" + "}"
            );
          } else {
            store.commit(
              "setValidate",
              "//Insert data to validate here \n" + ""
            );
          }

          router.push({
            path: "/module/joi/tester"
          });
        });
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
    let version = moduleInfo.joi.versionsArray[0];
    if (moduleInfo.joi[version].example) {
      exampleHTML = await $axios.$post(
        "https://api.github.com/markdown",
        {
          text: moduleInfo.joi[version].example,
          mode: "markdown"
        },
        {
          headers: {
            authorization: "token " + process.env.GITHUB_TOKEN
          }
        }
      );
    }
    if (moduleInfo.joi[version].usage) {
      usageHTML = await $axios.$post(
        "https://api.github.com/markdown",
        {
          text: moduleInfo.joi[version].usage,
          mode: "markdown"
        },
        {
          headers: {
            authorization: "token " + process.env.GITHUB_TOKEN
          }
        }
      );
    }
    if (moduleInfo.joi[version].faq) {
      faqHTML = await $axios.$post(
        "https://api.github.com/markdown",
        {
          text: moduleInfo.joi[version].faq,
          mode: "markdown"
        },
        {
          headers: {
            authorization: "token " + process.env.GITHUB_TOKEN
          }
        }
      );
    }
    if (moduleInfo.joi[version].advanced) {
      advancedHTML = await $axios.$post(
        "https://api.github.com/markdown",
        {
          text: moduleInfo.joi[version].advanced,
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
    let versionsArray = moduleInfo.joi.versionsArray;
    if (!this.$store.getters.loadModules.includes("joi")) {
      return this.$nuxt.error({ statusCode: 404 });
    }
    let version = versionsArray.includes(this.$route.query.v)
      ? this.$route.query.v
      : versionsArray[0];
    this.$store.commit("setDisplay", "family");
    this.$store.commit("setVersion", version);
    this.$store.commit("setFamily", "joi");
    if (this.modules.joi[version].intro) {
      this.$store.commit("setIntro", true);
    }
    if (this.modules.joi[version].example) {
      this.$store.commit("setExample", true);
    }
    if (this.modules.joi[version].usage) {
      this.$store.commit("setUsage", true);
    }
    if (this.modules.joi[version].faq) {
      this.$store.commit("setFaq", true);
    }
    if (this.modules.joi[version].advanced) {
      this.$store.commit("setAdvanced", true);
    }
  },
  computed: {
    getDisplay() {
      return this.moduleAPI.joi.displays[this.getVersion];
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
    this.setClasses();
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

.highlight {
  position: relative;
}

.test-icon {
  position: absolute;
  top: 5px;
  right: 28px;
  height: 21px;
  width: 21px;
  opacity: 0.3;
  cursor: pointer;
  transition: all 0.2s;
}

.test-icon:hover {
  opacity: 0.7;
}

@media screen and (max-width: 900px) {
  .landing-wrapper {
    padding: 5px 20px;
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
