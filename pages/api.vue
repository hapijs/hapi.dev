<template>
  <div class="container">
    <ApiNav />
    <div class="tutorial-markdown-window">
      <Markdown :display="display"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Markdown from "~/components/Markdown.vue";
import ApiNav from "~/components/Navs/ApiNav.vue";

export default {
  components: {
    Markdown,
    ApiNav
  },
  head() {
    return {
      title: "API"
    };
  },
  data() {
    return {
      display: "",
      page: ""
    }
  },
  async created() {
      const options = {
        headers: {
          accept: "application/vnd.github.v3.raw+json",
          authorization: `token 17f33bd944f037667263c085077babfa4f6cdd78`
        }
      };

      try {
        const res = await axios.get(
          "https://api.github.com/repos/hapijs/hapi/contents/API.md",
          options
        );
        let raw = await res.request.response
        let rawSting = await this.$data.display.toString()
        let finalDisplay = await rawSting.replace(/\/>/g, "></a>")
        this.$data.display = await finalDisplay
      } catch (err) {
        console.log(err);
      }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
</style>