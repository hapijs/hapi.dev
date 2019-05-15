<template>
  <div ref="nav" class="mobile-nav">
    <img src="/img/close.png" class="mobile-close" v-on:click="closeNav()"/>
    <ul class="mobile-links">
      <li class="mobile-links-li mobile-border">
        <a class="mobile-link" title="Home" href="/">Home</a>
      </li>
      <li class="mobile-links-li">
        <div class="mobile-link" title="Tutorials">Tutorials</div>
        <div class="mobile-link mobile-tutorial-link" title="Getting Started" v-on:click="loadTutorial('gettingStarted')" >Getting Started</div>
        <div class="mobile-link mobile-tutorial-link" title="Getting Started" v-on:click="loadTutorial('auth')" >Authentication</div>
        <div class="mobile-link mobile-tutorial-link" title="Getting Started" v-on:click="loadTutorial('caching')" >Caching</div>
        <div class="mobile-link mobile-tutorial-link" title="Getting Started" v-on:click="loadTutorial('cookies')" >Cookies</div>
        <div class="mobile-link mobile-tutorial-link" title="Getting Started" v-on:click="loadTutorial('logging')" >Logging</div>
        <div class="mobile-link mobile-tutorial-link" title="Getting Started" v-on:click="loadTutorial('plugins')" >Plugins</div>
        <div class="mobile-link mobile-tutorial-link" title="Getting Started" v-on:click="loadTutorial('routing')" >Routing</div>
        <div class="mobile-link mobile-tutorial-link" title="Getting Started" v-on:click="loadTutorial('serverMethods')" >Server Methods</div>
        <div class="mobile-link mobile-tutorial-link" title="Serving Files" append v-on:click="loadTutorial('servingFiles')" >Serving Static Files</div>
        <div class="mobile-link mobile-tutorial-link" title="Getting Started" v-on:click="loadTutorial('testing')" >Testing</div>
        <div class="mobile-link mobile-tutorial-link" title="Getting Started" v-on:click="loadTutorial('validation')" >Validation</div>
        <div class="mobile-link mobile-tutorial-link" title="Getting Started" v-on:click="loadTutorial('views')" >Views</div>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="API" href="/api">API</a>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Resources" href="/resources">Resources</a>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Plugins" href="/plugins">Plugins</a>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Contribute" href="/community">Community</a>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Help" href="/help">Help</a>
      </li>
    </ul>
  </div>
</template>

<script>
const tutorial = require('../../static/lib/tutorials/');
const page = require('../../static/lib/')

export default {
  methods: {
    closeNav() {
      this.$refs.nav.parentNode.classList.remove("show-nav");
    },
    async loadTutorial(ref) {
      await this.$store.commit('setPage', tutorial.en_US[ref].default);
      await this.$nuxt.$router.push('tutorials')
      this.closeNav();
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";

.mobile-nav {
  width: 100%;
}

.mobile-close {
  margin: 0 0 20px 20px;
  width: 15px;
  cursor: pointer;
  
}

.mobile-links {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: block;
}

.mobile-links-li {
  display: block;
  padding: 5px 0;
  margin: 0 0 10px 0;
  padding-right: 0px !important;
}

.mobile-border {
  border-bottom: 1px solid #ddd;
}

.mobile-link {
  position: relative;
  margin: 10px;
  color: $orange;
  font-size: 16px;
  font-weight: 400;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 5px 20px;
  text-decoration: none;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
}

.mobile-tutorial-link {
  margin-left: 20px;
  font-size: 14px;
}

</style>