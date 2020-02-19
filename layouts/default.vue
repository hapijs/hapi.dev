<template>
  <div class="contain">
    <Nav/>
    <nuxt/>
  </div>
</template>

<script>
import Nav from "~/components/Navs/Nav.vue";
import CopyCodeSnippetMixin from '~/mixins/CopyCodeSnippet';

export default {
  components: {
    Nav
  },
  mixins: [
    CopyCodeSnippetMixin
  ],
};
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
  border-bottom: 1px solid $dark-white;
}

.logo {
  background: url("/img/hapi.svg") no-repeat 0 0;
  background-size: contain;
  height: 75px !important;
  width: 100px !important;
  margin: 0;
}

@media screen and (max-width: 900px) {
  .logo {
    position: relative;
    top: 0;
    height: 50px !important;
    width: calc(100px * (2 / 3)) !important;
    margin: 0 auto;
  }

  .nav-container, .navbar {
    min-height: 39px;
  }
}

@media print {
  .navbar {
    position: relative !important;
  }
}
</style>
