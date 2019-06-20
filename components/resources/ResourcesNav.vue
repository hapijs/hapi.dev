<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Resources</div>
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <li class="resources-header-link">
              <a :class="$props.list ? 'side-nav-select-link resources-minus resources-selected' : 'side-nav-select-link resources-plus'" href="/resources">List</a>
              <ul :class="$props.list ? 'resources-ul' : 'resources-ul hide-ul'">
                <li class="resources-link">
                  <a href="#books">Books</a>
                </li>
                <li class="resources-link">
                  <a href="#gists">Gists and code samples</a>
                </li>
                <li class="resources-link">
                  <a href="#boilerplates">Boilerplates</a>
                </li>
                <li class="resources-link">
                  <a href="#projects">Projects built with hapi</a>
                </li>
                <li class="resources-link">
                  <a href="#tutorials">Tutorials</a>
                </li>
                <li class="resources-link">
                  <a href="#videos">Videos</a>
                </li>
              </ul>
            </li>
            <li :class="!$props.list ? 'side-nav-select-link resources-selected' : 'side-nav-select-link'">
              <a href="/resources/changelog">Changelog</a>
            </li>
          </ul>
        </div>
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
  props: ["list"],
  methods: {
    onScroll() {
      let links = [];
      links = document.querySelectorAll(".resources-ul a");
      let points = {};
      let offsets = [];
      for (let i = 0; i < links.length; i++) {
        let point = document.querySelector(
          `.markdown-wrapper a[name*='${links[i].href.replace(/^[^_]*#/, "")}']`
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

            let element = document.querySelector(`a[href*='${aClass}']`);
            if (element.children.length !== 0) {
              document
                .querySelector(`a[href*='${aClass}'] *`)
                .classList.add("resources-active");
            } else if (element.children.length === 0) {
              document
                .querySelector(`a[href*='${aClass}']`)
                .classList.add("resources-active");
            }
          }
        }
      };
    },
  },
  mounted() {
    if(this.$props.list){
      this.onScroll();
    }
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

.resources-ul {
  margin: 5px 0px 5px 10px;
}

.hide-ul {
  display: none;
}

.resources-link {
  display: inline-block;
  font-size: 0.9em;
  width: 100%;
  padding: 5px 0;
  margin: 0;
  border-bottom: 1px solid $dark-white;
  cursor: pointer;
}

.resources-link a {
  color: $gray;
}

.resources-link a:hover {
  text-decoration: none;
}

.resources-plus:after {
  content: "\002B";
  position: relative;
  font-size: 20px;
  top: 2px;
  left: 5px;
  height: 15px;
  width: 15px;
  z-index: 100;
  display: inline-block;
}

.resources-minus:after {
  content: "\2212";
  position: relative;
  font-size: 20px;
  top: 2px;
  left: 5px;
  height: 15px;
  width: 15px;
  z-index: 100;
  display: inline-block;
}

.resources-selected {
  font-weight: 700;
}

.resources-active {
  position: relative;
  color: $orange !important;
  transition: all 0.2s ease;
}

.resources-active:before {
  content: "";
  position: absolute;
  background: url("/img/arrow.png") no-repeat;
  background-position: center;
  background-size: contain;
  top: 0;
  bottom: 0;
  left: -30px;
  margin: auto;
  height: 20px;
  width: 20px;
  z-index: 100;
  display: block;
  animation: arrow 0.4s;
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
</style>