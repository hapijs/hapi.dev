<template>
  <div ref="nav" class="mobile-nav">
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
            <div
              class="mobile-link"
              title="Tutorials"
              v-on:click="showMenu('tutorials')"
            >
              Tutorials
            </div>
          </li>
          <li class="mobile-links-li">
            <div
              class="mobile-link"
              title="Resources"
              v-on:click="showMenu('resources')"
            >
              Resources
            </div>
          </li>
          <li class="mobile-links-li">
            <div
              class="mobile-link"
              title="Policies"
              href="/policies/coc"
              v-on:click="showMenu('policies')"
            >
              Policies
            </div>
          </li>
          <li class="mobile-links-li">
            <div
              class="mobile-link"
              title="Family"
              href="/module"
              v-on:click="showMenu('modules')"
            >
              Modules
            </div>
          </li>
          <li class="mobile-links-li">
            <a class="mobile-link" title="Plugins" href="/plugins">Plugins</a>
          </li>
          <li class="mobile-links-li">
            <a
              class="mobile-link"
              title="Shop"
              href="https://hapi.threadless.com"
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
        <div class="mobile-nav-right-content">
          <div class="hide" id="mobile-tutorials">
            <h5 class="mobile-content-header">Tutorials</h5>
            <ul class="mobile-content-ul">
              <li class="mobile-link mobile-tutorial-link">
                <a
                  title="Tutorials"
                  href="/tutorials/gettingstarted/?lang=en_US"
                  >Getting Started</a
                >
              </li>
              <li class="mobile-link mobile-tutorial-link">
                <a
                  title="ExpressToHapi"
                  href="/tutorials/expresstohapi/?lang=en_US"
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
                <a title="Tutorials" href="/tutorials/views/?lang=en_US"
                  >Views</a
                >
              </li>
            </ul>
          </div>
          <div class="hide" id="mobile-resources">
            <h5 class="mobile-content-header">Resources</h5>
            <ul class="mobile-content-ul">
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
          </div>
          <div class="hide" id="mobile-policies">
            <h5 class="mobile-content-header">Policies</h5>
            <ul class="mobile-content-ul">
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
                <a title="Style Guide" href="/policies/styleguide"
                  >Style Guide</a
                >
              </li>
              <li class="mobile-link mobile-tutorial-link">
                <a title="Support" href="/policies/support">Support</a>
              </li>
            </ul>
          </div>
          <div class="hide" id="mobile-modules">
            <h5 class="mobile-content-header">Modules</h5>
            <ul class="module-ul mobile-content-ul">
              <li
                v-for="name in getModules"
                v-bind:key="name"
                :name="name"
                class="mobile-link mobile-tutorial-link mobile-module-link"
                :title="name"
              >
                <div
                  :href="'/family/' + name"
                  class="mobile-family-link mobile-family-plus"
                  :id="name + '-wrapper'"
                  v-on:click="triggerMenu(name)"
                >
                  {{ name }}
                </div>
                <ul class="mobile-subul" :id="name + '2'">
                  <li class="mobile-sublink">
                    <a :href="'/module/' + name">Home</a>
                  </li>
                  <li v-if="name === 'joi'" class="mobile-sublink">
                    <a href="/module/joi/tester">Schema Tester</a>
                  </li>
                  <li v-if="name === 'bell'" class="mobile-sublink">
                    <a href="/module/bell/providers">Providers</a>
                  </li>
                  <li v-if="name === 'bell'" class="mobile-sublink">
                    <a href="/module/bell/examples">Examples</a>
                  </li>
                  <li
                    class="mobile-sublink"
                    v-if="moduleInfo[name].api === true"
                  >
                    <a :href="'/module/' + name + '/api'">API</a>
                  </li>
                  <li class="mobile-sublink">
                    <a :href="'/module/' + name + '/changelog'">Changelog</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const tutorial = require("../../static/lib/tutorials/");
const page = require("../../static/lib/");
const moduleInfo = require("../../static/lib/moduleInfo.json");

export default {
  data() {
    return {
      moduleInfo: moduleInfo
    };
  },
  methods: {
    closeNav() {
      this.$refs.nav.parentNode.classList.remove("show-nav");
      let overlay = document.querySelector(".mobile-overlay");
      overlay.classList.remove("show-nav");
      let body = document.body;
      body.classList.remove("no-scroll");
    },
    triggerMenu(name) {
      let wrapper = document.querySelector("#" + name + "-wrapper");
      if (wrapper.classList.contains("mobile-family-plus")) {
        document.querySelector("#" + name + 2).classList.add("nav-display");
        wrapper.classList.add("mobile-family-minus");
        wrapper.classList.remove("mobile-family-plus");
      } else {
        document.querySelector("#" + name + 2).classList.remove("nav-display");
        wrapper.classList.remove("mobile-family-minus");
        wrapper.classList.add("mobile-family-plus");
      }
    },
    showMenu(name) {
      let visible = document.querySelector(".visible");
      if (visible) {
        visible.classList.remove("visible");
        visible.classList.add("hide");
      }
      let menu = document.querySelector("#mobile-" + name);
      menu.classList.add("visible");
      menu.classList.remove("hide");
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
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/markdown.scss";

.mobile-nav {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 50px);
  z-index: 20;
  background: $off-white;
}

.mobile-hapi {
  height: 50px;
  margin: 0;
}

.mobile-nav-flex-wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  min-height: calc(100vh - 50px);
}

.mobile-nav-flex-left {
  position: sticky;
  top: 0;
  width: 30%;
  align-self: flex-start;
  height: auto;
  overflow-y: auto;
  padding-bottom: 100px;
}

.mobile-nav-flex-right {
  position: relative;
  width: 70%;
  overflow-y: auto;
  padding: 0 0 50px;
  border-left: 1px solid $dark-white;
  background: white;
}

.mobile-nav-flex-right-background {
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 0 auto;
  height: 100%;
  width: 200px;
  opacity: 0.1;
  background-image: url("../../static/img/helmet.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.mobile-nav-right-content {
  position: absolute;
  top: 0;
}

.mobile-content-header {
  font-size: 18px;
  font-weight: 700;
  color: $black;
  margin: 21px 0 0 0;
  padding-left: 10px;
  border-bottom: 1px solid $dark-white;
}

.mobile-content-ul {
  margin-top: 0;
  display: flex;
  flex-direction: column;
}

.mobile-family-link:after {
  content: "\002B";
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 20px;
  top: 9px;
  bottom: 0;
  left: 0;
  height: 31px;
  width: 15px;
  z-index: 100;
}

.mobile-family-minus:after {
  content: "\2212";
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 20px;
  top: 9px;
  bottom: 0;
  left: 0;
  height: 31px;
  width: 15px;
  z-index: 100;
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
  text-align: center;
  border-bottom: 1px solid $dark-white;
}

.mobile-link {
  position: relative;
  display: inline;
  color: $orange;
  font-size: 16px;
  font-weight: 700;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 10px 20px;
  margin: 0;
  text-decoration: none;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
}

.mobile-tutorial-link {
  font-size: 16px;
  list-style-type: none;
}

.module-ul {
  margin: 0 0 0 20px;
}

.mobile-subul {
  display: none;
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
