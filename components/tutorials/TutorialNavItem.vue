<template>
  <li
    :class="
      $route.params.tutorial === $props.name
        ? 'side-nav-select-link family-side-nav-item side-nav-active'
        : 'side-nav-select-link family-side-nav-item'
    "
    v-if="this.$props.menu !== ''"
  >
    <div
      class="tutorial-nav-select-wrapper family-display"
      :id="$props.name"
      v-html="$md.render(this.$props.menu)"
    ></div>
  </li>
</template>

<script>
export default {
  props: ["menu", "name"]
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";

.family-side-nav-item {
  margin: 0 !important;
}

.family-side-nav-item:hover {
  text-decoration: none !important;
}

.tutorial-nav-select-wrapper {
  display: none;
  width: 100%;
  font-weight: 400;
  margin: 0 0 10px 20px;
}

.tutorial-nav-select-wrapper li {
  list-style-type: none;
  text-decoration: none;
  margin: 0;
  color: $gray;
}

.tutorial-nav-select-wrapper ul {
  margin: 0;
}

.tutorial-nav-select-wrapper li ul {
  margin-left: 10px;
}

.tutorial-nav-select-wrapper ul li {
  color: $gray !important;
  margin: 0;
  list-style-type: none;
}

.family-display {
  display: block;
}
</style>
