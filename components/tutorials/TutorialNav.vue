<template>
  <div class="tutorial-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="tutorial-top-nav-wrapper">
          <div class="side-nav-title">Tutorials</div>
          <Ads />
          <div class="lang-wrapper">
            <div class="lang-text">Languages:</div>
            <select
              @change="onChange($event)"
              :value="getLanguage"
              class="tutorial-lang-select"
            >
              <option value="en_US">en-US</option>
              <option value="pt_BR">pt-BR</option>
              <option value="ko_KR">ko-KR</option>
              <option value="tr_TR">tr-TR</option>
              <option value="zh_CN">zh-CN</option>
            </select>
          </div>
        </div>
        <div class="side-nav-select-wrapper tutorial-side">
          <ul class="side-nav-select-list">
            <li
              :class="
                $route.params.tutorial === 'gettingstarted' ||
                !$route.params.tutorial
                  ? 'side-nav-select-link side-nav-active'
                  : 'side-nav-select-link'
              "
            >
              <a
                ref="gettingstarted"
                :href="'/tutorials/gettingstarted/?lang=' + getLanguage"
                >Getting Started</a
              >
              <ul
                class="side-nav-select-list"
                v-if="
                  !$route.params.tutorial ||
                    $route.params.tutorial === 'gettingstarted'
                "
              >
                <TutorialNavItem :menu="menu" :name="name" />
              </ul>
            </li>
            <li
              :class="
                $route.params.tutorial === 'expresstohapi'
                  ? 'side-nav-select-link side-nav-active'
                  : 'side-nav-select-link'
              "
            >
              <a
                ref="expresstohapi"
                :href="'/tutorials/expresstohapi/?lang=' + getLanguage"
                >Express Migration</a
              >
              <ul
                class="side-nav-select-list"
                v-if="$route.params.tutorial === 'expresstohapi'"
              >
                <TutorialNavItem :menu="menu" :name="name" />
              </ul>
            </li>
            <li
              :class="
                $route.params.tutorial === 'auth'
                  ? 'side-nav-select-link side-nav-active'
                  : 'side-nav-select-link'
              "
            >
              <a ref="auth" :href="'/tutorials/auth/?lang=' + getLanguage"
                >Authentication</a
              >
              <ul
                class="side-nav-select-list"
                v-if="$route.params.tutorial === 'auth'"
              >
                <TutorialNavItem :menu="menu" :name="name" />
              </ul>
            </li>
            <li
              :class="
                $route.params.tutorial === 'caching'
                  ? 'side-nav-select-link side-nav-active'
                  : 'side-nav-select-link'
              "
            >
              <a ref="caching" :href="'/tutorials/caching/?lang=' + getLanguage"
                >Caching</a
              >
              <ul
                class="side-nav-select-list"
                v-if="$route.params.tutorial === 'caching'"
              >
                <TutorialNavItem :menu="menu" :name="name" />
              </ul>
            </li>
            <li
              :class="
                $route.params.tutorial === 'cookies'
                  ? 'side-nav-select-link side-nav-active'
                  : 'side-nav-select-link'
              "
            >
              <a ref="cookies" :href="'/tutorials/cookies/?lang=' + getLanguage"
                >Cookies</a
              >
              <ul
                class="side-nav-select-list"
                v-if="$route.params.tutorial === 'cookies'"
              >
                <TutorialNavItem :menu="menu" :name="name" />
              </ul>
            </li>
            <li
              :class="
                $route.params.tutorial === 'logging'
                  ? 'side-nav-select-link side-nav-active'
                  : 'side-nav-select-link'
              "
            >
              <a ref="logging" :href="'/tutorials/logging/?lang=' + getLanguage"
                >Logging</a
              >
              <ul
                class="side-nav-select-list"
                v-if="$route.params.tutorial === 'logging'"
              >
                <TutorialNavItem :menu="menu" :name="name" />
              </ul>
            </li>
            <li
              :class="
                $route.params.tutorial === 'plugins'
                  ? 'side-nav-select-link side-nav-active'
                  : 'side-nav-select-link'
              "
            >
              <a ref="plugins" :href="'/tutorials/plugins/?lang=' + getLanguage"
                >Plugins</a
              >
              <ul
                class="side-nav-select-list"
                v-if="$route.params.tutorial === 'plugins'"
              >
                <TutorialNavItem :menu="menu" :name="name" />
              </ul>
            </li>
            <li
              :class="
                $route.params.tutorial === 'routing'
                  ? 'side-nav-select-link side-nav-active'
                  : 'side-nav-select-link'
              "
            >
              <a ref="routing" :href="'/tutorials/routing/?lang=' + getLanguage"
                >Routing</a
              >
              <ul
                class="side-nav-select-list"
                v-if="$route.params.tutorial === 'routing'"
              >
                <TutorialNavItem :menu="menu" :name="name" />
              </ul>
            </li>
            <li
              :class="
                $route.params.tutorial === 'servermethods'
                  ? 'side-nav-select-link side-nav-active'
                  : 'side-nav-select-link'
              "
            >
              <a
                ref="servermethods"
                :href="'/tutorials/servermethods/?lang=' + getLanguage"
                >Server Methods</a
              >
              <ul
                class="side-nav-select-list"
                v-if="$route.params.tutorial === 'servermethods'"
              >
                <TutorialNavItem :menu="menu" :name="name" />
              </ul>
            </li>
            <li
              :class="
                $route.params.tutorial === 'servingfiles'
                  ? 'side-nav-select-link side-nav-active'
                  : 'side-nav-select-link'
              "
            >
              <a
                ref="servingfiles"
                :href="'/tutorials/servingfiles/?lang=' + getLanguage"
                >Serving Static Files</a
              >
              <ul
                class="side-nav-select-list"
                v-if="$route.params.tutorial === 'servingfiles'"
              >
                <TutorialNavItem :menu="menu" :name="name" />
              </ul>
            </li>
            <li
              :class="
                $route.params.tutorial === 'testing'
                  ? 'side-nav-select-link side-nav-active'
                  : 'side-nav-select-link'
              "
            >
              <a ref="testing" :href="'/tutorials/testing/?lang=' + getLanguage"
                >Testing</a
              >
              <ul
                class="side-nav-select-list"
                v-if="$route.params.tutorial === 'testing'"
              >
                <TutorialNavItem :menu="menu" :name="name" />
              </ul>
            </li>
            <li
              :class="
                $route.params.tutorial === 'validation'
                  ? 'side-nav-select-link side-nav-active'
                  : 'side-nav-select-link'
              "
            >
              <a
                ref="validation"
                :href="'/tutorials/validation/?lang=' + getLanguage"
                >Validation</a
              >
              <ul
                class="side-nav-select-list"
                v-if="$route.params.tutorial === 'validation'"
              >
                <TutorialNavItem :menu="menu" :name="name" />
              </ul>
            </li>
            <li
              :class="
                $route.params.tutorial === 'views'
                  ? 'side-nav-select-link side-nav-active'
                  : 'side-nav-select-link'
              "
            >
              <a ref="views" :href="'/tutorials/views/?lang=' + getLanguage"
                >Views</a
              >
              <ul
                class="side-nav-select-list"
                v-if="$route.params.tutorial === 'views'"
              >
                <TutorialNavItem :menu="menu" :name="name" />
              </ul>
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
import TutorialNavItem from "~/components/tutorials/TutorialNavItem.vue";
const page = require("../../static/lib/tutorials/");
import Ads from "~/components/Ads.vue";

export default {
  props: ["language", "menu"],
  computed: {
    getLanguage() {
      return this.$store.getters.loadLanguage;
    }
  },
  data() {
    return {
      links: {},
      uls: {},
      name: this.$route.params.tutorial
        ? this.$route.params.tutorial
        : "gettingstarted"
    };
  },
  methods: {
    onChange(event) {
      this.$emit("changed", event.target.value);
    },
    setClasses() {
      //Set TOC classes
      let anchors = document.querySelectorAll(".tutorial-nav-select-wrapper a");
      let count = 0;
      let store = this.$store;
      let router = this.$router;

      for (let link of anchors) {
        link.classList.add("tutorial-anchor");
        this.links[link.hash] = link.getBoundingClientRect().top;
        link.addEventListener("click", function(event) {
          let currentActive = document.querySelector(".tutorial-active");
          if (currentActive) {
            currentActive.classList.remove("tutorial-active");
          }
          link.classList.add("tutorial-active");
          if (
            link.parentElement.children[1] &&
            link.parentElement.children[1].classList.contains(
              "tutorial-ul-display"
            )
          ) {
            link.parentElement.children[1].classList.remove(
              "tutorial-ul-display"
            );
            link.classList.remove("tutorial-minus");
            link.classList.add("tutorial-plus");
          } else if (
            link.parentElement.children[1] &&
            !link.parentElement.children[1].classList.contains(
              "tutorial-ul-display"
            )
          ) {
            link.parentElement.children[1].classList.add("tutorial-ul-display");
            link.classList.remove("tutorial-plus");
            link.classList.add("tutorial-minus");
          }
        });
      }

      let familyUls = document.querySelectorAll(
        ".tutorial-nav-select-wrapper > ul ul"
      );

      for (let ul of familyUls) {
        this.uls[ul.getBoundingClientRect().top] = {
          name: ul,
          top: ul.getBoundingClientRect().top,
          bottom: ul.getBoundingClientRect().bottom
        };
      }

      let links = document.querySelectorAll("#" + this.name + " a");
      let points = {};
      let offsets = [];
      for (let i = 0; i < links.length; i++) {
        let point = document.querySelector(
          `.markdown-wrapper a[href='${links[i].hash}']`
        );
        if (point) {
          point.id = point.id.replace("user-content-", "");
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
      let currentElement = document.querySelector(".markdown-wrapper ");

      for (let ul of familyUls) {
        ul.parentNode.children[0].classList.remove("tutorial-minus");
        ul.parentNode.children[0].classList.add("tutorial-plus");
        ul.classList.add("tutorial-hide");
      }

      let that = this;

      //Add active class to elements on scroll
      window.onscroll = function() {
        let location = document.documentElement.scrollTop;
        let locationBody = document.body.scrollTop;
        let actives = document.getElementsByClassName("tutorial-active");
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
                active.classList.remove("tutorial-active");
              }
              element = document.querySelector(
                `.side-nav-wrapper a[href='${aClass}']`
              );
              if (element && element.children.length !== 0) {
                document
                  .querySelector(`a[href='${aClass}']`)
                  .classList.add("tutorial-active");
                active = document.querySelector(".tutorial-active");
              } else if (element && element.children.length === 0) {
                document
                  .querySelector(`a[href='${aClass}']`)
                  .classList.add("tutorial-active");
                active = document.querySelector(".tutorial-active");
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
              that.uls[key].name.classList.add("tutorial-ul-display");
              that.uls[key].name.parentElement.children[0].classList.remove(
                "tutorial-plus"
              );
              that.uls[key].name.parentElement.children[0].classList.add(
                "tutorial-minus"
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
  components: {
    SideFooter,
    Ads,
    TutorialNavItem
  },
  mounted() {
    this.setClasses();
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";

.tutorial-nav-window {
  position: -webkit-sticky;
  position: sticky;
  top: 96px;
  bottom: 0;
  width: 370px;
  min-width: 370px;
  max-height: calc(100vh - 96px);
  min-height: calc(100vh - 96px);
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 0 5px 0;
  margin: 0;
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: #f8f8f8;
  border-right: 1px solid $dark-white;
}

.tutorial-top-nav-wrapper {
  padding: 20px 20px 0 20px;
}

.tutorial-side {
  padding-left: 20px;
}

.ads-wrapper {
  padding: 15px 0 0 0;
}

.tutorial-anchor {
  display: inline-block;
  color: $gray;
  font-size: 0.85em;
  height: 100%;
  width: 100%;
  padding: 2px 0;
}

.tutorial-plus,
.tutorial-minus,
.tutorial-plus code,
.tutorial-minus code {
  position: relative;
  color: $orange;
  text-decoration: none;
}

.tutorial-plus:hover,
.tutorial-minus:hover {
  color: $orange;
}

.tutorial-plus:after {
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

.tutorial-minus:after {
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

.tutorial-active,
.tutorial-active * {
  position: relative;
  color: $white !important;
  background: #6f6f6f;
}

.tutorial-active {
  display: inline-block;
  left: -70px;
  padding: 2px 30px 2px 70px !important;
  width: 405px !important;
}

.tutorial-active:after {
  position: absolute;
  left: 53px;
  height: 31px;
}

.tutorial-hide {
  display: none;
}

.tutorial-ul-display {
  display: block !important;
}
</style>
