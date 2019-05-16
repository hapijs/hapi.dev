<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Community</div>
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <li class="side-nav-select-link" v-on:click="onChangePage('updates')">Updates</li>
            <li class="side-nav-select-link" v-on:click="onChangePage('contribute')">Contributing</li>
            <li class="side-nav-select-link" v-on:click="onChangePage('style')">Style Guide</li>
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
  methods: {
    onChangePage(ref) {
      this.$emit('changePage', ref);
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";
</style>