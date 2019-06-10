<template>
  <div class="container">
    <CommunityNav :page="page" @changePage="changePage"/>
    <div class="community-wrapper">
      <Contribute
        v-if="getCommunity === 'contribute'"
        :issues="ecoIssues"
        :hapiIssues="openIssues"
      />
    </div>
  </div>
</template>

<script>
import Contribute from "~/components/community/Contribute.vue";
import CommunityNav from "~/components/community/CommunityNav.vue";

export default {
  components: {
    Contribute,
    CommunityNav
  },
  data() {
    return {
      page: "contribute"
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
  computed: {
    getCommunity() {
      return this.$store.getters.loadCommunity;
    }
  },
  async created() {
    await this.$store.commit("setDisplay", "community");
  },
  async asyncData({ $axios, params, store }) {
    let weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    weekAgo = weekAgo.toISOString();
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };

    let repo = [];
    let ecoIssues = [];
    let milestoneList = [];
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

    let openIssues = await $axios.$get(
      "https://api.github.com/repos/hapijs/hapi/issues",
      options
    );

    return {
      openIssues,
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