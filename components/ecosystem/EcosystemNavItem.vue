<template>
  <li
    class="side-nav-select-link ecosystem-side-nav-item"
    :ref="name"
    v-on:click.self="onChangePage(name)"
  >
    {{name.charAt(0).toUpperCase(0) + name.slice(1)}}
    <div
      :class="getPage === name ? 'ecosystem-nav-select-wrapper ecosystem-display' : 'ecosystem-nav-select-wrapper'"
      :id="name"
      v-html="$md.render(this.$props.menu)"
    ></div>
  </li>
</template>

<script>
export default {
  props: ["menu", "name", "page"],
  computed: {
    getPage() {
      return this.$store.getters.loadEcosystem;
    }
  },
  methods: {
    onChangePage(ref) {
      if (this.$refs[ref].classList.contains("ecosystem-side-nav-item")) {
        this.$store.commit("setEcosystem", ref);
        document.querySelector(".side-nav-window").scrollTo(0, 0);
        window.scrollTo(0, 0);
      }
    }
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
  margin: 0;
  list-style-type: none;
}

.ecosystem-nav-select-wrapper a:hover,
.ecosystem-nav-select-wrapper a code:hover {
  color: $orange;
  text-decoration: none;
}

.ecosystem-nav-select-wrapper a {
  display: inline-block;
  color: $gray;
  font-size: 0.78em;
  width: 100%;
  padding: 5px 0;
  border-bottom: 1px solid $dark-white;
}

.ecosystem-nav-select-wrapper a code {
  background: $off-white;
  color: $gray;
  font-family: "Open Sans", sans-serif;
  font-size: 1em;
  padding: 0;
}

.ecosystem-display {
  display: block !important;
  height: auto;
  transition: all 0.3 ease;
}

.ecosystem-active {
  position: relative;
  color: $orange !important;
  transition: all 0.2s ease;
}

.ecosystem-active:before {
  content: "";
  position: absolute;
  background: url("/img/arrow.png") no-repeat;
  background-position: center;
  background-size: contain;
  top: 0;
  bottom: 0;
  left: -30px;
  margin: auto;
  height: 20px;
  width: 20px;
  z-index: 100;
  display: block;
  animation: arrow 0.4s;
}

@keyframes arrow {
  from {
    transform: rotate(-90deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
</style>
