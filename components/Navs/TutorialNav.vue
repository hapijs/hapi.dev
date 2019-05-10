<template>
  <div class="side-nav-window">
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
        <li class="side-nav-select-link side-nav-active">Getting Started</li>
        <li class="side-nav-select-link">Authentication</li>
        <li class="side-nav-select-link">Caching</li>
        <li class="side-nav-select-link">Cookies</li>
        <li class="side-nav-select-link">Logging</li>
        <li class="side-nav-select-link">Plugins</li>
        <li class="side-nav-select-link">Routing</li>
        <li class="side-nav-select-link">Server Methods</li>
        <li class="side-nav-select-link">Serving Static Content</li>
        <li class="side-nav-select-link">Testing</li>
        <li class="side-nav-select-link">Validation</li>
        <li class="side-nav-select-link">Views</li>
      </ul>
    </div>
    <SideFooter />
  </div>
</template>

<script>
import SideFooter from "~/components/Footers/SideFooter.vue"

export default {
  
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
  font-size: .9em;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(/down.png) 96% / 15% no-repeat #f8f8f8;
  cursor: pointer;
}

</style>
