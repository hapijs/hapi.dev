<template>
  <div class="container">
    <TutorialNav :tutorial="tutorial" :language="language" @clicked="onClickChild" @changed="onChangeChild"/>
    <div class="tutorial-markdown-window">
      <Tutorial :display="getPage" :language="language"/>
    </div>
  </div>
</template>

<script>
import Tutorial from "~/components/Tutorial.vue";
import TutorialNav from "~/components/Navs/TutorialNav.vue";
const page = require('../static/lib/tutorials/')
export default {
  components: {
    Tutorial,
    TutorialNav
  },
  head() {
    return {
      title: this.tutorial.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
    }
  },
  data() {
    return {
      tutorial: 'gettingStarted',
      language: "en_US",
    }
  },
  computed: {
    getPage() {
      return this.$store.getters.loadPage
    }
  },
  methods: {
    onClickChild(value){
      this.$store.commit('setPage', page[this.language][value.ref].default);
      this.$data.tutorial = value.ref;
      window.scrollTo(0,0);
    },
    onChangeChild(value){
      this.$data.language = value;
      this.$store.commit('setPage', page[value][this.tutorial].default);
      window.scrollTo(0,0);
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";

.tutorial-markdown-window {
  position: relative;
  width: 100%;
  max-width: calc(100vw - 390px);
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0;
}

@media screen and (max-width: 900px){

  .tutorial-markdown-window {
    max-width: 100vw;
  }
}

</style>
