<template>
  <div class="container">
    <FamilyNav
      :moduleAPI="moduleAPI"
      :modules="modules"
      :menu="getMenu"
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
      title: "hapi.js - " + this.$route.params.family + " v" + this.getVersion,
      meta: [
        { hid: "description", name: "description", content: "View the APIs for the hapi modules" }
      ]
    };
  },
  data() {
    return {
      display: "",
      modules: this.modules,
      version: "",
      menu: ""
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
        let element;
        let i = 0;
        for (i in offsets) {
          if (offsets[i] <= location || offsets[i] <= locationBody) {
            let aClass = points[offsets[i]].name;
            for (let active of actives) {
              active.classList.remove("ecosystem-active");
            }

            element = document.querySelector(
              `.side-nav-wrapper a[href*='${aClass}']`
            );
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
        let bottom = element.getBoundingClientRect().bottom;
        if (bottom > window.innerHeight) {
          element.scrollIntoView(false);
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
    getMenu() {
      return this.moduleAPI[this.$route.params.family].menus[this.getVersion];
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
    moduleAPI[params.family] = { menus: {}, displays: {}, versions: {} };
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

      moduleAPI[params.family].versions[sortedMilestones[0].title] = "master";
      versionsArray.push(sortedMilestones[0].title);

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
          if (v.version === sortedMilestones[0].title) {
            moduleAPI[params.family].versions[sortedMilestones[0].title] =
              branch.name;
          } else if (!versionsArray.includes(v.version)) {
            moduleAPI[params.family].versions[v.version] = branch.name;
            await versionsArray.push(v.version);
          }
        }
      }
      for (let v of versionsArray) {
        const res = await $axios.$get(
          "https://api.github.com/repos/hapijs/" +
            params.family +
            "/contents/API.md?ref=" +
            moduleAPI[params.family].versions[v],
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
        moduleAPI[params.family].menus[v] = await finalMenu;
        moduleAPI[params.family].displays[v] = await finalHtmlDisplay;
      }
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

    versionsArray = await versionsArray.sort((a, b) => Semver.compare(b, a));

    return { moduleAPI, modules, version, versionsArray };
  },
  created() {
    let version = this.versionsArray.includes(this.$route.query.v)
      ? this.$route.query.v
      : this.versionsArray[0];
    this.$store.commit("setDisplay", "family");
    this.$store.commit("setVersion", version);
    (!this.$route.query.v ||
      !this.versionsArray.includes(this.$route.query.v)) &&
      this.$router.push({
        path: this.$route.path,
        query: { v: this.versionsArray[0] }
      });
    this.$data.menu = this.moduleAPI[this.$route.params.family].menus[
      this.getVersion
    ];
  },
  mounted() {
    this.onScroll();
    this.goToAnchor();
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