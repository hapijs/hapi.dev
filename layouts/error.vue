<template>
  <div class="error">
    <Nav/>
    <div class="error-container">
      <div class="error-heading">4<span><img class="error-helmet" src="../static/img/helmet.png" alt="hapi-helmet"></span>4</div>
      <div class="error-description-heading">Oh No!</div>
      <div class="error-description">It seems as though that page is not filled with joi today.</div>
      <a
        class="error-button"
        href="/"
        aria-label="home-button"
      >Back to the hapi place</a>
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
      title: "hapi.dev - Error!"
    };
  }
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
  position: relative;
  margin: 0 auto 0 auto;
  padding-top: 30px;
  box-sizing: border-box;
  width: 100%;
  max-width: 730px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: $black;
  font-size: 1.3em;
}

.error-heading {
  position: relative;
  font-size: 5rem;
  color: $gray;
}

.error-description-heading {
  font-size: 1.6rem;
}

.error-description {
  position: relative;
}

.error-helmet {
  width: 70px;
  display: inline-block;
}

.error-button {
  position: relative;
  border-radius: 10px;
  border: none;
  background: $orange;
  padding: 5px 15px;
  font-size: 0.9em;
  font-weight: 700;
  margin: 40px 0;
  color: $white;
  cursor: pointer;
  border: 4px solid rgba(0, 0, 0, 0);
}

.error-button:hover {
  border: 4px solid $orange;
  background: $white;
  color: $orange;
  text-decoration: none;
  transition: all 0.3s ease 0s;
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
  background-color: $white !important;
  padding: 0 20px !important;
}

.footer-link {
  color: $orange;
}

.logo {
  background: url("/img/hapi.svg") no-repeat 0 0;
  background-size: contain;
  height: 112.5px;
  width: 150px;
  margin: 0;
}

@keyframes drop {
  0% {
  }
}

@media screen and (max-width: 900px) {
  .logo {
    height: 50px !important;
    width: calc(100px * (2 / 3)) !important;
    margin: 0 auto;
  }
}
</style>