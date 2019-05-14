<template>
  <div class="container">
    <CommunityNav :page="page" />
    <div class="tutorial-markdown-window">
      <Community />
    </div>
  </div>
</template>

<script>
import Community from "~/components/Community.vue";
import CommunityNav from "~/components/Navs/CommunityNav.vue";
export default {
  components: {
    Community,
    CommunityNav
  },
  data() {
      return {
          page: "Updates"
      }
  },
  head() {
      return {
          title: "Community"
      }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";

.tutorial-markdown-window {
  position: relative;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0;
}
</style>