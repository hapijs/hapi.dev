<template>
  <div class="container">
    <FamilyIndexNav
      :search="search"
      :sort="sort"
      @input="onChildInput"
      @search="onChildSearch"
      @clear="onChildClear"
      @change="sortModules"
    />
    <div class="family-grid-wrapper">
      <h1 class="family-header">Family Modules</h1>
      <div class="family-grid">
        <div
          class="family-grid-cell"
          :id="module.name"
          v-for="module in moduleData"
          v-bind:key="module.name"
        >
          <div class="family-grid-text-wrapper">
            <a :href='"/family/" + module.name' class="family-grid-link">
              <div class="family-grid-cell-name">{{module.name}}</div>
            </a>
            <div class="family-grid-cell-slogan" v-html="$md.render(module.slogan)"></div>
          </div>
          <div class="family-grid-cell-stats">
            <div class="stats-wrapper">
              <div class="family-stats">
                <a class="status-link" :href="module.link">
                  <img class="stats-img-github" src="/img/githubLogo.png" alt="github logo" />
                </a>
              </div>
              <div class="family-stats">
                <img class="stats-img-star" src="/img/star.png" alt="star" />
                {{module.stars}}
              </div>
              <div class="family-stats">
                <img class="stats-img-fork" src="/img/fork.png" alt="fork" />
                {{module.forks}}
              </div>
            </div>
            <div class="family-updated">Updated: {{module.updated}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FamilyIndexNav from "~/components/family/FamilyIndexNav.vue";

export default {
  components: {
    FamilyIndexNav
  },
  data() {
    return {
      modules: this.$store.getters.loadModules,
      search: "",
      core: true,
      sort: "name"
    };
  },
  head() {
    return {
      title: "hapi.dev - Family",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "View the APIs for the hapi modules"
        }
      ]
    };
  },
  methods: {
    onChildInput(event) {
      this.$data.search = event.target.value;
      if (this.$data.search === "") {
        let hidden = document.querySelectorAll(".hide");
        for (let hide of hidden) {
          hide.classList.remove("hide");
        }
        document.querySelector(".module-clear-button").classList.add("hide");
      }
    },
    onChildSearch() {
      for (let module of this.moduleData) {
        if (
          !module.name.includes(this.$data.search.toLowerCase()) &&
          !module.slogan.toLowerCase().includes(this.$data.search.toLowerCase())
        ) {
          document.querySelector("#" + module.name).classList.add("hide");
        }
      }
    },
    onChildClear() {
      this.$data.search = "";
    },
    sortModules(value) {
      this.$data.sort = value;
      if (value === "stars" || value === "forks") {
        this.moduleData.sort((a, b) =>
          a[value.toLowerCase()] < b[value] ? 1 : -1
        );
      } else if (value === "name") {
        this.moduleData.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else if (value === "updated") {
        this.moduleData.sort((a, b) => (a.date < b.date ? 1 : -1));
      }
    }
  },
  async asyncData({ params, $axios, route, store }) {
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };
    let moduleData = [];
    for (let module of store.getters.loadModules) {
      try {
        let readme = await $axios.$get(
          "https://api.github.com/repos/hapijs/" +
            module +
            "/contents/README.md",
          options
        );
        let forks = await $axios.$get(
          "https://api.github.com/repos/hapijs/" + module,
          options
        );
        let slogan =
          (await readme.match(/####(.*)/gm)) !== null
            ? await readme.match(/####(.*)/gm)[0].substring(5)
            : "Description coming soon...";
        let date = await new Date(forks.pushed_at);
        moduleData.push({
          name: module,
          slogan: await slogan,
          forks: await Number(forks.forks_count),
          stars: await Number(forks.stargazers_count),
          date: await forks.pushed_at,
          updated: await date.toDateString(),
          link: "https://github.com/hapijs/" + module
        });
      } catch (err) {
        console.log(err);
      }
    }
    return { moduleData };
  },
  created() {
    this.$store.commit("setDisplay", "family");
    const sortedBy = ["name", "stars", "forks", "updated"];
    if (sortedBy.includes(this.$route.query.sort)) {
      this.sortModules(this.$route.query.sort);
    } else {
      this.$router.push({
        query: { sort: "name" }
      });
      this.sortModules("name");
    }
  },
  updated() {
    this.$router.push({
      query: { sort: this.$data.sort }
    });
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/api.scss";

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
    padding: 5px;
  }

.family-grid {
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}
}
</style>