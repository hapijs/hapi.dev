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
import TutorialNav from "~/components/TutorialNav.vue";
export default {
  components: {
    Tutorial,
    TutorialNav
  }
};
</script>

<style lang="scss">
.spacer {
  width: 100%;
  height: 96px;
}

.container {
  position: relative;
  width: 100%;
  max-width: 1260px;
  margin: 96px auto 0 auto;
  display: flex;
  justify-content: space-between;
}

.tutorial-markdown-window {
  position: relative;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0;
}
</style>
