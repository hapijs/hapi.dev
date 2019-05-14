<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Community</div>
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <li class="side-nav-select-link">
              <a href="#books">Updates</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#gists">Contributing</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#boilerplates">hapi Style Guide</a>
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

export default {
  components: {
    SideFooter
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";
</style>