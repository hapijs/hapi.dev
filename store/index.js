import start from '../static/lib/tutorials/en_US/'

export const state = () => ({
  page: start.gettingStarted.default,
  version: "18.3.1",
  repos: [],
  issues: [],
  pullRequests: [],
  commits: [],
})

export const mutations = {
  setPage (state, page) {
    state.page = page
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