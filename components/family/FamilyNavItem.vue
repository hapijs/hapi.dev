<template>
  <li
    :class="this.$route.params.family === name || (!this.$route.params.family && name === 'bell') ? 'side-nav-select-link ecosystem-side-nav-item side-nav-active' : 'side-nav-select-link ecosystem-side-nav-item'"
    :ref="name"
  >
    <a :href="'/family/' + name">{{name.charAt(0).toUpperCase(0) + name.slice(1)}}</a>
    <span v-if="this.$route.params.family === name || (!this.$route.params.family && name === 'bell')" class="family-span">v{{version}}</span>
    <div
      v-if="this.$props.active[name]"
      class="ecosystem-nav-select-wrapper ecosystem-display"
      :id="name"
      v-html="$md.render(this.$props.active[name].menu)"
    ></div>
  </li>
</template>

<script>
export default {
  props: ["active", "name", "page", "version"],
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";

.ecosystem-side-nav-item {
  margin: 0 !important;
}

.ecosystem-side-nav-item:hover {
  text-decoration: none !important;
}

.ecosystem-nav-select-wrapper {
  display: none;
  width: 100%;
  font-weight: 400;
  margin: 0 0 10px 10px;
}

.ecosystem-nav-select-wrapper li {
  list-style-type: none;
  text-decoration: none;
  margin: 0;
  color: $gray;
}

.ecosystem-nav-select-wrapper ul {
  margin: 0;
}

.ecosystem-nav-select-wrapper li ul {
  margin-left: 10px;
}

.ecosystem-nav-select-wrapper ul li {
  color: $gray !important;
  margin: 0;
  list-style-type: none;
}

.ecosystem-nav-select-wrapper a:hover,
.ecosystem-nav-select-wrapper a code:hover {
  text-decoration: underline;
}

.ecosystem-nav-select-wrapper a {
  display: inline-block;
  color: $gray;
  font-size: 0.85em;
  height: 100%;
  width: 100%;
  padding: 2px 0;
}

.ecosystem-nav-select-wrapper a:hover {
  color: $gray;
}

.ecosystem-nav-select-wrapper a code {
  background: $off-white;
  color: $gray;
  font-family: "Open Sans", sans-serif;
  font-size: 1em;
  padding: 0;
  border: none;
}

.ecosystem-display {
  display: block !important;
  height: auto;
  transition: all 0.3 ease;
}

.ecosystem-active, .ecosystem-active * {
  position: relative;
  color: #fff !important;
  background: $gray !important;
  height: 31px;
}

.ecosystem-active {
  display: inline-block;
  left: -60px;
  padding: 0 30px 0 60px !important;
  width: 375px !important;
  overflow-wrap: break-word;
}

.family-span {
  font-size: 1rem;
  color: #333;
  font-weight: 400;
}

</style>
