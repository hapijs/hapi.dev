<template>
  <div class="container">
    <TutorialNav :language="language" @changed="onChangeChild" />
    <div class="tutorial-markdown-window">
      <Tutorial :display="getPage" :language="language" />
    </div>
    <div class="preload">
      <img src="/img/clipboardCheck.png" alt="clipboard" />
    </div>
  </div>
</template>

<script>
import Tutorial from "../../components/tutorials/Tutorial.vue";
import TutorialNav from "../../components/tutorials/TutorialNav.vue";
const page = require("../../static/lib/tutorials/");
import test from "../../static/lib/tutorials/";
import { copyToClipboard } from "~/utils/clipboard";
export default {
  components: {
    Tutorial,
    TutorialNav
  },
  head() {
    return {
      title: "hapi.dev - Getting Started",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Learn how to use hapi"
        }
      ]
    };
  },
  data() {
    return {
      language: this.getLanguage
    };
  },
  computed: {
    getPage() {
      // /<ul>([^;]*)<\/ul>/
      return this.$store.getters.loadPage;
    },
    getLanguage() {
      return this.$store.getters.loadLanguage;
    }
  },
  methods: {
    onChangeChild(value) {
      this.$store.commit("setLanguage", value);
      this.$router.push({ path: this.$route.path, query: { lang: value } });
      this.$store.commit("setPage", page[value].gettingstarted.default);
      window.scrollTo(0, 0);
    },
    wrapPre() {
      let el = document.querySelectorAll("pre");

      for (let e of el) {
        let wrapper = document.createElement("div");
        wrapper.classList.add("highlight-source-js");
        e.parentNode.insertBefore(wrapper, e);
        wrapper.appendChild(e);
      }
    },
    setAnchors() {
      let header = document.querySelector(".markdown-wrapper h1");
      let headings = document.querySelectorAll(
        ".markdown-wrapper h2 a, .markdown-wrapper h3 a, .markdown-wrapper h4 a, .markdown-wrapper h5 a"
      );

      header.classList.add("hapi-header")

      for (let head of headings) {
        head.href = "#" + head.name;
      }
    },
    setClipboards() {
      let headers = document.querySelectorAll(
        ".markdown-wrapper h2, .markdown-wrapper h3, .markdown-wrapper h4, .markdown-wrapper h5"
      );

      for (let header of headers) {
        header.classList.add("api-doc-header");
        header.innerHTML =
          header.innerHTML +
          "<span class='api-clipboardCheck api-clipboard' title='Copy link to clipboard'></span>";
      }

      let clipboards = document.querySelectorAll(".api-clipboard");

      for (let clipboard of clipboards) {
        clipboard.addEventListener("click", function(event) {
          let copyLink = clipboard.parentNode.firstElementChild.href;
          copyToClipboard(copyLink);
          clipboard.classList.remove("api-clipboard");
          clipboard.classList.add("api-clipboardCheck");
          setTimeout(function() {
            clipboard.classList.add("api-clipboard");
            clipboard.classList.remove("api-clipboardCheck");
          }, 3000);
        });
      }
    }
  },
  created() {
    this.$store.commit("setDisplay", "tutorials");
    this.$store.commit(
      "setLanguage",
      this.$route.query.lang ? this.$route.query.lang : "en_US"
    );
    this.$store.commit(
      "setPage",
      page[this.$store.getters.loadLanguage].gettingstarted.default
    );
  },
  mounted() {
    this.wrapPre();
    this.setAnchors();
    this.setClipboards();
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/api.scss";

section > ol {
  padding: 20px 20px 13px 20px;
  border: 1px solid $dark-white;
  margin: 0;
  background: $off-white;
}

ol {
  counter-reset: item;
}

.markdown-wrapper ol ol {
  margin: 5px 0 0 20px;
}

.markdown-wrapper ol li {
  margin: 0 0 7px 0;
  display: block;
  list-style-type: none;
  list-style-position: inside;
}

.markdown-wrapper ol li:before {
  content: counters(item, ".") ". ";
  counter-increment: item;
}
</style>
