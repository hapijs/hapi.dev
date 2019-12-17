<template>
  <div class="container">
    <LandingNav

    />
    <div class="markdown-wrapper">
      <h1 class="tester-title">joi Tester</h1>
      <h2 class="tester-subTitle">Schema</h2>
      <codemirror :value="schema" :options="options" @input="onSchemaChange"></codemirror>
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
        '//Insert your joi schema here:\n' +
        'Joi.object({\n' +
        '  username: Joi.string().alphanum().min(3).max(30).required(),\n' +
        '  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),\n' +
        '  access_token: [Joi.string(), Joi.number()],\n' +
        '  birthyear: Joi.number().integer().min(1900).max(2013),\n' +
        '  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } } )\n' +
        '}).with(\'username\', \'birthyear\').xor(\'password\', \'access_token\').with(\'password\', \'repeat_password\')',
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
    }
  }
}
</script>

<style lang="scss">
@import "../../../assets/styles/main.scss";
@import 'codemirror/lib/codemirror.css';
@import 'codemirror/theme/eclipse.css';

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