<template>
  <div v-if="modalState.setting">
    <div class="modal" @click.self="$store.commit('toggleSettingModal', 'setting')">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">設定</h5>
            <button type="button" class="close" @click="$store.commit('toggleSettingModal', 'setting')">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <fieldset class="form-group">
                <div class="row text-left">
                  <legend class="col-form-label col-3 pt-0">検索形式</legend>
                  <div class="col-9">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="format" id="separated" value="separated" v-model="format" @change="changeFormState">
                      <label class="form-check-label" for="separated">
                        分離モード
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="format" id="composite" value="composite" v-model="format" @change="changeFormState">
                      <label class="form-check-label" for="composite">
                        複合モード
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset class="form-group">
                <div class="row text-left">
                  <legend class="col-form-label col-3 pt-0">検索結果</legend>
                  <div class="form-inline col-9">
                    <select class="custom-select mr-2" v-model="size" @change="changeSize">
                      <option v-for="size in maxSize" :key="size" :value="size">
                        {{ size }}
                      </option>
                    </select>
                    <span>列</span>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SettingModal',
  data () {
    return {
      format: '',
      size: 0,
      maxSize: 6
    }
  },
  methods: {
    changeFormState () {
      this.$store.commit('setFormState', this.format)
    },
    changeSize () {
      this.$store.commit('setResultSize', this.size)
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
    this.size = this.results.length
    this.format = this.formState.format
  }
}
</script>

<style scoped>
.modal {
  display: block;
}
</style>
