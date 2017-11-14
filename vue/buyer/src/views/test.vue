<template>
  <div>
    <picker :show="show" @close="show = false" @change="change"></picker>
  </div>
</template>
<script>
  import picker from '@components/datePicker'
  export default {
    components: {
      picker
    },
    data () {
      return {
        show: true
      }
    },
    methods: {
      change (val) {
        console.log(val)
      }
    }
  }
</script>
<style>

</style>
