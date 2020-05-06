<template>
  <no-ssr>
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
      <div class="markdown-wrapper tester-wrapper">
        <h1 class="hapi-header">
          joi Schema Tester <span class="api-version-span">v{{ version }}</span>
        </h1>
        <h2 class="tester-subTitle">Schema:</h2>
        <codemirror
          :value="schema"
          :options="options"
          @input="onSchemaChange"
        ></codemirror>
        <h2 class="tester-subTitle">Data To Validate:</h2>
        <codemirror
          :value="validate"
          :options="options"
          @input="onValidateChange"
        ></codemirror>
        <button class="validate-button" v-on:click="onValidateClick">
          Validate
        </button>
        <h2 class="tester-subTitle">Result:</h2>
        <pre class="tester-result">{{ result }}</pre>
        <h2 class="tester-subTitle">Validated Object:</h2>
        <pre class="tester-result validated-result"></pre>
      </div>
    </div>
  </no-ssr>
</template>

<script>
import LandingNav from "~/components/family/LandingNav.vue";
const moduleInfo = require("../../../static/lib/moduleInfo.json");
const stringify = require("@aitodotai/json-stringify-pretty-compact");
const Joi = require("@hapi/joi");

if (process.client) {
  require("codemirror/mode/javascript/javascript.js");
}

export default {
  components: {
    LandingNav
  },
  head() {
    return {
      title: "hapi.dev - joi Schema Tester v" + this.version,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Test your joi schemas"
        }
      ]
    };
  },
  data() {
    return {
      schema: "",
      validate: "",
      result: "",
      validatedResult: "",
      options: {
        theme: "eclipse",
        tabSize: 2,
        mode: "text/javascript",
        lineNumbers: true,
        lineWrapping: true,
        addModeClass: true
      },
      moduleAPI: moduleInfo,
      page: "tester",
      intro: false,
      example: false,
      usage: false,
      faq: false,
      advanced: false,
      version: ""
    };
  },
  computed: {
    getSchema() {
      return this.$store.getters.loadSchema;
    },
    getValidate() {
      return this.$store.getters.loadValidate;
    }
  },
  methods: {
    onSchemaChange(input) {
      this.$store.commit("setSchema", input);
      this.$data.schema = this.getSchema;
    },
    onValidateChange(input) {
      this.$store.commit("setValidate", input);
      this.$data.validate = this.getValidate;
    },
    findErrors(error) {
      let element = document.querySelector(".validated-result");
      let innerText = this.validatedResult;
      for (let e of error) {
        let f = "  " + e.replace(/["]/gm, "").replace(/\..*/, "") + ":";
        let regEx = new RegExp(f);
        let line = this.validatedResult.match(regEx)[0];
        innerText = innerText.replace(
          line,
          "  <span class='error-span'>" + line.slice(2, -1) + "</span>:"
        );
        element.innerHTML = innerText;
      }
    },
    removeJson() {
      let keys = this.validatedResult.match(/".*":/gm);
      let element = document.querySelector(".validated-result");
      for (let key in keys) {
        this.validatedResult = this.validatedResult.replace(
          /(")(?=.*:)(?!,.*:)/gm,
          ""
        );
        element.innerHTML = this.validatedResult;
      }
    },
    replaceArray(key, value) {
      if (value instanceof Array) {
        return JSON.stringify(value);
      }
      return value;
    },
    onValidateClick() {
      this.validatedResult = "";
      let isSchema;
      let element = document.querySelector(".validated-result");
      if (this.schema[this.schema.length - 1] === ";") {
        this.schema = this.schema.slice(0, -1);
      }
      if (this.validate[this.validate.length - 1] === ";") {
        this.validate = this.validate.slice(0, -1);
      }
      try {
        let validatedObject = Function(
          '"use strict";return (' + this.validate + ")"
        )();
        let joiSchema = Function(
          "Joi",
          '"use strict";return (' + this.schema + ")"
        );
        let isSchema = Joi.isSchema(joiSchema(Joi));
        let validatedResults = joiSchema(Joi).validate(validatedObject, {
          abortEarly: false
        });
        this.validatedResult = stringify(validatedResults.value, {
          maxNesting: 1
        });
        console.log(this.validatedResult);
        this.removeJson();

        if (validatedResults.error) {
          let errorMessage = validatedResults.error.message.toString();
          this.result = "Validation Error: " + errorMessage;
          let schemaErrors = errorMessage.match(/"(.*?)"/gm);
          try {
            this.findErrors(schemaErrors);
          } catch (error) {}
        } else {
          this.result = "Validation Passed";
        }
      } catch (error) {
        if (!isSchema && error instanceof TypeError) {
          this.result = "Not a valid joi Schema";
        } else {
          console.log(error);
          this.result = error.toString();
          let element = document.querySelector(".validated-result");
          element.innerHTML = "<span class='error-span'>Error</span>";
        }
      }
    }
  },
  created() {
    let versionsArray = this.moduleAPI.joi.versionsArray;
    this.$data.version = versionsArray[0];
    this.$data.schema = this.getSchema;
    this.$data.validate = this.getValidate;
    this.$store.commit("setDisplay", "family");
    this.$store.commit("setFamily", "joi");
    if (this.moduleAPI.joi[versionsArray[0]].intro) {
      this.$store.commit("setIntro", true);
    }
    if (this.moduleAPI.joi[versionsArray[0]].example) {
      this.$store.commit("setExample", true);
    }
    if (this.moduleAPI.joi[versionsArray[0]].usage) {
      this.$store.commit("setUsage", true);
    }
    if (this.moduleAPI.joi[versionsArray[0]].faq) {
      this.$store.commit("setFaq", true);
    }
    if (this.moduleAPI.joi[versionsArray[0]].advanced) {
      this.$store.commit("setAdvanced", true);
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/styles/main.scss";
@import "codemirror/lib/codemirror.css";
@import "codemirror/theme/eclipse.css";

.test-wrapper {
  width: 100%;
  margin: 0;
  padding: 20px 40px;
}

.tester-title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.tester-version {
  font-size: 1.1rem;
}

.tester-subTitle {
  font-size: 1.5em;
  margin-bottom: 5px;
  margin-top: 0 !important;
  padding-top: 0 !important;
  border: none !important;
}

.CodeMirror {
  background: $off-white;
  border: 1px solid $dark-white;
  width: 100%;
  margin-left: 0 !important;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: inconsolata, menlo, consolas, monospace !important;
  height: 100% !important;
  margin-bottom: 30px;
}

.CodeMirror-sizer {
  border: none !important;
}

.cm-comment {
  color: $gray-light !important;
}

.validate-button {
  display: block;
  border-radius: 10px;
  border: none;
  background: $orange;
  padding: 5px 15px;
  font-size: 1em;
  font-weight: 700;
  color: $white;
  cursor: pointer;
  border: 4px solid rgba(0, 0, 0, 0);
  margin-bottom: 30px;
}

.validate-button:hover {
  border: 4px solid $orange;
  background: $white;
  color: $orange;
  text-decoration: none;
  transition: all 0.3s ease 0s;
}

.validate-button:focus {
  outline: none;
}

.tester-result {
  min-height: 66px;
  box-sizing: border-box;
  height: auto;
  color: #000;
  margin-bottom: 30px;
}

.cm-number {
  color: #1131cb !important;
}

.cm-string-2 {
  color: #fa0000 !important;
}

.cm-string {
  color: #28813f !important;
}

.error-span {
  display: inline-block;
  background: #ff6a6a;
  padding: 5px;
  margin: 1px 0;
}

@media screen and (max-width: 900px) {
  .tester-wrapper {
    padding: 0 20px !important;
  }
}
</style>
