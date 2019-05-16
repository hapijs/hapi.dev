<template>
  <div class="container">
    <CommunityNav :page="page"/>
    <div class="tutorial-markdown-window">
    <Markdown v-if="markdown" :display="display" />
    <Updates v-if="!markdown" :pullReqeusts="getPulls"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Markdown from "~/components/Markdown.vue";
import Updates from "~/components/Updates.vue";
import CommunityNav from "~/components/Navs/CommunityNav.vue";
let weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 7);
weekAgo = weekAgo.toISOString();

export default {
  components: {
    Markdown,
    Updates,
    CommunityNav
  },
  data() {
    return {
      page: "Updates",
      display: "",
      markdown: false
    };
  },
  computed: {
    getPulls() {
      return this.$store.getters.getPullRequests
    }
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
    async getPullRequests() {
      try {
        const res = await axios.get(
          "https://api.github.com/repos/hapijs/hapi/pulls?state=closed&since=" + weekAgo + "&direction=desc&sort=created"
        );
        this.$store.commit('setPullRequests', res.data)
      } catch (err){
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
    console.log(weekAgo)
    this.getRepos();
    this.getStyle();
    this.getPullRequests();
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
</style>