<template>
  <div class="container">
    <PluginsNav />
    <div class="family-grid-wrapper">
      <h1 class="hapi-header">Plugins</h1>
      <p>
        There are dozens of plugins for hapi, ranging from documentation to authentication,
        and much more. If you wrote or use a plugin that you don't see on this list, please
        send us a <a href="https://github.com/hapijs/hapi.dev/blob/master/static/lib/plugins.md">pull request</a>.
      </p>
      <p>
        <img src="/img/family.svg" class="plugins-logo-top">
        -   Designates an offical hapi family plugin
      </p>
      <div :id="category.name + 1"
        v-for="category in categories"
        v-bind:key="category.name">
      <h2><a :name="category.name.toLowerCase()"></a> {{ category.name }}</h2>
      <div class="family-grid">
        <div
          class="family-grid-cell"
          :id="module.name + 1"
          v-for="module in category.modules"
          v-bind:key="module.name"
        >
          <div class="family-grid-text-wrapper">
            <a :href="module.link" class="family-grid-link">
              <div class="family-grid-cell-name">
                {{ module.name }}
              </div>
            </a>
            <img v-if="module.isHapi" src="/img/family.svg" class="plugins-logo" />
            <div class="family-grid-cell-slogan">{{ module.description }}</div>
          </div>
          <div class="family-grid-cell-stats">
            <div class="stats-wrapper">
              <div class="family-stats">
                <a class="status-link" :href="module.github || module.link">
                  <img
                    class="stats-img-github"
                    src="/img/githubLogo.png"
                    alt="github logo"
                  />
                </a>
              </div>
              <div class="family-stats" v-if="modules[module.name]">
                <img class="stats-img-star" src="/img/star.png" alt="star" />
                {{ modules[module.name].stars }}
              </div>
              <div class="family-stats" v-if="modules[module.name]">
                <img class="stats-img-fork" src="/img/fork.png" alt="fork" />
                {{ modules[module.name].forks }}
              </div>
            </div>
            <div class="family-updated" v-if="modules[module.name]">Updated: {{ modules[module.name].updated }}</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import PluginsNav from "~/components/plugins/PluginsNav.vue";
const plugins = require("../static/lib/plugins.json");
const modules = require("../static/lib/moduleInfo.json");

export default {
  components: {
    PluginsNav
  },
  data() {
    return {
      categories: plugins,
      modules
    };
  },
  head() {
    return {
      title: "Plugins - hapi.dev",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "View the hapi plugins"
        }
      ]
    };
  },
  created() {
    this.$store.commit("setDisplay", "plugins");
  },
  mounted() {}
};
</script>

<style lang="scss">
@import "../assets/styles/main.scss";
@import "../assets/styles/api.scss";
@import "../assets/styles/markdown.scss";

section {
  max-height: calc(100% - 88px);
}

.markdown-wrapper a {
  position: relative;
}

.plugins-logo {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 35px;
  height: 35px;
  max-width: none;
}

.plugins-logo-top {
  position: relative;
  top: 10px;
  width: 35px;
  height: 35px;
  max-width: none;
}

.family-grid-wrapper {
  padding: 20px 100px;
  width: 100%;
}
.family-header {
  margin-bottom: 30px;
  font-size: 2rem;
}
.family-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 20px;
  margin-top: 1.5em;
}
.family-grid-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid $dark-white;
  padding: 10px 15px;
  margin: 0;
  background: $off-white;
}
.family-grid-text-wrapper {
  margin: 0;
}
.family-grid-cell-name {
  color: $orange;
  font-size: 1.2em;
  font-weight: 700;
}
.family-grid-link:hover {
  color: $orange;
}
.family-grid-cell-slogan {
  font-size: 0.95em;
}
.family-grid-cell-slogan p {
  margin: 0;
}
.family-grid-cell-stats {
  position: relative;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 0 0;
  width: 100%;
}
.stats-wrapper {
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 0.9em;
}
.family-stats {
  display: flex;
  align-items: center;
}
.family-stats:nth-child(-n + 2) {
  padding-right: 20px;
}
.status-link {
  display: inline-block;
  height: 18px;
  margin: 0;
}
.stats-img-github {
  height: 18px;
}
.stats-img-star {
  height: 16px;
  margin-right: 5px;
}
.stats-img-fork {
  height: 14px;
  margin-right: 5px;
}
.family-updated {
  font-size: 0.8em;
  font-style: italic;
  justify-self: flex-end;
  margin: 0;
}
@media screen and (max-width: 1500px) {
  .family-grid-wrapper {
    padding: 20px 40px;
  }
}
@media screen and (max-width: 900px) {
  .family-grid-wrapper {
    padding: 20px;
  }
  .family-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  .family-grid-cell-slogan p {
    font-size: 0.97em;
  }
}

@media (prefers-color-scheme: dark) {
  .family-grid-cell {
    background: $blacker;
    border: 1px solid #000;
  }
}
</style>
