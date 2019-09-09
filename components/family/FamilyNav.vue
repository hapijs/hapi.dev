<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="mobile-top-wrapper">
          <div class="side-nav-title">Family</div>
          <div class="mobile-family-info">
            <div class="mobile-family-title">
              {{title}}
              <span class="mobile-family-span">
                <select @change="onChange($event)" class="family-version-select" :value="version">
                  <option
                    v-for="version in versions"
                    v-bind:key="version"
                    :value="version"
                  >{{version}}</option>
                </select>
              </span>
            </div>
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
  methods: {
    async onChange(event) {
      this.$store.commit("setVersion", event.target.value);
      await this.$router.push({
        path: this.$route.path,
        query: { v: event.target.value }
      });
      window.scrollTo(0, 0);
    }
  },
  data() {
    return {
      title: !this.$route.params.family
        ? "Bell"
        : this.$route.params.family.charAt(0).toUpperCase(0) +
          this.$route.params.family.slice(1)
    };
  },
  props: ["page", "moduleAPI", "modules", "version", "versions", "menu"],
  mounted() {
    let aClass = this.$route.hash;
    if (this.$route.hash) {
      let aClass = this.$route.hash;
      let active = document.querySelector(
        `.side-nav-wrapper a[href*='${aClass}']`
      );
      active.scrollIntoView(false);
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";

.mobile-family-info {
  display: none;
}

.mobile-top-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin: 0;
}

@media screen and (max-width: 900px) {
  .mobile-family-info {
    display: block;
    margin: 0;
    font-size: 1.2rem;
  }

  .mobile-top-wrapper {
    align-items: center;
  }

  .family-span {
    font-size: 1.5rem;
  }

  .family-version-select {
    width: 80px;
  }
}
</style>