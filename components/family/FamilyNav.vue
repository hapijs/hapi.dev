<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Family</div>
        <div class="mobile-family-info">
          <div class="mobile-family-title">
            {{title}}
            <span
              class="family-span"
            >
              <select @change="onChange($event)" class="family-version-select">
                <option
                  v-for="version in versions"
                  v-bind:key="version"
                  :value="version"
                >{{version}}</option>
              </select>
            </span>
          </div>
        </div>
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
      <SideFooter />
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
  data() {
    return {
      title: !this.$route.params.family
        ? "Bell"
        : this.$route.params.family.charAt(0).toUpperCase(0) +
          this.$route.params.family.slice(1)
    };
  },
  props: ["page", "moduleAPI", "modules", "version", "versions", "menu"]
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";

.mobile-family-info {
  display: none
}

@media screen and (max-width: 900px) {

.mobile-family-info {
  display: block;
  margin: 0;
  font-size: 1.2rem;
}
}
</style>