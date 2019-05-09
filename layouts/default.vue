<template>
  <div class="contain">
    <Nav />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Nav from "~/components/Nav.vue"
import Footer from "~/components/Footer.vue"

export default {
  components: {
    Nav,
    Footer
  }
}
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700");

html {
  font-family: "Open Sans", sans-serif;
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
  min-height: 100%;
  padding-bottom: 100px;
}
</style>
