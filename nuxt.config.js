module.exports = {
  mode: 'universal',

  generate: {
    fallback: true,
    interval: 1000,
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
      '/family/accept/api',
      '/family/accept/changelog',
      '/family/address',
      '/family/address/api',
      '/family/address/changelog',
      '/family/ammo',
      '/family/ammo/api',
      '/family/ammo/changelog',
      '/family/b64',
      '/family/b64/api',
      '/family/b64/changelog',
      '/family/basic',
      '/family/basic/api',
      '/family/basic/changelog',
      '/family/bell',
      '/family/bell/api',
      '/family/bell/changelog',
      '/family/boom',
      '/family/boom/api',
      '/family/boom/changelog',
      '/family/bossy',
      '/family/bossy/api',
      '/family/bossy/changelog',
      '/family/bounce',
      '/family/bounce/api',
      '/family/bounce/changelog',
      '/family/bourne',
      '/family/bourne/api',
      '/family/bourne/changelog',
      '/family/call',
      '/family/call/api',
      '/family/call/changelog',
      '/family/catbox',
      '/family/catbox/api',
      '/family/catbox/changelog',
      '/family/catbox-memcached',
      '/family/catbox-memcached/api',
      '/family/catbox-memcached/changelog',
      '/family/catbox-memory',
      '/family/catbox-memory/api',
      '/family/catbox-memory/changelog',
      '/family/catbox-object',
      '/family/catbox-object/api',
      '/family/catbox-object/changelog',
      '/family/catbox-redis',
      '/family/catbox-redis/api',
      '/family/catbox-redis/changelog',
      '/family/code',
      '/family/code/api',
      '/family/code/changelog',
      '/family/content',
      '/family/content/api',
      '/family/content/changelog',
      '/family/cookie',
      '/family/cookie/api',
      '/family/cookie/changelog',
      '/family/crumb',
      '/family/crumb/api',
      '/family/crumb/changelog',
      '/family/cryptiles',
      '/family/cryptiles/api',
      '/family/cryptiles/changelog',
      '/family/formula',
      '/family/formula/api',
      '/family/formula/changelog',
      '/family/glue',
      '/family/glue/api',
      '/family/glue/changelog',
      '/family/good',
      '/family/good/api',
      '/family/good/changelog',
      '/family/good-console',
      '/family/good-console/api',
      '/family/good-console/changelog',
      '/family/good-squeeze',
      '/family/good-squeeze/api',
      '/family/good-squeeze/changelog',
      '/family/h2o2',
      '/family/h2o2/api',
      '/family/h2o2/changelog',
      '/family/hawk',
      '/family/hawk/api',
      '/family/hawk/changelog',
      '/family/hoek',
      '/family/hoek/api',
      '/family/hoek/changelog',
      '/family/inert',
      '/family/inert/api',
      '/family/inert/changelog',
      '/family/iron',
      '/family/iron/api',
      '/family/iron/changelog',
      '/family/joi',
      '/family/joi/api',
      '/family/joi/changelog',
      '/family/joi/tester',
      '/family/joi-date',
      '/family/joi-date/api',
      '/family/joi-date/changelog',
      '/family/lab',
      '/family/lab/api',
      '/family/lab/changelog',
      '/family/mimos',
      '/family/mimos/api',
      '/family/mimos/changelog',
      '/family/nes',
      '/family/nes/api',
      '/family/nes/changelog',
      '/family/oppsy',
      '/family/oppsy/api',
      '/family/oppsy/changelog',
      '/family/pinpoint',
      '/family/pinpoint/api',
      '/family/pinpoint/changelog',
      '/family/podium',
      '/family/podium/api',
      '/family/podium/changelog',
      '/family/rule-capitalize-modules',
      '/family/rule-capitalize-modules/api',
      '/family/rule-capitalize-modules/changelog',
      '/family/rule-for-loop',
      '/family/rule-for-loop/api',
      '/family/rule-for-loop/changelog',
      '/family/rule-scope-start',
      '/family/rule-scope-start/api',
      '/family/rule-scope-start/changelog',
      '/family/scooter',
      '/family/scooter/api',
      '/family/scooter/changelog',
      '/family/shot',
      '/family/shot/api',
      '/family/shot/changelog',
      '/family/sntp',
      '/family/sntp/api',
      '/family/sntp/changelog',
      '/family/subtext',
      '/family/subtext/api',
      '/family/subtext/changelog',
      '/family/topo',
      '/family/topo/api',
      '/family/topo/changelog',
      '/family/vision',
      '/family/vision/api',
      '/family/vision/changelog',
      '/family/wreck',
      '/family/wreck/api',
      '/family/wreck/changelog',
      '/family/yar',
      '/family/yar/api',
      '/family/yar/changelog'
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
  plugins: ['~/plugins/vue-js-modal', '~/plugins/vue-codemirror'],

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
    },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    }
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {}
  }
}
