<template>
  <div class="container">
    <LandingNav
      page="changelog"
      :intro="intro"
      :example="example"
      :usage="usage"
      :faq="faq"
      :advanced="advanced"
      :moduleInfo="moduleAPI"
    />
    <div class="community-wrapper">
      <Changelog :milestones="getMilestones" />
    </div>
  </div>
</template>

<script>
import Changelog from "../../../components/resources/Changelog.vue";
import LandingNav from "../../../components/family/LandingNav.vue";
const moduleInfo = require("../../../static/lib/moduleInfo.json");
let Semver = require("semver");

export default {
  components: {
    Changelog,
    LandingNav
  },
  data() {
    return {
      moduleAPI: moduleInfo,
      page: "changelog",
      intro: false,
      example: false,
      usage: false,
      faq: false,
      advanced: false
    };
  },
  head() {
    return {
      title:
        this.page.replace(/([A-Z])/g, " $1").replace(/^./, function(str) {
          return str.toUpperCase();
        }) + " - hapi.dev",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "View hapi's version history"
        }
      ]
    };
  },
  async asyncData({ params, $axios, $config, route, store }) {
    let milestoneList = [];
    let m = [];
    let milestones = [];
    if (store.getters.loadModules.includes(params.family)) {
      try {
        //Changelog
        const mileOptions = {
          headers: {
            accept: "application/vnd.github.v3.raw+json",
            authorization: "token " + $config.GITHUB_TOKEN
          }
        };
        for (let p = 1; p <= 2; ++p) {
          milestones = await $axios.$get(
            "https://api.github.com/repos/hapijs/" +
              params.family +
              "/milestones?state=closed&per_page=100&page=" +
              p,
            mileOptions
          );
          await m.push(milestones);
        }
        let flatM = await [].concat(...m);
        let sortedMilestones = await flatM.sort(function(a, b) {
          if (!Semver.valid(a.title)) {
            a.title = Semver.clean(a.title + ".0", { loose: true });
          }
          return Semver.compare(b.title, a.title);
        });
        //Get milestone issues
        for (let milestone of sortedMilestones) {
          let m = await $axios.$get(
            "https://api.github.com/repos/hapijs/" +
              params.family +
              "/issues?state=closed&milestone=" +
              milestone.number +
              "&per_page=200",
            mileOptions
          );
          if (m.length > 0) {
            milestoneList.push(m);
          }
        }
      } catch (err) {
        console.log("GITHUB ERRRORRRRRRRR!!!", err.message);
      }
    }
    return { milestoneList };
  },
  computed: {
    getCommunity() {
      return this.$store.getters.loadCommunity;
    },
    getMilestones() {
      return this.milestoneList;
    }
  },
  created() {
    let module = this.$route.params.family;
    this.$store.commit("setDisplay", "family");
    let versionsArray = this.moduleAPI[this.$route.params.family].versionsArray;
    this.$store.commit("setFamily", module);
    if (this.moduleAPI[module][versionsArray[0]].intro) {
      this.$store.commit("setIntro", true);
    }
    if (this.moduleAPI[module][versionsArray[0]].example) {
      this.$store.commit("setExample", true);
    }
    if (this.moduleAPI[module][versionsArray[0]].usage) {
      this.$store.commit("setUsage", true);
    }
    if (this.moduleAPI[module][versionsArray[0]].faq) {
      this.$store.commit("setFaq", true);
    }
    if (this.moduleAPI[module][versionsArray[0]].advanced) {
      this.$store.commit("setAdvanced", true);
    }
  },
  methods: {
    changePage(value) {
      this.$data.page = value;
      this.$store.commit("setCommunity", value);
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/styles/main.scss";
@import "../../../assets/styles/markdown.scss";

.community-wrapper {
  margin: 0;
  width: 100%;
}

.changelog-header {
  margin: 20px 0 10px 0;
  border-bottom: 1px solid $dark-white;
  border-top: none;
  padding-bottom: 10px;
  width: auto;
  display: inline-block;
}

@media screen and (max-width: 900px) {
  .community-wrapper {
    padding: 0 20px;
  }
}
</style>
