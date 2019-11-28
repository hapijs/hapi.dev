<template>
  <div class="container">
    <LandingNav />
    <div class="landing-wrapper">
      <div class="landing-title-flex">
        <div class="landing-title-wrapper">
          <h1 class="landing-title">{{name}}</h1>
          <h5 class="landing-slogan">{{modules[name].slogan}}</h5>
        </div>
        <img src="/img/family.svg" alt="hapi-family" class="landing-family-img">
      </div>
    </div>
  </div>
</template>

<script>
import LandingNav from "~/components/family/LandingNav.vue";
import Install from "~/components/family/Install.vue";
import Changelog from "~/components/resources/Changelog.vue";
import moduleInfo from "../../static/lib/moduleInfo.json";
let Toc = require("markdown-toc");
let Semver = require("semver");

export default {
  components: {
    Install,
    Changelog,
    LandingNav
  },
  head() {
    return {
      title: "hapi.dev - " + this.$route.params.landing,
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
      display: "",
      modules: moduleInfo,
      version: "",
      menu: "",
      name: this.$route.params.landing,
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
  computed: {
    getDisplay() {
      return this.moduleAPI[this.$route.params.family].displays[
        this.getVersion
      ];
    },
    getVersion() {
      return this.$store.getters.loadVersion;
    },
    getMenu() {
      return this.moduleAPI[this.$route.params.family].menus[this.getVersion];
    },
    getMilestones() {
      return this.milestoneList;
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/api.scss";
@import "../../assets/styles/markdown.scss";

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
  margin-bottom: 50px;
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
</style>