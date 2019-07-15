const pkg = require('./package');

module.exports = {
  mode: 'universal',

  generate: {
    fallback: true,
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
      '/family/bell',
      '/family/boom',
      '/family/good',
      '/family/hoek',
      '/family/iron',
      '/family/joi',
      '/family/shot',
      '/family/topo',
      '/family/yar'
    ]
  },

  router: {
    scrollBehavior: function (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        let position = {}
        if (to.matched.length < 2) {
          position = { x: 0, y: 0 }
        } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
          position = { x: 0, y: 0 }
        }
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position;
      }
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'hapi.js',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png?v=1.0' },
           { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Inconsolata:400|Lato:400,900&display=swap' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['@assets/styles/main.scss', 'bulma'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/markdownit', '@nuxtjs/axios', '@nuxtjs/dotenv'],

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
};
