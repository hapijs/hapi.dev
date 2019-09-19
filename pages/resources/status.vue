<template>
  <div class="container">
    <ResourcesNav page="status" />
    <div class="module-status-wrapper">
      <h1 class="module-status-header">Module Status</h1>
      <ModuleStatus
        v-for="repo in orderedRepos"
        v-bind:key="repo.name"
        :name="repo.name"
        :versions="repo.versions"
      />
    </div>
  </div>
</template>

<script>
import ResourcesNav from "../../components/resources/ResourcesNav.vue";
import ModuleStatus from "../../components/resources/ModuleStatus.vue";
let Semver = require("semver");

export default {
  components: {
    ResourcesNav,
    ModuleStatus
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
      page: "status"
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

.module-status-header {
  margin: 20px 0 10px;
  border-bottom: 1px solid #ddd;
  border-top: none;
  padding-bottom: 10px;
}
</style>