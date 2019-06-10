<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Community</div>
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <li
              :class="page === 'contribute' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            ><a href="/community/contributing">Contributing</a></li>
            <li
              :class="page === 'updates' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            ><a href="/community/updates">Updates</a></li>
            <li
              :class="page === 'changelog' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            ><a href="/community/changelog">Changelog</a></li>
            <li
              :class="page === 'styleGuide' ? 'side-nav-select-link side-nav-active' : 'side-nav-select-link'"
            ><a href="/community/styleguide">Style Guide</a></li>
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
  },
  props: ["page"],
  methods: {
    onChangePage(ref) {
      this.$refs[this.page].classList.remove("side-nav-active");
      this.$refs[ref].classList.add("side-nav-active");
      this.$emit("changePage", ref);
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";
</style>