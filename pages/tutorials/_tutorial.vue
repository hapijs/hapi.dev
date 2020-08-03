<template>
  <div class="container">
    <TutorialNav
      :language="language"
      :menu="getMenu"
      @changed="onChangeChild"
    />
    <div class="tutorial-markdown-window">
      <Tutorial :display="getDisplay" :language="language" />
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
      title: this.titles[this.$route.params.tutorial] + " - hapi.dev",
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
      language: this.getLanguage,
      menu: "",
      file: "",
      titles: {
        gettingstarted: "Getting Started",
        expresstohapi: "Express to hapi Migration",
        auth: "Authentication",
        caching: "Caching",
        cookies: "Cookies",
        logging: "Logging",
        plugins: "Plugins",
        routing: "Routing",
        servermethods: "Server Methods",
        servingfiles: "Serving Static Files",
        testing: "Testing",
        validation: "Validation",
        views: "Views"
      }
    };
  },
  computed: {
    getPage() {
      // /<ul>([^;]*)<\/ul>/
      return this.$store.getters.loadPage;
    },
    getLanguage() {
      return this.$store.getters.loadLanguage;
    },
    getDisplay() {
      return this.$data.file
    },
    getMenu() {
      return this.$data.menu
    }
  },
  methods: {
    async onChangeChild(value) {
      this.$store.commit("setLanguage", value);
      this.$router.push({ path: this.$route.path, query: { lang: value }, hash: this.$route.hash });
      this.$store.commit(
        "setPage",
        page[value][this.$route.params.tutorial].default
      );
      this.$data.file = await this.tutorials[value].file
      this.$data.menu = await this.tutorials[value].menu
      window.scrollTo(0, 0);
      const checkIfPageLoaded = setInterval(() => {
        if ((this.$data.file == this.tutorials[value].file)) {
          this.$children[0].setClasses();
          this.setClipboards();
          this.goToAnchor();
          this.setAnchors();
          clearInterval(checkIfPageLoaded);
        }
      }, 25);
      // window.location = `/tutorials/${this.$route.params.tutorial}/?lang=${value}`;
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

      if (header) {
        header.classList.add("hapi-header");
      }

      for (let head of headings) {
        head.href = "#" + head.name;
      }

      let subtitle = document.querySelector("h1 + p")
      if (subtitle) {
        subtitle.classList.add("tutorial-subhead", "underline");
      }
    },
    goToAnchor() {
      let hash = document.location.hash;
      if (hash != "") {
        setTimeout(function() {
          if (location.hash) {
            window.scrollTo(0, 0);
            window.location.href = hash;
          }
        }, 1);
      } else {
        return false;
      }
    },
    setClipboards() {
      let headers = document.querySelectorAll(
        ".markdown-wrapper h2, .markdown-wrapper h3, .markdown-wrapper h4, .markdown-wrapper h5"
      );

      for (let header of headers) {
        header.classList.add(
          "api-top-doc-header",
          "api-main-doc-header",
          "tutorial-header"
        );
        header.innerHTML =
          header.innerHTML +
          "<span class='api-clipboardCheck api-clipboard' title='Copy link to clipboard'></span><div class='spacer'> </div>";
      }

      const spacer = document.createElement("div");
      spacer.classList.add("spacer");

      let clipboards = document.querySelectorAll(".api-clipboard");

      for (let clipboard of clipboards) {
        clipboard.addEventListener("click", function(event) {
          let copyLink = clipboard.parentNode.firstElementChild.href + clipboard.parentNode.firstElementChild.id;
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
  async asyncData({ params, $axios, query }) {
    let lang = ["en_US", "pt_BR", "ko_KR", "tr_TR", "zh_CN"];
    let tutorials = {};
    const dev = process.env.NODE_ENV !== "production";
    const server = dev
      ? `http://localhost:3000/lib/tutorials/`
      : `https://api.github.com/repos/hapijs/hapi.dev/contents/static/lib/tutorials/`;
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };
    for (let l of lang) {
      let tutorialFile = await $axios.$get(
        server + `${l}/${params.tutorial}.md`,
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

      if (apiTocArray) {
        for (let i = 0; i < apiTocArray.length; ++i) {
          apiTocString = apiTocString + apiTocArray[i];
        }
      }
      let finalMenu = Toc(apiTocString, { bullets: "-" }).content;
      tutorials[l] = {
        file: tutorialHTML,
        menu: finalMenu
      }
    }
    return { tutorials };
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

    this.$data.file = this.tutorials[this.getLanguage].file;
    this.$data.language = this.getLanguage;
    this.$data.menu = this.tutorials[this.getLanguage].menu;
  },
  mounted() {
    this.onChangeChild(this.getLanguage)
    this.goToAnchor();
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

.tutorial-header {
  display: block !important;
}

.underline {
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.tutorial-subhead {
  margin-top: 0;
  padding-bottom: 10px;
}

</style>
