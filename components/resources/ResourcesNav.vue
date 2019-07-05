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
                <a ref="books" v-on:click="onClick('books')" href="/resources/list#books">Books</a>
              </li>
              <li class="resources-header-link">
                <a ref="gists" v-on:click="onClick('gists')" href="/resources/list#gists">Gists and code samples</a>
              </li>
              <li class="resources-header-link">
                <a ref="boilerplates" v-on:click="onClick('boilerplates')" href="/resources/list#boilerplates">Boilerplates</a>
              </li>
              <li class="resources-header-link">
                <a ref="projects" v-on:click="onClick('projects')" href="/resources/list#projects">Projects built with hapi</a>
              </li>
              <li class="resources-header-link">
                <a ref="tutorials" v-on:click="onClick('tutorials')" href="/resources/list#tutorials">Tutorials</a>
              </li>
              <li class="resources-header-link">
                <a ref="videos" v-on:click="onClick('videos')" href="/resources/list#videos">Videos</a>
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
  methods: {
    onClick(ref) {
      let actives = document.querySelectorAll(".resources-active");
      for (let active of actives) {
        active.classList.remove("resources-active");
      }
      this.$refs[ref].classList.add("resources-active");
    }
  }
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
</style>