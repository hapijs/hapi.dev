<template>
  <div class="container">
    <TutorialNav
      :tutorial="tutorial"
      :language="language"
      @clicked="onClickChild"
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
        "hapi.js - " +
        this.tutorial.replace(/([A-Z])/g, " $1").replace(/^./, function(str) {
          return str.toUpperCase();
        })
    };
  },
  data() {
    return {
      tutorial: "gettingStarted",
      language: "en_US"
    };
  },
  computed: {
    getPage() {
      // /<ul>([^;]*)<\/ul>/
      return this.$store.getters.loadPage;
    }
  },
  methods: {
    onClickChild(value) {
      this.$data.tutorial = value.ref;
      window.scrollTo(0, 0);
    },
    onChangeChild(value) {
      this.$data.language = value;
      this.$store.commit("setPage", page[value][this.tutorial].default);
      window.scrollTo(0, 0);
    }
  },
  created() {
    this.$store.commit("setDisplay", "tutorials");

      this.$store.commit(
        "setPage",
        page.en_US.gettingStarted.default)

  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/api.scss";
</style>
