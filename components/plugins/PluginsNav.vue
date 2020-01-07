<template>
  <div class="side-nav-window">
    <div class="side-nav-wrapper">
      <div class="side-nav-inner-wrapper">
        <div class="side-nav-title">Plugins</div>
        <Ads />
        <div class="side-nav-select-wrapper">
          <ul class="side-nav-select-list plugins-ul">
            <li class="side-nav-select-link">
              <a href="#authorization">Authorization</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#authentication">Authentication</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#documentation">Documentation</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#encoding">Encoding</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#hypermedia">Hypermedia</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#localization">Localization/Internationalization</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#logging">Logging/Metrics</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#messaging">Messaging</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#security">Security</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#session">Session</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#templating">Templating</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#utility">Utility</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#validation">Validation</a>
            </li>
            <li class="side-nav-select-link">
              <a href="#universe">The extended hapi universe</a>
            </li>
          </ul>
        </div>
      </div>
      <SideFooter />
    </div>
  </div>
</template>

<script>
import SideFooter from "~/components/Footers/SideFooter.vue";
import Ads from "~/components/Ads.vue";

export default {
  components: {
    SideFooter,
    Ads
  },
  methods: {
    onScroll() {
      let links = [];
      let anchors = document.querySelectorAll(".side-nav-select-link");
      for (let anchor of anchors) {
        anchor.addEventListener("click", function(event) {
          if (!document.getElementById("carbonads")) return;
          if (typeof _carbonads !== "undefined") _carbonads.refresh();
        });
      }
      links = document.querySelectorAll(".plugins-ul a");
      let points = {};
      let offsets = [];
      for (let i = 0; i < links.length; i++) {
        let point = document.querySelector(
          `.markdown-wrapper a[name*='${links[i].href.replace(/^[^_]*#/, "")}']`
        );
        if (point && point.name) {
          points[point.offsetTop - 20] = {
            name: "#" + point.name
          };
          offsets.push(point.offsetTop - 20);
        }
      }
      offsets = [...new Set(offsets)];

      //Add active class to elements on scroll
      window.onscroll = function() {
        let location = document.documentElement.scrollTop;
        let locationBody = document.body.scrollTop;
        let actives = document.getElementsByClassName("plugins-active");
        let i = 0;
        for (i in offsets) {
          if (offsets[i] <= location || offsets[i] <= locationBody) {
            let aClass = points[offsets[i]].name;
            for (let active of actives) {
              active.classList.remove("plugins-active");
            }

            let element = document.querySelector(`a[href*='${aClass}']`);
            if (element.children.length !== 0) {
              document
                .querySelector(`a[href*='${aClass}'] *`)
                .classList.add("plugins-active");
            } else if (element.children.length === 0) {
              document
                .querySelector(`a[href*='${aClass}']`)
                .classList.add("plugins-active");
            }
          }
        }
      };
    }
  },
  mounted() {
    this.onScroll();
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/sideNav.scss";

.plugins-active {
  position: relative;
  color: $orange !important;
  font-weight: 900;
  transition: all 0.2s ease;
}

.ads-wrapper {
  padding: 15px 0 0 0;
}
</style>
