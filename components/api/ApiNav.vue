<template>
  <div class="api-nav-window">
    <div class="api-nav-wrapper">
      <div class="api-nav-inner-wrapper">
        <div class="api-header-wrapper">
          <div class="api-nav-title-wrapper">
            <div class="api-nav-title">API</div>
            <div class="api-lang-wrapper">
              <select
                @change="onChange($event)"
                class="api-lang-select"
                :value="version"
              >
                <option
                  v-for="version in versions"
                  v-bind:key="version"
                  :value="version"
                  >{{ version }}</option
                >
              </select>
            </div>
          </div>
          <Ads />
          <div class="api-search">
            <input
              class="api-search-box"
              :value="search"
              v-on:keyup.enter="onSearch"
              @input="onInput($event)"
              placeholder="Search API"
            />
            <div class="api-search-img" v-on:click="onSearch"></div>
            <div class="api-search-info">
              <div class="api-search-results">
                <div class="api-search-results-wrapper">
                  <div class="api-search-results-text">
                    Showing result {{ indexResults + 1 }} of
                    {{ results.length }}
                  </div>
                  <div class="api-search-buttons">
                    <button class="api-search-button" v-on:click="onPrevious">
                      Previous
                    </button>
                    <button class="api-search-button" v-on:click="onNext">
                      Next
                    </button>
                  </div>
                </div>
              </div>
              <div class="api-search-error">No results found</div>
            </div>
          </div>
        </div>
        <div
          class="api-nav-select-wrapper"
          v-html="$md.render(this.$props.menu)"
        ></div>
      </div>
      <div class="api-side-footer-wrapper">
        <SideFooter />
      </div>
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
  props: ["menu", "search", "version", "results", "indexResults", "versions"],
  data: function() {
    return {
      uls: {},
      links: {}
    };
  },
  methods: {
    onChange(event) {
      this.$emit("change", event.target.value);
    },
    onInput(event) {
      document
        .querySelector(".api-search-error")
        .classList.remove("nav-display");
      document
        .querySelector(".api-search-results")
        .classList.remove("nav-display");
      this.$emit("input", event.target.value);
    },
    onSearch() {
      if (this.search !== "") {
        this.$emit("search", this.uls, this.links);
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
    setClasses() {
      //Add classes to API nav
      let lis = document.querySelectorAll(".api-nav-select-wrapper li");
      let code = document.querySelectorAll(".api-nav-select-wrapper code");
      let wrapper = document.querySelector(".markdown-wrapper");
      let hapiHeader = document.createElement("h1");
      hapiHeader.innerHTML =
        "API <span class='api-version-span'>v" +
        this.version.match(/.*(?=\.)/)[0] +
        ".x";
      hapiHeader.setAttribute("class", "hapi-header");
      wrapper.insertBefore(hapiHeader, wrapper.firstChild);
      const height = document
        .querySelector(".api-nav-select-wrapper")
        .getBoundingClientRect().bottom;
      for (let li of lis) {
        li.classList.add("api-nav-li");
        if (li.children[1]) {
          li.children[0].classList.add("api-nav-plus");
        }
      }
      let topLinks = document.querySelectorAll(
        ".api-nav-select-wrapper > ul > li > a"
      );
      for (let top of topLinks) {
        top.classList.add("api-header");
      }
      let aLinks = document.querySelectorAll(
        ".api-nav-select-wrapper > ul > li > ul > li a"
      );
      for (let a of aLinks) {
        a.classList.add("api-nav-header");
        this.links[a.hash] = a.getBoundingClientRect().top;
      }
      let uls = document.querySelectorAll(".api-nav-li ul");
      for (let ul of uls) {
        this.uls[ul.getBoundingClientRect().top] = {
          name: ul,
          top: ul.getBoundingClientRect().top,
          bottom: ul.getBoundingClientRect().bottom
        };
      }
      for (let ul of uls) {
        ul.classList.add("api-nav-ul");
      }
      let links = document.querySelectorAll(
        ".api-nav-select-wrapper > ul > li a"
      );
      for (let link of links) {
        if (
          link.parentElement.children[1] &&
          link.parentElement.children[1].classList.contains("api-nav-ul")
        ) {
          link.classList.add("api-nav-plus");
        }
        link.addEventListener("click", function(event) {
          let currentActive = document.querySelector(".api-active");
          if (currentActive) {
            currentActive.classList.remove("api-active");
          }
          link.classList.add("api-active");
          if (
            link.parentElement.children[1] &&
            link.parentElement.children[1].classList.contains("nav-display")
          ) {
            if (link.classList.contains("api-header")) {
              let headers = document.querySelectorAll(".nav-display");
              for (let head of headers) {
                head.classList.remove("nav-display");
              }
              let minus = document.querySelectorAll(".api-nav-minus");
              for (let m of minus) {
                m.classList.remove("api-nav-minus");
                m.classList.add("api-nav-plus");
              }
            }
            link.parentElement.children[1].classList.remove("nav-display");
            link.classList.remove("api-nav-minus");
            link.classList.add("api-nav-plus");
          } else if (
            link.parentElement.children[1] &&
            !link.parentElement.children[1].classList.contains("nav-display")
          ) {
            if (link.classList.contains("api-header")) {
              let headers = document.querySelectorAll(".nav-display");
              for (let head of headers) {
                head.classList.remove("nav-display");
              }
              let minus = document.querySelectorAll(".api-nav-minus");
              for (let m of minus) {
                m.classList.remove("api-nav-minus");
                m.classList.add("api-nav-plus");
              }
            }
            let linkSibling = link.parentElement.children[1];
            linkSibling.classList.add("nav-display");
            link.classList.remove("api-nav-plus");
            link.classList.add("api-nav-minus");
          }
          if (!document.getElementById("carbonads")) return;
          if (typeof _carbonads !== "undefined") _carbonads.refresh();
        });
      }
      let plus = document.querySelectorAll(".api-nav-plus");
      let methods = [];
      for (let p of plus) {
        methods.push(p);
      }
      //Remove extra text from TOC elements
      for (let i = code.length - 1; i >= 0; i--) {
        code[i].classList.add("api-nav-code");
        let matchHeader = "";
        let match = "";
        for (let m = methods.length - 1; m >= 0; m--) {
          if (methods[m].innerHTML.includes("Response")) {
            match = "response.";
          } else {
            match =
              methods[m].innerHTML
                .replace(/<[^>]*>/g, "")
                .toLowerCase()
                .split(" ")
                .join(".") + ".";
          }
          if (
            methods[m].parentElement.children[1].contains(code[i]) &&
            code[i].innerHTML.includes(match)
          ) {
            if (code[i].innerHTML.replace(match, "").length > matchHeader) {
              matchHeader = code[i].innerHTML
                .replace(match, "")
                .replace("await ", "");
            }
          }
        }
        if (matchHeader) {
          code[i].innerHTML = matchHeader;
        }
        if (code[i + 1]) {
          let a = code[i].innerHTML
            .replace(/\(([^#/(/)]+)\)/g, "()")
            .replace("await ", "");
          let b = code[i + 1].innerHTML
            .replace(/\(([^#/(/)]+)\)/g, "()")
            .replace("await ", "");
          if (a === b) {
            continue;
          }
        }
        if (code[i - 1]) {
          let a = code[i].innerHTML.replace(/\(([^#/(/)]+)\)/g, "()");
          let b = code[i - 1].innerHTML
            .replace(/\(([^#/(/)]+)\)/g, "()")
            .replace(match, "");
          if (a !== b) {
            code[i].innerHTML = code[i].innerHTML.replace(
              /\(([^#/(/)]+)\)/g,
              "()"
            );
          }
        }
        if (!code[i - 1]) {
          code[i].innerHTML = code[i].innerHTML.replace(
            /\(([^#/(/)]+)\)/g,
            "()"
          );
        }
      }
      //API nav scroll spy
      let tags = document.querySelectorAll(".markdown-wrapper a");
      let points = {};
      let offsets = [];
      for (let i = 1; i < tags.length; i++) {
        if (i === 1) {
          points[tags[1].offsetTop + 116] = {
            name: "#" + tags[i].id
          };
          offsets.push(tags[i].offsetTop + 116);
        } else if (this.version !== this.versions[3] && tags[i].id) {
          points[tags[i].offsetTop - 40] = {
            name: "#" + tags[i].id
          };
          offsets.push(tags[i].offsetTop - 40);
        } else if (this.version === this.versions[3] && tags[i].id) {
          points[tags[i].offsetTop - 40] = {
            name: "#" + tags[i].id
          };
          offsets.push(tags[i].offsetTop - 40);
        }
      }
      let that = this;
      //Add active class to elements on scroll
      window.onscroll = function() {
        let location = document.documentElement.scrollTop;
        let locationBody = document.body.scrollTop;
        let actives = document.getElementsByClassName("api-active");
        let i = 0;
        let active;
        let aClass;
        for (i in offsets) {
          aClass = points[offsets[i]].name;
          let element = document.querySelector(`a[href='${aClass}']`);
          if (offsets[i] <= location || offsets[i] <= locationBody) {
            for (let a of actives) {
              a.classList.remove("api-active");
            }
            if (aClass !== "#route.options.validate.state") {
              element.classList.add("api-active");
              active = document.querySelector(".api-active");
            }
          }
        }
        if (active) {
          let activeClass;
          if (that.$route.hash === active.hash && bottom === 0) {
            let wrapperHeight = document
              .querySelector(".api-nav-wrapper")
              .getBoundingClientRect().height;
            activeClass = that.$route.hash;
          } else {
            activeClass = active.hash;
          }
          let activeLink = document.querySelector(`a[href*='${activeClass}']`);
          let activePosition = that.links[activeLink.hash];
          for (let key in that.uls) {
            if (
              activePosition >= that.uls[key].top &&
              activePosition < that.uls[key].bottom
            ) {
              that.uls[key].name.classList.add("nav-display");
              that.uls[key].name.parentElement.children[0].classList.remove(
                "api-nav-plus"
              );
              that.uls[key].name.parentElement.children[0].classList.add(
                "api-nav-minus"
              );
            }
          }
          let bottom = active.getBoundingClientRect().bottom;
          let location = active.getBoundingClientRect();
          if (bottom > window.innerHeight || location.top < 131) {
            active.scrollIntoView(false);
          }
          if (that.$route.hash === active.hash && bottom === 0) {
            active.scrollIntoView(false);
          }
        }
      };
    }
  },
  async mounted() {
    await this.setClasses();
    if (this.$route.hash) {
      document.querySelector(".api-nav-select-wrapper").getBoundingClientRect();
      let wrapperHeight = document
        .querySelector(".api-nav-wrapper")
        .getBoundingClientRect().height;
      let aClass = this.$route.hash;
      let active = document.querySelector(`a[href*='${aClass}']`);
      active.classList.add("api-active");
      const activePosition = this.links[active.hash];
      for (let key in this.uls) {
        if (
          activePosition > this.uls[key].top &&
          activePosition < this.uls[key].bottom
        ) {
          this.uls[key].name.classList.add("nav-display");
          this.uls[key].name.parentElement.children[0].classList.remove(
            "api-nav-plus"
          );
          this.uls[key].name.parentElement.children[0].classList.add(
            "api-nav-minus"
          );
        }
      }
      active.scrollIntoView(false);
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";

.api-nav-window {
  position: sticky;
  top: 96px;
  bottom: 0;
  width: 370px;
  min-width: 370px;
  max-height: calc(100vh - 96px);
  min-height: calc(100vh - 96px);
  overflow-y: auto;
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
  padding: 0 0 5px 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: $off-white;
  border-right: 1px solid $dark-white;
}
.api-nav-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: auto;
  min-height: calc(100vh - 122px);
}
.api-nav-inner-wrapper {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  position: relative;
}
.api-nav-title-wrapper {
  padding: 0 20px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
.api-header-wrapper {
  margin: 0;
  width: 100%;
  top: 0;
  position: sticky;
  z-index: 1000;
  padding: 20px 0;
  background: $off-white;
}
.api-nav-title {
  font-size: 1.5rem;
  color: $black;
  margin: 0;
}
.api-lang-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 0 0 0 10px;
}
.api-lang-select {
  width: 70px;
  padding: 0px 5px 0px 5px;
  border: none;
  height: 30px;
  font-size: 1em;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(/img/down.png) 96% / 15% no-repeat $off-white;
  cursor: pointer;
}
.ads-wrapper {
  padding: 15px 20px 20px 20px;
  width: 369px;
  height: 162px;
  box-sizing: border-box;
}
.api-search {
  position: relative;
  padding: 0 20px;
  width: 100%;
  margin-top: 20px;
}
.api-search-box {
  height: 30px;
  outline: none;
  padding: 10px;
  border: 1px solid $dark-white;
  width: 100%;
  font-size: 0.85rem;
  border-radius: 0;
  -webkit-appearance: none;
}
.api-search-img {
  position: absolute;
  background: url("/img/search.png") no-repeat;
  background-position: center;
  background-color: $white;
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
.api-search-info {
  margin-top: 5px;
  width: 100%;
}
.api-search-error,
.api-search-results {
  display: none;
  width: 100%;
  font-size: 0.85em;
}
.api-search-results-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.api-search-results-text {
  margin: 0;
}
.api-search-buttons {
  margin: 5px 0 0 0;
}
.api-search-button {
  outline: none;
  border: 1px solid $dark-white;
  background: $white;
  padding: 4px 10px;
  color: $black;
  cursor: pointer;
  margin-right: 10px;
}
.api-nav-select-wrapper ul {
  margin-left: 0;
}
.api-nav-select-wrapper {
  margin: 0;
  font-size: 1.1em;
  color: $orange;
  line-height: 30px;
  width: 100%;
  overflow-x: hidden;
}
.api-nav-ul {
  display: none;
}
.ul-block {
  display: block;
}
.api-nav-select-wrapper ul li ul {
  margin-left: 10px;
}
.api-nav-li {
  position: relative;
  color: $gray;
}
.api-nav-header {
  color: $gray;
  font-size: 1rem;
  width: 100%;
  padding: 2px 0;
}
.api-nav-header:hover {
  color: $gray;
}
.api-active:hover {
  color: $white;
}
.api-nav-plus:hover,
.api-nav-minus:hover {
  color: $orange;
}
.api-nav-header * {
  text-decoration: none;
}
.api-nav-li a:hover,
.api-nav-li a code:hover {
  text-decoration: underline;
}
.api-nav-plus,
.api-nav-minus,
.api-nav-plus code,
.api-nav-minus code {
  color: $orange;
}
.api-nav-plus:after {
  content: "\002B";
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 20px;
  top: 0;
  bottom: 0;
  left: -17px;
  height: 31px;
  width: 15px;
  z-index: 100;
}
.api-nav-select-wrapper > ul > .api-nav-li > .api-nav-plus:after,
.api-nav-select-wrapper > ul > .api-nav-li > .api-nav-minus:after {
  height: 27px;
}
.api-nav-minus:after {
  content: "\2212";
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 20px;
  top: 0;
  bottom: 0;
  left: -17px;
  height: 31px;
  width: 15px;
  z-index: 100;
}
.api-nav-header {
  display: flex;
}
.api-nav-code {
  background: $off-white;
  font-family: "Lato", sans-serif;
  color: $gray;
  font-size: 1rem;
  margin: 0 5px 0 0;
  padding: 0;
  border: none;
}
.api-nav-select-wrapper ul {
  margin: 0 0 0 30px;
}
.api-nav-select-wrapper ul li {
  margin: 0;
  list-style-type: none;
}
.api-active,
.api-active * {
  position: relative;
  color: $white !important;
  background: $gray;
}
.api-bold {
  font-weight: 900;
}
.api-active:after {
  position: absolute;
  left: 43px;
  height: 27px;
}
.api-active {
  display: inline-block;
  left: -70px;
  padding: 2px 30px 2px 70px!important;
  width: 410px!important;
}
.api-side-footer-wrapper {
  width: 100%;
  padding: 0 20px;
}
@media screen and (max-width: 900px) {
  .api-header-wrapper {
    z-index: 0;
  }
  .api-nav-window {
    flex-direction: row;
    position: relative;
    top: 0;
    min-height: auto;
    max-height: auto;
    border-right: none;
    border-bottom: 1px solid $dark-white;
    width: 100%;
  }
  .api-nav-wrapper {
    min-height: auto;
  }
}
@media print {
  .api-nav-window {
    display: none;
  }
}

@media (prefers-color-scheme: dark) {

  .api-nav-window,
  .api-header-wrapper,
  .api-search-button {
    background-color: $blacker !important;
  }

  .api-nav-title {
    color: $ash;
  }
  .api-lang-select,
  .api-search-box  {
    background-color: $blackest;
    border-color: #000
  }
  .api-search-box {
    border: 1px solid $dark-white;
  }
  .api-search-button {
    border: 1px solid $dark-white;
    background: $white;
    color: $white;
  }

}

</style>
