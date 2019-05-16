<template>
  <div class="container">
    <ApiNav />
    <div class="tutorial-markdown-window">
      <Markdown :display="display"/>
    </div>
  </div>
</template>

<script>
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
          authorization: `token e03d716892d09ba2cfc48c10d599726f2e19b22a`
        }
      };

      try {
        const res = await this.$axios.$get(
          "https://api.github.com/repos/hapijs/hapi/contents/API.md",
          options
        );
        let raw = await res
        let rawString = await raw.toString()
        let finalDisplay = await rawString.replace(/\/>/g, "></a>")
        let finalMenu = await rawString.match(/->([\S\s]*?)<!/).pop();
        await console.log(finalMenu);
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