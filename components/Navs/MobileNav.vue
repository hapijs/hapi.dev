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
        <ul>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/gettingstarted/?lang=en_US"
              >Getting Started</a
            >
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="ExpressToHapi" href="/tutorials/expresstohapi/?lang=en_US"
              >Express Migration</a
            >
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/auth/?lang=en_US"
              >Authentication</a
            >
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/caching/?lang=en_US"
              >Caching</a
            >
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/cookies/?lang=en_US"
              >Cookies</a
            >
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/logging/?lang=en_US"
              >Logging</a
            >
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/plugins/?lang=en_US"
              >Plugins</a
            >
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/routing/?lang=en_US"
              >Routing</a
            >
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/servermethods/?lang=en_US"
              >Server Methods</a
            >
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/servingfiles/?lang=en_US"
              >Serving Static Files</a
            >
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/testing/?lang=en_US"
              >Testing</a
            >
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/validation/?lang=en_US"
              >Validation</a
            >
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/views/?lang=en_US">Views</a>
          </li>
        </ul>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Resources" href="/resources/changelog"
          >Resources</a
        >
        <ul>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Changelog" href="/resources/changelog">Changelog</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Changelog" href="/resources/status">Module Status</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="List" href="/resources/list">List</a>
          </li>
        </ul>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Policies" href="/policies/coc"
          >Policies</a
        >
        <ul>
          <li class="mobile-link mobile-tutorial-link">
            <a title="COC" href="/policies/coc">Code of Conduct</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="COC" href="/policies/contributing">Contributing</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="COC" href="/policies/license">License</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Security" href="/policies/security">Security</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Style Guide" href="/policies/styleguide">Style Guide</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Support" href="/policies/support">Support</a>
          </li>
        </ul>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Family" href="/family">Modules</a>
        <ul class="module-ul">
          <li
            v-for="name in getModules"
            v-bind:key="name"
            :name="name"
            class="mobile-link mobile-tutorial-link mobile-module-link"
            :title="name"
          >
            <a :href="'/family/' + name">{{ name }}</a>
            <ul class="mobile-subul">
              <li v-if="name === 'joi'" class="mobile-sublink">
                <a href="/family/joi/tester">Schema Tester</a>
              </li>
              <li class="mobile-sublink">
                <a :href="'/family/' + name + '/api'">API</a>
              </li>
              <li class="mobile-sublink">
                <a :href="'/family/' + name + '/changelog'">Changelog</a>
              </li>
            </ul>
          </li>
        </ul>
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
    <img
      class="mobile-helmet"
      src="../../static/img/helmet.png"
      alt="hapi-helmet"
    />
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
