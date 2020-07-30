<template>
  <div class="container">
    <PoliciesNav page="support" />
    <div class="community-wrapper">
      <HTML :display='page' />
    </div>
  </div>
</template>

<script>
import HTML from "~/components/HTML.vue";
import PoliciesNav from "~/components/policies/PoliciesNav.vue";
import page from "../../static/lib/supportPolicy.md";

export default {
  components: {
    HTML,
    PoliciesNav
  },
  data() {
    return {
      page: page
    };
  },
  head() {
    return {
      title: "Support Policy - hapi.dev",
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