<script>
export default {
  name: "alert",
  data() {
    return {

    }
  },
  props: {
    error: { required: true, default: false},
    text: { required: true, default: ''}
  }
}
</script>

<template>
  <div class="alert" :class="{ 'alert-primary': !error, 'alert-danger': error }" role="alert">
    {{ text }}
  </div>
</template>

<style scoped>

</style>
