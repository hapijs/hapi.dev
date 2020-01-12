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
              <th class="node-header">Node</th>
              <th class="dependencies-header">Dependencies</th>
              <th class="travis-header">Travis</th>
              <th class="life-header">End of Life</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="repo in newRepos"
              v-bind:key="repo.name"
              class="module-row"
            >
              <td class="module-name">
                {{ repo.name }}
                <a
                  class="module-name-link"
                  :id="repo.name"
                  :href="'#' + repo.name"
                ></a>
              </td>
              <td colspan="6" class="nested-td">
                <table class="nested-table">
                  <tbody class="nested-tbody">
                    <tr
                      v-for="version in repo.versions"
                      v-bind:key="version.name + version.license"
                    >
                      <td class="module-version">
                        <div class="module-version-wrapper">
                          <div class="version-name">{{ version.name }}</div>
                          <a
                            target="_blank"
                            class="version-helmet"
                            :href="
                              getModules.includes(repo.name)
                                ? '/family/' +
                                  repo.name +
                                  '/api?v=' +
                                  version.name
                                : repo.name === 'hapi'
                                ? '/api/?v=' + version.name
                                : 'https://github.com/hapijs/' +
                                  repo.name +
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
                                repo.name +
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
                      <td>{{ version.node }}</td>
                      <td class="status-badge">
                        <img
                          :src="
                            'https://david-dm.org/hapijs/' +
                              repo.name +
                              '.svg?branch=' +
                              version.branch
                          "
                          alt="Dependency Status"
                          class="hide"
                          @load="
                            swapImg(
                              'depend' + repo.name + version.name,
                              version.branch
                            )
                          "
                          :id="'depend' + repo.name + version.name"
                        />
                      </td>
                      <td class="status-badge">
                        <a
                          :href="
                            repo.versions.length > 1
                              ? 'https://travis-ci.org/hapijs/' +
                                repo.name +
                                '/branches'
                              : 'https://travis-ci.org/hapijs/' + repo.name
                          "
                          target="_blank"
                        >
                          <img
                            :src="
                              'https://travis-ci.org/hapijs/' +
                                repo.name +
                                '.svg?branch=' +
                                version.branch
                            "
                            alt="Build Status"
                            class="hide"
                            @load="swapImg('travis' + repo.name + version.name)"
                            :id="'travis' + repo.name + version.name"
                          />
                        </a>
                      </td>
                      <td class="module-life">
                        {{
                          getSemver(repo.name, version.name, version.license)
                        }}
                      </td>
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
const moduleInfo = require("../../static/lib/moduleInfo.json");
let Semver = require("semver");
let Yaml = require("js-yaml");
import _ from "lodash";

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
      newRepos: moduleInfo,
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
      life: life
    };
  },
  computed: {
    getModules() {
      return this.$store.getters.loadModules;
    }
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
    test() {
      return "Hi";
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
  async created() {
    await this.$store.commit("setDisplay", "resources");
    this.$data.newRepos = this.newRepos;
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

.dependencies-header,
.travis-header,
.license-header,
.node-header,
.life-header {
  width: 10.546875%;
  text-align: center !important;
  font-weight: 900;
}

.version-header {
  width: 18.75%;
  text-align: center !important;
  font-weight: 900;
}

.header-module {
  text-align: center !important;
}

.header-row {
  position: relative;
  z-index: 1;
}

.module-name {
  width: 25%;
  border-right: 1px solid $dark-white;
  text-align: center !important;
  vertical-align: middle;
  font-size: 1.15em;
  font-weight: 700;
}

.module-row {
  border-bottom: 3px solid $dark-white;
  background-color: #fff;
}

.module-name {
  position: relative;
}

.module-name-link {
  display: block;
  position: absolute;
  content: "";
  visibility: hidden;
  top: -150px;
  z-index: -5;
}

.module-row:nth-child(odd) {
  background-color: $off-white;
}

.nested-table {
  width: 100%;
}

.nested-table td {
  width: 14.0625%;
  text-align: center !important;
}

.module-license {
  width: 18.75%;
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
  z-index: 1;
}

.status-table th:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  border-bottom: 1px solid $dark-white;
  z-index: 1;
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

.module-version-wrapper a {
  display: flex;
  justify-content: center;
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

.status-nonMaster {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #10872a;
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
    font-size: 14px;
    padding: 10px 0px;
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
