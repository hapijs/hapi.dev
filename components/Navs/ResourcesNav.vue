<template>
  <div class="side-nav-window">
    <div class="side-nav-title">Resources</div>
    <div class="side-nav-select-wrapper">
      <ul class="side-nav-select-list">
        <li class="side-nav-select-link"><a href="/resources/#books">Books</a></li>
        <li class="side-nav-select-link"><a href="/resources/#gists">Gists and code samples</a></li>
        <li class="side-nav-select-link"><a href="/resources/#boilerplates">Boilerplates</a></li>
        <li class="side-nav-select-link"><a href="/resources/#projects">Projects built with hapi</a></li>
        <li class="side-nav-select-link"><a href="/resources/#tutorials">Tutorials</a></li>
        <li class="side-nav-select-link"><a href="/resources/#videos">Videos</a></li>
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