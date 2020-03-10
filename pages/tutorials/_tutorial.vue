<template>
  <div class="container">
    <TutorialNav :language="language" :menu="finalMenu" @changed="onChangeChild" />
    <div class="tutorial-markdown-window">
      <Tutorial :display="tutorialHTML" :language="language" />
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
import { copyToClipboard } from "~/utils/clipboard";
let Toc = require("markdown-toc");
export default {
  components: {
    Tutorial,
    TutorialNav
  },
  head() {
    return {
      title:
        "hapi.dev - " +
        this.$route.params.tutorial
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, function(str) {
            return str.toUpperCase();
          }),
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
      this.$store.commit(
        "setPage",
        page[value][this.$route.params.tutorial].default
      );
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

      header.classList.add("hapi-header");

      for (let head of headings) {
        head.href = "#" + head.name;
      }
    },
    setClipboards() {
      let headers = document.querySelectorAll(
        ".markdown-wrapper h2, .markdown-wrapper h3, .markdown-wrapper h4, .markdown-wrapper h5"
      );

      for (let header of headers) {
        header.classList.add("api-top-doc-header", "api-main-doc-header");
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
  async asyncData({ params, $axios, store }) {
    const dev = process.env.NODE_ENV !== "production";
    const server = dev ? "http://localhost:3000" : "https://hapi.dev";
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };

    let tutorialFile = await $axios.$get(
      `${server}/lib/tutorials/${store.getters.loadLanguage}/${params.tutorial}.md`,
      options
    );

    let tutorialHTML = await $axios.$post(
      "https://api.github.com/markdown",
      {
        text: tutorialFile,
        mode: "markdown"
      },
      {
        headers: {
          authorization: "token " + process.env.GITHUB_TOKEN
        }
      }
    );

    let rawString = await tutorialFile.toString();

    let apiTocString = "";
    let apiTocArray = await rawString.match(/\n#.+/g);

    for (let i = 0; i < apiTocArray.length; ++i) {
      apiTocString = apiTocString + apiTocArray[i];
    }
    let finalMenu = Toc(apiTocString, { bullets: "-" }).content;
    return { finalMenu, tutorialHTML}
  },
  created() {
    this.$store.commit("setDisplay", "tutorials");
    this.$store.commit(
      "setLanguage",
      this.$route.query.lang ? this.$route.query.lang : "en_US"
    );
    this.$store.commit(
      "setPage",
      page[this.$store.getters.loadLanguage][this.$route.params.tutorial]
        .default
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
