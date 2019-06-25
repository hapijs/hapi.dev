<template>
  <div class="contain">
    <Nav/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
import Nav from "~/components/Navs/Nav.vue";
import Footer from "~/components/Footers/Footer.vue";

export default {
  components: {
    Nav,
    Footer
  }
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";

html {
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  height: auto;
}

.logo {
  background: url("/img/hapi.svg") no-repeat 0 0;
  background-size: contain;
  height: 75px;
  width: 100px;
  margin: 0;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0 auto;
}

.navbar {
  position: fixed !important;
  top: 0;
  margin: 0 auto;
  border-bottom: 1px solid $dark-white;
}

.contain {
  position: relative;
  margin: 96px auto 0 auto;
  min-height: calc(100vh - 136px);
  padding: 10px 0 100px 0;
}

@media screen and (max-width: 900px) {
  .contain {
    margin: 60px auto 0 auto;
    min-height: calc(100vh - 80px);
  }

  .logo {
    height: 50px;
    width: calc(100px * (2 / 3));
    margin: 0 auto;
  }
}
</style>