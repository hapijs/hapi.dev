<template>
  <div class="container">
    <TutorialNav />
    <div class="tutorial-markdown-window">
      <Tutorial />
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
}
</script>

<style lang="scss">

.container {
  width: 100%;
  max-width: 1260px;
  margin: 96px auto 0 auto;
  display: flex;
}

</style>
