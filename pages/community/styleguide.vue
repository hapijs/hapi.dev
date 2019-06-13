<template>
  <div class="container">
    <CommunityNav :page="page" @changePage="changePage"/>
    <div class="community-wrapper">
      <HTML :display="styleGuide"/>
    </div>
  </div>
</template>

<script>
import HTML from "~/components/HTML.vue";
import CommunityNav from "~/components/community/CommunityNav.vue";

export default {
  components: {
    HTML,
    CommunityNav
  },
  data() {
    return {
      page: "styleGuide",
    };
  },
  head() {
    return {
      title: "hapi.js - Style Guide"
    };
  },
  async created() {
    await this.$store.commit("setDisplay", "community");
  },
  methods: {
    changePage(value) {
      this.$data.page = value;
      this.$store.commit("setCommunity", value);
      window.scrollTo(0, 0);
    }
  },
  async asyncData({ params, $axios }) {
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };
    let style = await $axios.$get(
      "https://api.github.com/repos/hapijs/assets/contents/STYLE.md",
      options
    );

    const styleGuide = await $axios.$post(
      "https://api.github.com/markdown",
      {
        text: style.toString(),
        mode: "markdown"
      },
      {
        headers: {
          authorization: "token " + process.env.GITHUB_TOKEN
        }
      }
    );
    return { styleGuide }
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