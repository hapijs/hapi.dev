<template>
  <div class="container">
    <FamilyIndexNav :search="search" @input="onChildInput" @search="onChildSearch" @clear="onChildClear"/>
    <div class="family-grid-wrapper">
      <h1 class="family-header">Family Modules</h1>
      <div class="family-grid">
        <div class="family-grid-cell" :id='module' v-for="module in modules" v-bind:key="module">
          <div class="family-grid-text-wrapper">
            <a :href='"/family/" + module' class="family-grid-link"><div class="family-grid-cell-name">{{module}}</div></a>
            <div class="family-grid-cell-slogan" v-html="$md.render(moduleData[module].slogan)"></div>
          </div>
          <div class="family-grid-cell-stats">
            <div class="family-stats"><span><img class="stats-img-star" src="/img/star.png" alt="star"></span>{{moduleData[module].stars}}</div>
            <div class="family-stats"><span><img class="stats-img-fork" src="/img/fork.png" alt="fork"></span>{{moduleData[module].forks}}</div>
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
      search: ""
    }
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
    onChildInput(value){
      this.$data.search = value;
    },
    onChildSearch(){
      for (let module of this.$data.modules) {
        if (!module.includes(this.$data.search.toLowerCase())) {
          document.querySelector("#" + module).classList.add("hide");
        }
      }
    },
    onChildClear() {
      this.$data.search = "";
    }
  },
  async asyncData({ params, $axios, route, store }) {
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };
    let moduleData = {}
    for (let module of store.getters.loadModules) {
      try {
        let readme = await $axios.$get(
          "https://api.github.com/repos/hapijs/" + 
            module + "/contents/README.md", options
        )
        let forks = await $axios.$get(
          "https://api.github.com/repos/hapijs/" +
            module, options
        )
        let slogan = await readme.match(/####(.*)/gm) !== null ? await readme.match(/####(.*)/gm)[0].substring(5) : "Description coming soon...";
        moduleData[module] = {
          slogan: await slogan,
          forks: await forks.forks_count,
          stars: await forks.stargazers_count
        }
      } catch (err) {
        console.log(err)
      }
    }
    return { moduleData }
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/api.scss";

.family-grid-wrapper {
  padding: 20px 100px 10px 100px;
}

.family-header {
  margin-bottom: 30px;
  font-size: 2rem;
}

.family-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  font-size: .95em;
}

.family-grid-cell-stats {
  position: relative;
  bottom: 0;
  display: flex;
  align-items: center;
  margin: 0;
}

.family-stats {
  margin: 10px 0 0 0;
  padding-right: 30px;
}

.stats-img-star {
  height: 15px;
  margin-right: 5px;
}

.stats-img-fork {
  height: 14px;
  margin-right: 5px;
}
</style>