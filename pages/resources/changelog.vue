<template>
  <div class="container">
    <ResourcesNav page="changelog" />
    <div class="community-wrapper">
      <Changelog :milestones="getMilestones" />
    </div>
  </div>
</template>

<script>
import Changelog from "../../components/resources/Changelog.vue";
import ResourcesNav from "../../components/resources/ResourcesNav.vue";
let Semver = require("semver");
let weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 7);
weekAgo = weekAgo.toISOString();

export default {
  components: {
    Changelog,
    ResourcesNav
  },
  data() {
    return {
      page: "changelog"
    };
  },
  head() {
    return {
      title:
        "hapi.js - " +
        this.page.replace(/([A-Z])/g, " $1").replace(/^./, function(str) {
          return str.toUpperCase();
        }),
      meta: [
        { hid: "description", name: "description", content: "View hapi's version history" }
      ]
    };
  },
  computed: {
    getCommunity() {
      return this.$store.getters.loadCommunity;
    },
    getMilestones() {
      return this.milestoneList;
    }
  },
  async created() {
    await this.$store.commit("setDisplay", "resources");
  },
  async asyncData({ $axios, params, store }) {
    let milestoneList = [];
    let m = [];
    let milestones = [];

    const mileOptions = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };
    for (let p = 1; p <= 2; p++) {
      milestones = await $axios.$get(
        "https://api.github.com/repos/hapijs/hapi/milestones?state=closed&per_page=100&page=" +
          p,
        mileOptions
      );
      await m.push(milestones);
    }

    let flatM = await [].concat(...m);

    let sortedMilestones = await flatM.sort((a, b) =>
      Semver.compare(b.title, a.title)
    );

    //Get milestone issues
    for (let milestone of sortedMilestones) {
      let m = await $axios.$get(
        "https://api.github.com/repos/hapijs/hapi/issues?state=closed&milestone=" +
          milestone.number,
        mileOptions
      );
      if (m.length > 0) {
        milestoneList.push(m);
      }
    }

    return {
      milestoneList
    };
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
@import "../../assets/styles/main.scss";
@import "../../assets/styles/markdown.scss";

.community-wrapper {
  margin: 0;
  width: 100%;
}

@media screen and (max-width: 900px) {
  .community-wrapper {
    padding: 0 20px;
  }
}
</style>