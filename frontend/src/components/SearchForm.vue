<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <button type="button" class="btn btn-outline-secondary" @click="$store.commit('toggleModal', 'setting')">
        <i class="fas fa-cog"></i>
      </button>
    </div>
    <slot></slot>
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" @click="clearText">クリア</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SearchForm',
  data () {
    return {
      separated: 'separated',
      composite: 'composite'
    }
  },
  methods: {
    clearText () {
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
      results: state => state.results
    })
  }
}
</script>
