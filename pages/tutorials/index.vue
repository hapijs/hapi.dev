<template>
  <div class="container">
    <TutorialNav
      :language="language"
      @changed="onChangeChild"
    />
    <div class="tutorial-markdown-window">
      <Tutorial :display="getPage" :language="language"/>
    </div>
  </div>
</template>

<script>
import Tutorial from "../../components/tutorials/Tutorial.vue";
import TutorialNav from "../../components/tutorials/TutorialNav.vue";
const page = require("../../static/lib/tutorials/");
export default {
  components: {
    Tutorial,
    TutorialNav
  },
  head() {
    return {
      title:
        "hapi.js - Getting Started"
    };
  },
  data() {
    return {
      language: this.getLanguage
    };
  },
  computed: {
    getPage() {
      // /<ul>([^;]*)<\/ul>/
      return this.$store.getters.loadPage;
    },
    getLanguage() {
      return this.$store.getters.loadLanguage
    }
  },
  methods: {
    onChangeChild(value) {
      this.$store.commit("setLanguage", value)
      this.$store.commit("setPage", page[value].gettingStarted.default);
      window.scrollTo(0, 0);
    }
  },
  created() {
    this.$store.commit("setDisplay", "tutorials");
    this.$store.commit("setLanguage", this.$route.query.lang)
    this.$store.commit("setPage", page.en_US.gettingStarted.default);
    
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/api.scss";
</style>
