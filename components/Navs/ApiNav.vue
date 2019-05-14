<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">API</div>
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <li class="side-nav-select-link">API</li>
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
  components: {
    SideFooter
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";
</style>