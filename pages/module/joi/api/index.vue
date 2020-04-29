<template>
  <div class="container">
    <LandingNav
      :moduleInfo="moduleAPI"
      :menu="getMenu"
      :page="page"
      :version="getVersion"
      :versions="versionsArray"
      :results="results"
      :indexResults="indexResults"
      :search="search"
      :intro="intro"
      :example="example"
      :usage="usage"
      :faq="faq"
      :advanced="advanced"
      @clipboards="onClipboards"
      @search="onChildSearch"
      @previous="onChildIndex"
      @next="onChildIndex"
      @input="onChildInput"
    />
    <div class="tutorial-markdown-window">
      <h1 class="hapi-family-header">
        API
        <span class="api-version-span"
          >v{{ getVersion.match(/.*(?=\.)/)[0] }}.x</span
        >
      </h1>
      <Install :name="name" :moduleAPI="moduleAPI" :version="version" />
      <FamilyDisplay :display="getAPI" />
    </div>
    <div class="preload">
      <img src="/img/clipboardCheck.png" alt="clipboard" />
    </div>
  </div>
</template>

<script>
import FamilyDisplay from "~/components/family/FamilyDisplay.vue";
import LandingNav from "~/components/family/LandingNav.vue";
import Install from "~/components/family/Install.vue";
import Changelog from "~/components/resources/Changelog.vue";
const moduleInfo = require("../../../../static/lib/moduleInfo.json");
import { copyToClipboard, setCodeClipboards } from "~/utils/clipboard";
let Toc = require("markdown-toc");
let Semver = require("semver");

export default {
  components: {
    FamilyDisplay,
    LandingNav,
    Install,
    Changelog
  },
  head() {
    return {
      title: "hapi.dev - joi v" + this.$route.query.v,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "View the APIs for the hapi modules"
        }
      ]
    };
  },
  data() {
    return {
      moduleAPI: moduleInfo,
      versionsArray: moduleInfo.joi.versionsArray.sort((a, b) =>
        Semver.compare(b, a)
      ),
      display: "",
      page: "api",
      modules: this.modules,
      version: "",
      menu: "",
      name: "joi",
      indexResults: 0,
      search: "",
      results: [],
      uls: {},
      links: {},
      intro: false,
      example: false,
      usage: false,
      faq: false,
      advanced: false,
      listeners: new Map()
    };
  },
  methods: {
    onClipboards() {
      let that = this;
      setTimeout(function() {
        that.setClipboards();
      }, 100);
      setCodeClipboards(that.listeners);
    },
    goToAnchor() {
      let hash = document.location.hash;
      if (hash != "") {
        setTimeout(function() {
          if (location.hash) {
            window.scrollTo(0, 0);
            window.location.href = hash;
          }
        }, 1);
      } else {
        return false;
      }
    },
    onChildSearch() {
      let headlines = [];
      let text = [];
      this.indexResults = 0;
      const headers = ["H2", "H3", "H4", "H5", "H6"];
      let pages = document
        .querySelector(".family-markdown-wrapper")
        .querySelectorAll("*");

      //Check if search item is in a headline
      for (let page of pages) {
        if (
          headers.indexOf(page.nodeName) !== -1 &&
          page.innerHTML.indexOf(this.search.toLowerCase()) !== -1
        ) {
          headlines.push(page);
        } else if (
          headers.indexOf(page.nodeName) === -1 &&
          page.innerHTML.indexOf(this.search.toLowerCase()) !== -1
        ) {
          text.push(page);
        }
      }

      this.results = headlines.concat(text);
      if (this.results.length) {
        document
          .querySelector(".family-search-results")
          .classList.add("nav-display");
        if (window.innerWidth <= 900) {
          document.body.scrollTo(
            0,
            this.results[this.indexResults].offsetTop + 166
          );
        } else {
          window.scrollTo(0, this.results[this.indexResults].offsetTop);
        }
      } else if (this.results.length === 0) {
        document
          .querySelector(".family-search-error")
          .classList.add("nav-display");
      }
    },
    onChildIndex(value) {
      this.$data.indexResults = value;
      window.scrollTo(0, this.results[this.indexResults].offsetTop);
    },
    onChildInput(value) {
      this.$data.search = value;
    },
    setClipboards() {
      let headers = document.querySelectorAll(
        ".family-markdown-wrapper h2, .family-markdown-wrapper h3, .family-markdown-wrapper h4, .family-markdown-wrapper h5, .changelog-wrapper h2"
      );

      for (let header of headers) {
        header.classList.add("api-doc-header", "api-main-doc-header");
        header.innerHTML =
          header.innerHTML +
          "<span class='api-clipboardCheck api-clipboard' title='Copy link to clipboard'></span>";
      }

      let clipboards = document.querySelectorAll(".api-clipboard");

      for (let clipboard of clipboards) {
        clipboard.addEventListener("click", function(event) {
          let copyLink = clipboard.parentNode.firstElementChild.href;
          copyToClipboard(copyLink);
          clipboard.classList.remove("api-clipboard");
          clipboard.classList.add("api-clipboardCheck");
          setTimeout(function() {
            clipboard.classList.add("api-clipboard");
            clipboard.classList.remove("api-clipboardCheck");
          }, 3000);
        });
      }
    },
    setClasses() {
      //Set TOC classes
      let anchors = document.querySelectorAll(".family-nav-select-wrapper a");
      let code = document.querySelectorAll(".family-nav-select-wrapper a code");
      let pre = document.querySelectorAll("pre");
      let count = 0;
      let store = this.$store;
      let router = this.$router;

      for (let p of pre) {
        let textContent = p.textContent;
        if (
          textContent.match(/schema\s=\s(Joi.*\{(.|\n)*?[^\)]\));/) ||
          textContent.match(/schema\s=\s(Joi.*\(\)([\s\S]*?\);))/)
        ) {
          p.insertAdjacentHTML(
            "afterend",
            "<img src='/img/joiTestIcon.png' class='test-icon' id='icon" +
              count +
              "' title='Import to joi Schema Tester'/>"
          );
          p.classList.add("pre-icon");
          p.id = "pre-icon" + count;
        }
        count++;
      }

      let testIcons = document.querySelectorAll(".test-icon");
      for (let icon of testIcons) {
        icon.addEventListener("click", function(event) {
          let object = false;
          let text = document.getElementById("pre-" + icon.id).textContent;
          let schema = text.match(/schema\s=\s(Joi.*\(\)([\s\S]*?\);))/);
          if (!schema) {
            schema = text.match(/schema\s=\s(Joi.*\{(.|\n)*?[^\)]\));/);
            object = true;
          }
          schema = schema[1].replace(";", "");
          if (!object) {
            store.commit(
              "setSchema",
              "//Insert your joi schema here \nJoi.object({\n  a: " +
                schema +
                "\n})"
            );
          } else {
            store.commit(
              "setSchema",
              "//Insert your joi schema here \n" + schema
            );
          }

          store.commit(
            "setValidate",
            "//Insert data to validate here \n" + "{ \n" + " \n" + "}"
          );

          router.push({
            path: "/module/joi/tester"
          });
        });
      }

      for (let link of anchors) {
        link.classList.add("family-anchor");
        this.links[link.hash] = link.getBoundingClientRect().top;
        link.addEventListener("click", function(event) {
          let currentActive = document.querySelector(".family-active");
          if (currentActive) {
            currentActive.classList.remove("family-active");
          }
          link.classList.add("family-active");
          if (
            link.parentElement.children[1] &&
            link.parentElement.children[1].classList.contains(
              "family-ul-display"
            )
          ) {
            link.parentElement.children[1].classList.remove(
              "family-ul-display"
            );
            link.classList.remove("family-minus");
            link.classList.add("family-plus");
          } else if (
            link.parentElement.children[1] &&
            !link.parentElement.children[1].classList.contains(
              "family-ul-display"
            )
          ) {
            link.parentElement.children[1].classList.add("family-ul-display");
            link.classList.remove("family-plus");
            link.classList.add("family-minus");
          }
        });
      }

      for (let c of code) {
        c.classList.add("family-code");
      }

      let familyUls = document.querySelectorAll(
        ".family-nav-select-wrapper > ul ul"
      );

      for (let ul of familyUls) {
        this.uls[ul.getBoundingClientRect().top] = {
          name: ul,
          top: ul.getBoundingClientRect().top,
          bottom: ul.getBoundingClientRect().bottom
        };
      }

      let links = document.querySelectorAll("#joi a");
      let points = {};
      let offsets = [];
      for (let i = 0; i < links.length; i++) {
        let point = document.querySelector(
          `.tutorial-markdown-window h1 a[href='${links[i].hash}'],
          .tutorial-markdown-window h2 a[href='${links[i].hash}'],
          .tutorial-markdown-window h3 a[href='${links[i].hash}'], 
          .tutorial-markdown-window h4 a[href='${links[i].hash}'],
           .tutorial-markdown-window h5 a[href='${links[i].hash}']`
        );
        if (point) {
          if (point.id) {
            points[point.offsetTop + 220] = {
              name: "#" + point.id
            };
          } else {
            points[point.offsetTop + 220] = {
              name: point.hash
            };
          }

          offsets.push(point.offsetTop + 220);
        }
      }
      offsets = [...new Set(offsets)];

      let currentElement = document.querySelector(".markdown-wrapper");

      for (let ul of familyUls) {
        ul.parentNode.children[0].classList.remove("family-minus");
        ul.parentNode.children[0].classList.add("family-plus");
        ul.classList.add("family-hide");
      }

      let that = this;

      //Add active class to elements on scroll
      window.onscroll = function() {
        let location = document.documentElement.scrollTop;
        let locationBody = document.body.scrollTop;
        let actives = document.getElementsByClassName("family-active");
        let active;
        let element;
        let i = 0;
        if (
          window.innerHeight + window.scrollY <
          document.body.offsetHeight + 96
        ) {
          for (i in offsets) {
            if (offsets[i] <= location || offsets[i] <= locationBody) {
              let aClass = points[offsets[i]].name;
              for (let active of actives) {
                active.classList.remove("family-active");
              }
              element = document.querySelector(
                `.side-nav-wrapper a[href='${aClass}']`
              );
              if (element && element.children.length !== 0) {
                document
                  .querySelector(`a[href='${aClass}']`)
                  .classList.add("family-active");
                active = document.querySelector(".family-active");
              } else if (element && element.children.length === 0) {
                document
                  .querySelector(`a[href='${aClass}']`)
                  .classList.add("family-active");
                active = document.querySelector(".family-active");
              }
            }
          }
        }

        if (active) {
          let activeClass;
          activeClass = active.hash;
          let activeLink = document.querySelector(`a[href*='${activeClass}']`);
          let activePosition = that.links[activeLink.hash];
          for (let key in that.uls) {
            if (
              activePosition >= that.uls[key].top &&
              activePosition < that.uls[key].bottom
            ) {
              that.uls[key].name.classList.add("family-ul-display");
              that.uls[key].name.parentElement.children[0].classList.remove(
                "family-plus"
              );
              that.uls[key].name.parentElement.children[0].classList.add(
                "family-minus"
              );
            }
          }
          let bottom = active.getBoundingClientRect().bottom;
          if (bottom > window.innerHeight) {
            element.scrollIntoView(false);
          }
          if (that.$route.hash === active.hash && bottom === 0) {
            active.scrollIntoView(false);
          }
        }
      };
    }
  },
  computed: {
    getAPI() {
      return this.moduleAPI.joi[this.getVersion].api;
    },
    getVersion() {
      return this.$store.getters.loadVersion;
    },
    getMenu() {
      return this.moduleAPI.joi[this.getVersion].menu;
    }
  },
  created() {
    let versionsArray = this.moduleAPI.joi.versionsArray;
    if (!this.$store.getters.loadModules.includes("joi")) {
      return this.$nuxt.error({ statusCode: 404 });
    }

    let apiVersion = this.versionsArray[0];
    if (!this.$route.query.v) {
      this.$router.push({
        query: { v: this.versionsArray[0] },
        hash: this.$route.hash
      });
    } else {
      for (let v of this.versionsArray) {
        let version = this.$route.query.v.match(/^([^.]+)/);
        if (v.startsWith(version[0])) {
          apiVersion = v;
          if (!this.versionsArray.includes(this.$route.query.v)) {
            this.$router.push({
              query: { v: v },
              hash: this.$route.hash
            });
          }
          break;
        } else if (!this.versionsArray.includes(this.$route.query.v)) {
          this.$router.push({
            query: { v: this.versionsArray[0] },
            hash: this.$route.hash
          });
        }
      }
    }
    this.$store.commit("setDisplay", "family");
    this.$store.commit("setVersion", apiVersion);
    this.$data.menu = this.moduleAPI.joi[this.getVersion].menu;
    this.$store.commit("setFamily", "joi");
    if (this.moduleAPI.joi[apiVersion].intro) {
      this.$store.commit("setIntro", true);
    }
    if (this.moduleAPI.joi[apiVersion].example) {
      this.$store.commit("setExample", true);
    }
    if (this.moduleAPI.joi[apiVersion].usage) {
      this.$store.commit("setUsage", true);
    }
    if (this.moduleAPI.joi[apiVersion].faq) {
      this.$store.commit("setFaq", true);
    }
    if (this.moduleAPI.joi[apiVersion].advanced) {
      this.$store.commit("setAdvanced", true);
    }
  },
  mounted() {
    this.setClasses();
    this.goToAnchor();
    this.setClipboards();
  },
  beforeDestroy() {
    for (let [element, listener] of this.listeners) {
      element.removeEventListener("click", listener);
    }
    this.listeners.clear();
  }
};
</script>

<style lang="scss">
@import "../../../../assets/styles/main.scss";
@import "../../../../assets/styles/api.scss";
@import "../../../../assets/styles/markdown.scss";

.family-title {
  margin: 20px 0 -16px 100px;
  padding-bottom: 16px;
  box-sizing: border-box;
  border-bottom: 1px solid $dark-white;
  display: inline-block;
}

.family-anchor {
  display: inline-block;
  color: $gray;
  font-size: 0.85em;
  height: 100%;
  width: 100%;
  padding: 2px 0;
}

.family-anchor:hover {
  color: $gray;
}

.family-code {
  background: $off-white;
  color: $gray;
  font-family: "Lato", sans-serif;
  font-size: 1em;
  padding: 0;
  border: none;
}

.family-plus,
.family-minus,
.family-plus code,
.family-minus code {
  position: relative;
  color: $orange;
  text-decoration: none;
}

.family-plus:hover,
.family-minus:hover {
  color: $orange;
}

.family-plus:after {
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

.family-minus:after {
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

.family-active,
.family-active * {
  position: relative;
  color: $white !important;
  background: $gray !important;
  height: 31px;
}

.family-active {
  display: inline-block;
  left: -70px;
  padding: 2px 30px 2px 70px !important;
  width: 402px !important;
  overflow-wrap: break-word;
}

.family-active:after {
  position: absolute;
  left: 53px;
  height: 31px;
}

.family-hide {
  display: none;
}

.family-ul-display {
  display: block !important;
}

.changelog-header {
  margin: 20px 0 10px 0;
  padding-top: 10px;
  border-top: 1px solid $dark-white;
  width: 100%;
}

h1 a {
  display: block;
  position: relative;
  top: -116px;
  visibility: hidden;
}

.preload {
  display: none;
}

.api-doc-header {
  position: relative;
}

.api-clipboardCheck {
  position: relative;
  display: inline-block;
  width: 17px;
  height: 17px;
  margin: 0 0 0 5px;
  opacity: 0.7;
  background: url("/img/clipboardCheck.png");
  background-size: contain;
  transition: all 0.2s;
}

.api-clipboard {
  position: relative;
  display: inline-block;
  width: 17px;
  height: 17px;
  margin: 0 0 0 5px;
  background: url("/img/clipboard.png");
  background-size: contain;
  opacity: 0.3;
  cursor: pointer;
  transition: all 0.2s;
}

.api-clipboard:hover {
  opacity: 0.7;
}

.highlight {
  position: relative;
}

.test-icon {
  position: absolute;
  top: 5px;
  right: 28px;
  height: 21px;
  width: 21px;
  opacity: 0.3;
  cursor: pointer;
  transition: all 0.2s;
}

.test-icon:hover {
  opacity: 0.7;
}

.tutorial-header {
  display: block !important;
}

@media screen and (max-width: 900px) {
  .ecosystem-title {
    margin: 20px 0 0 0;
    padding-bottom: 16px;
  }
}
</style>
