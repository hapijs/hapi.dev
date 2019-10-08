<template>
  <div class="container">
    <FamilyIndexNav />
    <div class="family-grid-wrapper">
      <h1>Family Modules</h1>
      <div class="family-grid">
        <div class="family-grid-cell" v-for="module in modules" v-bind:key="module">
          <div class="family-grid-cell-name">{{module}}</div>
          <div class="family-grid-cell-slogan" v-html="$md.render(moduleData[module])"></div>
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
      modules: this.$store.getters.loadModules
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
        let slogan = await readme.match(/####(.*)/gm) !== null ? await readme.match(/####(.*)/gm)[0].substring(5) : "";
        moduleData[module] = await slogan
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
@import "../../assets/styles/markdown.scss";

.family-grid-wrapper {
  padding: 20px 100px 10px 100px;
}

.family-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}

.family-grid-cell {
  border: 1px solid $dark-white;
  padding: 10px 15px;
  margin: 0;
}
</style>