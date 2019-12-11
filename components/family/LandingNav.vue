<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="family-top-wrapper">
          <div class="family-nav-title">
            <a :href="'/family/' + header">{{ header }}</a>
            <span class="family-span" v-if="page === 'api'">
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
        <div class="side-nav-select-wrapper landing-nav-select-wrapper">
          <div
            id="install1"
            :class="
              getHash === '#install'
                ? 'landing-nav-api-title bold'
                : 'landing-nav-api-title'
            "
          >
            <a :href="'/family/' + header + '#install'">Installation</a>
          </div>
          <div
            id="status1"
            :class="
              getHash === '#status'
                ? 'landing-nav-api-title bold'
                : 'landing-nav-api-title'
            "
          >
            <a :href="'/family/' + header + '#status'">Status</a>
          </div>
          <div
            v-if="intro"
            id="introduction1"
            :class="
              getHash === '#introduction'
                ? 'landing-nav-api-title bold'
                : 'landing-nav-api-title'
            "
          >
            <a :href="'/family/' + header + '#introduction'">Introduction</a>
          </div>
          <div
            v-if="example"
            id="example1"
            :class="
              getHash === '#example'
                ? 'landing-nav-api-title bold'
                : 'landing-nav-api-title'
            "
          >
            <a :href="'/family/' + header + '#example'">Example</a>
          </div>
          <div
            v-if="usage"
            id="usage1"
            :class="
              getHash === '#usage'
                ? 'landing-nav-api-title bold'
                : 'landing-nav-api-title'
            "
          >
            <a :href="'/family/' + header + '#usage'">Usage</a>
          </div>
          <div
            :class="
              page === 'api'
                ? 'landing-nav-api-title bold'
                : 'landing-nav-api-title'
            "
          >
            <a :href="'/family/' + header + '/api'">API</a>
          </div>
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
          <div
            :class="
              page === 'changelog'
                ? 'landing-nav-changelog-title bold'
                : 'landing-nav-changelog-title'
            "
          >
            <a :href="'/family/' + header + '/changelog'">Changelog</a>
          </div>
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
    "modules",
    "intro",
    "example",
    "usage"
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
    },
    onScroll() {
      let links = [];
      links = document.querySelectorAll(".landing-nav-api-title a");
      let points = {};
      let offsets = [];
      for (let i = 0; i < links.length; i++) {
        let point = document.querySelector(
          `.landing-anchor[name*='${links[i].href.replace(/^[^_]*#/, "")}']`
        );
        if (point && point.name) {
          points[point.offsetTop - 20] = {
            name: "#" + point.name
          };
          offsets.push(point.offsetTop - 20);
        }
      }
      offsets = [...new Set(offsets)];

      //Add active class to elements on scroll
      window.onscroll = function() {
        let location = document.documentElement.scrollTop;
        let locationBody = document.body.scrollTop;
        let actives = document.getElementsByClassName("bold");
        let i = 0;
        for (i in offsets) {
          if (offsets[i] <= location || offsets[i] <= locationBody) {
            let aClass = points[offsets[i]].name;
            for (let active of actives) {
              active.classList.remove("bold");
            }

            let element = document.querySelector(aClass + "1");
            element.classList.add("bold")
          }
        }
      };
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
    getHash() {
      return this.$route.hash;
    }
  },
  mounted() {
    this.onScroll();
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

.resources-active {
  position: relative;
  color: $orange !important;
  font-weight: 900;
  transition: all 0.2s ease;
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
