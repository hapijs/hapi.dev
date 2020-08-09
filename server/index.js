const Hapi = require("@hapi/hapi")
const consola = require("consola")
const HapiNuxt = require("@nuxtjs/hapi")

const server = new Hapi.Server({
  host: process.env.HOST || "0.0.0.0",
  port: process.env.PORT || 3000
})

server
  .register({
    plugin: HapiNuxt
  })
  .then(() => server.start())
  .then(() =>
    consola.ready({
      message: `Server running at: ${server.info.uri}`,
      badge: true
    })
  )
  .catch(err => {
    consola.error(err)
    throw err
  })
