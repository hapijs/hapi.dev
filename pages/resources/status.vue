<template></template>

<script>
let Semver = require("semver");

export default {
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
            if(!Semver.valid(a.title)){
              a.title = Semver.clean(a.title + ".0", {loose: true})
            }
            return Semver.compare(b.title, a.title);
          });
          repos[repositories[r].name] = {
            versions: [{
                name: sortedMilestones[0].title,
                branch: 'master',
                license: 'BSD' 
            }],
          };
          let branches = await $axios.$get(
            "https://api.github.com/repos/hapijs/" +
              repositories[r].name +
              "/branches",
            options
          );
          for (let branch of branches) {
            if (branch.name.match(/^v+[0-9]+/g)) {
              const v = await $axios.$get(
                "https://api.github.com/repos/hapijs/" +
                  repositories[r].name +
                  "/contents/package.json?ref=" +
                  branch.name,
                options
              );
              repos[repositories[r].name].versions.push({name: v.name, branch: branch.name, lincense: branch.name.includes("commercial") ? "Commercial" : "BSD"})
              if (v.version === sortedMilestones[0].title) {
                repos[repositories[r].name].versions.unshift()
              }
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }

    return { repos };
  },
  created() {
    console.log(this.repos);
  }
};
</script>

<style>
</style>