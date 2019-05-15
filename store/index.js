import start from '../static/lib/tutorials/en_US/'

export const state = () => ({
  page: start.gettingStarted.default

})

export const mutations = {
  setPage (state, page) {
    state.page = page
  }
}

export const getters = {
  loadPage (state) {
    return state.page
  }
}