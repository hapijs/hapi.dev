const pkg = require("./package")

module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: "hapi.js",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/img/favicon.png" }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["bulma", "@assets/styles/main.scss"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/markdownit'
  ],

  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    preset: 'default',
    linkify: false,
    breaks: true,
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
