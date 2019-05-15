// import Vuex from 'vuex'

// const createStore = () => {
//   return new Vuex.Store({
//     state: {
//       page: ""
//     },
//     mutations: {
//       setPage(state, page){
//         state.page = page
//       }
//     },
//     actions: {},
//     getters: {
//       loadPage(state){
//         return state.page
//       }
//     }
//   })
// }

// export default createStore

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