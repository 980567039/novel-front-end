import Vue from 'vue'
import Vuex from 'vuex'
// vuex状态持久化
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    title: '',
    readFontize: 16,
    readBackground: ''
  },
  mutations: {
    SET_STATE(commit, state) {
      commit[state.key] = state.val
    }
  },
  actions: {
  },
  plugins: [createPersistedState()]
});

export default store

