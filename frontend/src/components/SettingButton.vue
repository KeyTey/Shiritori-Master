<template>
  <div class="input-group-prepend">
    <button type="button" class="btn btn-outline-secondary" @click="$store.commit('toggleSettingModal', 'setting')">
      <i class="fas fa-cog"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SettingButton'
}
</script>
