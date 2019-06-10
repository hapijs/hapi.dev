<template>
  <div class="container">
    <CommunityNav :page="page" @changePage="changePage"/>
    <div class="community-wrapper">
      <Markdown :display="display"/>
    </div>
  </div>
</template>

<script>
import Markdown from "~/components/Markdown.vue";
import CommunityNav from "~/components/community/CommunityNav.vue";
import style from "~/static/lib/style.md";

export default {
  components: {
    Markdown,
    CommunityNav
  },
  data() {
    return {
      page: "styleGuide",
      display: style.toString()
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