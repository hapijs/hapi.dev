<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="family-top-wrapper">
          <div class="family-nav-title">
            {{header}}
          </div>
        </div>
        <div class="side-nav-select-wrapper">
        </div>
      </div>
      <SideFooter />
    </div>
  </div>
</template>

<script>
import SideFooter from "~/components/Footers/SideFooter.vue";

export default {
  components: {
    SideFooter,
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
      header: this.$route.params.landing,
      title: this.$route.params.landing
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
}

.family-nav-title {
  font-size: 1.5rem;
  color: $black;
  margin: 0;
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