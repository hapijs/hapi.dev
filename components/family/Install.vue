<template>
  <div class="install-wrapper">
    <div class="install-header">Installation:</div>
    <p class="install-how"><a class="install-link" target="__blank" :href='"https://www.npmjs.com/package/@hapi/" + name'>npm</a>: <span><code>npm install @hapi/{{name}}</code></span></p>
    <p class="install-how"><a class="install-link" target="__blank" :href='"https://yarnpkg.com/en/package/@hapi/" + name'>yarn</a>: <span><code>yarn add @hapi/{{name}}</code></span></p>
  </div>
</template>

<script>
export default {
  props: ["name"],
}
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/api.scss";

.install-wrapper {
  margin: 20px 100px 0 100px;
  border: 1px solid #ddd;
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
    margin: 20px 40px 0 40px;
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