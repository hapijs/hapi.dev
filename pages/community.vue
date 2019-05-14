<template>
  <div class="container">
    <CommunityNav :page="page"/>
    <div class="tutorial-markdown-window">
      <Community :display="display" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Community from "~/components/Community.vue";
import CommunityNav from "~/components/Navs/CommunityNav.vue";

export default {
  components: {
    Community,
    CommunityNav
  },
  data() {
    return {
      page: "Updates",
      display: "",
      repos: {}
    };
  },
  head() {
    return {
      title: "Community"
    };
  },
  methods: {
    async getRepos() {
      try {
        const res = await axios.get("https://api.github.com/orgs/hapijs/repos");
        this.repos = await res.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getStyle() {
      const options = {
        headers: {
          accept: "application/vnd.github.3.html"
        }
      };

      try {
        const res = await axios.get(
          "https://api.github.com/repos/hapijs/assets/contents/STYLE.md",
          options
        );
        this.$data.display = await res.data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.getRepos();
    this.getStyle();
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
</style>