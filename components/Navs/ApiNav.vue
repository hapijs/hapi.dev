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
        <div class="api-nav-select-wrapper" v-html="$md.render(this.$props.menu)"></div>
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
    onChange(event) {
      this.$emit("change", event.target.value);
    }
  },
  updated() {
    let links = document.querySelectorAll(".api-nav-select-wrapper > ul > li");
    for (let link of links) {
      link.classList.add("api-nav-header");
      link.addEventListener('click', function(event) {
        link.childNodes[2].classList.toggle('nav-display')
      })
    }
    let code = document.querySelectorAll("code");
    for (let c of code) {
      c.classList.add("api-nav-code");
    }
    // let lists = document.querySelectorAll(".api-nav-select-wrapper ul li");
    // for (let list of lists) {
    //   list.classList.add("api-nav-list");
    //   list.addEventListener("click", function(event) {
    //     event.preventDefault();
    //     console.log(list.childNodes);
    //   });
    // }
    
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";
@import "../../assets/styles/main.scss";
@import "../../assets/styles/apiMenu.scss";

.api-nav-select-wrapper {
  margin-top: 20px;
  font-size: 1.1em;
  color: #f6941e;
  line-height: 30px;
  width: 100%;
}

// .api-nav-header > ul {
//   display: none;
// }

.api-nav-code {
  background: #f8f8f8;
  color: $gray;
  font-family: "Open Sans", sans-serif;
  font-size: .75em;
}

.nav-display {
  display: block !important;
  height: auto;
  transition: all 0.3 ease;
}

.api-nav-select-wrapper ul {
  margin: 0;
}

.api-nav-select-wrapper ul li {
  margin: 0;
  list-style-type: none;
}
</style>
