<template>
  <div ref="nav" class="mobile-nav">
    <div class="mobile-nav-header">
      <img src="/img/hapi.svg" class="mobile-hapi">
      <img src="/img/close.png" class="mobile-close" v-on:click="closeNav()">
    </div>
    <ul class="mobile-links">
      <li class="mobile-links-li">
        <a class="mobile-link" title="Home" href="/">Home</a>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Tutorials" href="/tutorials/?lang=en_US">Tutorials</a>
        <ul>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/gettingStarted/?lang=en_US">Getting Started</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/auth/?lang=en_US">Authentication</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/caching/?lang=en_US">Caching</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/cookies/?lang=en_US">Cookies</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/logging/?lang=en_US">Logging</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/plugins/?lang=en_US">Plugins</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/routing/?lang=en_US">Routing</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/serverMethods/?lang=en_US">Server Methods</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/servingFiles/?lang=en_US">Serving Static Files</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/testing/?lang=en_US">Testing</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/validation/?lang=en_US">Validation</a>
          </li>
          <li class="mobile-link mobile-tutorial-link">
            <a title="Tutorials" href="/tutorials/views/?lang=en_US">Views</a>
          </li>
                    <li class="mobile-link mobile-tutorial-link">
            <a title="ExpressToHapi" href="/tutorials/expressToHapi/?lang=en_US">Express to hapi</a>
          </li>
        </ul>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="API" href="/api">API</a>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Plugins" href="/plugins">Plugins</a>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Resources" href="/resources">Resources</a>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Ecosystem" href="/ecosystem">Ecosystem</a>
        <ul>
          <li
            class="mobile-link mobile-tutorial-link"
            title="bell"
            v-on:click="loadEcosystem('bell')"
          >Bell</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="boom"
            v-on:click="loadEcosystem('boom')"
          >Boom</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="good"
            v-on:click="loadEcosystem('good')"
          >Good</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="hoek"
            v-on:click="loadEcosystem('hoek')"
          >Hoek</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="iron"
            v-on:click="loadEcosystem('iron')"
          >Iron</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="joi"
            v-on:click="loadEcosystem('joi')"
          >Joi</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="shot"
            v-on:click="loadEcosystem('shot')"
          >Shot</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="topo"
            v-on:click="loadEcosystem('topo')"
          >Topo</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="yar"
            v-on:click="loadEcosystem('yar')"
          >Yar</li>
        </ul>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Contribute" href="/community">Community</a>
        <ul>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Contributing"
            v-on:click="loadCommunity('contribute')"
          >Contributing</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Updates"
            v-on:click="loadCommunity('updates')"
          >Updates</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Changelog"
            v-on:click="loadCommunity('changelog')"
          >Changelog</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Contributing"
            v-on:click="loadCommunity('style')"
          >Style Guide</li>
        </ul>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Help" href="/help">Help</a>
      </li>
    </ul>
    <img class="mobile-helmet" src="../../static/img/helmet.png">
  </div>
</template>

<script>
const tutorial = require("../../static/lib/tutorials/");
const page = require("../../static/lib/");

export default {
  methods: {
    closeNav() {
      this.$refs.nav.parentNode.classList.remove("show-nav");
    },
    async loadCommunity(ref) {
      await this.$store.commit("setCommunity", ref);
      await this.$nuxt.$router.push("community");
      window.scrollTo(0, 0);
      this.closeNav();
    },
    async loadEcosystem(ref) {
      await this.$store.commit("setEcosystem", ref);
      await this.$nuxt.$router.push("ecosystem");
      window.scrollTo(0, 0);
      this.closeNav();
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";

.mobile-nav {
  position: relative;
  width: 100%;
  height: auto;
  padding: 5px 0 5px 0;
  border-right: 1px solid $dark-white;
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
  margin-left: 20px;
}

.mobile-helmet {
  display: block;
  width: 25px;
  margin: 30px auto 0 auto;
}
</style>