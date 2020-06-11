import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const separated = 'separated'
const composite = 'composite'

function getDefaultFormState (format) {
  switch (format) {
    case separated:
      return { format: format, initial: '', length: '' }
    case composite:
      return { format: format, text: '' }
    default:
      return { format: '' }
  }
}

function getTransformedResults (results, size) {
  const emptyResults = Array(size).fill().map(() => ({ tail: '', words: [] }))
  return results.concat(emptyResults).slice(0, size)
}

function getFilteredWords (words, tail, wordKind) {
  const invalidLetter = /[が-ござ-ぞだ-どば-ぼぱ-ぽゔぁ-ぉゃ-ょっ]/
  let resultWords = (tail === '') ? words : words.filter(word => word.slice(-1) === tail)
  if (wordKind === 'simple') {
    const tailIndex = (tail === '') ? 100 : -1
    const simpleWords = resultWords.filter(word => !invalidLetter.test(word.slice(1, tailIndex)))
    resultWords = simpleWords.length === 0 ? resultWords : simpleWords
  }
  return resultWords
}

export default new Vuex.Store({
  state: {
    words: [],
    formState: getDefaultFormState(separated),
    results: getTransformedResults([], 3),
    option: { enterAction: 'default', wordKind: 'default' },
    modalState: { setting: false }
  },
  mutations: {
    toggleModal (state, key) {
      state.modalState[key] = !state.modalState[key]
    },
    setOption (state, option) {
      const { key, value } = option
      state.option[key] = value
    },
    setFormState (state, format) {
      state.formState = getDefaultFormState(format)
    },
    setResultSize (state, size) {
      state.results = getTransformedResults(state.results, size)
    },
    setWords (state, words) {
      state.words = words
    },
    setResult (state, idx) {
      const result = state.results[idx]
      const words = getFilteredWords(state.words, result.tail, state.option.wordKind)
      result.words = words.sort(() => Math.random() - 0.5).slice(0, 100)
    }
  },
  actions: {
  },
  modules: {
  }
})
