<template>
  <div class="container">
    <LandingNav
      :moduleInfo="moduleAPI"
      :intro="intro"
      :example="example"
      :usage="usage"
      :faq="faq"
      :page="page"
      :advanced="advanced"
    />
    <div class="tutorial-markdown-window">
      <HTML :display="providersHTML" />
    </div>
  </div>
</template>

<script>
import HTML from "~/components/HTML.vue";
import LandingNav from "~/components/family/LandingNav.vue";
const moduleInfo = require("../../../static/lib/moduleInfo.json");
export default {
  components: {
    HTML,
    LandingNav
  },
  head() {
    return {
      title: "hapi.dev - bell",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "View the APIs for the hapi modules"
        }
      ]
    };
  },
  data() {
    return {
      page: this.providersHTML,
      moduleAPI: moduleInfo,
      page: "providers",
      intro: false,
      example: false,
      usage: false,
      faq: false,
      advanced: false
    };
  },
  async asyncData({ $axios, params }) {
    const options = {
      headers: {
        accept: "application/vnd.github.v3.raw+json",
        authorization: "token " + process.env.GITHUB_TOKEN
      }
    };
    let providersHTML = "";
    const providers = await $axios.$get(
      "https://api.github.com/repos/hapijs/bell/contents/Providers.md",
      options
    );
    providersHTML = await $axios.$post(
      "https://api.github.com/markdown",
      {
        text: providers,
        mode: "markdown"
      },
      {
        headers: {
          authorization: "token " + process.env.GITHUB_TOKEN
        }
      }
    );
    return { providersHTML };
  },
  methods: {
    fixAPILink() {
      let apiLink = document.querySelector(".markdown-wrapper p a")
      apiLink.setAttribute('href', "/family/bell/api")
    }
  },
  computed: {
    getDisplay() {
      return this.moduleAPI[this.$route.params.family].displays[
        this.getVersion
      ];
    },
    getVersion() {
      return this.$store.getters.loadVersion;
    },
    getMilestones() {
      return this.milestoneList;
    },
    getFamily() {
      return this.$store.getters.loadFamily;
    },
    getIntro() {
      return this.$store.getters.loadIntro;
    },
    getExample() {
      return this.$store.getters.loadExample;
    },
    getUsage() {
      return this.$store.getters.loadUsage;
    },
    getFaq() {
      return this.$store.getters.loadFaq;
    },
    getAdvanced() {
      return this.$store.getters.loadAdvanced;
    }
  },
  created() {
    let versionsArray = this.moduleAPI.bell.versionsArray;
    this.$data.version = versionsArray[0];
    this.$data.schema = this.getSchema;
    this.$data.validate = this.getValidate;
    this.$store.commit("setDisplay", "family");
    this.$store.commit("setFamily", "bell");
    if (this.moduleAPI.bell[versionsArray[0]].intro) {
      this.$store.commit("setIntro", true);
    }
    if (this.moduleAPI.bell[versionsArray[0]].example) {
      this.$store.commit("setExample", true);
    }
    if (this.moduleAPI.bell[versionsArray[0]].usage) {
      this.$store.commit("setUsage", true);
    }
    if (this.moduleAPI.bell[versionsArray[0]].faq) {
      this.$store.commit("setFaq", true);
    }
    if (this.moduleAPI.bell[versionsArray[0]].advanced) {
      this.$store.commit("setAdvanced", true);
    }
  },
  mounted() {
    this.fixAPILink()
  }
};
</script>

<style lang="scss">
@import "../../../assets/styles/main.scss";

.tutorial-markdown-window {
  position: relative;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin: 0;
}

.markdown-wrapper a {
  position: relative;
}

.plugins-logo {
  position: absolute;
  top: -8px;
  right: -40px;
  width: 35px;
  height: 35px;
  max-width: none;
}

.plugins-logo-top {
  position: relative;
  top: 10px;
  width: 35px;
  height: 35px;
  max-width: none;
}
</style>
