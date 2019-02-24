import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageTitle: null
  },
  mutations: {
    setPageTitle (state, pageTitle) {
      state.pageTitle = pageTitle;
    },
  },
  actions: {

  }
})
