<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div>
        <div class="side-nav-title">Tutorials</div>
        <div class="tutorial-lang-wrapper">
          <div class="tutorial-lang-text">Languages:</div>
          <select class="tutorial-lang-select">
            <option value="en_US">en_US</option>
            <option value="pt_BR">pt_BR</option>
            <option value="ko_KR">ko_KR</option>
            <option value="tr_TR">en_US</option>
            <option value="zh_CN">zh_CN</option>
          </select>
        </div>
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <li id="gettingStarted" ref="gettingStarted" v-on:click="showDiv('gettingStarted')" class="side-nav-select-link side-nav-active">Getting Started</li>
            <li id="auth" ref="auth" v-on:click="showDiv('auth')" class="side-nav-select-link">Authentication</li>
            <li id="caching" ref="caching" v-on:click="showDiv('caching')" class="side-nav-select-link">Caching</li>
            <li id="cookies" ref="cookies" v-on:click="showDiv('cookies')" class="side-nav-select-link">Cookies</li>
            <li id="logging" ref="logging" v-on:click="showDiv('logging')" class="side-nav-select-link">Logging</li>
            <li id="plugins" ref="plugins" v-on:click="showDiv('plugins')" class="side-nav-select-link">Plugins</li>
            <li id="routing" ref="routing" v-on:click="showDiv('routing')" class="side-nav-select-link">Routing</li>
            <li id="serverMethods" ref="serverMethods" v-on:click="showDiv('serverMethods')" class="side-nav-select-link">Server Methods</li>
            <li id="servingFiles" ref="servingFiles" v-on:click="showDiv('servingFiles')" class="side-nav-select-link">Serving Static Content</li>
            <li id="testing" ref="testing" v-on:click="showDiv('testing')" class="side-nav-select-link">Testing</li>
            <li id="validation" ref="validation" v-on:click="showDiv('validation')" class="side-nav-select-link">Validation</li>
            <li id="views" ref="views" v-on:click="showDiv('views')" class="side-nav-select-link">Views</li>
          </ul>
        </div>
      </div>
      <SideFooter/>
    </div>
  </div>
</template>

<script>
import SideFooter from "~/components/Footers/SideFooter.vue";

export default {
  props: ["tutorial"],
  methods: {
    showDiv(ref) {
      // await this.$refs[this.$props.tutorial].classList.remove('side-nav-active');
      // await this.$refs[ref].classList.add('side-nav-active');
      this.$emit('clicked', ref);
    }
  },
  components: {
    SideFooter
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";

.tutorial-lang-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0 0 0;
  width: 100%;
}

.tutorial-lang-text {
  margin: 0 20px 0 0;
  font-size: 1.1em;
}

select {
  width: 100px;
  padding: 0px 5px 0px 5px;
  border: 1px solid #ddd;
  height: 30px;
  font-size: 0.9em;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(/down.png) 96% / 15% no-repeat #fff;
  cursor: pointer;
}
</style>
