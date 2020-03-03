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
import CopyCodeSnippetMixin from '~/mixins/CopyCodeSnippet';

export default {
  components: {
    Nav,
    Footer
  },
  mixins: [
    CopyCodeSnippetMixin
  ],
};
</script>

<style lang="scss">

html {
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
  min-height: calc(100vh - 50px);
  padding-bottom: 50px;
}

.logo {
  background: url("/img/hapi.svg") no-repeat 0 0;
  background-size: contain;
  height: 150px !important;
  width: 200px !important;
  margin: 0;
}

@media screen and (max-width: 900px) {
  .contain {
    min-height: calc(100vh - 80px);
    padding-bottom: 100px;
  }

  .navbar {
    position: fixed !important;
    top: 0;
  }

  .logo {
    height: 50px !important;
    width: calc(100px * (2 / 3)) !important;
    margin: 0 auto;
  }
}
</style>
