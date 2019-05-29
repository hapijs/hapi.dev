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
        <div class="api-search">
          <input class="api-search-box" name="search" :value="search" placeholder="Search (not working yet)" />
          <div class="api-search-img" ></div>
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
  props: ["menu", "search"],
  methods: {
    onChange(event) {
      this.$emit("change", event.target.value);
    },
    setClasses() {
      let lis = document.getElementsByTagName("li");
      for (let li of lis) {
        li.classList.add("api-nav-li");
      }
      let links = document.querySelectorAll(
        ".api-nav-select-wrapper > ul > li > a"
      );
      for (let link of links) {
        link.classList.add("api-nav-header");
        link.addEventListener("click", function(event) {
          if (
            event.target.classList.contains("api-nav-header") &&
            link.parentElement.children[1]
          ) {
            event.stopPropagation();
            let linkSibling = link.parentElement.children[1];
            linkSibling.classList.toggle("nav-display");
          }
        });
      }
      let code = document.querySelectorAll("code");
      for (let c of code) {
        c.classList.add("api-nav-code");
      }
    }
  },
  updated() {
    this.setClasses();
  },
  mounted() {
    this.setClasses();
    let tags = document.querySelectorAll(".markdown-wrapper a");
    let points = {};
    let offsets = [];
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].name) {
        points[tags[i].offsetTop - 70] = {
          name: "#" + tags[i].name
        };
        offsets.push(tags[i].offsetTop - 70);
      }
    }
    window.onscroll = function() {
      let location = document.documentElement.scrollTop;
      let actives = document.getElementsByClassName("api-active");
      let i = 0;
      for (i in offsets) {
        if (offsets[i] <= location) {
          let aClass = points[offsets[i]].name;
          for (let active of actives) {
            active.classList.remove("api-active");
          }
          document
            .querySelector(`a[href*='${aClass}']`)
            .classList.add("api-active");
          document
            .querySelector(`a[href*='${aClass}'] code`)
            .classList.add("api-active");
        }
      }
    };
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";
@import "../../assets/styles/main.scss";

.api-search {
  position: relative;
  margin: 20px 0 0 0;
  width: 170px;
}

.api-search-box {
  height: 30px;
  outline: none;
  padding: 10px;
  border: 1px solid #ddd;
  width: 100%;
  font-size: .85rem;
}

.api-search-img {
  position: absolute;
  background: url("/img/search.png") no-repeat;
  background-position: center;
  background-color: #fff;
  background-size: contain;
  padding: 10px;
  right: -30px;
  top: 0px;
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  height: 30px;
  width: 30px;
  z-index: 25;
  cursor: pointer;
}

.api-nav-select-wrapper ul {
  margin-left: 0;
}

.api-nav-select-wrapper ul li ul {
  margin-left: 10px;
}

.api-nav-select-wrapper {
  margin-top: 20px;
  font-size: 1.1em;
  color: #f6941e;
  line-height: 30px;
  width: 100%;
}

.api-nav-select-wrapper > ul > li > ul {
  display: none;
}

.api-nav-header {
  color: $orange;
  text-decoration: none;
}

.api-nav-select-wrapper > ul > li > ul > li a {
  display: inline-block;
  color: $gray;
  font-size: 0.78em;
  width: 100%;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

.api-nav-li a:hover, .api-nav-li a code:hover {
  color: $orange;
  text-decoration: none;
}

.api-nav-code {
  background: #f8f8f8;
  color: $gray;
  font-family: "Open Sans", sans-serif;
  font-size: 1em;
  padding: 0;
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

.api-active {
  color: $orange;
}
</style>
