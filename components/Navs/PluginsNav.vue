<template>
  <div class="side-nav-window">
    <div class="side-nav-title">Plugins</div>
    <div class="side-nav-select-wrapper">
      <ul class="side-nav-select-list">
        <li class="side-nav-select-link"><a href="/plugins/#authorization">Authorization</a></li></li>
        <li class="side-nav-select-link"><a href="/plugins/#authentication">Authentication</a></li>
        <li class="side-nav-select-link"><a href="/plugins/#documentation">Documentation</a></li>
        <li class="side-nav-select-link"><a href="/plugins/#encoding">Encoding</a></li>
        <li class="side-nav-select-link"><a href="/plugins/#hypermedia">Hypermedia</a></li>
        <li class="side-nav-select-link"><a href="/plugins/#localization">Localization/Internationalization</a></li>
        <li class="side-nav-select-link"><a href="/plugins/#logging">Logging/Metrics</a></li>
        <li class="side-nav-select-link"><a href="/plugins/#messaging">Messaging</a></li>
        <li class="side-nav-select-link"><a href="/plugins/#security">Security</a></li>
        <li class="side-nav-select-link"><a href="/plugins/#session">Session</a></li>
        <li class="side-nav-select-link"><a href="/plugins/#templating">Templating</a></li>
        <li class="side-nav-select-link"><a href="/plugins/#utility">Utility</a></li>
        <li class="side-nav-select-link"><a href="/plugins/#validation">Validation</a></li>
        <li class="side-nav-select-link"><a href="/plugins/#universe">The extended hapi universe</a></li>
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