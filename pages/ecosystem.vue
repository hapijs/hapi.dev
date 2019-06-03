<template>
  <div class="container">
    <EcosystemNav :page="getEcosystem" :moduleAPI="moduleAPI" :modules="modules"/>
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
      title: "hapi.js - " + this.$store.getters.loadEcosystem
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
        "#" + this.$store.getters.loadEcosystem + " a"
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
        let actives = document.getElementsByClassName("ecosystem-active");
        let i = 0;
        for (i in offsets) {
          if (offsets[i] <= location) {
            let aClass = points[offsets[i]].name;
            console.log(aClass)
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
    getEcosystem() {
      return this.$store.getters.loadEcosystem;
    },
    getDisplay() {
      this.$data.display = this.moduleAPI[
        this.$store.getters.loadEcosystem
      ].display;
      return this.$data.display;
    }
  },
  async asyncData({ params, $axios }) {
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

    for (let module of modules) {
      try {
        const res = await $axios.$get(
          "https://api.github.com/repos/hapijs/" + module + "/contents/API.md",
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
        moduleAPI[module] = {
          display: await finalHtmlDisplay,
          menu: await finalMenu
        };
      } catch (err) {
        console.log(err);
      }
    }
    return { moduleAPI, modules };
  },
  created() {
    this.$data.display = this.moduleAPI.bell;
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
@import "../assets/styles/main.scss";
@import "../assets/styles/api.scss";

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