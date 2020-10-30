<template>
  <fieldset class="form-group">
    <div class="row text-left w-100">
      <legend class="col-form-label col-5 pt-0">{{ name }}</legend>
      <div class="col-5">
        <slot></slot>
      </div>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'SettingItem',
  props: {
    name: String
  }
}
</script>
