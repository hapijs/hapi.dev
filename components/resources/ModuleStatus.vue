<template>
  <div class="status-wrapper">
    <div class="module-wrapper">
      <h2 class="module-name">{{name}}</h2>
      <div class="module-info-wrapper">
        <table class="status-table">
          <thead>
            <tr>
              <th>Version</th>
              <th>Dependencies</th>
              <th>Travis Build</th>
              <th>License</th>
              <th>End of Life</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="version in versions" v-bind:key="version.name">
              <td><a target="__blank" class="status-link" :href='apiModules.includes(name) ? "/family/" + name + "/?v=" + version.name : "https://github.com/hapijs/" + name + "/tree/" + version.branch'> {{version.name}}</a></td>
              <td class="status-badge">
                <img
                  :src='"https://david-dm.org/hapijs/" + name + ".svg?branch=" + version.branch'
                  alt="Dependency Status"
                />
              </td>
              <td class="status-badge">
                <img
                  :src='"https://travis-ci.org/hapijs/" + name + ".svg?branch=" + version.branch'
                  alt="Build Status"
                />
              </td>
              <td>{{version.license}}</td>
              <td>{{life.endOfLife[camelName][version.name] && life.endOfLife[camelName][version.name]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
const life = require("../../static/lib/endOfLife.js");
import _ from 'lodash';

export default {
  props: ["name", "versions"],
  data() {
    return {
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
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/markdown.scss";

.status-wrapper {
  display: block;
  margin: 0;
  width: 100%;
  padding: 15px 0;
}

.module-wrapper {
  display: flex;
  flex-direction: column;
}

.module-name {
  margin: 20px 0 10px;
  border-bottom: 1px solid #ddd;
  border-top: none;
  padding-bottom: 10px;
}

.module-info-wrapper {
  margin: 0;
}

.status-table {
  width: 100%;
}

.status-table td,
.status-table th {
  width: 20%;
}

.status-table th {
  padding: 0 10px;
}

.status-table td {
  padding: 10px;
  background-color: $off-white;
}

.status-table tr:nth-child(even) {
  border: 1px solid $dark-white;
}

.status-table tbody {
  border: 1px solid $dark-white;
}

.status-link {
  font-weight: 700;
}
</style>