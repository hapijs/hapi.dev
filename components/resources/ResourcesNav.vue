<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Resources</div>
        <Ads />
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <li class="resources-header-link">
              <a
                :class="
                  $props.page === 'changelog'
                    ? 'side-nav-select-link resources-active'
                    : 'side-nav-select-link'
                "
                href="/resources/changelog"
                >Changelog</a
              >
            </li>
            <li class="resources-header-link">
              <a
                :class="
                  $props.page === 'status'
                    ? 'side-nav-select-link resources-active'
                    : 'side-nav-select-link'
                "
                href="/resources/status"
                >Module Status</a
              >
            </li>
            <ul class="resources-ul">
              <li class="resources-header-link">
                <a
                  ref="books"
                  :class="$props.page === '#books' ? 'resources-active' : ''"
                  v-on:click="onClick('books')"
                  href="/resources/list#books"
                  >Books</a
                >
              </li>
              <li class="resources-header-link">
                <a
                  ref="gists"
                  :class="$props.page === '#gists' ? 'resources-active' : ''"
                  v-on:click="onClick('gists')"
                  href="/resources/list#gists"
                  >Gists and code samples</a
                >
              </li>
              <li class="resources-header-link">
                <a
                  ref="boilerplates"
                  :class="
                    $props.page === '#boilerplates' ? 'resources-active' : ''
                  "
                  v-on:click="onClick('boilerplates')"
                  href="/resources/list#boilerplates"
                  >Boilerplates</a
                >
              </li>
              <li class="resources-header-link">
                <a
                  ref="projects"
                  :class="$props.page === '#projects' ? 'resources-active' : ''"
                  v-on:click="onClick('projects')"
                  href="/resources/list#projects"
                  >Projects built with hapi</a
                >
              </li>
              <li class="resources-header-link">
                <a
                  ref="tutorials"
                  :class="
                    $props.page === '#tutorials' ? 'resources-active' : ''
                  "
                  v-on:click="onClick('tutorials')"
                  href="/resources/list#tutorials"
                  >Tutorials</a
                >
              </li>
              <li class="resources-header-link">
                <a
                  ref="videos"
                  :class="$props.page === '#videos' ? 'resources-active' : ''"
                  v-on:click="onClick('videos')"
                  href="/resources/list#videos"
                  >Videos</a
                >
              </li>
            </ul>
          </ul>
        </div>
      </div>
      <SideFooter />
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
  props: ["page"],
  methods: {
    onClick(ref) {
      let actives = document.querySelectorAll(".resources-active");
      for (let active of actives) {
        active.classList.remove("resources-active");
      }
    },
    onScroll() {
      let links = [];
      links = document.querySelectorAll(".resources-ul a");
      let points = {};
      let offsets = [];
      for (let i = 0; i < links.length; i++) {
        let point = document.querySelector(
          `.markdown-wrapper h2 a[name*='${links[i].href.replace(
            /^[^_]*#/,
            ""
          )}']`
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
        let actives = document.getElementsByClassName("resources-active");
        let i = 0;
        for (i in offsets) {
          if (offsets[i] <= location || offsets[i] <= locationBody) {
            let aClass = points[offsets[i]].name;
            for (let active of actives) {
              active.classList.remove("resources-active");
            }

            let element = document.querySelector(
              `a[href*='/resources/list${aClass}']`
            );
            if (element.children.length !== 0) {
              document
                .querySelector(`a[href*='/resources/list${aClass}'] *`)
                .classList.add("resources-active");
            } else if (element.children.length === 0) {
              document
                .querySelector(`a[href*='/resources/list${aClass}']`)
                .classList.add("resources-active");
            }
          }
        }
      };
    }
  },
  mounted() {
    this.onScroll();
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";

.resources-header-link {
  position: relative;
  list-style-type: none;
  margin-bottom: 5px;
}

.ads-wrapper {
  padding: 15px 0 0 0;
}

.resources-ul {
  margin: 0;
}

.side-nav-select-link a {
  display: inline-block;
  font-size: 0.78em;
  width: 100%;
  padding: 5px 0;
  color: $gray;
  margin: 0;
  border-bottom: 1px solid $dark-white;
  cursor: pointer;
}

.side-nav-select-link a:hover {
  text-decoration: none;
}

.resources-active {
  position: relative;
  color: $orange !important;
  font-weight: 900;
  transition: all 0.2s ease;
}
</style>
