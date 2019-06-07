<template>
  <header>
    <nav role="navigation" class="navbar">
      <div class="nav-container">
        <a class="logo" href="/" title="Back to home" aria-label="hapi-logo"/>
        <div class="nav-collapse">
          <ul class="nav-links">
            <li class="nav-links-li">
              <a :class="getDisplay === 'tutorials' ? 'nav-link nav-link-active' : 'nav-link'" ref="tutorials" title="Tutorials" href="/tutorials" v-on:click="addActive('tutorials')">Tutorials</a>
            </li>
            <li class="nav-links-li">
              <a :class="getDisplay === 'api' ? 'nav-link nav-link-active' : 'nav-link'" ref="api" title="API" href="/api" v-on:click="addActive('api')">API</a>
            </li>
            <li class="nav-links-li">
              <a :class="getDisplay === 'plugins' ? 'nav-link nav-link-active' : 'nav-link'" ref="plugins" title="Plugins" href="/plugins"  v-on:click="addActive('plugins')">Plugins</a>
            </li>
            <li class="nav-links-li">
              <a :class="getDisplay === 'resources' ? 'nav-link nav-link-active' : 'nav-link'" ref="resources" title="Resources" href="/resources" v-on:click="addActive('resources')">Resources</a>
            </li>
            <li class="nav-links-li">
              <a :class="getDisplay === 'ecosystem' ? 'nav-link nav-link-active' : 'nav-link'" ref="ecosystem" title="Ecosystem" href="/ecosystem" v-on:click="addActive('ecosystem')">Ecosystem</a>
            </li>
            <li class="nav-links-li">
              <a :class="getDisplay === 'community' ? 'nav-link nav-link-active' : 'nav-link'" ref="contribute" title="Contribute" href="/community" v-on:click="addActive('community')">Community</a>
            </li>
            <li class="nav-links-li">
              <a :class="getDisplay === 'help' ? 'nav-link nav-link-active' : 'nav-link'" ref="help" title="Help" href="/help" v-on:click="addActive('help')">Help</a>
            </li>
          </ul>
        </div>
        <a href="javascript:void(0);" class="hamburger" aria-label="hamburger" v-on:click="showNav()">
          <span class="hamburger-line hamburger-line-upper"/>
          <span class="hamburger-line hamburger-line-middle"/>
          <span class="hamburger-line hamburger-line-lower"/>
        </a>
      </div>
      <div ref="mobileNav" class="mobile-nav-wrapper">
        <MobileNav/>
      </div>
    </nav>
  </header>
</template>

<script>
import MobileNav from "./MobileNav.vue";

export default {
  components: {
    MobileNav
  },
  computed: {
    getDisplay() {
      return this.$store.getters.loadDisplay;
    }
  },
  methods: {
    showNav() {
      this.$refs.mobileNav.classList.add("show-nav");
    },
    addActive(ref) {
      this.$store.commit('setDisplay', ref)
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";

.navbar {
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 10px 50px;
  background: #fff;
}

.nav-container {
  position: relative;
  height: 100%;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-nav-wrapper {
  display: none;
  transition: all 0.5s ease-in-out;
}

.logo {
  background: url("/img/hapi.svg") no-repeat 0 0;
  background-size: contain;
  height: 75px;
  width: 100px;
  margin: 0;
}

.nav-collapse {
  margin: 0;
}

.nav-links {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-links-li {
  display: inline-block;
  margin: 0;
}

.nav-link {
  position: relative;
  margin: 10px;
  color: $orange;
  font-weight: 700;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 5px 0;
  text-decoration: none;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
}

.nav-link:hover {
  color: $orange;
  text-decoration: none;
}

.nav-link:before, .nav-link-active:before {
  width: 0;
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: $orange;
  -webkit-transition: 0.15s linear;
  transition: 0.15s linear;
}

.nav-link:after, .nav-link-active:after {
  width: 0;
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: $orange;
  -webkit-transition: 0.15s linear;
  transition: 0.15s linear;
}

.nav-link:hover:after,
.nav-link:hover:before,
.nav-link-active:before,
.nav-link-active:after {
  width: 100%;
}

.hamburger {
  position: absolute;
  display: none;
}

.hamburger-line {
  display: block;
  margin: 5px 0;
  width: 20px;
  height: 2px;
  border-radius: 5px;
  background: $black;
}

@media screen and (max-width: 900px) {
  .navbar {
    position: fixed;
    top: 0;
    height: 50px;
    width: 100%;
    max-width: 100vw;
    padding: 5px 0;
    border-bottom: 1px solid $dark-white;
  }

  .nav-container {
    justify-content: center;
  }

  .logo {
    height: 50px;
    width: calc(100px * (2 / 3));
    margin: 0 auto;
  }

  .nav-collapse {
    display: none;
  }

  .mobile-nav-wrapper {
    margin: 0;
    display: block;
    position: absolute;
    top: 0px;
    left: -220px;
    width: 220px;
    height: 100vh;
    background: $off-white;
    border-right: 1px solid $dark-white;
    z-index: 10;
    overflow-y: auto;
  }

  .show-nav {
    left: 0;
  }

  .hamburger {
    display: inline-block;
    left: 20px;
    top: 8px;
  }
}
</style>
