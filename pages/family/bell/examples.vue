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
    <div class="example-code-main">
      <h2 class="example-header">bell Examples</h2>
      <div
        class="example-code-wrapper"
        v-for="example in examples"
        v-bind:key="example.name"
      >
        <h4 class="example-name">{{ example.name }}</h4>
        <pre v-highlightjs="example.code" class="example-pre">
          <code class="javascript"></code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import LandingNav from "~/components/family/LandingNav.vue";
const moduleInfo = require("../../../static/lib/moduleInfo.json");
export default {
  components: {
    LandingNav
  },
  head() {
    return {
      title: "hapi.dev - bell Examples",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "View examples for bell"
        }
      ]
    };
  },
  data() {
    return {
      examples: "",
      moduleAPI: moduleInfo,
      uls: {},
      links: {},
      page: "examples",
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
    let examplesArray = [];
    const examples = await $axios.$get(
      "https://api.github.com/repos/hapijs/bell/contents/examples",
      options
    );

    for (let example of examples) {
      const exampleCode = await $axios.$get(
        "https://api.github.com/repos/hapijs/bell/contents/examples/" +
          example.name,
        options
      );
      await examplesArray.push({ name: example.name, code: exampleCode });
    }
    return { examplesArray };
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
    this.$data.examples = this.examplesArray;
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
  }
};
</script>

<style lang="scss">
@import "../../../assets/styles/main.scss";
@import "../../../assets/styles/markdown.scss";

.example-code-main {
  width: 100%;
  margin: 0;
  padding: 20px 40px;
}

.example-code-wrapper {
  width: 100%;
  margin: 0;
}

.example-header {
  margin: 20px 0 0 0;
  border-bottom: 1px solid #ddd;
  border-top: none;
  padding-bottom: 10px;
  width: auto;
  display: inline-block;
}

.example-name {
  font-size: 1.5em;
  margin: 30px 0 15px 0;
  display: inline-block;
  border-bottom: 1px solid #ddd;
}

pre > code {
  white-space: pre;
  margin-top: -1em;
  display: block;
}

.hljs-meta {
  position: relative;
  left: 0;
}
</style>
