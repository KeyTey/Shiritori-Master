<template>
  <div>
    <div class="modal" @click.self="$store.commit('toggleModal', mode)">
      <div class="modal-dialog">
        <div class="modal-content" :class="mode">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="close" @click="$store.commit('toggleModal', mode)">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <slot></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show"></div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: String,
    mode: String
  }
}
</script>

<style scoped>
.modal {
  display: block;
}
.modal-dialog {
  margin-top: 140px;
}
</style>
