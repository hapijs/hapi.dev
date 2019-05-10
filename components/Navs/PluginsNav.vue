<template>
  <div class="side-nav-window">
    <div class="side-nav-title">Plugins</div>
    <div class="side-nav-select-wrapper">
      <ul class="side-nav-select-list">
        <li class="side-nav-select-link"><a href="#authorization">Authorization</a></li></li>
        <li class="side-nav-select-link"><a href="#authentication">Authentication</a></li>
        <li class="side-nav-select-link"><a href="#documentation">Documentation</a></li>
        <li class="side-nav-select-link"><a href="#encoding">Encoding</a></li>
        <li class="side-nav-select-link"><a href="#hypermedia">Hypermedia</a></li>
        <li class="side-nav-select-link"><a href="#localization">Localization/Internationalization</a></li>
        <li class="side-nav-select-link"><a href="#logging">Logging/Metrics</a></li>
        <li class="side-nav-select-link"><a href="#messaging">Messaging</a></li>
        <li class="side-nav-select-link"><a href="#security">Security</a></li>
        <li class="side-nav-select-link"><a href="#session">Session</a></li>
        <li class="side-nav-select-link"><a href="#templating">Templating</a></li>
        <li class="side-nav-select-link"><a href="#utility">Utility</a></li>
        <li class="side-nav-select-link"><a href="#validation">Validation</a></li>
        <li class="side-nav-select-link"><a href="#universe">The extended hapi universe</a></li>
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

</style>