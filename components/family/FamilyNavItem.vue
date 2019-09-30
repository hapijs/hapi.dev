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
      class="ecosystem-nav-select-wrapper ecosystem-display"
      :id="name"
      v-html="$md.render(this.$props.menu)"
    ></div>
  </li>
</template>

<script>
export default {
  props: ["active", "name", "page", "version", "versions", "menu"],
  methods: {
    async onChange(event) {
      this.$store.commit("setVersion", event.target.value);
      await this.$router.push({ path: this.$route.path, query: { v: event.target.value } });
      window.scrollTo(0, 0);
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

.ecosystem-display {
  display: block !important;
  height: auto;
  transition: all 0.3 ease;
}

.ecosystem-active,
.ecosystem-active * {
  position: relative;
  color: #fff !important;
  background: $gray !important;
  height: 31px;
}

.ecosystem-active {
  display: inline-block;
  left: -70px;
  padding: 2px 30px 2px 70px !important;
  width: 402px !important;
  overflow-wrap: break-word;
}

</style>
