import start from '../static/lib/tutorials/en_US/'

export const state = () => ({
  page: start.gettingStarted.default,
  community: "updates",
  version: "18.3.1",
  repos: ["hello"],
  issues: [],
  pullRequests: [],
  commits: [],
})

export const mutations = {
  setPage (state, page) {
    state.page = page
  },
  setCommunity (state, community) {
    state.community = community
  },
  setRepos (state, repos) {
    state.repos = repos
  },
  setVerion (state, version) {
    state.version = version
  },
  setPullRequests (state, pull) {
    state.pullRequests = pull
  }
}

export const getters = {
  loadPage (state) {
    return state.page
  },
  loadCommunity (state) {
    return state.community
  },
  getRepos (state) {
    return state.repos
  },
  getVersion (state) {
    return state.version
  },
  getPullRequests (state) {
    return state.pullRequests
  }
}