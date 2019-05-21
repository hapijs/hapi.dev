<template>
  <div class="container">
    <CommunityNav :page="page" @changePage="changePage"/>
    <div class="tutorial-markdown-window">
      <Markdown v-if="getCommunity === 'style'" :display="display"/>
      <Updates
        v-if="getCommunity === 'updates'"
        :pullRequests="pullRequests"
        :issues="closedIssues"
        :commits="commits"
        :milestones="getMilestones"
      />
      <Contribute
        v-if="getCommunity === 'contribute'"
        :issues="ecoIssues"
        :hapiIssues="openIssues"
      />
    </div>
  </div>
</template>

<script>
import Markdown from "~/components/Markdown.vue";
import Updates from "~/components/community/Updates.vue";
import Contribute from "~/components/community/Contribute.vue";
import CommunityNav from "~/components/community/CommunityNav.vue";
import style from "~/static/lib/style.md";
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
      display: style.toString(),
      milestoneList: []
    };
  },
  head() {
    return {
      title: "Community"
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
  async created(){
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.gitHub
      }
    };
    let milestones = await this.$axios.$get(
      "https://api.github.com/repos/hapijs/hapi/milestones?state=closed&per_page=100&direction=desc",
      options
    )

    let sortedMilestones = await milestones.sort((a, b) => {
      return b.number - a.number
    })
    
    for (let milestone of sortedMilestones.slice(0, 10)) {
      let m = await this.$axios.$get(
        "https://api.github.com/repos/hapijs/hapi/issues?state=closed&milestone=" + milestone.number,
        options
      );
      this.milestoneList.push(m[0]);
    }

  },
  async asyncData({ $axios, params, store }) {
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.gitHub
      }
    };

    let repo = [];
    let ecoIssues = [];
    let repos = await $axios.$get(
      "https://api.github.com/orgs/hapijs/repos",
      options
    );

    for (let r of repos) {
      repo.push(r.name);
      if (r.name !== "hapi") {
        let ecosystem = await $axios.$get(
          "https://api.github.com/repos/hapijs/" +
            r.name +
            "/issues?since=" +
            weekAgo,
          options
        );
        if (ecosystem.length !== 0) {
          ecosystem[0].repo = r.name;
          ecoIssues.push(ecosystem[0]);
          if (ecoIssues.length === 5) {
            break;
          }
        }
      }
    }

    let pullRequests = await $axios.$get(
      "https://api.github.com/repos/hapijs/hapi/pulls?state=closed&since=" +
        weekAgo +
        "&direction=desc&sort=created",
      options
    );

    let openIssues = await $axios.$get(
      "https://api.github.com/repos/hapijs/hapi/issues",
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
      openIssues,
      closedIssues,
      commits,
      ecoIssues
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
@import "../assets/styles/main.scss";
</style>