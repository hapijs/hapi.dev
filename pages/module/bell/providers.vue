<template>
  <div class="container">
    <LandingNav
      :moduleInfo="moduleAPI"
      :intro="intro"
      :menuProvider="menu"
      :example="example"
      :usage="usage"
      :faq="faq"
      :page="page"
      :advanced="advanced"
    />
    <div class="tutorial-markdown-window">
      <h1 class="hapi-family-header">Bell Providers</h1>
      <HTML :display="providersHTML" />
    </div>
    <div class="preload">
      <img src="/img/clipboardCheck.png" alt="clipboard" />
    </div>
  </div>
</template>

<script>
import HTML from "~/components/HTML.vue";
import LandingNav from "~/components/family/LandingNav.vue";
const moduleInfo = require("../../../static/lib/moduleInfo.json");
import { copyToClipboard } from "~/utils/clipboard";
let Toc = require("markdown-toc");
export default {
  components: {
    HTML,
    LandingNav
  },
  head() {
    return {
      title: "bell Providers - hapi.dev",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "View providers for bell"
        }
      ]
    };
  },
  data() {
    return {
      page: this.providersHTML,
      menu: "",
      moduleAPI: moduleInfo,
      uls: {},
      links: {},
      page: "providers",
      intro: false,
      example: false,
      usage: false,
      faq: false,
      advanced: false
    };
  },
  async asyncData({ $axios, params }) {
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };
    let providersHTML = "";
    let finalMenu = "";
    const providers = await $axios.$get(
      "https://api.github.com/repos/hapijs/bell/contents/Providers.md",
      options
    );
    let rawString = await providers.toString();
    let apiTocString = "";
    let apiTocArray = await rawString.match(/\n#.+/g);
    let pattern = "####";

    for (let i = 0; i < apiTocArray.length; ++i) {
      let testPattern = apiTocArray[i].match(/(?=#)(.*)(?=\s)/);
      if (testPattern[0].length < pattern.length) {
        pattern = testPattern[0];
      }
      apiTocString = apiTocString + apiTocArray[i];
    }
    finalMenu = Toc(apiTocString, { bullets: "-" }).content;

    //Generate API and Menu HTML
    finalMenu = await finalMenu.replace(/\(([^#*]+)\)/g, "()");
    providersHTML = await $axios.$post(
      "https://api.github.com/markdown",
      {
        text: providers,
        mode: "markdown"
      },
      {
        headers: {
          authorization: "token " + process.env.GITHUB_TOKEN
        }
      }
    );
    return { providersHTML, finalMenu };
  },
  methods: {
    fixAPILink() {
      let apiLink = document.querySelector(".markdown-wrapper p a");
      apiLink.setAttribute("href", "/family/bell/api");
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
    setClipboards() {
      let headers = document.querySelectorAll(
        ".markdown-wrapper h2, .markdown-wrapper h3, .markdown-wrapper h4, .markdown-wrapper h5"
      );

      for (let header of headers) {
        header.classList.add("api-doc-header");
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

      let links = document.querySelectorAll("#bell a");
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
        point.id = point.id.replace("user-content-", "");
        if (point) {
          if (point.id) {
            points[point.offsetTop] = {
              name: "#" + point.id
            };
          } else {
            points[point.offsetTop] = {
              name: point.hash
            };
          }

          offsets.push(point.offsetTop);
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
    getDisplay() {
      return this.moduleAPI[this.$route.params.family].displays[
        this.getVersion
      ];
    },
    getVersion() {
      return this.$store.getters.loadVersion;
    },
    getMilestones() {
      return this.milestoneList;
    },
    getFamily() {
      return this.$store.getters.loadFamily;
    },
    getIntro() {
      return this.$store.getters.loadIntro;
    },
    getExample() {
      return this.$store.getters.loadExample;
    },
    getUsage() {
      return this.$store.getters.loadUsage;
    },
    getFaq() {
      return this.$store.getters.loadFaq;
    },
    getAdvanced() {
      return this.$store.getters.loadAdvanced;
    }
  },
  created() {
    this.$data.menu = this.finalMenu;
    let versionsArray = this.moduleAPI.bell.versionsArray;
    this.$data.version = versionsArray[0];
    this.$data.schema = this.getSchema;
    this.$data.validate = this.getValidate;
    this.$store.commit("setDisplay", "family");
    this.$store.commit("setFamily", "bell");
    if (this.moduleAPI.bell[versionsArray[0]].intro) {
      this.$store.commit("setIntro", true);
    }
    if (this.moduleAPI.bell[versionsArray[0]].example) {
      this.$store.commit("setExample", true);
    }
    if (this.moduleAPI.bell[versionsArray[0]].usage) {
      this.$store.commit("setUsage", true);
    }
    if (this.moduleAPI.bell[versionsArray[0]].faq) {
      this.$store.commit("setFaq", true);
    }
    if (this.moduleAPI.bell[versionsArray[0]].advanced) {
      this.$store.commit("setAdvanced", true);
    }
  },
  mounted() {
    this.fixAPILink();
    this.setClasses();
    this.setClipboards();
    this.goToAnchor();
  }
};
</script>

<style lang="scss">
@import "../../../assets/styles/main.scss";
@import "../../../assets/styles/api.scss";

.tutorial-markdown-window {
  position: relative;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0;
}

.markdown-wrapper a {
  position: relative;
}

.plugins-logo {
  position: absolute;
  top: -8px;
  right: -40px;
  width: 35px;
  height: 35px;
  max-width: none;
}

.plugins-logo-top {
  position: relative;
  top: 10px;
  width: 35px;
  height: 35px;
  max-width: none;
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
  background: #6f6f6f;
}

.family-active {
  display: inline-block;
  left: -70px;
  padding: 2px 30px 2px 70px !important;
  width: 405px !important;
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
</style>
