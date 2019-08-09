<template>
  <div class="container">
    <FamilyNav
      :moduleAPI="moduleAPI"
      :modules="modules"
      :version="version"
      :versions="versionsArray"
    />
    <div class="tutorial-markdown-window">
      <HTML :display="getDisplay" />
    </div>
  </div>
</template>

<script>
import HTML from "~/components/HTML.vue";
import FamilyNav from "~/components/family/FamilyNav.vue";
let Semver = require("semver");

export default {
  components: {
    HTML,
    FamilyNav
  },
  head() {
    return {
      title: "hapi.js - " + this.$route.params.family
    };
  },
  data() {
    return {
      display: "",
      modules: this.modules
    };
  },
  methods: {
    onScroll() {
      let links = [];
      links = document.querySelectorAll("#" + this.$route.params.family + " a");
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
      offsets = [...new Set(offsets)];

      let currentElement = document.querySelector(".markdown-wrapper");
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
                .querySelector(`a[href*='${aClass}']`)
                .classList.add("ecosystem-active");
            } else if (element.children.length === 0) {
              document
                .querySelector(`a[href*='${aClass}']`)
                .classList.add("ecosystem-active");
            }
          }
        }
        // if (
        //   currentElement.offsetHeight ===
        //   location + window.innerHeight - 96
        // ) {
        //   let index = modules.indexOf(this.$nuxt.$route.params.family);
        //   this.$nuxt.$router.push({
        //     path: "/family/" + modules[index + 1]
        //   });
        // }
      };
    }
  },
  computed: {
    getDisplay() {
      return this.moduleAPI[this.$route.params.family].display;
    }
  },
  async asyncData({ params, $axios, route }) {
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
    let version = "";
    let versionsArray = [];

    try {
      let milestones = await $axios.$get(
        "https://api.github.com/repos/hapijs/" +
          params.family +
          "/milestones?state=closed&per_page=100&direction=desc",
        options
      );

      let sortedMilestones = await milestones.sort((a, b) =>
        Semver.compare(b.title, a.title)
      );

      await versionsArray.push(sortedMilestones[0].title);

      let branches = await $axios.$get(
        "https://api.github.com/repos/hapijs/" + params.family + "/branches",
        options
      );

      for (let branch of branches) {
        if (branch.name.match(/^v+[0-9]+/g)) {
          const v = await $axios.$get(
            "https://api.github.com/repos/hapijs/" +
              params.family +
              "/contents/package.json?ref=" +
              branch.name,
            options
          );
          if (versionsArray.indexOf(v.version)) {
            await versionsArray.push(v.version);
          }
        }
      }
      const res = await $axios.$get(
        "https://api.github.com/repos/hapijs/" +
          params.family +
          "/contents/API.md",
        options
      );

      let raw = await res;
      let rawString = await raw.toString();

      //Split API menu from content
      let finalDisplay = await rawString
        .replace(/\/>/g, "></a>")
        .replace(/.\s\[(?:.+[\n\r])+/, "");
      let finalMenu = await rawString.match(/.\s\[(?:.+[\n\r])+/).pop();
      finalMenu = await finalMenu.replace(/Boom\./g, "");
      finalMenu = await finalMenu.replace(/\(([^#\*]+)\)/g, "()");
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
      moduleAPI[params.family] = {
        display: await finalHtmlDisplay,
        menu: await finalMenu
      };
    } catch (err) {
      console.log(err.message);
    }
    try {
      const r = await $axios.$get(
        "https://api.github.com/repos/hapijs/" +
          params.family +
          "/contents/package.json",
        options
      );
      version = await r.version;
    } catch (err) {
      console.log(err);
    }

    return { moduleAPI, modules, version, versionsArray };
  },
  created() {
    this.$store.commit("setDisplay", "family");
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