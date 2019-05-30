<template>
  <div class="container">
    <EcosystemNav @changePage="onChildChange" :page="getEcosystem"/>
    <div class="tutorial-markdown-window">
      <h1 class="ecosystem-title">{{getEcosystem.charAt(0).toUpperCase() + getEcosystem.slice(1)}}</h1>
      <HTML :display="getDisplay"/>
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
      title: "hapi.js - " + this.$store.getters.loadEcosystem
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
    },
    getDisplay() {
      this.$data.display = this.moduleAPI[this.$store.getters.loadEcosystem];
      return this.$data.display;
    }
  },
  methods: {
    async onChildChange(value) {
      this.$store.commit("setEcosystem", value);
      this.$data.display = this.moduleAPI[value];
      window.scrollTo(0, 0);
    }
  },
  async asyncData({ params, $axios }) {
    const options = {
      headers: {
        accept: "application/vnd.github.v3.html+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };
    const modules = [
      "bell",
      "boom",
      "good",
      "hoek",
      "iron",
      "joi",
      "shot",
      "topo",
      "yar"
    ];
    let moduleAPI = {};

    for (let module of modules) {
      let api = await $axios.$get(
        "https://api.github.com/repos/hapijs/" + module + "/contents/API.md",
        options
      );
      let apiString = await api.toString();
      let finalDisplay = await apiString.replace(/user-content-/g, "");
      moduleAPI[module] = await finalDisplay;
    }
    return { moduleAPI };
  },
  created() {
    this.$data.display = this.moduleAPI.bell;
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";

.ecosystem-title {
  margin: 20px 0 -16px 100px;
  padding-bottom: 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  display: inline-block;
}

@media screen and (max-width: 900px) {
  .ecosystem-title {
    margin: 20px 0 0 0;
    padding-bottom: 16px;
  }
}
</style>