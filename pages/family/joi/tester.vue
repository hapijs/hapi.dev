<template>
  <no-ssr>
    <div class="container">
      <LandingNav
        :moduleAPI="moduleAPI"
        :intro="intro"
        :example="example"
        :usage="usage"
        :faq="faq"
        :page="page"
        :advanced="advanced"
      />
      <div class="test-wrapper">
        <h1 class="tester-title">
          joi Schema Tester <span class="tester-version">v{{ version }}</span>
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
      </div>
    </div>
  </no-ssr>
</template>

<script>
import LandingNav from "~/components/family/LandingNav.vue";
const moduleInfo = require("../../../static/lib/moduleInfo.json");
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
      schema:
        "//Insert your joi schema here \n" +
        "Joi.object({\n" +
        "  username: Joi.string().alphanum().min(3).max(30).required(),\n" +
        "  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),\n" +
        '  repeat_password: Joi.ref("password"),\n' +
        "  access_token: [Joi.string(), Joi.number()],\n" +
        "  birth_year: Joi.number().integer().min(1900).max(2013),\n" +
        '  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } )\n' +
        "}).with('username', 'birth_year').xor('password', 'access_token').with('password', 'repeat_password')",
      validate:
        "//Insert data to validate here \n" +
        "{ \n" +
        ' username: "abc",\n' +
        ' password: "password",\n' +
        ' repeat_password: "password",\n' +
        " birth_year: 1994\n" +
        "}",
      result: "",
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
  methods: {
    onSchemaChange(input) {
      this.schema = input;
    },
    onValidateChange(input) {
      this.validate = input;
    },
    onValidateClick() {
      try {
        let validatedObject = Function(
          '"use strict";return (' + this.validate + ")"
        )();
        let joiSchema = Function(
          "Joi",
          '"use strict";return (' + this.schema + ")"
        );
        let validatedResults = joiSchema(Joi).validate(validatedObject);
        if (validatedResults.error) {
          this.result = validatedResults.error.stack.toString();
        } else {
          this.result = "Validation Passed";
        }
      } catch (error) {
        this.result = error.toString();
      }
    }
  },
  created() {
    let versionsArray = this.moduleAPI.joi.versionsArray;
    this.$data.version = versionsArray[0];
    this.$store.commit("setDisplay", "family");
    if (this.moduleAPI.joi[versionsArray[0]].intro) {
      this.$data.intro = true;
    }
    if (this.moduleAPI.joi[versionsArray[0]].example) {
      this.$data.example = true;
    }
    if (this.moduleAPI.joi[versionsArray[0]].usage) {
      this.$data.usage = true;
    }
    if (this.moduleAPI.joi[versionsArray[0]].faq) {
      this.$data.faq = true;
    }
    if (this.moduleAPI.joi[versionsArray[0]].advanced) {
      this.$data.advanced = true;
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
  border-radius: 10px;
  border: none;
  background: $orange;
  padding: 5px 15px;
  font-size: 1em;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  border: 4px solid rgba(0, 0, 0, 0);
  margin-bottom: 30px;
}

.validate-button:hover {
  border: 4px solid $orange;
  background: #fff;
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
</style>
