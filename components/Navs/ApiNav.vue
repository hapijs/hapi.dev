<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">API</div>
        <div class="lang-wrapper">
          <div class="lang-text">Version:</div>
          <select @change="onChange($event)" class="api-lang-select">
            <option value="18.3.1">18.3.1</option>
            <option value="17.9.0">17.9.0</option>
            <option value="16.7.0">16.7.0</option>

          </select>
        </div>
        <div class="api-nav-select-wrapper" v-html="$md.render(this.$props.menu)">
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
  props: ["menu"],
  methods: {
    onChange(event){
      this.$emit('change', event.target.value)
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";
@import "../../assets/styles/apiMenu.scss";

.api-nav-select-wrapper {
    margin-top: 20px;
    font-size: 1.1em;
    color: #f6941e;
    line-height: 30px;
    width: 100%;
}

.api-nav-select-wrapper ul li ul{
  display: none;
}

.api-nav-select-wrapper ul {
  margin: 0;
}

.api-nav-select-wrapper ul li {
  margin: 0;
}

</style>
