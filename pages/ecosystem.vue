<template>
  <div class="container">
    <EcosystemNav @changePage="onChildChange" :page="getEcosystem"/>
    <div class="tutorial-markdown-window">
      <HTML :display="display"/>
    </div>
  </div>
</template>

<script>
import HTML from "~/components/HTML.vue";
import EcosystemNav from "~/components/ecosystem/EcosystemNav.vue";

export default {
  components: {
    HTML,
    EcosystemNav
  },
  head() {
    return {
      title: "Ecosystem"
    };
  },
  data() {
    return {
      display: ""
    };
  },
  computed: {
    getEcosystem() {
      return this.$store.getters.loadEcosystem;
    }
  },
  methods: {
    async onChildChange(value) {
      this.$data.page = value;
      this.$store.commit("setEcosystem", value);
      this.getAPI();
      window.scrollTo(0, 0);
    },
    async getAPI() {
      const options = {
        headers: {
          accept: "application/vnd.github.v3.html+json",
          authorization: "token " + process.env.GITHUB_TOKEN
        }
      };

      let api = await this.$axios.$get(
        "https://api.github.com/repos/hapijs/" + this.getEcosystem + "/contents/API.md",
        options
      );
      let apiString = await api.toString();
      let finalDisplay = await apiString
          .replace(/user-content-/g, "")
      this.$data.display = await finalDisplay;
    }
  },
  created() {
    this.getAPI();
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
</style>