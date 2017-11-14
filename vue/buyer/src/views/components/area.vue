<template>
  <div class="area"
       :style="{zIndex, zIndex}"
       v-if="isShow"
       @click.self="close(bgEvent)">
    <div class="area-content" :style="style">
      <div class="area-loading" v-if="loading">
        <div class="loading-content">
          <div class="pacman">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div class="title">
        <span>选择所在区域</span>
        <div class="close" @click="close()">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAENklEQVR4XuWb22rUQBjHv28vio/gQ/gMIvgCiuCpltbDN2u1RcSKF1ZUrCBYoWC17sx6PhQt3hW8bX2NvkTvBNF8MstmSbOTTDJJJpu4l81h8/vl/82pswj/+Qcj/EhEipl/9vv9D230QkRnAeDk3t7e9M7Ozh/NOBJARK8R8RIzMwDMKqU+tklCt9s9EwTBJiIiM//Y398/sbW19XsgQAjxEgDmY8Akpey3QYIQYhYA3kVZmHlXKXVsIICIJCJS7IRWJIGIZgDgvX7zIR8z/wWAM0qp79ESaJ0EG/yBNiAtCYgomlYOWeDHBCRJGEanMW2CCR4AAmY+rWMfLfVoNzj6OxE9R8QFQwM48RKS4AFgRkr5Jc5kFDBMQuMk5IU3lkDUUJOS4AJvFdCUJAghrjCz7sWiiQ6SYm9tA+J1MslJ0PAAoGLPnAk+UwLCG6dIWJBSvqhjxFgUPpcASzl4l1AGfG4BQwlPEXHJ8Ma9STDB60kcIl4wdXVp6UzsBtMuIqLaJCTBdzqdy71e723eUnQSUFcShBDXAWA9PmlzhXcqgdg4wVsSqoAvLMBXEqqCL0WARcKSlPJZ3rqMnl8lfGkCqpJQNXypAvTNhBD3AeCB4Y3nToIP+NIFDCXcAoDVIhKEEMZ76EVbl66u9HGAraaTAADAmoSka5l5Xin1yvbdeY87jwNsX+QiwTd8JSUQa8Ezl0Md8JULsLQJD6WUgwazLngvAoZd5B1EfBIvG2ZeQcRfAPDYUFKLUsoDw15b2bkcr6wNiD9MSpsw9txVNXgmQd4EDKM+NpkxpKKS1j4pHV4F2CT4fPOhEO8CiOgGIq4lvBFviyq1CLDAh8/kVYK3BGSE9y7BiwAiuoqIG6b5ATMfTlhjbEc3mAYfrhWkrDFa5w4ufX/0mkoTkAU+fJi6JFQmIA98RMIjRFw2lUrRlSWv44AUeGsLL4S4CwArviSUnoAi8CG0y1TatS0oVUAZ8L4llCagTHifEkoR0O12LzLzG0MMrTVvi27V5VBYgIYPgkDvMo3fqzB8hiQsSylNawk2r6PjhQSkwJe+mSpl1WhFKXUvM3HsRGcBPuFtSWDmVaXUbRcJTgLqgK9KQm4BdcJHJBhXllySkEvAJMCXLSGzABP8cFtKbfuITf8/1ILyJCGTACHEeWb+FNtyPhHb6YtKsArQ8ACgfz3SCeM3ab8qKSIhVUAT4Iu2CYkCmgSfQcK6UmrRNE4wCmgivKuEMQFNho9IMO0f1r3DWBIOCEiC73Q653q93leXoWZd1yRspR2TMBLQJvg8SRgIIKJTiPgt3tU18c3HE2dLwkCAEGIXAI7GLp7Ou/G4rrjbvjdhtWpNSnlzIGBubu7Q1NTUNgAc14OcNrx5SxI2pJTX9DkHGkEi2gSAbaXUZ5vVJh4XQswz8xGllJ5NDj7WoXATQfM88z/RNDVuw8IrqgAAAABJRU5ErkJggg==" />
        </div>
        <div class="submit" @click="submit">确定</div>
      </div>
      <div class="sub-title">
          <template v-for="(item, key) in selected">
            <div
              class="item"
              @click="changeArea(key)"
              :class="{active: key === nowShow}"
              v-waves>{{item.name}}</div>
          </template>
          <div
            class="item active"
            v-if="Object.keys(selected).length <= 2"
          >请选择</div>
      </div>
      <div class="area-list" ref="areaList">
        <template v-for="(item,idx) in showItem">
          <div
            class="area-item"
            :class="{active: (typeof item.active !== 'undefined' && item.active === true)?true:false}"
            @click="getArea(idx)">{{item.name}}</div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  import 'loaders.css'
  export default {
    name: 'area',
    props: [
      'show',
      'zIndex',
      'bgEvent'
    ],
    data () {
      return {
        style: {
          bottom: '-60%'
        },
        province: [],
        city: [],
        county: [],
        showItem: [],
        nowShow: 'province',
        selected: {},
        isShow: false,
        loading: false
      }
    },
    watch: {
      show (val) {
        if (!val) {
          this.$store.dispatch('showToolBar')
          this.style.bottom = '-60%'
          setTimeout(() => {
            this.isShow = val
          }, 60)
        } else {
          this.$store.dispatch('hideToolBar')
          this.isShow = val
        }
      },
      isShow (val) {
        setTimeout(() => {
          if (val) {
            this.style.bottom = '0'
          } else {
            this.style.bottom = '-60%'
          }
        }, 60)
        return val
      }
    },
    methods: {
      submit () {
        if (!this.selected['province']) {
          this.$auxiliary.toast('请选择省份!')
          return false
        }
        if (!this.selected['city']) {
          this.$auxiliary.toast('请选择城市!')
          return false
        }
        if (!this.selected['county']) {
          this.$auxiliary.toast('请选择区/县!')
          return false
        }
        this.$emit('submit', this.selected)
        this.close()
      },
      /**
       *  组件内关闭并通知父组件
       */
      close (bgEvent = false) {
        if (bgEvent) {
          return false
        }
        this.style.bottom = '-60%'
        setTimeout(() => {
          this.isShow = false
          this.$emit('close', false)
        }, 60)
        return false
      },
      /**
       *  点击切换sub-title
       */
      changeArea (type) {
        switch (type) {
          case 'province':
            this.showItem = this.province
            break
          case 'city':
            this.showItem = this.city
            break
          case 'county':
            this.showItem = this.county
            break
        }
        this.nowShow = type
      },
      /**
       * 获取区域信息
       * @param pid
       * @param type
       */
      getData (pid = '', type = 'province') {
        this.loading = true
        this
          .$api
          .other
          .getArea(pid)
          .then(r => {
            this.loading = false
            if (!r || r.length < 1) {
              return false
            }
            switch (type) {
              case 'province':
                this.province = r
                break
              case 'city':
                this.city = r
                break
              case 'county':
                this.county = r
                break
            }
            this.showItem = r
            if (typeof this.$refs.areaList !== 'undefined') {
              this.$refs.areaList.scrollTop = 0
            }
          })
      },
      getArea (idx) {
        this.showItem =
          this.showItem.map((item, index) => {
            item.active = false
            if (idx === index) {
              this.selected[this.nowShow] = item
              item.active = true

              if (this.nowShow !== 'county') {
                if (this.nowShow === 'province') {
                  this.nowShow = 'city'
                  delete this.selected.county
                  delete this.selected.city
                } else if (this.nowShow === 'city') {
                  this.nowShow = 'county'
                  delete this.selected.county
                }
                this.getData(item.id, this.nowShow)
              }
            }
            return item
          })
      }
    },
    mounted () {
      this.isShow = this.show
    },
    created () {
      this.getData()
    }
  }
</script>
<style scoped lang="stylus">
  .area
    position fixed
    width 100%
    height 100%
    background-color rgba(0,0,0,0.5)
    top 0
    left 0
    .area-content
      width 100%
      height 60%
      position absolute
      bottom 0
      left 0
      background-color #ffffff
      overflow-y hidden
      transition bottom .3s
      .area-loading
        position absolute
        width 100%
        height calc(100% - 3rem)
        top 3rem
        left 0
        background-color rgba(0,0,0,0.5)
        z-index 99
        display flex
        align-items center
        justify-content center
      .area-list
        width 100%
        height calc(100% - 5.5rem)
        overflow-y auto
        -webkit-overflow-scrolling touch
        overflow-scrolling touch
        .area-item
          width calc(100% - 1rem)
          height 2.5rem
          font-size 1rem
          color #000000
          display flex
          align-items center
          padding-left 1rem
          &.active
            color #249af9
      .sub-title
        width 100%
        height 2.5rem
        border-bottom 1px solid #e9e9e9
        align-items center
        display flex
        position relative
        .item
          height 2.5rem
          max-width 5rem
          font-size .8rem
          color #000
          line-height 2.5rem
          padding 0 1rem
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 1
          -webkit-box-orient vertical
          word-break break-all
          &.active
            height 2.5rem
            margin-top 1px
            border-bottom 1px solid #249af9
            color #249af9
      .title
        width @width
        height 3rem
        background-color #ffffff
        display flex
        justify-content center
        align-items center
        border-bottom 1px solid #e9e9e9
        position relative
        >span
          font-size 1rem
          color #333
        .close
          width 3rem
          height 3rem
          position absolute
          top 0
          left 0
          display flex
          align-items center
          justify-content center
          &:active
            background-color #efefef
          >img
            width 1rem
            height 1rem
        .submit
          width 4rem
          height 3rem
          position absolute
          top 0
          right 0
          display flex
          align-items center
          justify-content center
          font-size .9rem
          color #666
          &:active
            background-color #efefef
</style>
