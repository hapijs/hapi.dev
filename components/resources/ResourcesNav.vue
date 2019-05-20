<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Resources</div>
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <li class="side-nav-select-link">
              <a href="#books">Books</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#gists">Gists and code samples</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#boilerplates">Boilerplates</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#projects">Projects built with hapi</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#tutorials">Tutorials</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#videos">Videos</a>
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