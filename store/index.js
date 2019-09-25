import start from '../static/lib/tutorials/en_US/'

export const state = () => ({
  page: start.gettingstarted.default,
  display: "home",
  language: "en_US",
  version: "",
  modules: [
    "bell",
    "boom",
    "good",
    "hoek",
    "iron",
    "joi",
    "shot",
    "topo",
    "yar"
  ]
})

export const mutations = {
  setPage (state, page) {
    state.page = page
  },
  setDisplay (state, display) {
    state.display = display
  },
  setLanguage (state, language) {
    state.language = language
  },
  setVersion (state, version) {
    state.version = version
  }
}

export const getters = {
  loadPage (state) {
    return state.page
  },
  loadDisplay (state) {
    return state.display
  },
  loadLanguage (state) {
    return state.language
  },
  loadVersion (state) {
    return state.version
  },
  loadModules (state) {
    return state.modules
  }
}