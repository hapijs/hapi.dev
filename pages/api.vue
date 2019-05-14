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
      display: ""
    }
  },
  async created() {
      const options = {
        headers: {
          accept: "application/vnd.github.3.html"
        }
      };

      try {
        const res = await axios.get(
          "https://api.github.com/repos/hapijs/hapi/contents/API.md",
          options
        );
        this.$data.display = await res.data;
      } catch (err) {
        console.log(err);
      }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
</style>