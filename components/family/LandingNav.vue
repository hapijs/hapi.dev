<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="family-top-wrapper">
          <div class="family-nav-title">
            <a :href='"/family/" + header'>{{header}}</a>
            <span class="family-span" v-if="page === 'api'">
              <select @change="onVersionChange($event)" class="family-version-select" :value="version">
                <option
                  v-for="version in versions"
                  v-bind:key="version"
                  :value="version"
                >{{version}}</option>
              </select>
            </span>
          </div>
          <div class="family-search" v-if="page === 'api'">
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
                  <div
                    class="family-search-results-text"
                  >Showing result {{indexResults + 1}} of {{results.length}}</div>
                  <div class="family-search-buttons">
                    <button class="family-search-button" v-on:click="onPrevious">Previous</button>
                    <button class="family-search-button" v-on:click="onNext">Next</button>
                  </div>
                </div>
              </div>
              <div class="family-search-error">No results found</div>
            </div>
          </div>
        </div>
        <div class="side-nav-select-wrapper landing-nav-select-wrapper">
          <div :class="page === 'api' ? 'landing-nav-api-title bold' : 'landing-nav-api-title'"><a :href='"/family/" + header + "/api"'>API</a></div>
          <ul class="side-nav-select-list" v-if="page === 'api'">
            <FamilyNavItem
              :name="header"
              :menu="menu"
              :page="page"
              :version="version"
              :versions="versions"
              @change="onVersionChange"
            />
          </ul>
          <div :class="page === 'changelog' ? 'landing-nav-changelog-title bold' : 'landing-nav-changelog-title'"><a :href='"/family/" + header + "/changelog"'>Changelog</a></div>
        </div>
      </div>
      <SideFooter />
    </div>
  </div>
</template>

<script>
import SideFooter from "~/components/Footers/SideFooter.vue";
import FamilyNavItem from "~/components/family/FamilyNavItem.vue";

export default {
  components: {
    SideFooter,
    FamilyNavItem
  },
  props: [
    "page",
    "moduleAPI",
    "version",
    "versions",
    "menu",
    "results",
    "indexResults",
    "search",
    "modules"
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
      this.$parent.setClasses();
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
      showAPI: false
    };
  },
  computed: {
    getModules() {
      return this.$store.getters.loadModules;
    },
    getVersion() {
      return this.$store.getters.loadVersion;
    },
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
}

.family-nav-title {
  font-size: 1.5rem;
  color: $black;
  margin: 0;
}

.family-nav-title a {
  color: $black;
}

.family-nav-title a:hover {
  color: $black;
}

.family-search {
  position: relative;
  padding-right: 20px;
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
  background-color: #fff;
  background-size: contain;
  padding: 10px;
  right: 20px;
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
  background: #fff;
  padding: 4px 10px;
  color: $black;
  cursor: pointer;
  margin-right: 10px;
}

@media screen and (max-width: 900px) {
  .landing-nav-select-wrapper {
    display: block;
  }

  .mobile-top-wrapper {
    align-items: center;
  }

  .family-span {
    font-size: 1.2rem;
  }

  .family-version-select {
    width: 80px;
  }
}
</style>