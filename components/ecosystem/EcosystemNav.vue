<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Ecosystem</div>
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list">
            <li
              class="side-nav-select-link side-nav-active"
              ref="bell"
              v-on:click="onChangePage('bell')"
            >Bell</li>
            <li class="side-nav-select-link" ref="boom" v-on:click="onChangePage('boom')">Boom</li>
            <li class="side-nav-select-link" ref="good" v-on:click="onChangePage('good')">Good</li>
            <li class="side-nav-select-link" ref="hoek" v-on:click="onChangePage('hoek')">Hoek</li>
            <li class="side-nav-select-link" ref="iron" v-on:click="onChangePage('iron')">Iron</li>
            <li class="side-nav-select-link" ref="joi" v-on:click="onChangePage('joi')">Joi</li>
            <li class="side-nav-select-link" ref="shot" v-on:click="onChangePage('shot')">Shot</li>
            <li class="side-nav-select-link" ref="topo" v-on:click="onChangePage('topo')">Topo</li>
            <li class="side-nav-select-link" ref="yar" v-on:click="onChangePage('yar')">Yar</li>
          </ul>
        </div>
      </div>
      <SideFooter/>
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
    onChangePage(ref) {
      this.$refs[this.page].classList.remove("side-nav-active");
      this.$refs[ref].classList.add("side-nav-active");
      this.$emit("changePage", ref);
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";
</style>