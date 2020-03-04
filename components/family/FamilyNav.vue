<template>
  <div class="api-nav-window">
    <div class="api-nav-wrapper">
      <div class="api-nav-inner-wrapper">
        <div class="family-top-wrapper">
          <div class="family-nav-title">
            {{ header }}
            <span class="family-span">
              <select
                @change="onVersionChange($event)"
                class="family-version-select"
                :value="version"
              >
                <option
                  v-for="version in versions"
                  v-bind:key="version"
                  :value="version"
                  >{{ version }}</option
                >
              </select>
            </span>
            <Ads />
          </div>
          <div class="family-search">
            <input
              class="family-search-box"
              :value="search"
              v-on:keyup.enter="onSearch"
              @input="onInput($event)"
              placeholder="Search API"
            />
            <div class="family-search-img" v-on:click="onSearch"></div>
            <div class="family-search-info">
              <div class="family-search-results">
                <div class="family-search-results-wrapper">
                  <div class="family-search-results-text">
                    Showing result {{ indexResults + 1 }} of
                    {{ results.length }}
                  </div>
                  <div class="family-search-buttons">
                    <button
                      class="family-search-button"
                      v-on:click="onPrevious"
                    >
                      Previous
                    </button>
                    <button class="family-search-button" v-on:click="onNext">
                      Next
                    </button>
                  </div>
                </div>
              </div>
              <div class="family-search-error">No results found</div>
            </div>
          </div>
        </div>
        <div class="side-nav-select-wrapper family-nav-no-margin">
          <ul class="side-nav-select-list family-nav-select-list">
            <FamilyNavItem
              :name="header"
              :menu="menu"
              :active="moduleAPI"
              :page="page"
              :version="version"
              :versions="versions"
              @change="onVersionChange"
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
import Ads from "~/components/Ads.vue";

export default {
  components: {
    SideFooter,
    FamilyNavItem,
    Ads
  },
  props: [
    "page",
    "moduleAPI",
    "version",
    "versions",
    "menu",
    "results",
    "indexResults",
    "search"
  ],
  methods: {
    async onVersionChange(event) {
      this.$store.commit("setVersion", event.target.value);
      await this.$router.push({
        path: this.$route.path,
        query: { v: event.target.value }
      });
      this.$emit("input", "");
      document
        .querySelector(".family-search-results")
        .classList.remove("nav-display");
      document
        .querySelector(".family-search-error")
        .classList.remove("nav-display");
      window.scrollTo(0, 0);
      await this.$parent.setClasses()
    },
    onSearch() {
      if (this.search !== "") {
        this.$emit("search");
      }
    },
    onPrevious() {
      if (this.indexResults !== 0) {
        this.$emit("previous", this.indexResults - 1, this.uls, this.links);
      }
    },
    onNext() {
      if (this.indexResults !== this.results.length - 1) {
        this.$emit("next", this.indexResults + 1, this.uls, this.links);
      }
    },
    onInput(event) {
      document
        .querySelector(".family-search-error")
        .classList.remove("nav-display");
      document
        .querySelector(".family-search-results")
        .classList.remove("nav-display");
      this.$emit("input", event.target.value);
    }
  },
  data() {
    return {
      header: this.$route.params.family,
      title: !this.$route.params.family
        ? "Bell"
        : this.$route.params.family.charAt(0).toUpperCase(0) +
          this.$route.params.family.slice(1)
    };
  },
  computed: {
    getModules() {
      return this.$store.getters.loadModules;
    }
  },
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

.family-top-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin: 0;
  padding: 20px;
  position: sticky;
  top: 0;
  background: $off-white;
  z-index: 1000;
}

.family-nav-title {
  font-size: 1.5rem;
  color: $black;
  margin: 0;
}

.family-search {
  position: relative;
  width: 100%;
  margin: 20px 0 0 0;
}

.family-search-box {
  height: 30px;
  outline: none;
  padding: 10px;
  border: 1px solid $dark-white;
  width: 100%;
  font-size: 0.85rem;
}

.family-search-img {
  position: absolute;
  background: url("/img/search.png") no-repeat;
  background-position: center;
  background-color: $white;
  background-size: contain;
  padding: 10px;
  right: 0px;
  top: 0px;
  border-top: 1px solid $dark-white;
  border-right: 1px solid $dark-white;
  border-bottom: 1px solid $dark-white;
  height: 30px;
  width: 30px;
  z-index: 25;
  cursor: pointer;
}

.family-search-info {
  margin-top: 5px;
  width: 100%;
}

.family-search-error,
.family-search-results {
  display: none;
  width: 100%;
  font-size: 0.85em;
}

.family-search-results-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.family-search-results-text {
  margin: 0;
}

.family-search-buttons {
  margin: 5px 0 0 0;
}

.family-search-button {
  outline: none;
  border: 1px solid $dark-white;
  background: $white;
  padding: 4px 10px;
  color: $black;
  cursor: pointer;
  margin-right: 10px;
}

@media screen and (max-width: 900px) {
  .family-top-wrapper {
    padding: 0;
    z-index: 0;
  }
  .mobile-top-wrapper {
    align-items: center;
  }

  .family-span {
    font-size: 1.2rem;
  }

  .family-top-wrapper {
    padding: 0;
  }

  .family-version-select {
    width: 80px;
  }
}
</style>
