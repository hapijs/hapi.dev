module.exports = {
  mode: 'universal',

  generate: {
    fallback: true,
    interval: 500,
    concurrency: 52,
    routes: [
      '/tutorials/gettingstarted',
      '/tutorials/auth',
      '/tutorials/caching',
      '/tutorials/cookies',
      '/tutorials/logging',
      '/tutorials/plugins',
      '/tutorials/routing',
      '/tutorials/servermethods',
      '/tutorials/servingfiles',
      '/tutorials/testing',
      '/tutorials/validation',
      '/tutorials/views',
      '/tutorials/expresstohapi',
      '/family/accept',
      '/family/address',
      '/family/ammo',
      '/family/b64',
      '/family/basic',
      '/family/bell',
      '/family/boom',
      '/family/bossy',
      '/family/bounce',
      '/family/bourne',
      '/family/call',
      '/family/catbox',
      '/family/catbox-memcached',
      '/family/catbox-memory',
      '/family/catbox-object',
      '/family/catbox-redis',
      '/family/code',
      '/family/content',
      '/family/cookie',
      '/family/crumb',
      '/family/cryptiles',
      '/family/formula',
      '/family/glue',
      '/family/good',
      '/family/good-console',
      '/family/good-squeeze',
      '/family/h2o2',
      '/family/hawk',
      '/family/hoek',
      '/family/inert',
      '/family/iron',
      '/family/joi',
      '/family/joi-date',
      '/family/lab',
      '/family/mimos',
      '/family/nes',
      '/family/oppsy',
      '/family/pinpoint',
      '/family/podium',
      '/family/rule-capitalize-modules',
      '/family/rule-for-loop',
      '/family/rule-scope-start',
      '/family/scooter',
      '/family/shot',
      '/family/sntp',
      '/family/subtext',
      '/family/topo',
      '/family/vision',
      '/family/wreck',
      '/family/yar'
    ]
  },

  router: {
    scrollBehavior: function (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
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
        return position
      }
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'hapi.dev - The simple, secure framework developers trust',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Build powerful, scalable applications, with minimal overhead and full out-of-the-box functionality - your code, your way. Originally developed to handle Walmart’s Black Friday scale, hapi continues to be the proven choice for enterprise-grade backend needs.' },
      { hid: 'keywords', name:'keywords', content: 'hapi, hapijs, hapi.js, node, node.js, javascript, framework'}
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
  plugins: ['~/plugins/vue-js-modal'],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/markdownit', '@nuxtjs/axios', '@nuxtjs/dotenv', '@nuxtjs/google-analytics', '@nuxtjs/pwa', 'cookie-universal-nuxt', '@nuxtjs/svg'],

  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    linkify: true,
    html: true,
    breaks: true,
    injected: true
  },

  googleAnalytics: {
    id: 'UA-144917045-1'
  },

  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
  },

  manifest: {
    name: 'hapi.dev',
    short_name: 'hapi',
    background_color: '#ffffff',
    theme_color: '#ed7d31'
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
