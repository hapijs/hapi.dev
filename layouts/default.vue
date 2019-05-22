<template>
  <div class="contain">
    <Nav />
    <nuxt />
  </div>
</template>

<script>
import Nav from "~/components/Navs/Nav.vue"

export default {
  components: {
    Nav
  }
}
</script>

<style lang="scss">
@import "../assets/styles/main.scss";

html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0 auto;
}

.contain {
  position: relative;
  margin: 0 auto;
  min-height: calc(100vh - 116px);
  width: 100%;
}

.navbar {
  position: fixed !important;
  top: 0;
  margin: 0 auto;
  border-bottom: 1px solid #ddd;
}

</style>
