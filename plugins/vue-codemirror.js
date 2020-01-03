import Vue from 'vue'

if (process.browser) {
  const VueCodeMirror = require('vue-codemirror')
  Vue.use(VueCodeMirror)
}