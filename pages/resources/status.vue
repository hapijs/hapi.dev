<template>
  <div class="container">
    <ResourcesNav page="status" />
    <div class="module-status-wrapper">
      <h1 class="module-status-header">Module Status</h1>
      <div class="module-status-table-wrapper">
        <table class="status-table">
          <thead>
            <tr class="header-row">
              <th class="header-module">Module</th>
              <th class="version-header">Version</th>
              <th class="dependencies-header">Dependencies</th>
              <th class="travis-header">Travis Build</th>
              <th class="license-header">License</th>
              <th class="life-header">End of Life</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="repo in orderedRepos" v-bind:key="repo.name" class="module-row">
              <td class="module-name">{{repo.name}}</td>
              <td colspan="5" class="nested-td">
                <table class="nested-table">
                  <tbody class="nested-tbody">
                    <tr v-for="version in repo.versions" v-bind:key="version.name">
                      <td>
                        <a
                          target="__blank"
                          class="status-link"
                          :href='apiModules.includes(repo.name) ? "/family/" + repo.name + "/?v=" + version.name : "https://github.com/hapijs/" + repo.name + "/tree/" + version.branch'
                        >{{version.name}}</a>
                      </td>
                      <td class="status-badge">
                        <!-- <object :data='"https://david-dm.org/hapijs/" + repo.name + ".svg?branch=" + version.branch' :id='"dependSVG-" + repo.name'></object> -->
                        <img
                          :src='"https://david-dm.org/hapijs/" + repo.name + ".svg?branch=" + version.branch'
                          alt="Dependency Status"
                        />
                      </td>
                      <td class="status-badge">
                        <img
                          :src='"https://travis-ci.org/hapijs/" + repo.name + ".svg?branch=" + version.branch'
                          alt="Build Status"
                        />
                      </td>
                      <td>{{version.license}}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <!-- <td>{{life.endOfLife[camelName][version.name] && life.endOfLife[camelName][version.name]}}</td> -->
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
        0: '<div class="status-code staus-unknown">Pending</div>',
        81: '<div><code class="status-code status-failing">Failing</code></div>',
        90: '<div><code class="status-code status-passing">Passing</code></div>',
        98: '<div><code class="status-code status-unknown">Unknown</code></div>',
        126: '<div><code class="status-code status-passing">No Dependencies</code></div>',
        156: '<div><code class="status-code status-passing">Up to Date</code></div>'
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
      life: life,
      camelName: _.camelCase(this.name)
    };
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

    return { orderedRepos };
  },
  async created() {
    await this.$store.commit("setDisplay", "resources");
  },
  mounted() {
    let tagsInterval = setInterval(() => {
      let exit = true;
      let tags = document.querySelectorAll(".status-table img");
      for (let tag of tags){
        tag.parentNode.innerHTML = this.img[tag.naturalWidth]
        if (tag.naturalWidth === 0) {
          exit = false
        }
    }
      if(exit) {
        clearInterval(tagsInterval)
      }
    }, 2000)

  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/markdown.scss";

svg {
  display: none !important;
}

g text:nth-child(-n + 2) {
  display: none !important;
}

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

.module-status-header {
  margin: 20px 0 30px;
  border-bottom: 1px solid #ddd;
  border-top: none;
  padding-bottom: 10px;
}

.status-table {
  width: 100%;
}

.header-row {
  width: 100%
}

.module-header {
  width: 20%;
}

.version-header, .dependencis-header, .travis-header, .license-header, .life-header {
  width: 16%;
}

.header-module {
  text-align: center;
}

.module-name {
  width: 20%;
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
  width: 20%;
}

.status-table th {
  padding: 0 10px;
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

.nested-td {
  box-sizing: border-box;
  padding: 0 !important;
}

.nested-tbody tr:not(:last-child) {
  border-bottom: 1px solid $dark-white;
}

.status-link {
  font-weight: 700;
}

.status-code {
  font-family: 'inconsolata', menlo, consolas, monospace;
  padding: 0.2rem 0.33rem;
  color: $black;
  background-color: #f3f3f3;
}

.status-passing {
  border: 2px solid #4bc51d;
}

.status-failing {
  border: 2px solid #d50112;
}

.status-unknown {
  border: 2px solid $gray;
}
</style>