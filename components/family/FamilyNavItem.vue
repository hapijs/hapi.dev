<template>
  <li
    :class="this.$route.params.family === name || (!this.$route.params.family && name === 'bell') ? 'side-nav-select-link ecosystem-side-nav-item side-nav-active' : 'side-nav-select-link ecosystem-side-nav-item'"
    :ref="name"
  >
    <a :href="'/family/' + name">{{name}}</a>
    <span
      v-if="this.$route.params.family === name || (!this.$route.params.family && name === 'bell')"
      class="family-span"
    >
      <select @change="onChange($event)" class="family-version-select" :value="version">
        <option v-for="version in versions" v-bind:key="version" :value="version">{{version}}</option>
      </select>
    </span>
    <div
      v-if="this.$props.active[name]"

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
  },
  mounted() {
    let active = document.querySelector(".side-nav-active");
    active.scrollIntoView(true);
  }
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


.family-display {
  display: block;
}

</style>
