<template>
  <div class="error">
    <Nav/>
    <div class="error-container">
        <h1>404!</h1>
        <h2>Page not found</h2>
        <nuxt-link to="/">Back to home page</nuxt-link>
    </div>
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
  },
  head() {
    return {
      title: "hapi.js - Error!"
    };
  },
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";

.error {
  position: relative;
  margin: 0 auto;
  min-height: calc(100vh - 15px);
  padding-top: 90px;
}

.error-container {
  margin: 50px auto 0 auto;
  width: 100%;
  max-width: 730px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: $black;
  font-size: 1.3em;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
  max-width: 735px;
  background-color: #fff !important;
  padding: 0 20px !important;
}

.logo {
  background: url("/img/hapi.svg") no-repeat 0 0;
  background-size: contain;
  height: 112.5px;
  width: 150px;
  margin: 0;
}

@media screen and (max-width: 900px) {

  .logo {
    height: 50px;
    width: calc(100px * (2 / 3));
    margin: 0 auto;
  }
}
</style>