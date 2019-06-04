<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Ecosystem</div>
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <EcosystemNavItem
              v-for="name in modules"
              v-bind:key="name"
              :name="name"
              :menu="moduleAPI[name].menu"
              :page="page"
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
import EcosystemNavItem from "./EcosystemNavItem.vue";

export default {
  components: {
    SideFooter,
    EcosystemNavItem
  },
  props: ["page", "moduleAPI", "modules"]
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";
</style>