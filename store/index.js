import start from '../static/lib/tutorials/en_US/'

export const state = () => ({
  page: start.gettingStarted.default,
  repos: {},
  issues: [],
  pullRequests: [],
  commits: [],
})

export const mutations = {
  setPage (state, page) {
    state.page = page
  },
  setPullRequests (state, pull) {
    state.pullRequests = pull
  }
}

export const getters = {
  loadPage (state) {
    return state.page
  },
  getPullRequests (state) {
    return state.pullRequests
  }
}