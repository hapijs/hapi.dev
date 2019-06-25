<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Tutorials</div>
        <div class="lang-wrapper">
          <div class="lang-text">Languages:</div>
          <select @change="onChange($event)" :value="getLanguage" class="tutorial-lang-select">
            <option value="en_US">en-US</option>
            <option value="pt_BR">pt-BR</option>
            <option value="ko_KR">ko-KR</option>
            <option value="tr_TR">tr-TR</option>
            <option value="zh_CN">zh-CN</option>
          </select>
        </div>
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <li
              :class="$route.params.tutorial === 'gettingStarted' || !$route.params.tutorial ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            >
              <a
                ref="gettingStarted"
                :href="'/tutorials/gettingStarted/?lang=' + getLanguage"
              >Getting Started</a>
            </li>
            <li
              :class="$route.params.tutorial === 'expressToHapi' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            >
              <a
                ref="expressToHapi"
                :href="'/tutorials/expressToHapi/?lang=' + getLanguage"
              >Express Migration</a>
            </li>
            <li
              :class="$route.params.tutorial === 'auth' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            >
              <a ref="auth" :href="'/tutorials/auth/?lang=' + getLanguage">Authentication</a>
            </li>
            <li
              :class="$route.params.tutorial === 'caching' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            >
              <a ref="caching" :href="'/tutorials/caching/?lang=' + getLanguage">Caching</a>
            </li>
            <li
              :class="$route.params.tutorial === 'cookies' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            >
              <a ref="cookies" :href="'/tutorials/cookies/?lang=' + getLanguage">Cookies</a>
            </li>
            <li
              :class="$route.params.tutorial === 'logging' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            >
              <a ref="logging" :href="'/tutorials/logging/?lang=' + getLanguage">Logging</a>
            </li>
            <li
              :class="$route.params.tutorial === 'plugins' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            >
              <a ref="plugins" :href="'/tutorials/plugins/?lang=' + getLanguage">Plugins</a>
            </li>
            <li
              :class="$route.params.tutorial === 'routing' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            >
              <a ref="routing" :href="'/tutorials/routing/?lang=' + getLanguage">Routing</a>
            </li>
            <li
              :class="$route.params.tutorial === 'serverMethods' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            >
              <a
                ref="serverMethods"
                :href="'/tutorials/serverMethods/?lang=' + getLanguage"
              >Server Methods</a>
            </li>
            <li
              :class="$route.params.tutorial === 'servingFiles' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            >
              <a
                ref="servingFiles"
                :href="'/tutorials/servingFiles/?lang=' + getLanguage"
              >Serving Static Files</a>
            </li>
            <li
              :class="$route.params.tutorial === 'testing' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            >
              <a ref="testing" :href="'/tutorials/testing/?lang=' + getLanguage">Testing</a>
            </li>
            <li
              :class="$route.params.tutorial === 'validation' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            >
              <a ref="validation" :href="'/tutorials/validation/?lang=' + getLanguage">Validation</a>
            </li>
            <li
              :class="$route.params.tutorial === 'views' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            >
              <a ref="views" :href="'/tutorials/views/?lang=' + getLanguage">Views</a>
            </li>
          </ul>
        </div>
      </div>
      <SideFooter/>
    </div>
  </div>
</template>

<script>
import SideFooter from "~/components/Footers/SideFooter.vue";
const page = require("../../static/lib/tutorials/");

export default {
  props: ["language"],
  computed: {
    getLanguage() {
      return this.$store.getters.loadLanguage;
    }
  },
  methods: {
    onChange(event) {
      this.$emit("changed", event.target.value);
    }
  },
  components: {
    SideFooter
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";
</style>
