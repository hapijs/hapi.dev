module.exports = {
  telemetry: false,

  generate: {
    fallback: true,
    interval: 2000,
    routes: [
      "/tutorials/gettingstarted",
      "/tutorials/auth",
      "/tutorials/caching",
      "/tutorials/community",
      "/tutorials/cookies",
      "/tutorials/logging",
      "/tutorials/plugins",
      "/tutorials/routing",
      "/tutorials/servermethods",
      "/tutorials/servingfiles",
      "/tutorials/testing",
      "/tutorials/validation",
      "/tutorials/views",
      "/tutorials/expresstohapi",
      "/module/accept",
      "/module/accept/api",
      "/module/accept/changelog",
      "/module/ammo",
      "/module/ammo/api",
      "/module/ammo/changelog",
      "/module/b64",
      "/module/b64/api",
      "/module/b64/changelog",
      "/module/basic",
      "/module/basic/api",
      "/module/basic/changelog",
      "/module/bell",
      "/module/bell/api",
      "/module/bell/changelog",
      "/module/boom",
      "/module/boom/api",
      "/module/boom/changelog",
      "/module/bossy",
      "/module/bossy/api",
      "/module/bossy/changelog",
      "/module/bounce",
      "/module/bounce/api",
      "/module/bounce/changelog",
      "/module/bourne",
      "/module/bourne/api",
      "/module/bourne/changelog",
      "/module/call",
      "/module/call/api",
      "/module/call/changelog",
      "/module/catbox",
      "/module/catbox/api",
      "/module/catbox/changelog",
      "/module/catbox-memcached",
      "/module/catbox-memcached/api",
      "/module/catbox-memcached/changelog",
      "/module/catbox-memory",
      "/module/catbox-memory/api",
      "/module/catbox-memory/changelog",
      "/module/catbox-object",
      "/module/catbox-object/api",
      "/module/catbox-object/changelog",
      "/module/catbox-redis",
      "/module/catbox-redis/api",
      "/module/catbox-redis/changelog",
      "/module/code",
      "/module/code/api",
      "/module/code/changelog",
      "/module/content",
      "/module/content/api",
      "/module/content/changelog",
      "/module/cookie",
      "/module/cookie/api",
      "/module/cookie/changelog",
      "/module/crumb",
      "/module/crumb/api",
      "/module/crumb/changelog",
      "/module/cryptiles",
      "/module/cryptiles/api",
      "/module/cryptiles/changelog",
      "/module/eslint-plugin",
      "/module/eslint-plugin/changelog",
      "/module/file",
      "/module/file/changelog",
      "/module/glue",
      "/module/glue/api",
      "/module/glue/changelog",
      "/module/good",
      "/module/good/api",
      "/module/good/changelog",
      "/module/good-console",
      "/module/good-console/api",
      "/module/good-console/changelog",
      "/module/good-squeeze",
      "/module/good-squeeze/api",
      "/module/good-squeeze/changelog",
      "/module/h2o2",
      "/module/h2o2/api",
      "/module/h2o2/changelog",
      "/module/heavy",
      "/module/heavy/changelog",
      "/module/hoek",
      "/module/hoek/api",
      "/module/hoek/changelog",
      "/module/inert",
      "/module/inert/api",
      "/module/inert/changelog",
      "/module/iron",
      "/module/iron/api",
      "/module/iron/changelog",
      "/module/jwt",
      "/module/jwt/changelog",
      "/module/lab",
      "/module/lab/api",
      "/module/lab/changelog",
      "/module/mimos",
      "/module/mimos/api",
      "/module/mimos/changelog",
      "/module/nes",
      "/module/nes/api",
      "/module/nes/changelog",
      "/module/nigel",
      "/module/nigel/changelog",
      "/module/oppsy",
      "/module/oppsy/api",
      "/module/oppsy/changelog",
      "/module/pez",
      "/module/pez/changelog",
      "/module/podium",
      "/module/podium/api",
      "/module/podium/changelog",
      "/module/scooter",
      "/module/scooter/api",
      "/module/scooter/changelog",
      "/module/shot",
      "/module/shot/api",
      "/module/shot/changelog",
      "/module/somever",
      "/module/somever/changelog",
      "/module/statehood",
      "/module/statehood/changelog",
      "/module/subtext",
      "/module/subtext/api",
      "/module/subtext/changelog",
      "/module/teamwork",
      "/module/teamwork/changelog",
      "/module/topo",
      "/module/topo/api",
      "/module/topo/changelog",
      "/module/vise",
      "/module/vise/changelog",
      "/module/vision",
      "/module/vision/api",
      "/module/vision/changelog",
      "/module/wreck",
      "/module/wreck/api",
      "/module/wreck/changelog",
      "/module/yar",
      "/module/yar/api",
      "/module/yar/changelog"
    ]
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "hapi.dev - The simple, secure framework developers trust",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Build powerful, scalable applications, with minimal overhead and full out-of-the-box functionality - your code, your way. Originally developed to handle Walmart’s Black Friday scale, hapi continues to be the proven choice for enterprise-grade backend needs."
      },
      {
        hid: "keywords",
        name: "keywords",
        content: "hapi, hapijs, hapi.js, node, node.js, javascript, framework"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png?v=1.0" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Inconsolata:400|Lato:400,900&display=swap"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["bulma"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/vue-js-modal", "~/plugins/vue-codemirror", "~/plugins/vue-highlightjs"],

  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/markdownit",
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
    "@nuxtjs/google-analytics",
    "cookie-universal-nuxt",
    "@nuxtjs/svg",
    "@nuxtjs/pwa"
  ],

  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    linkify: true,
    html: true,
    breaks: true,
    injected: true
  },

  axios: {
    retry: true
  },

  googleAnalytics: {
    id: "UA-144917045-1"
  },

  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
  },

  manifest: {
    name: "hapi.dev",
    short_name: "hapi",
    background_color: "#ffffff",
    theme_color: "#ed7d31"
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
};
