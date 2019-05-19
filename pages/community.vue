<template>
  <div class="container">
    <CommunityNav :page="page" @changePage="changePage"/>
    <div class="tutorial-markdown-window">
      <Markdown v-if="page === 'style'" :display="styleGuide"/>
      <Updates
        v-if="page === 'updates'"
        :pullRequests="pullRequests"
        :issues="issues"
        :commits="commits"
      />
      <Contribute v-if="page === 'contribute'"/>
    </div>
  </div>
</template>

<script>
import Markdown from "~/components/Markdown.vue";
import Updates from "~/components/community/Updates.vue";
import Contribute from "~/components/community/Contribute.vue";
import CommunityNav from "~/components/community/CommunityNav.vue";
let weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 7);
weekAgo = weekAgo.toISOString();

export default {
  components: {
    Markdown,
    Updates,
    Contribute,
    CommunityNav
  },
  data() {
    return {
      page: "updates",
      display: ""
    };
  },
  head() {
    return {
      title: "Community"
    };
  },
  async asyncData({ $axios, params, store }) {
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: `token d4ad552ad1242cb7e36d9eeca202a7f84012e715`
      }
    };

    let pullRequests = await $axios.$get(
      "https://api.github.com/repos/hapijs/hapi/pulls?state=closed&since=" +
        weekAgo +
        "&direction=desc&sort=created",
      options
    );

    let issues = await $axios.$get(
      "https://api.github.com/repos/hapijs/hapi/issues?state=closed&since=" +
        weekAgo +
        "&sort=created",
      options
    );

    let styleGuide = await $axios.$get(
      "https://api.github.com/repos/hapijs/assets/contents/STYLE.md",
      options
    );

    let commits = await $axios.$get(
      "https://api.github.com/repos/hapijs/hapi/commits",
      options
    );

    return {
      pullRequests,
      issues,
      commits,
      styleGuide
    };
  },
  methods: {
    changePage(value) {
      this.page = value;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
</style>