<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Community</div>
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <li
              class="side-nav-select-link side-nav-active"
              ref="updates"
              v-on:click="onChangePage('updates')"
            >Updates</li>
            <li
              class="side-nav-select-link"
              ref="contribute"
              v-on:click="onChangePage('contribute')"
            >Contributing</li>
            <li
              class="side-nav-select-link"
              ref="style"
              v-on:click="onChangePage('style')"
            >Style Guide</li>
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