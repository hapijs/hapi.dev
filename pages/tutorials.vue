<template>
  <div class="container">
    <TutorialNav/>
    <div class="tutorial-markdown-window">
      <Tutorial/>
    </div>
  </div>
</template>

<script>
import Tutorial from "~/components/Tutorial.vue";
import TutorialNav from "~/components/Navs/TutorialNav.vue";
export default {
  components: {
    Tutorial,
    TutorialNav
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";

.tutorial-markdown-window {
  position: relative;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0;
}
</style>
