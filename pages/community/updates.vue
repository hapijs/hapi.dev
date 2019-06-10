<template>
  <div class="container">
    <CommunityNav :page="page" @changePage="changePage"/>
    <div class="community-wrapper">
      <Updates
        :pullRequests="pullRequests"
        :issues="closedIssues"
        :commits="commits"
      />
    </div>
  </div>
</template>

<script>
import Updates from "~/components/community/Updates.vue";
import CommunityNav from "~/components/community/CommunityNav.vue";
let weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 7);
weekAgo = weekAgo.toISOString();

export default {
  components: {
    Updates,
    CommunityNav
  },
  data() {
    return {
      page: "updates",
    };
  },
  head() {
    return {
      title:
        "hapi.js - " +
        this.page.replace(/([A-Z])/g, " $1").replace(/^./, function(str) {
          return str.toUpperCase();
        })
    };
  },
  async created() {
    await this.$store.commit("setDisplay", "community");
  },
  async asyncData({ $axios, params, store }) {
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };

    let pullRequests = await $axios.$get(
      "https://api.github.com/repos/hapijs/hapi/pulls?state=closed&since=" +
        weekAgo +
        "&direction=desc&sort=created",
      options
    );

    let closedIssues = await $axios.$get(
      "https://api.github.com/repos/hapijs/hapi/issues?state=closed&since=" +
        weekAgo +
        "&sort=created",
      options
    );

    let commits = await $axios.$get(
      "https://api.github.com/repos/hapijs/hapi/commits",
      options
    );

    return {
      pullRequests,
      closedIssues,
      commits
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