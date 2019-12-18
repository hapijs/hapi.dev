<template>
  <div class="container">
    <LandingNav

    />
    <div class="test-wrapper">
      <h1 class="tester-title">joi Tester</h1>
      <h2 class="tester-subTitle">Schema</h2>
      <codemirror :value="schema" :options="options" @input="onSchemaChange"></codemirror>
      <h2 class="tester-subTitle">Data To Validate</h2>
      <codemirror :value="validate" :options="options" @input="onValidateChange"></codemirror>
      <button class="validate-button" v-on:click="onValidateClick">Validate</button>
      <h2 class="tester-subTitle">Result</h2>
      <pre>{{result}}</pre>
    </div>
  </div>
</template>

<script>
import LandingNav from "~/components/family/LandingNav.vue";
const Joi = require('@hapi/joi')

if (process.client) {
  require('codemirror/mode/javascript/javascript.js')
}


export default {
  components: {
    LandingNav
  },
  head() {
    return {
      title: "hapi.dev - joi Tester",
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
        'Joi.object({\n' +
        '  username: Joi.string().alphanum().min(3).max(30).required(),\n' +
        '  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),\n' +
        '  repeat_password: Joi.ref("password"),\n' +
        '  access_token: [Joi.string(), Joi.number()],\n' +
        '  birth_year: Joi.number().integer().min(1900).max(2013),\n' +
        '  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } )\n' +
        '}).with(\'username\', \'birth_year\').xor(\'password\', \'access_token\').with(\'password\', \'repeat_password\')',
      validate:
        '{ username: "abc", password: "password", repeat_password: "password", birth_year: 1994 }',
      result: '',
      options: {
        theme: 'eclipse',
        tabSize: 2,
        mode: 'text/javascript',
        lineNumbers: true,
        line: true,
      }
    }
  },
  methods: {
    onSchemaChange(input) {
      this.schema = input
    },
    onValidateChange(input) {
      this.validate = input
    },
    onValidateClick() {
      this.result = "";
      try {
        let validatedObject = Function('"use strict";return (' + this.validate + ')')();
        let joiSchema = new Function('Joi', '"use strict";return (' + this.schema + ')');
        let validatedResults = joiSchema(Joi).validate(validatedObject)
        if (validatedResults.error) {
          this.result = validatedResults.error.toString()
        } else {
          this.result = "Validation Passed"
        }
      } catch (error) {
        this.result = error.toString()
      }
    }
  },
  created() {
    const schema1 = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string(),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');
  }
}
</script>

<style lang="scss">
@import "../../../assets/styles/main.scss";
@import 'codemirror/lib/codemirror.css';
@import 'codemirror/theme/eclipse.css';

.test-wrapper {
  width: 100%;
  margin: 0;
  padding: 20px 40px;
}

.tester-title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.tester-subTitle {
  font-size: 1.5em;
}

.CodeMirror {
  background: $off-white;
  border: 1px solid $dark-white;
  width: 100%;
  margin-left: 0 !important;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: inconsolata,menlo,consolas,monospace !important;
  height: 100% !important;
  margin-bottom: 40px;
}

.CodeMirror-sizer {
  border: none !important;
}

.cm-comment {
  color: $gray-light !important;
}

// .cm-property {
//   color: #2A00FF !important;
// }

// .cm-string {
//   color: #2a9705 !important;
// }


</style>