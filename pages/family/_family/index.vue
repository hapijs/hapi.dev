<template>
  <div class="container">
    <LandingNav 
      :version="getVersion"
      :results="results"
      :indexResults="indexResults"
      :search="search"
      :page="page"
      @search="onChildSearch"
      @previous="onChildIndex"
      @next="onChildIndex"
      @input="onChildInput"/>
    <div class="landing-wrapper">
      <div class="landing-title-flex">
        <div class="landing-title-wrapper">
          <h1 class="landing-title">{{ name }}</h1>
          <h5 class="landing-slogan">{{ modules[name].slogan }}</h5>
        </div>
        <img
          src="/img/family.svg"
          alt="hapi-family"
          class="landing-family-img"
        />
      </div>
      <div>
        Latest Version:
        <span class="bold">{{ modules[name].versionsArray[0] }}</span>
      </div>
      <div class="landing-version-status-header">Module Status:</div>
      <LandingTable :module="modules[name]" :name="name"/>
    </div>
  </div>
</template>

<script>
import LandingNav from "~/components/family/LandingNav.vue";
import LandingTable from "~/components/family/LandingTable.vue";
import moduleInfo from "../../../static/lib/moduleInfo.json";
let Toc = require("markdown-toc");
let Semver = require("semver");

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
      links: {}
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
  created() {
    console.log(moduleInfo)
    let versionsArray = moduleInfo[this.$route.params.family].versionsArray
    if (!this.$store.getters.loadModules.includes(this.$route.params.family)) {
      return this.$nuxt.error({ statusCode: 404 });
    }
    let version = versionsArray.includes(this.$route.query.v)
      ? this.$route.query.v
      : versionsArray[0];
    this.$store.commit("setDisplay", "family");
    this.$store.commit("setVersion", version);
    (!this.$route.query.v ||
      !versionsArray.includes(this.$route.query.v)) &&
      this.$router.push({
        path: this.$route.path,
        query: { v: versionsArray[0] },
        hash: this.$route.hash
      });
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
    }
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
}

.landing-title-wrapper {
  width: 100%;
  margin-bottom: 40px;
}

.landing-title {
  font-weight: 700;
  font-size: 2.3em;
}

.landing-family-img {
  width: 170px;
  margin-left: 20px;
}

.landing-slogan {
  margin: 0;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  font-size: 1.15em;
}

.landing-version-status-header {
  font-size: 1.4em;
  margin: 30px 0 15px 0;
  display: inline-block;
  border-bottom: 1px solid $dark-white;
}
</style>
