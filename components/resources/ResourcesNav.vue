<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Resources</div>
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <li class="resources-header-link">
              <nuxt-link
                :class="$props.page === 'changelog' ? 'side-nav-select-link resources-active' : 'side-nav-select-link'"
                to="/resources/changelog"
              >Changelog</nuxt-link>
            </li>
            <li class="resources-header-link">
              <nuxt-link
                :class="$props.page === 'styleguide' ? 'side-nav-select-link resources-active' : 'side-nav-select-link'"
                to="/resources/styleguide"
              >Style Guide</nuxt-link>
            </li>
            <ul class="resources-ul">
              <li class="resources-header-link">
                <a href="/resources/list#books">Books</a>
              </li>
              <li class="resources-header-link">
                <a href="/resources/list#gists">Gists and code samples</a>
              </li>
              <li class="resources-header-link">
                <a href="/resources/list#boilerplates">Boilerplates</a>
              </li>
              <li class="resources-header-link">
                <a href="/resources/list#projects">Projects built with hapi</a>
              </li>
              <li class="resources-header-link">
                <a href="/resources/list#tutorials">Tutorials</a>
              </li>
              <li class="resources-header-link">
                <a href="/resources/list#videos">Videos</a>
              </li>
            </ul>
          </ul>
        </div>
      </div>
      <SideFooter />
    </div>
  </div>
</template>

<script>
import SideFooter from "~/components/Footers/SideFooter.vue";

export default {
  components: {
    SideFooter
  },
  props: ["page"],
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";

.resources-header-link {
  position: relative;
  list-style-type: none;
  margin-bottom: 5px;
}

.resources-ul {
  margin: 0;
}

.side-nav-select-link a {
  display: inline-block;
  font-size: 0.78em;
  width: 100%;
  padding: 5px 0;
  color: $gray;
  margin: 0;
  border-bottom: 1px solid $dark-white;
  cursor: pointer;
}

.side-nav-select-link a:hover {
  text-decoration: none;
}

.resources-active {
  position: relative;
  color: $orange !important;
  font-weight: 900;
  transition: all 0.2s ease;
}

.resources-active:before {
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