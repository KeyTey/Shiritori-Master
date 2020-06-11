<template>
  <Modal v-if="modalState.setting" title="設定" mode="setting">
    <form>
      <SettingItem name="検索形式">
        <div class="form-check">
          <input class="form-check-input" type="radio" id="format-separated" value="separated" v-model="format" @change="changeFormState">
          <label class="form-check-label" for="format-separated">
            分離モード
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="format-composite" value="composite" v-model="format" @change="changeFormState">
          <label class="form-check-label" for="format-composite">
            複合モード
          </label>
        </div>
      </SettingItem>
      <SettingItem name="検索結果" class="form-inline">
        <select class="custom-select mr-2" v-model="size" @change="changeSize">
          <option v-for="size in maxSize" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
        <span>列</span>
      </SettingItem>
      <SettingItem name="単語の種類">
        <div class="form-check">
          <input class="form-check-input" type="radio" id="word-default" value="default" v-model="wordKind" @change="changeWordKind">
          <label class="form-check-label" for="word-default">
            デフォルト
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="word-clear" value="simple" v-model="wordKind" @change="changeWordKind">
          <label class="form-check-label" for="word-clear">
            シンプル
          </label>
        </div>
      </SettingItem>
      <SettingItem name="エンターキー">
        <div class="form-check">
          <input class="form-check-input" type="radio" id="enter-default" value="default" v-model="enterAction" @change="changeEnterAction">
          <label class="form-check-label" for="enter-default">
            デフォルト
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="enter-clear" value="clear" v-model="enterAction" @change="changeEnterAction">
          <label class="form-check-label" for="enter-clear">
            入力クリア
          </label>
        </div>
      </SettingItem>
    </form>
  </Modal>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '@/components/Modal.vue'
import SettingItem from '@/components/SettingItem.vue'

export default {
  name: 'SettingModal',
  data () {
    return {
      format: '',
      size: 0,
      maxSize: 6,
      wordKind: '',
      enterAction: ''
    }
  },
  methods: {
    changeFormState () {
      this.$store.commit('setFormState', this.format)
    },
    changeSize () {
      this.$store.commit('setResultSize', this.size)
    },
    changeWordKind () {
      const option = { key: 'wordKind', value: this.wordKind }
      this.$store.commit('setOption', option)
      this.results.forEach((_, i) => this.$store.commit('setResult', i))
    },
    changeEnterAction () {
      const option = { key: 'enterAction', value: this.enterAction }
      this.$store.commit('setOption', option)
    }
  },
  computed: {
    ...mapState({
      formState: state => state.formState,
      results: state => state.results,
      modalState: state => state.modalState
    })
  },
  created: function () {
    this.format = this.formState.format
    this.size = this.results.length
    this.wordKind = this.$store.state.option.wordKind
    this.enterAction = this.$store.state.option.enterAction
  },
  components: {
    Modal,
    SettingItem
  }
}
</script>

<style>
.setting {
  max-width: 400px;
  margin: 0 auto;
}
</style>
