<template>
  <div class="search">
    <div class="fadein">
      <div class="main">
        <SearchForm v-if="formState.format === separated">
          <input type="text" placeholder="頭文字" id="first-input" class="form-control w-25" v-model="formState.initial" @input="onChangeText" @keydown.enter="clearText">
          <input type="text" placeholder="文字数" id="second-input" class="form-control w-25" v-model="formState.length" @input="onChangeText" @keydown.enter="clearText">
        </SearchForm>
        <SearchForm v-if="formState.format === composite">
          <input type="text" placeholder="頭文字 + 文字数" id="first-input" class="form-control w-50" v-model="formState.text" @input="onChangeText" @keydown.enter="clearText">
        </SearchForm>
        <div class="results">
          <div v-for="(result, i) in results" class="card p-0" :key="i">
            <div class="card-header">
              <input type="text" class="form-control" v-model="result.tail" @input="onChangeTail(i)" placeholder="語尾" maxlength="1">
            </div>
            <ul class="list-group">
              <li v-for="(word, i) in result.words" class="list-group-item" :key="i">
                {{ word }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <SettingModal />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchForm from '@/components/SearchForm.vue'
import SettingModal from '@/components/SettingModal.vue'
const axios = require('axios').create()

export default {
  name: 'Search',
  data () {
    return {
      separated: 'separated',
      composite: 'composite'
    }
  },
  methods: {
    isValidSeparatedText (initial, length) {
      const vowel = /^[aiueon]$/
      const consonant = /^[kstnhmyrwgzjdhpbv][aiueo]$/
      const hiragana = /^[ぁ-んゔ]$/
      const halfNumeral = /^[1-9][0-9]*$/
      const fullNumeral = /^[１-９][０-９]*$/
      if (vowel.test(initial) || consonant.test(initial) || hiragana.test(initial)) {
        if (halfNumeral.test(length) || fullNumeral.test(length)) {
          return true
        }
      }
      return false
    },
    getSeparatedText (text) {
      let initial = ''
      let length = ''
      const nonNumeral = /^[^0-9０-９]+/
      const match = text.match(nonNumeral)
      if (match === null) return { initial, length }
      initial = match[0]
      length = text.slice(initial.length)
      return { initial, length }
    },
    onChangeText () {
      const { initial, length } = (() => {
        switch (this.formState.format) {
          case this.separated:
            return this.formState
          case this.composite:
            return this.getSeparatedText(this.formState.text)
          default:
            return { initial: '', length: '' }
        }
      })()
      if (this.isValidSeparatedText(initial, length)) {
        axios.get('/api/search', {
          params: {
            initial: initial,
            length: length
          }
        })
          .then(res => {
            this.$store.commit('setWords', res.data)
            this.results.forEach((_, i) => this.$store.commit('setResult', i))
          })
          .catch(() => {})
      } else {
        this.$store.commit('setWords', [])
        this.results.forEach((_, i) => this.$store.commit('setResult', i))
      }
    },
    onChangeTail (idx) {
      this.$store.commit('setResult', idx)
    },
    clearText () {
      if (this.enterAction !== 'clear') return
      switch (this.formState.format) {
        case this.separated:
          this.formState.initial = ''
          this.formState.length = ''
          break
        case this.composite:
          this.formState.text = ''
          break
        default:
          break
      }
      document.getElementById('first-input').focus()
      this.$store.commit('setWords', [])
      this.results.forEach((_, i) => this.$store.commit('setResult', i))
    }
  },
  computed: {
    ...mapState({
      formState: state => state.formState,
      enterAction: state => state.option.enterAction,
      results: state => state.results
    })
  },
  components: {
    SearchForm,
    SettingModal
  }
}
</script>

<style scoped>
.main {
  height: 100%;
}
.input-group {
  width: 500px;
  max-width: 90%;
  margin: 0 auto;
  padding: 30px 0;
}
.results {
  display: flex;
  justify-content: center;
  margin: 0 20px;
}
.card {
  width: 100%;
  max-width: 350px;
  margin: 0 4px;
}
</style>
