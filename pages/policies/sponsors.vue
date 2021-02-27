<template>
  <div class="container">
    <PoliciesNav page="sponsors" />
    <div class="community-wrapper">
      <HTML :display="sponsors" />
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
      page: "sponsors"
    };
  },
  head() {
    return {
      title: "Sponsors - hapi.dev",
      meta: [
        { hid: "description", name: "description", content: "hapi sponsors" }
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
    let sponsorsmd = await $axios.$get(
      "https://api.github.com/repos/hapijs/.github/contents/SPONSORS.md",
      options
    );

    const sponsors = await $axios.$post(
      "https://api.github.com/markdown",
      {
        text: sponsorsmd.toString(),
        mode: "markdown"
      },
      {
        headers: {
          authorization: "token " + process.env.GITHUB_TOKEN
        }
      }
    );
    return { sponsors };
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

.markdown-wrapper ul {
  columns: 3;
  li {
    list-style: none;
    border-left: 2px solid $orange;
    padding-left: 15px;
  }
}

@media screen and (max-width: 900px) {
  .community-wrapper {
    padding: 0 20px;
  }
  .markdown-wrapper ul {
    columns: 2;
  }
}
</style>
