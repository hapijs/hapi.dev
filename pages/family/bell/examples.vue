<template>
  <div class="container">
    <LandingNav
      :moduleInfo="moduleAPI"
      :intro="intro"
      :menu="menu"
      :example="example"
      :usage="usage"
      :faq="faq"
      :page="page"
      :advanced="advanced"
    />
    <div class="example-code-main">
      <h2 class="example-header">bell Examples</h2>
      <div
        class="example-code-wrapper"
        v-for="example in examples"
        v-bind:key="example.name"
      >
        <h4 class="example-name">
          <a
            :id="example.name.replace(/\.([^.]+)$/, '')"
            class="anchor"
            :href="'#' + example.name.replace(/\.([^.]+)$/, '')"
            aria-hidden="true"
            ><span aria-hidden="true" class="octicon octicon-link"></span
          ></a>
          {{
            example.name.charAt(0).toUpperCase() +
              example.name.slice(1).replace(/\.([^.]+)$/, "")
          }}
        </h4>
        <div class="highlight-source-js example-wrapper">
          <pre v-highlightjs="example.code" class="example-pre">
            <code class="javascript"></code>
          </pre>
        </div>
      </div>
    </div>
    <div class="preload">
      <img src="/img/clipboardCheck.png" alt="clipboard" />
    </div>
  </div>
</template>

<script>
import LandingNav from "~/components/family/LandingNav.vue";
const moduleInfo = require("../../../static/lib/moduleInfo.json");
let Toc = require("markdown-toc");
import { copyToClipboard } from "~/utils/clipboard";
export default {
  components: {
    LandingNav
  },
  head() {
    return {
      title: "hapi.dev - bell Examples",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "View examples for bell"
        }
      ]
    };
  },
  data() {
    return {
      examples: "",
      moduleAPI: moduleInfo,
      menu: "",
      uls: {},
      links: {},
      page: "examples",
      intro: false,
      example: false,
      usage: false,
      faq: false,
      advanced: false
    };
  },
  methods: {
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
        ".example-code-main h3, .example-code-main h4, .example-code-main h5"
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
          `.example-code-main h1 a[href='${links[i].hash}'],
          .example-code-main h2 a[href='${links[i].hash}'],
          .example-code-main h3 a[href='${links[i].hash}'], 
          .example-code-main h4 a[href='${links[i].hash}'],
           .example-code-main h5 a[href='${links[i].hash}']`
        );
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

      let currentElement = document.querySelector(".example-code-main");

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
  async asyncData({ $axios, params }) {
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };
    let tocString = "";
    let finalMenu = "";
    let examplesArray = [];
    const examples = await $axios.$get(
      "https://api.github.com/repos/hapijs/bell/contents/examples",
      options
    );

    for (let example of examples) {
      const exampleCode = await $axios.$get(
        "https://api.github.com/repos/hapijs/bell/contents/examples/" +
          example.name,
        options
      );
      await examplesArray.push({ name: example.name, code: exampleCode });
      tocString =
        (await tocString) +
        "### " +
        example.name.charAt(0).toUpperCase() +
        example.name.slice(1).replace(/\.([^.]+)$/, "") +
        "\n";
    }
    finalMenu = await Toc(tocString, { bullets: "-" }).content;
    return { examplesArray, finalMenu };
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
    this.$data.examples = this.examplesArray;
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
    this.setClasses();
    this.setClipboards();
    this.goToAnchor();
  }
};
</script>

<style lang="scss">
@import "../../../assets/styles/main.scss";
@import "../../../assets/styles/markdown.scss";

.example-code-main {
  width: 100%;
  max-width: calc(100% - 370px);
  margin: 0;
  padding: 20px 40px;
}

.example-code-wrapper {
  width: 100%;
  margin: 0;
}

.example-header {
  margin: 20px 0 0 0;
  border-bottom: 1px solid #ddd;
  border-top: none;
  padding-bottom: 10px;
  width: auto;
  display: inline-block;
}

.example-name {
  font-size: 1.55rem;
  margin: 30px 0 15px 0;
  display: inline-block;
  border-bottom: 1px solid #ddd;
}

.example-wrapper {
  padding-bottom: 30px;
  border-bottom: 1px solid #ddd;
}

pre > code {
  margin-top: -1em;
  display: block;
  word-wrap: break-word;
}

.hljs-meta {
  position: relative;
  left: 0;
}

.hljs-comment {
  color: #9a9a9a;
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
  color: #fff !important;
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

@media screen and (max-width: 900px) {
  .example-code-main {
    max-width: 100%;
    padding: 10px 20px;
  }
}
</style>
