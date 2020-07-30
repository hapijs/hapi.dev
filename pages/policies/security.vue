<template>
  <div class="container">
    <PoliciesNav page="security" />
    <div class="community-wrapper">
      <HTML :display="security" />
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
      page: "security"
    };
  },
  head() {
    return {
      title: "Security Policy - hapi.dev",
      meta: [
        { hid: "description", name: "description", content: "The official hapi style guide" }
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
    let s = await $axios.$get(
      "https://api.github.com/repos/hapijs/.github/contents/SECURITY.md",
      options
    );

    const security = await $axios.$post(
      "https://api.github.com/markdown",
      {
        text: s.toString(),
        mode: "markdown"
      },
      {
        headers: {
          authorization: "token " + process.env.GITHUB_TOKEN
        }
      }
    );
    return { security };
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