<template>
  <div class="api-nav-window">
    <div class="api-nav-wrapper">
      <div class="api-nav-inner-wrapper">
        <div class="api-nav-title-wrapper">
          <div class="api-nav-title">API</div>
          <div class="api-lang-wrapper">
            <select @change="onChange($event)" class="api-lang-select">
              <option :value="versions[0]">{{versions[0]}}</option>
              <option :value="versions[1]">{{versions[1]}}</option>
              <option :value="versions[2]">{{versions[2]}}</option>
            </select>
          </div>
        </div>
        <div class="api-search">
          <input
            class="api-search-box"
            :value="search"
            v-on:keyup.enter="onSearch"
            @input="onInput($event)"
            placeholder="Search API"
          >
          <div class="api-search-img" v-on:click="onSearch"></div>
          <div class="api-search-info">
            <div class="api-search-results">
              <div class="api-search-results-wrapper">
                <div
                  class="api-search-results-text"
                >Showing result {{indexResults + 1}} of {{results.length}}</div>
                <div class="api-search-buttons">
                  <button class="api-search-button" v-on:click="onPrevious">Previous</button>
                  <button class="api-search-button" v-on:click="onNext">Next</button>
                </div>
              </div>
            </div>
            <div class="api-search-error">No results found</div>
          </div>
        </div>
        <div class="api-nav-select-wrapper" v-html="$md.render(this.$props.menu)"></div>
      </div>
      <SideFooter/>
    </div>
  </div>
</template>

<script>
import SideFooter from "~/components/Footers/SideFooter.vue";

export default {
  components: {
    SideFooter
  },
  props: ["menu", "search", "version", "results", "indexResults", "versions"],
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
        this.$emit("search");
      }
    },
    onPrevious() {
      if (this.indexResults !== 0) {
        this.$emit("previous", this.indexResults - 1);
      }
    },
    onNext() {
      if (this.indexResults !== this.results.length - 1) {
        this.$emit("next", this.indexResults + 1);
      }
    },
    setClasses() {
      //Add classes to API nav
      let lis = document.querySelectorAll(".api-nav-select-wrapper li");
      for (let li of lis) {
        li.classList.add("api-nav-li");
        if (li.children[1]) {
          li.children[0].classList.add("api-nav-plus");
        }
      }
      let uls = document.querySelectorAll(".api-nav-li ul");
      for (let ul of uls) {
        ul.classList.add("api-nav-ul");
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
        });
      }
      let code = document.querySelectorAll(".api-nav-select-wrapper code");
      for (let c of code) {
        c.classList.add("api-nav-code");
      }

      //API nav scroll spy
      let tags = document.querySelectorAll(".markdown-wrapper a");
      let points = {};
      let offsets = [];
      for (let i = 2; i < tags.length; i++) {
        if (tags[i].name && this.version !== this.versions[2]) {
          points[tags[i].offsetTop - 40] = {
            name: "#" + tags[i].name
          };
          offsets.push(tags[i].offsetTop - 40);
        }
        if (
          this.version !== this.versions[2] &&
          tags[i].id &&
          tags[i].parentElement.children.length === 1
        ) {
          points[tags[i].offsetTop - 40] = {
            name: "#" + tags[i].id
          };
          offsets.push(tags[i].offsetTop - 40);
        }
        if (this.version === this.versions[2] && tags[i].id) {
          points[tags[i].offsetTop - 40] = {
            name: "#" + tags[i].id
          };
          offsets.push(tags[i].offsetTop - 40);
        }
      }

      //Add active class to elements on scroll
      window.onscroll = function() {
        let location = document.documentElement.scrollTop;
        let locationBody = document.body.scrollTop;
        let actives = document.getElementsByClassName("api-active");
        let extend = document.querySelectorAll(".api-ul-extend");
        let i = 0;
        for (i in offsets) {
          let aClass = points[offsets[i]].name;
          let element = document.querySelector(`a[href*='${aClass}']`);
          if (offsets[i] <= location || offsets[i] <= locationBody) {
            for (let active of actives) {
              active.classList.remove("api-active");
            }
            // for (let e of extend) {
            //   e.parentElement.children[0].classList.remove("api-nav-minus");
            //   e.parentElement.children[0].classList.add("api-nav-plus");
            //   e.classList.remove("nav-display")
            // }
            element.classList.add("api-active");
            // if (
            //   element.classList.contains("api-nav-plus") ||
            //   element.classList.contains("api-nav-minus")
            // ) {
            //   let linkSibling = element.parentElement.children[1];
            //   linkSibling.classList.add("nav-display");
            //   element.classList.remove("api-nav-plus");
            //   element.classList.add("api-nav-minus");
            //   element.classList.add("api-active");
            //   linkSibling.classList.add("api-ul-extend")
            // }
          }
        }
      };
    }
  },
  beforeUpdate() {
    this.setClasses();
  },
  updated() {
    this.setClasses();
  },
  mounted() {
    this.setClasses();
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";
@import "../../assets/styles/main.scss";

.api-nav-window {
  position: sticky;
  top: 96px;
  bottom: 0;
  width: 370px;
  min-width: 370px;
  max-height: calc(100vh - 96px);
  min-height: calc(100vh - 96px);
  overflow-y: auto;
  padding: 0;
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
  min-height: calc(100vh - 96px);
}

.api-nav-inner-wrapper {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
}

.api-nav-title-wrapper {
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
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

.api-search {
  position: relative;
  padding: 0 20px;
  width: 100%;
}

.api-search-box {
  height: 30px;
  outline: none;
  padding: 10px;
  border: 1px solid $dark-white;
  width: 100%;
  font-size: 0.85rem;
}

.api-search-img {
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
  background: #fff;
  padding: 4px 10px;
  color: $black;
  cursor: pointer;
  margin-right: 10px;
}

.api-nav-select-wrapper ul {
  margin-left: 0;
}

.api-nav-select-wrapper {
  margin-top: 20px;
  font-size: 1.1em;
  color: $orange;
  line-height: 30px;
  width: 100%;
}

.api-nav-ul {
  display: none;
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
  font-size: 0.85em;
  width: 100%;
  padding: 2px 0;
}

.api-nav-header:hover {
  color: $gray;
}

.api-active:hover {
  color: #fff;
}

.api-nav-plus:hover,
.api-nav-minus:hover {
  color: $orange;
}

.api-nav-header * {
  color: $orange;
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
  font-size: 1em;
  margin: 0 5px 0 0;
  padding: 0;
  border: none;
}

.nav-display {
  display: block !important;
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
  color: #fff !important;
  background: $gray;
}

.api-active:after {
  position: absolute;
  left: 43px;
  height: 27px;
}

.api-active {
  left: -60px;
  padding: 0 0 0 60px !important;
  width: 370px !important;
}

@keyframes arrow {
  from {
    transform: rotate(-90deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}

@media screen and (max-width: 900px) {
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
</style>
