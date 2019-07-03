<template>
  <div class="container">
    <ResourcesNav :list="true" />
    <div class="markdown-window">
      <Resources />
    </div>
  </div>
</template>

<script>
import Resources from "../../components/resources/Resources.vue";
import ResourcesNav from "../../components/resources/ResourcesNav.vue";
export default {
  components: {
    Resources,
    ResourcesNav
  },
  head() {
    return {
      title: "hapi.js - Resources"
    };
  },
  created() {
    this.$store.commit("setDisplay", "resources");
  },
  methods: {
    onScroll() {
      let links = [];
      links = document.querySelectorAll(".resources-ul a");
      let points = {};
      let offsets = [];
      for (let i = 0; i < links.length; i++) {
        let point = document.querySelector(
          `.markdown-wrapper h2 a[name*='${links[i].href.replace(/^[^_]*#/, "")}']`
        );
        if (point && point.name) {
          points[point.offsetTop - 20] = {
            name: "#" + point.name
          };
          offsets.push(point.offsetTop - 20);
        }
      }
      offsets = [...new Set(offsets)];

      console.log(points);
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

            let element = document.querySelector(`a[href*='/resources/list${aClass}']`);
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
@import "../../assets/styles/main.scss";

.markdown-window {
  position: relative;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0;
}

.markdown-wrapper a {
  position: relative;
}

.resources-book {
  position: absolute;
  top: -12px;
  right: -50px;
  height: 50px;
  max-width: none;
  border: 1px solid $dark-white;
}
</style>