<template>
    <picker v-model="thisShow" :data-items="items" @change="onValuesChange">
      <!--<div class="top-content" slot="top-content">Top of the content.</div>-->
      <!--<div class="bottom-content" slot="bottom-content">Bottom of the content.</div>-->
    </picker>
</template>
<script>
  import picker from 'vue-3d-picker'
  export default {
    name: 'datePicker',
    props: {
      show: false
    },
    components: {
      picker
    },
    watch: {
      show (val) {
        this.thisShow = val
      },
      thisShow (val) {
        if (!val) {
          this.$emit('close')
        }
      }
    },
    methods: {
      onValuesChange (year, month, day, hours, minute) {
        let maxScrollValue = 31
        switch (Number(month)) {
          case 2:
            if (year % 4 === 0) {
              maxScrollValue = 29
            } else {
              maxScrollValue = 28
            }
            break
          case 4:
            maxScrollValue = 30
            break
          case 6:
            maxScrollValue = 30
            break
          case 9:
            maxScrollValue = 30
            break
          case 12:
            maxScrollValue = 30
            break
        }
        this.items[2].maxScrollValue = maxScrollValue
        let date = `${year}-${month}-${day} ${hours}:${minute}`
        date = date.replace(/月|日|时|分|秒/g, '')
        this.$emit('change', date)
      }
    },
    data () {
      let today = new Date()
      let thisYear = today.getFullYear()
      let thisMonth = today.getMonth() + 1
      let thisDay = today.getDate()
      let thisHour = today.getHours()
      return {
        thisShow: false,
        thisYear: thisYear,
        items: [
          {
            values: []
          }, {
            index: thisMonth - 1,
            values: []
          },
          {
            index: thisDay - 1,
            values: []
          },
          {
            index: thisHour - 1,
            values: []
          },
          {
            values: []
          }
        ]
      }
    },
    created () {
      this.thisShow = this.show
      let yearIndex = 0
      for (let i = 2017; i <= 2050; i++) {
        if (this.thisYear === i) {
          this.items[0].index = yearIndex
        }
        this.items[0].values.push(i)
        yearIndex++
      }
      for (let i = 1; i <= 12; i++) {
        let _i = i
        if (_i < 10) {
          _i = '0' + _i
        }
        this.items[1].values.push(_i)
      }
      for (let i = 1; i <= 31; i++) {
        let _i = i
        if (_i < 10) {
          _i = '0' + _i
        }
        this.items[2].values.push(_i)
      }
      for (let i = 1; i <= 23; i++) {
        let _i = i
        if (_i < 10) {
          _i = '0' + _i
        }
        this.items[3].values.push(`${_i}时`)
      }
      for (let i = 1; i <= 59; i++) {
        let _i = i
        if (_i < 10) {
          _i = '0' + _i
        }
        this.items[4].values.push(`${_i}分`)
      }
    }
  }
</script>
