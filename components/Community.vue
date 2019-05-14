<template>
  <div>
      <StyleGuide />
  </div>
</template>

<script>
import axios from 'axios';
import StyleGuide from './StyleGuide.vue'

export default {
    components: {
        StyleGuide
    },
   props: ["page"],
   data() {
       page: ""
   }
};

</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/markdown.scss";

</style>