<template>
  <li
    :class="this.$route.params.family === name ? 'side-nav-select-link family-side-nav-item side-nav-active' : 'side-nav-select-link family-side-nav-item'"
    :ref="name"
  >
    <div
      class="family-nav-select-wrapper family-display"
      :id='name'
      :key='version'
      v-html="$md.render(this.$props.menu)"
    ></div>
  </li>
</template>

<script>
export default {
  props: ["active", "name", "page", "version", "versions", "menu"],
  methods: {
    onChange(event) {
      this.$emit("change", event.target.value);
    },
  }
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

.family-nav-select-wrapper {
  display: none;
  width: 100%;
  font-weight: 400;
  margin: 0 0 10px 20px;
}

.family-nav-select-wrapper li {
  list-style-type: none;
  text-decoration: none;
  margin: 0;
  color: $gray;
}

.family-nav-select-wrapper ul {
  margin: 0;
}

.family-nav-select-wrapper li ul {
  margin-left: 10px;
}

.family-nav-select-wrapper ul li {
  color: $gray !important;
  margin: 0;
  list-style-type: none;
}

.family-display {
  display: block;
}

</style>
