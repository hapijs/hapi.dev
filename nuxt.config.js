const pkg = require("./package")

module.exports = {
  mode: "universal",

  generate: {
    routes: [
      '/tutorials/gettingStarted',
      '/tutorials/auth',
      '/tutorials/caching',
      '/tutorials/cookies',
      '/tutorials/logging',
      '/tutorials/plugins',
      '/tutorials/routing',
      '/tutorials/serverMethods',
      '/tutorials/servingFiles',
      '/tutorials/testing',
      '/tutorials/validation',
      '/tutorials/views',
      '/tutorials/expressToHapi',
      '/community/contributing',
      '/community/updates',
      '/community/changelog',
      'community/styleguide',
      'ecosystem/bell',
      'ecosystem/boom',
      'ecosystem/good',
      'ecosystem/hoek',
      'ecosystem/iron',
      'ecosystem/joi',
      'ecosystem/shot',
      'ecosystem/topo',
      'ecosystem/yar'
    ]
  },

  /*
   ** Headers of the page
   */
  head: {
    title: "hapi.js",
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png?v=1.0" }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["@assets/styles/main.scss", "bulma"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/markdownit', '@nuxtjs/axios', '@nuxtjs/dotenv'
  ],

  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    linkify: true,
    html: true,
    breaks: true,
    injected: true
  },

  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN 
  },

  /*
   ** Build configuration
   */
  build: {
    splitChunks: {
      layouts: true
    }
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {}
  }
}
