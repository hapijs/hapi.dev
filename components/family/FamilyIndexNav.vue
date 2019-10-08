<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Family</div>
        <div class="family-module-search">
          <input
            class="family-module-search-box"
            :value="search"
            v-on:keyup.enter="onSearch"
            @input="onInput($event)"
            placeholder="Search Modules"
          />
          <div class="family-module-search-img" v-on:click="onSearch"></div>
        </div>
      </div>
      <SideFooter />
    </div>
  </div>
</template>

<script>
import SideFooter from "~/components/Footers/SideFooter.vue";

export default {
  props: ["search"],
  components: {
    SideFooter
  },
  methods: {
    onInput(event) {
      this.$emit("input", event.target.value);
    },
    onSearch() {
      if (this.search !== "") {
        this.$emit("search");
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";

.family-module-search {
  position: relative;
  padding-right: 20px;
  width: 100%;
  margin-top: 20px;
}

.family-module-search-box {
  height: 30px;
  outline: none;
  padding: 10px;
  border: 1px solid $dark-white;
  width: 100%;
  font-size: 0.85rem;
}

.family-module-search-img {
  position: absolute;
  background: url("/img/search.png") no-repeat;
  background-position: center;
  background-color: #fff;
  background-size: contain;
  padding: 10px;
  right: 20px;
  top: 0px;
  border-top: 1px solid $dark-white;
  border-right: 1px solid $dark-white;
  border-bottom: 1px solid $dark-white;
  height: 30px;
  width: 30px;
  z-index: 25;
  cursor: pointer;
}
</style>