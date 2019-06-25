<template>
  <div class="container">
    <EcosystemNav :moduleAPI="moduleAPI" :modules="modules"/>
    <div class="tutorial-markdown-window">
      <HTML :display="getDisplay"/>
    </div>
  </div>
</template>

<script>
import HTML from "~/components/HTML.vue";
import EcosystemNav from "~/components/ecosystem/EcosystemNav.vue";

export default {
  components: {
    HTML,
    EcosystemNav
  },
  head() {
    return {
      title: "hapi.js - bell"
    };
  },
  data() {
    return {
      display: ""
    };
  },
  methods: {
    onScroll() {
      let links = [];
      links = document.querySelectorAll(
        "#bell a"
      );
      let points = {};
      let offsets = [];
      for (let i = 0; i < links.length; i++) {
        let point = document.querySelector(
          `.markdown-wrapper a[href*='${links[i].href.replace(/^[^_]*#/, "")}']`
        );
        if (point && point.id) {
          points[point.offsetTop - 70] = {
            name: "#" + point.id
          };
          offsets.push(point.offsetTop - 70);
        }
      }
      offsets = [...new Set(offsets)]

      //Add active class to elements on scroll
      window.onscroll = function() {
        let location = document.documentElement.scrollTop;
        let locationBody = document.body.scrollTop;
        let actives = document.getElementsByClassName("ecosystem-active");
        let i = 0;
        for (i in offsets) {
          if (offsets[i] <= location || offsets[i] <= locationBody) {
            let aClass = points[offsets[i]].name;
            for (let active of actives) {
              active.classList.remove("ecosystem-active");
            }

            let element = document.querySelector(`a[href*='${aClass}']`);
            if (element.children.length !== 0) {
              document
                .querySelector(`a[href*='${aClass}'] *`)
                .classList.add("ecosystem-active");
            } else if (element.children.length === 0) {
              document
                .querySelector(`a[href*='${aClass}']`)
                .classList.add("ecosystem-active");
            }
          }
        }
      };
    }
  },
  computed: {
    getDisplay() {
      return this.moduleAPI.bell.display;
    }
  },
  async asyncData({ params, $axios, query }) {
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };
    const modules = [
      "bell",
      "boom",
      "good",
      "hoek",
      "iron",
      "joi",
      "shot",
      "topo",
      "yar"
    ];
    let moduleAPI = {};

      try {
        const res = await $axios.$get(
          "https://api.github.com/repos/hapijs/bell/contents/API.md",
          options
        );
        let raw = await res;
        let rawString = await raw.toString();

        //Split API menu from content
        let finalDisplay = await rawString
          .replace(/\/>/g, "></a>")
          .replace(/.\s\[(?:.+[\n\r])+/, "");
        let finalMenu = await rawString.match(/.\s\[(?:.+[\n\r])+/).pop();
        const apiHTML = await $axios.$post(
          "https://api.github.com/markdown",
          {
            text: finalDisplay,
            mode: "markdown"
          },
          {
            headers: {
              authorization: "token " + process.env.GITHUB_TOKEN
            }
          }
        );
        let apiString = await apiHTML.toString();
        let finalHtmlDisplay = await apiString.replace(/user-content-/g, "");
        moduleAPI.bell = {
          display: await finalHtmlDisplay,
          menu: await finalMenu
        };
      } catch (err) {
        console.log(err);
      }
    return { moduleAPI, modules };
  },
  created() {
    this.$data.display = this.moduleAPI.bell;
    this.$store.commit('setDisplay', 'ecosystem')
  },
  mounted() {
    this.onScroll();
  },
  updated() {
    this.onScroll();
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/api.scss";

.ecosystem-title {
  margin: 20px 0 -16px 100px;
  padding-bottom: 16px;
  box-sizing: border-box;
  border-bottom: 1px solid $dark-white;
  display: inline-block;
}

@media screen and (max-width: 900px) {
  .ecosystem-title {
    margin: 20px 0 0 0;
    padding-bottom: 16px;
  }
}
</style>