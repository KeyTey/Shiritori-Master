import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formState: {},
    results: [],
    modalState: { setting: false }
  },
  mutations: {
    setFormState (state, format) {
      switch (format) {
        case 'separated':
          state.formState = {
            format: 'separated',
            initial: '',
            length: ''
          }
          break
        case 'composite':
          state.formState = {
            format: 'composite',
            text: ''
          }
          break
        default:
          break
      }
    },
    setResultSize (state, size) {
      const emptyResults = Array(size).fill().map(() => ({ key: '', words: [] }))
      state.results = state.results.concat(emptyResults).slice(0, size)
    },
    toggleSettingModal (state, key) {
      state.modalState[key] = !state.modalState[key]
    }
  },
  actions: {
  },
  modules: {
  }
})
