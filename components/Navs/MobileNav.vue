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
        <a
          class="mobile-link"
          title="Tutorials"
          v-on:click="loadTutorial('gettingStarted')"
        >Tutorials</a>
        <ul>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Getting Started"
            v-on:click="loadTutorial('gettingStarted')"
          >Getting Started</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Getting Started"
            v-on:click="loadTutorial('auth')"
          >Authentication</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Getting Started"
            v-on:click="loadTutorial('caching')"
          >Caching</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Getting Started"
            v-on:click="loadTutorial('cookies')"
          >Cookies</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Getting Started"
            v-on:click="loadTutorial('logging')"
          >Logging</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Getting Started"
            v-on:click="loadTutorial('plugins')"
          >Plugins</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Getting Started"
            v-on:click="loadTutorial('routing')"
          >Routing</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Getting Started"
            v-on:click="loadTutorial('serverMethods')"
          >Server Methods</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Serving Files"
            append
            v-on:click="loadTutorial('servingFiles')"
          >Serving Static Files</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Getting Started"
            v-on:click="loadTutorial('testing')"
          >Testing</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Getting Started"
            v-on:click="loadTutorial('validation')"
          >Validation</li>
          <li
            class="mobile-link mobile-tutorial-link"
            title="Getting Started"
            v-on:click="loadTutorial('views')"
          >Views</li>
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
    async loadTutorial(ref) {
      await this.$store.commit("setPage", tutorial.en_US[ref].default);
      await this.$nuxt.$router.push("tutorials");
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
}

.mobile-nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 10px;
  width: 100%;
  height: 65px;
  border-bottom: 1px solid #ddd;
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
  border-bottom: 1px solid #ddd;
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