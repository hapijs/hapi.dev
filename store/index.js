
export const state = () => ({
  page: ""

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