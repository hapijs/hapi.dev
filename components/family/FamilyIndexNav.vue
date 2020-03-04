<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Modules</div>
        <Ads />
        <div class="family-sort-wrapper">
          <div>Sort By:</div>
          <select @change="onChange($event)" class="family-sort" :value="sort">
            <option value="name">Name</option>
            <option value="stars">Stars</option>
            <option value="forks">Forks</option>
            <option value="updated">Updated</option>
          </select>
        </div>
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
        <button class="module-clear-button hide" v-on:click="onClear">
          Clear
        </button>
      </div>
      <SideFooter />
    </div>
  </div>
</template>

<script>
import SideFooter from "~/components/Footers/SideFooter.vue";
import Ads from "~/components/Ads.vue";

export default {
  props: ["search", "sort"],
  components: {
    SideFooter,
    Ads
  },
  methods: {
    onInput(event) {
      this.$emit("input", event);
    },
    onSearch() {
      if (this.search !== "") {
        this.$emit("search");
        document.querySelector(".module-clear-button").classList.remove("hide");
      }
    },
    onClear() {
      let hidden = document.querySelectorAll(".hide");
      for (let hide of hidden) {
        hide.classList.remove("hide");
      }
      document.querySelector(".module-clear-button").classList.add("hide");
      this.$emit("clear");
    },
    onChange(event) {
      this.$emit("change", event.target.value);
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";

.family-checkbox-wrapper {
  display: flex;
  align-items: center;
  margin: 10px 0 0 0;
}

#module-checkbox {
  margin-right: 10px;
}

.ads-wrapper {
  padding: 15px 0 0 0;
}

.family-sort-wrapper {
  display: flex;
  align-items: center;
  margin: 10px 0 0 0;
}

.family-sort {
  width: 90px;
  padding: 0 5px;
  margin-left: 10px;
  border: none;
  height: 30px;
  font-size: 0.91em;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(/img/down.png) 96%/12% no-repeat $white;
  border: 1px solid $dark-white;
  cursor: pointer;
}

.family-module-search {
  position: relative;
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
  border-radius: 0;
  -webkit-appearance: none;
}

.family-module-search-img {
  position: absolute;
  background: url("/img/search.png") no-repeat;
  background-position: center;
  background-color: $white;
  background-size: contain;
  padding: 10px;
  right: 0;
  top: 0px;
  border-top: 1px solid $dark-white;
  border-right: 1px solid $dark-white;
  border-bottom: 1px solid $dark-white;
  height: 30px;
  width: 30px;
  z-index: 25;
  cursor: pointer;
}

.module-clear-button {
  outline: 0;
  border: 1px solid $dark-white;
  background: $white;
  padding: 4px 10px;
  color: #333;
  cursor: pointer;
  margin: 10px 0 0 0;
}
</style>
