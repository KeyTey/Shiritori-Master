import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    formState: {},
    words: [],
    results: [],
    modalState: { setting: false }
  },
  mutations: {
    toggleSettingModal (state, key) {
      state.modalState[key] = !state.modalState[key]
    },
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
    setWords (state, words) {
      state.words = words
    },
    setResult (state, idx) {
      const result = state.results[idx]
      const key = result.key
      const words = key === '' ? state.words : state.words.filter(word => word.slice(-1) === key)
      result.words = words.slice(0, 100)
    }
  },
  actions: {
  },
  modules: {
  }
})
