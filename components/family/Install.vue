<template>
  <div class="install-wrapper">
    <div class="install-header">Installation:</div>
    <p class="install-how"><a class="install-link" target="__blank" :href='moduleAPI[name][routeQuery].license === "Commercial" ? "https://www.npmjs.com/package/@commercial/" + name : "https://www.npmjs.com/package/@hapi/" + name'>npm</a>: <span><code>{{moduleAPI[name][routeQuery].license === "Commercial" ? "npm install @commercial/" + name : "npm install @hapi/" + name}}</code></span></p>
    <p class="install-how"><a class="install-link" target="__blank" :href='moduleAPI[name][routeQuery].license === "Commercial" ? "https://yarnpkg.com/en/package/@commercial/" + name : "https://yarnpkg.com/en/package/@hapi/" + name'>yarn</a>: <span><code>{{moduleAPI[name][routeQuery].license === "Commercial" ? "yarn add @commercial/" + name : "yarn add @hapi/" + name}}</code></span></p>
  </div>
</template>

<script>
export default {
  props: ["name", "moduleAPI", "version"],
  computed: {
    routeQuery() {
      return this.$store.getters.loadVersion
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/api.scss";

.install-wrapper {
  margin: 20px 100px 10px 100px;
  border: 1px solid $dark-white;
  padding: 10px;
  background: #f8f8f8;
}

.install-header {
  font-size: 28px;
}

.install-link {
  font-weight: 700;
}

@media screen and (max-width: 1500px) {
  .install-wrapper {
    margin: 20px 40px 10px 40px;
  }
}

@media screen and (max-width: 900px) {
  .install-wrapper {
    margin: 20px 10px 0 10px;
  }

  .install-header {
    font-size: 24px;
  }
}

</style>