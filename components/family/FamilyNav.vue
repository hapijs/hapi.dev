<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Family</div>
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <FamilyNavItem
              v-for="name in modules"
              v-bind:key="name"
              :name="name"
              :menu="menu"
              :active="moduleAPI"
              :page="page"
              :version="version"
              :versions="versions"
            />
          </ul>
        </div>
      </div>
      <SideFooter/>
    </div>
  </div>
</template>

<script>
import SideFooter from "~/components/Footers/SideFooter.vue";
import FamilyNavItem from "./FamilyNavItem.vue";

export default {
  components: {
    SideFooter,
    FamilyNavItem
  },
  props: ["page", "moduleAPI", "modules", "version", "versions", "menu"],
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";
</style>