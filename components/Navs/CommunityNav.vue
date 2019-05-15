<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Community</div>
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <li class="side-nav-select-link">Updates</li>
            <li class="side-nav-select-link">Contributing</li>
            <li class="side-nav-select-link">Style Guide</li>
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