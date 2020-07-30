<template>
  <div class="container">
    <PoliciesNav page="conduct" />
    <div class="community-wrapper">
      <HTML :display="conduct" />
    </div>
  </div>
</template>

<script>
import HTML from "~/components/HTML.vue";
import PoliciesNav from "~/components/policies/PoliciesNav.vue";

export default {
  components: {
    HTML,
    PoliciesNav
  },
  data() {
    return {
      page: "conduct"
    };
  },
  head() {
    return {
      title: "Code of Conduct - hapi.dev",
      meta: [
        { hid: "description", name: "description", content: "The hapi code of conduct" }
      ]
    };
  },
  async created() {
    await this.$store.commit("setDisplay", "policies");
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
    let coc = await $axios.$get(
      "https://api.github.com/repos/hapijs/.github/contents/CODE_OF_CONDUCT.md",
      options
    );

    const conduct = await $axios.$post(
      "https://api.github.com/markdown",
      {
        text: coc.toString(),
        mode: "markdown"
      },
      {
        headers: {
          authorization: "token " + process.env.GITHUB_TOKEN
        }
      }
    );
    return { conduct };
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/markdown.scss";
@import "../../assets/styles/api.scss";

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