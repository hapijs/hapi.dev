<template>
  <div ref="nav" class="mobile-nav">
    <div class="mobile-nav-header">
      <img src="/img/hapi.svg" class="mobile-hapi" alt="hapi-logo" />
      <img
        src="/img/close.png"
        class="mobile-close"
        alt="close"
        v-on:click="closeNav()"
      />
    </div>
    <div class="mobile-nav-flex-wrapper">
      <div class="mobile-nav-flex-left">
        <ul class="mobile-links">
          <li class="mobile-links-li">
            <a class="mobile-link" title="Home" href="/">Home</a>
          </li>
          <li class="mobile-links-li">
            <a class="mobile-link" title="API" href="/api">API</a>
          </li>
          <li class="mobile-links-li">
            <a class="mobile-link" title="Tutorials" href="/tutorials/?lang=en_US"
              >Tutorials</a
            >
          </li>
          <li class="mobile-links-li">
            <a class="mobile-link" title="Resources" href="/resources/changelog"
              >Resources</a
            >
          </li>
          <li class="mobile-links-li">
            <a class="mobile-link" title="Policies" href="/policies/coc"
              >Policies</a
            >
          </li>
          <li class="mobile-links-li">
            <a class="mobile-link" title="Family" href="/family">Modules</a>
          </li>
          <li class="mobile-links-li">
            <a class="mobile-link" title="Plugins" href="/plugins">Plugins</a>
          </li>
          <li class="mobile-links-li">
            <a class="mobile-link" title="Shop" href="https://hapi.threadless.com"
              >Shop</a
            >
          </li>
          <li class="mobile-links-li">
            <a class="mobile-link" title="Support" href="/support">Support</a>
          </li>
        </ul>
      </div>
      <div class="mobile-nav-flex-right">
        <div class="mobile-nav-flex-right-background"></div>
      </div>
    </div>
  </div>
</template>

<script>
const tutorial = require("../../static/lib/tutorials/");
const page = require("../../static/lib/");

export default {
  methods: {
    closeNav() {
      this.$refs.nav.parentNode.classList.remove("show-nav");
      // this.$refs.overlay.classList.remove("show-nav");
      let overlay = document.querySelector(".mobile-overlay");
      overlay.classList.remove("show-nav");
      let body = document.body;
      body.classList.remove("no-scroll");
    }
  },
  computed: {
    getModules() {
      return this.$store.getters.loadModules;
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/markdown.scss";

.mobile-nav {
  position: relative;
  width: 100%;
  height: auto;
  z-index: 20;
  background: $off-white;
  border-right: 1px solid $dark-white;
  padding: 5px 0 5px 0;
}

.mobile-nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 10px;
  width: 100%;
  height: 65px;
  border-bottom: 1px solid $dark-white;
}

.mobile-hapi {
  height: 50px;
  margin: 0;
}

.mobile-close {
  width: 15px;
  height: 15px;
  cursor: pointer;
  margin: 0;
}

.mobile-nav-flex-wrapper {
  position: relative;
  display: flex;
  min-height: calc(100vh - 65px);
}

.mobile-nav-flex-left {
  width: 30%;
  border-right: 2px solid $dark-white;
}

.mobile-nav-flex-right {
  position: relative;
  width: 70%;
}

.mobile-nav-flex-right-background {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 0 auto;
  height: 100%;
  width: 200px;
  opacity: 0.2;
  background-image: url("../../static/img/helmet.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.mobile-links {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: block;
}

.mobile-links-li {
  display: block;
  padding: 10px 0;
  padding-right: 0px !important;
  margin: 0;
  border-bottom: 1px solid $dark-white;
}

.mobile-link {
  position: relative;
  color: $orange;
  font-size: 16px;
  font-weight: 400;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 10px 20px;
  margin: 0;
  text-decoration: none;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
}

.mobile-tutorial-link {
  font-size: 14px;
  list-style-type: none;
}

.module-ul {
  margin: 0 0 0 20px;
}

.mobile-subul {
  margin: 0 0 5px 5px;
}

.mobile-sublink {
  position: relative;
  color: $orange;
  font-weight: 400;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 5px 5px 0 5px;
  margin: 0;
  text-decoration: none;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
  font-size: 14px;
  list-style-type: none;
}

.mobile-module-link {
  padding-bottom: 0;
}

.mobile-helmet {
  display: block;
  width: 35px;
  margin: 17.5px auto 17.5px auto;
}
</style>
