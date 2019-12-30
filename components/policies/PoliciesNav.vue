<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Policies</div>
        <Ads />
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <li class="policies-header-link">
              <a
                :class="
                  $props.page === 'conduct'
                    ? 'side-nav-select-link policies-active'
                    : 'side-nav-select-link'
                "
                href="/policies/coc"
                >Code of Conduct</a
              >
            </li>
            <li class="policies-header-link">
              <a
                :class="
                  $props.page === 'contributing'
                    ? 'side-nav-select-link policies-active'
                    : 'side-nav-select-link'
                "
                href="/policies/contributing"
                >Contributing</a
              >
            </li>
            <li class="policies-header-link">
              <a
                :class="
                  $props.page === 'license'
                    ? 'side-nav-select-link policies-active'
                    : 'side-nav-select-link'
                "
                href="/policies/license"
                >License</a
              >
            </li>
            <li class="policies-header-link">
              <a
                :class="
                  $props.page === 'security'
                    ? 'side-nav-select-link policies-active'
                    : 'side-nav-select-link'
                "
                href="/policies/security"
                >Security</a
              >
            </li>
            <li class="policies-header-link">
              <a
                :class="
                  $props.page === 'styleguide'
                    ? 'side-nav-select-link policies-active'
                    : 'side-nav-select-link'
                "
                href="/policies/styleguide"
                >Style Guide</a
              >
            </li>

            <li class="policies-header-link">
              <a
                :class="
                  $props.page === 'support'
                    ? 'side-nav-select-link policies-active'
                    : 'side-nav-select-link'
                "
                href="/policies/support"
                >Support</a
              >
            </li>
          </ul>
        </div>
      </div>
      <SideFooter />
    </div>
  </div>
</template>

<script>
import SideFooter from "~/components/Footers/SideFooter.vue";
import Ads from "~/components/Ads.vue";

export default {
  components: {
    SideFooter,
    Ads
  },
  props: ["page"],
  methods: {
    onClick(ref) {
      let actives = document.querySelectorAll(".policies-active");
      for (let active of actives) {
        active.classList.remove("policies-active");
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";

.policies-header-link {
  position: relative;
  list-style-type: none;
  margin-bottom: 5px;
}

.ads-wrapper {
  padding: 15px 0 0 0;
}

.side-nav-select-link a {
  display: inline-block;
  font-size: 0.78em;
  width: 100%;
  padding: 5px 0;
  color: $gray;
  margin: 0;
  border-bottom: 1px solid $dark-white;
  cursor: pointer;
}

.side-nav-select-link a:hover {
  text-decoration: none;
}

.policies-active {
  position: relative;
  color: $orange !important;
  font-weight: 900;
  transition: all 0.2s ease;
}
</style>
