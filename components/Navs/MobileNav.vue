<template>
  <div ref="nav" class="mobile-nav">
    <img src="/img/close.png" class="mobile-close" v-on:click="closeNav()"/>
    <ul class="mobile-links">
      <li class="mobile-links-li">
        <a class="mobile-link" title="Home" href="/">Home</a>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Tutorials" href="/tutorials">Tutorials</a>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="API" href="/api">API</a>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Resources" href="/resources">Resources</a>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Plugins" href="/plugins">Plugins</a>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Contribute" href="/community">Community</a>
      </li>
      <li class="mobile-links-li">
        <a class="mobile-link" title="Help" href="/help">Help</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    closeNav() {
      this.$refs.nav.parentNode.classList.remove("show-nav");
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";

.mobile-nav {
  width: 100%;
}

.mobile-close {
  margin-bottom: 20px;
  width: 15px;
  cursor: pointer;
}

.mobile-links {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: block;
}

.mobile-links-li {
  display: block;
  padding: 5px 0;
  margin: 0 0 10px 0;
}

.mobile-link {
  position: relative;
  margin: 10px;
  color: $orange;
  font-size: 16px;
  font-weight: 400;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 5px 0;
  text-decoration: none;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
}

</style>