<template>
  <div class="container">
    <FamilyNav
      :moduleAPI="moduleAPI"
      :modules="modules"
      :menu="menu"
      :version="getVersion"
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
      title: "hapi.js - bell"
    };
  },
  data() {
    return {
      display: "",
      version: "",
      menu:""
    };
  },
  methods: {
    onScroll() {
      let links = [];
      links = document.querySelectorAll("#bell a");
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
      return this.moduleAPI.bell.displays[this.getVersion];
    },
    getVersion() {
      return this.$store.getters.loadVersion;
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
    let moduleAPI = {bell: {menus: {}, displays: {}}};
    let version = "";
    let versionsArray = [];

    try {
      let milestones = await $axios.$get(
        "https://api.github.com/repos/hapijs/bell/milestones?state=closed&per_page=100&direction=desc",
        options
      );

      let sortedMilestones = await milestones.sort((a, b) =>
        Semver.compare(b.title, a.title)
      );

      await versionsArray.push(sortedMilestones[0].title);

      let branches = await $axios.$get(
        "https://api.github.com/repos/hapijs/bell/branches",
        options
      );

      for (let branch of branches) {
        if (branch.name.match(/^v+[0-9]+/g)) {
          const v = await $axios.$get(
            "https://api.github.com/repos/hapijs/bell/contents/package.json?ref=" +
              branch.name,
            options
          );
          await versionsArray.push(v.version);
        }
      }
      for (let v of versionsArray) {
        const res = await $axios.$get(
          "https://api.github.com/repos/hapijs/bell/contents/API.md?ref=v" +
            v,
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
        moduleAPI.bell.menus[v] = await finalMenu;
        moduleAPI.bell.displays[v] = await finalHtmlDisplay;
      }
    } catch (err) {
      console.log(err);
    }
    try {
      const r = await $axios.$get(
        "https://api.github.com/repos/hapijs/bell/contents/package.json",
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
    this.$store.commit("setVersion", this.versionsArray[0]);
    this.$data.menu = this.moduleAPI.bell.menus[this.versionsArray[0]];
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