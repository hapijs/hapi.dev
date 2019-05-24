<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Tutorials</div>
        <div class="lang-wrapper">
          <div class="lang-text">Languages:</div>
          <select @change="onChange($event)" class="tutorial-lang-select">
            <option value="en_US">en_US</option>
            <option value="pt_BR">pt_BR</option>
            <option value="ko_KR">ko_KR</option>
            <option value="tr_TR">tr_TR</option>
            <option value="zh_CN">zh_CN</option>
          </select>
        </div>
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <li
              id="gettingStarted"
              ref="gettingStarted"
              v-on:click="showDiv('gettingStarted')"
              class="side-nav-select-link side-nav-active"
            >Getting Started</li>
            <li
              id="auth"
              ref="auth"
              v-on:click="showDiv('auth')"
              class="side-nav-select-link"
            >Authentication</li>
            <li
              id="caching"
              ref="caching"
              v-on:click="showDiv('caching')"
              class="side-nav-select-link"
            >Caching</li>
            <li
              id="cookies"
              ref="cookies"
              v-on:click="showDiv('cookies')"
              class="side-nav-select-link"
            >Cookies</li>
            <li
              id="logging"
              ref="logging"
              v-on:click="showDiv('logging')"
              class="side-nav-select-link"
            >Logging</li>
            <li
              id="plugins"
              ref="plugins"
              v-on:click="showDiv('plugins')"
              class="side-nav-select-link"
            >Plugins</li>
            <li
              id="routing"
              ref="routing"
              v-on:click="showDiv('routing')"
              class="side-nav-select-link"
            >Routing</li>
            <li
              id="serverMethods"
              ref="serverMethods"
              v-on:click="showDiv('serverMethods')"
              class="side-nav-select-link"
            >Server Methods</li>
            <li
              id="servingFiles"
              ref="servingFiles"
              v-on:click="showDiv('servingFiles')"
              class="side-nav-select-link"
            >Serving Static Content</li>
            <li
              id="testing"
              ref="testing"
              v-on:click="showDiv('testing')"
              class="side-nav-select-link"
            >Testing</li>
            <li
              id="validation"
              ref="validation"
              v-on:click="showDiv('validation')"
              class="side-nav-select-link"
            >Validation</li>
            <li
              id="views"
              ref="views"
              v-on:click="showDiv('views')"
              class="side-nav-select-link"
            >Views</li>
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
  props: ["tutorial", "language"],
  methods: {
    onChange(event) {
      this.$emit("changed", event.target.value);
    },
    showDiv(ref) {
      this.$refs[this.tutorial].classList.remove("side-nav-active");
      this.$refs[ref].classList.add("side-nav-active");
      this.$emit("clicked", { ref: ref });
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
