<template>
  <div class="container">
    <ResourcesNav page="status" />
    <div class="module-status-wrapper">
      <h2 class="resources-header">Module Status</h2>
      <div class="module-status-table-wrapper">
        <table class="status-table">
          <thead>
            <tr class="header-row">
              <th class="header-module">Module</th>
              <th class="version-header">Version</th>
              <th class="license-header">License</th>
              <th class="dependencies-header">Dependencies</th>
              <th class="travis-header">Travis Build</th>
              <th class="life-header">End of Life</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="repo in newRepos" v-bind:key="repo.name" class="module-row">
              <td class="module-name">{{repo.name}}</td>
              <td colspan="5" class="nested-td">
                <table class="nested-table">
                  <tbody class="nested-tbody">
                    <tr v-for="version in repo.versions" v-bind:key="version.name">
                      <td class="module-version">
                        <div class="module-version-wrapper">
                          <div class="version-name">{{version.name}}</div>
                          <a
                            target="__blank"
                            class="version-helmet"
                            :href='apiModules.includes(repo.name) ? "/family/" + repo.name + "/?v=" + version.name : (repo.name === "hapi" ? "/api/?v=" + version.name : ("https://github.com/hapijs/" + repo.name + "/tree/" + version.branch))'
                          ><img src="/img/helmet.png" alt="hapi helmet" class="version-img"></a>
                          <a :href='"https://github.com/hapijs/" + repo.name + "/tree/" + version.branch' target="__blank"><img src="/img/githubLogo.png" alt="github logo" class="version-img"></a>
                        </div>

                      </td>
                      <td>{{version.license}}</td>
                      <td class="status-badge">
                        <img
                          :src='"https://david-dm.org/hapijs/" + repo.name + ".svg?branch=" + version.branch'
                          alt="Dependency Status" class="hide" @load="swapImg('depend' + repo.name + version.name)" :id='"depend" + repo.name + version.name'
                        />
                      </td>
                      <td class="status-badge" >
                        <a :href='repo.versions.length > 1 ? "https://travis-ci.org/hapijs/" + repo.name + "/branches" : "https://travis-ci.org/hapijs/" + repo.name' target="__blank">
                          <img
                            :src='"https://travis-ci.org/hapijs/" + repo.name + ".svg?branch=" + version.branch'
                            alt="Build Status" class="hide" @load="swapImg('travis' + repo.name + version.name)" :id='"travis" + repo.name + version.name'
                          />
                        </a>
                      </td>
                      <td class="module-life">{{ life.endOfLife[camelName(repo.name)] && life.endOfLife[camelName(repo.name)][version.name] ? life.endOfLife[camelName(repo.name)][version.name] : null }}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ResourcesNav from "../../components/resources/ResourcesNav.vue";
const life = require("../../static/lib/endOfLife.js");
let Semver = require("semver");
import _ from 'lodash';

export default {
  components: {
    ResourcesNav
  },
  head() {
    return {
      title: "hapi.dev - Module Status",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "View hapi's module status"
        }
      ]
    };
  },
  data() {
    return {
      page: "status",
      img: {
        0: '<div class="status-code status-unknown"></div>',
        81: '<div class="status-code status-failing"></div>',
        90: '<div class="status-code status-passing"></div>',
        98: '<div class="status-code status-unknown"></div>',
        126: '<div class="status-code status-passing"></div>',
        149: '<div class="status-code status-unknown"></div>',
        156: '<div class="status-code status-passing"></div>',
        160: '<div class="status-code status-failing"></div>'
      },
      apiModules: [
        "bell",
        "boom",
        "good",
        "hoek",
        "iron",
        "joi",
        "shot",
        "topo",
        "yar"
      ],
      life: life
    };
  },
  methods: {
    camelName(name) {
      return _.camelCase(name)
    },
    async swapImg(id) {
      let badge = await document.getElementById(id)
      badge.parentNode.innerHTML = await this.img[badge.naturalWidth]
    }
  },
  async asyncData({ params, $axios }) {
    let repos = {};
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };
    try {
      let repositories = await $axios.$get(
        "https://api.github.com/orgs/hapijs/repos?per_page=100",
        options
      );
      for (let r = 0; r < repositories.length; ++r) {
        let milestones = await $axios.$get(
          "https://api.github.com/repos/hapijs/" +
            repositories[r].name +
            "/milestones?state=closed&per_page=100&direction=desc",
          options
        );
        if (milestones.length > 0) {
          let sortedMilestones = await milestones.sort(function(a, b) {
            if (!Semver.valid(a.title)) {
              a.title = Semver.clean(a.title + ".0", { loose: true });
            }
            return Semver.compare(b.title, a.title);
          });
          repos[repositories[r].name] = {
            name: repositories[r].name,
            versions: []
          };
          let branches = await $axios.$get(
            "https://api.github.com/repos/hapijs/" +
              repositories[r].name +
              "/branches",
            options
          );
          for (let branch of branches) {
            if (branch.name.match(/^v+[0-9]+|\bmaster\b/g)) {
              const v = await $axios.$get(
                "https://api.github.com/repos/hapijs/" +
                  repositories[r].name +
                  "/contents/package.json?ref=" +
                  branch.name,
                options
              );
              repos[repositories[r].name].versions.push({
                name: v.version,
                branch: branch.name,
                license: v.name.includes("commercial") ? "Commercial" : "BSD"
              });
              if (
                v.version === repos[repositories[r].name].versions[0].name &&
                branch.name !== "master"
              ) {
                repos[repositories[r].name].versions.shift();
              }
            }
            await repos[repositories[r].name].versions.sort(function(a, b) {
              return Semver.compare(b.name, a.name);
            });
          }
        } else if (
          repositories[r].name !== "assets" &&
          repositories[r].name !== ".github"
        ) {
          let a = await $axios.$get(
            "https://api.github.com/repos/hapijs/" +
              repositories[r].name +
              "/contents/package.json",
            options
          );
          repos[repositories[r].name] = {
            name: repositories[r].name,
            versions: []
          };
          let version = await a.version;
          repos[repositories[r].name].versions.push({
            name: version,
            branch: "master",
            license: a.name.includes("commercial") ? "Commercial" : "BSD"
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
    const orderedRepos = {};
    Object.keys(repos)
      .sort()
      .forEach(function(key) {
        orderedRepos[key] = repos[key];
      });

    let hapi = orderedRepos.hapi;

    delete orderedRepos.hapi;

    let newRepos = Object.assign({hapi}, orderedRepos);

    return { newRepos };
  },
  async created() {
    await this.$store.commit("setDisplay", "resources");
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/markdown.scss";

.module-status-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 100px;
  margin: 0;
  width: 100%;
}

.module-status-table-wrapper {
  margin: 0;
  width: 100%;
}

.status-table {
  width: 100%;
  margin-top: 16px;
  min-width: 800px;
  position: relative;
}

.dependencies-header, .travis-header, .license-header, .life-header {
  width: 14.125%;
  text-align: center;
  font-weight: 900;
}

.version-header {
  width: 18.5%;
  text-align: center;
  font-weight: 900;
}

.header-module {
  text-align: center;
}

.module-name {
  width: 25%;
  border-right: 1px solid $dark-white;
  text-align: center;
  vertical-align: middle;
  font-size: 1.15em;
  font-weight: 700;
}

.module-row {
  border-bottom: 3px solid $dark-white;
  background-color: #fff;
}

.module-row:nth-child(odd) {
  background-color: $off-white;
}

.nested-table {
  width: 100%;
}

.nested-table td {
  width: 18.75%;
  text-align: center;
}

.module-version {
  width: 25% !important;
}

.status-table th {
  padding: 10px;
  font-size: 1.15em;
  position: sticky;
  top: 90px;
  background-color: #fff;
}

.status-table th:after {
    content:'';
    position:absolute;
    left: 0;
    bottom: -1px;
    width:100%;
    border-bottom: 1px solid $dark-white;
}

.status-table td {
  padding: 10px;
}

.status-table tbody {
  border: 3px solid $dark-white;
}

.nested-tbody {
  border: none !important;
}

.nested-tbody td {
  vertical-align: middle;
}

.nested-td {
  box-sizing: border-box;
  padding: 0 !important;
}

.nested-tbody tr:not(:last-child) {
  border-bottom: 1px solid $dark-white;
}

.module-version-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.version-name {
  color: $orange;
  font-weight: 700;
}

.module-version-wrapper * {
  margin: 0;
}

.version-helmet {
  padding: 0 20px;
}

.version-img {
  width: 20px;
  min-width: 20px;
}

.status-link {
  font-weight: 700;
}

.status-passing {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #1dd022;
}

.status-failing {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e80013;
}

.status-unknown {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #797979;
}

.hide {
  display: hidden;
}

@media screen and (max-width: 1500px) {
  .module-status-wrapper {
    padding: 20px 40px;
  }

  .status-table th {
    font-size: 16px;
  }

  .module-name {
    font-size: 16px;
  }

  .status-table td {
    padding: 10px 5px;
}
}

@media screen and (max-width: 900px) {
  .module-status-wrapper {
    padding: 10px 10px 0 10px;
    overflow-x: auto;
  }

  .status-table {
    margin-right: 10px;
  }

  .status-table th {
    padding: 0;
    font-size: 12px;
  }
}
</style>