<template>
  <div class="landing-table-wrapper">
    <table class="landing-table">
      <thead>
        <tr class="header-row">
          <th class="version-header">Version</th>
          <th class="license-header">License</th>
          <th class="node-header">Node</th>
          <th class="dependencies-header">Dependencies</th>
          <th class="travis-header">Travis</th>
          <th class="life-header">End of Life</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="version in module.versions"
          v-bind:key="version.name + version.license"
          class="module-row landing-table-row"
        >
          <td>
            <div class="module-version-wrapper">
              <div class="version-name">{{ version.name }}</div>
              <a
                class="version-helmet"
                :href="
                  newRepos[name][version.name].api
                    ? '/module/' + name + '/api?v=' + version.name
                    : name === 'hapi'
                    ? '/api/?v=' + version.name
                    : 'https://github.com/hapijs/' +
                      name +
                      '/tree/' +
                      version.branch
                "
              >
                <img
                  src="/img/helmet.png"
                  alt="hapi helmet"
                  class="version-img"
                />
              </a>
              <a
                :href="
                  'https://github.com/hapijs/' +
                    name +
                    '/tree/' +
                    version.branch
                "
                target="_blank"
              >
                <img
                  src="/img/githubLogo.png"
                  alt="github logo"
                  class="version-img"
                />
              </a>
            </div>
          </td>
          <td class="module-license">{{ version.license }}</td>
          <td class="table-version">{{ version.node }}</td>
          <td class="status-badge">
            <img
              :src="
                'https://david-dm.org/hapijs/' +
                  name +
                  '.svg?branch=' +
                  version.branch
              "
              alt="Dependency Status"
              class="hide"
              @load="swapImg('depend' + name + version.name, version.branch)"
              :id="'depend' + name + version.name"
            />
          </td>
          <td class="status-badge">
            <a
              :href="
                module.versions.length > 1
                  ? 'https://travis-ci.org/hapijs/' + name + '/branches'
                  : 'https://travis-ci.org/hapijs/' + name
              "
              target="_blank"
            >
              <img
                :src="
                  'https://travis-ci.org/hapijs/' +
                    name +
                    '.svg?branch=' +
                    version.branch
                "
                alt="Build Status"
                class="hide"
                @load="swapImg('travis' + name + version.name)"
                :id="'travis' + name + version.name"
              />
            </a>
          </td>
          <td class="module-life">
            {{ getSemver(name, version.name, version.license) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const life = require("../../static/lib/endOfLife.js");
const moduleInfo = require("../../static/lib/moduleInfo.json");
let Semver = require("semver");
import _ from "lodash";

export default {
  props: ["module", "name"],
  data() {
    return {
      img: {
        0: '<div class="status-code status-unknown"></div>',
        76: '<div class="status-code status-unknown"></div>',
        81: '<div class="status-code status-failing"></div>',
        90: '<div class="status-code status-passing"></div>',
        98: '<div class="status-code status-unknown"></div>',
        126: '<div class="status-code status-passing"></div>',
        149: '<div class="status-code status-unknown"></div>',
        156: '<div class="status-code status-passing"></div>',
        160: '<div class="status-code status-failing"></div>',
        nonMaster: '<div class="status-code status-nonMaster"></div>'
      },
      life: life,
      newRepos: moduleInfo
    };
  },
  methods: {
    getSemver(name, version, license) {
      if (life.endOfLife[_.camelCase(name)] && license !== "Commercial") {
        for (let v in life.endOfLife[_.camelCase(name)]) {
          if (Semver.satisfies(version, v)) {
            return life.endOfLife[_.camelCase(name)][v];
          }
          return null;
        }
      }
    },
    camelName(name) {
      return _.camelCase(name);
    },
    async swapImg(id, branch) {
      let badge = await document.getElementById(id);
      if (branch === "master" || !branch) {
        badge.parentNode.innerHTML = await this.img[badge.naturalWidth];
      } else {
        badge.parentNode.innerHTML = await this.img["nonMaster"];
      }
    }
  },
  computed: {
    getModules() {
      return this.$store.getters.loadModules;
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/statusTable.scss";

.landing-table-wrapper {
  width: 80%;
  min-width: 700px;
  margin: 0;
}

.landing-table {
  margin: 0;
}

.landing-table .version-header {
  width: 16.6%;
}

.landing-table .travis-header,
.landing-table .license-header,
.landing-table .node-header,
.landing-table .life-header {
  width: 16.6%;
  text-align: center;
  font-weight: 900;
}

.landing-table tbody {
  border: 3px solid $dark-white;
}

.landing-table-row td {
  padding: 10px;
}

.landing-table-row .module-license,
.table-version {
  text-align: center !important;
}

.landing-table-row .status-badge {
  vertical-align: middle;
}

.module-life {
  text-align: center !important;
}
</style>
