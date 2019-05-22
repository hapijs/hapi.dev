import start from '../static/lib/tutorials/en_US/'

export const state = () => ({
  page: start.gettingStarted.default,
  community: "contribute",
  ecosystem: "bell",
})

export const mutations = {
  setPage (state, page) {
    state.page = page
  },
  setCommunity (state, community) {
    state.community = community
  },
  setEcosystem (state, ecosystem) {
    state.ecosystem = ecosystem
  }
}

export const getters = {
  loadPage (state) {
    return state.page
  },
  loadCommunity (state) {
    return state.community
  },
  loadEcosystem (state) {
    return state.ecosystem
  }
}