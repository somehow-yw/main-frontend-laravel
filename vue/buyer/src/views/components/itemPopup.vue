<template>
  <div class="input-items"
       :style="{zIndex, zIndex}"
       v-if="isShow"
       @click.self="close(bgEvent)">
    <div class="input-items-content":style="style">
      <div
        v-if="title"
        class="title">
        <span>{{title}}</span>
      </div>
      <div>
        <template v-for="item in selfItems">
          <div class="item">
            <div class="item-name">
              <span>{{item.key}}</span>
            </div>
            <div class="item-input">
              <span :style="item.style">{{item.val}}</span>
            </div>
            <div
              v-if="item.showIconRight"
              class="iconfont item-icon-right">&#xe625;</div>
          </div>
        </template>
      </div>
      <div class="buttons">
        <div class="button"
             v-waves
             v-for="button in selfButtons"
             :style="button.style?button.style:{}"
             @click="buttonEvents(button.id,button.is_close,button.callback)">
          <span>{{button.text}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'itemPopup',
    props: [
      'title',
      'show',
      'itemData',
      'bgEvent',
      'zIndex',
      'buttons'
    ],
    data () {
      return {
        test: '',
        style: {
          bottom: '-80%'
        },
        selfItems: [],
        selfButtons: [
          {
            text: '关闭'
          },
          {
            id: 'submit',
            text: '保存',
            is_close: false,
            style: {
              backgroundColor: '#249af9',
              color: '#ffffff'
            }
          }
        ],
        isShow: false
      }
    },
    watch: {
      itemData (val) {
        this.selfItems = val
      },
      show (val) {
        if (!val) {
          this.$store.dispatch('showToolBar')
          this.style.bottom = '-80%'
          setTimeout(() => {
            this.isShow = val
          }, 50)
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
            this.style.bottom = '-80%'
          }
        }, 50)
        return val
      },
      buttons (val) {
        if (val.length > 0) {
          this.selfButtons = val
        }
      }
    },
    methods: {
      /**
       *  组件内关闭并通知父组件
       */
      close (bgEvent = false) {
        if (bgEvent) {
          return false
        }
        this.style.bottom = '-80%'
        setTimeout(() => {
          this.isShow = false
          this.$emit('close', false)
        }, 50)
        return false
      },
      /**
       *  按钮事件通知父组件
       */
      buttonEvents (buttonId, isClose = false, callback) {
        /**
         * 如果没有传ID,则默认为关闭
         */
        if (!buttonId) {
          this.close()
          return false
        }
        console.log(typeof callback)
        if (typeof callback === 'function') {
          callback(buttonId, buttonId)
        }
        this.$emit(buttonId, buttonId)
        // 是否关闭
        if (isClose) {
          this.close()
        }
      }
    },
    mounted () {
      this.selfItems = this.itemData
      this.isShow = this.show
    }
  }
</script>
<style scoped lang="stylus">
  @import "../../styles/stylus/function.styl"
  .input-items
    position fixed
    width 100%
    height 100%
    background-color rgba(0,0,0,0.5)
    top 0
    left 0
    .input-items-content
      width 100%
      max-height 80%
      position absolute
      bottom 0
      left 0
      background-color #ffffff
      overflow-y auto
      overflow-scrolling touch
      -webkit-overflow-scrolling touch
      flex-direction column
      align-items center
      transition bottom .3s
      .title
        width @width
        height 3rem
        background-color #ffffff
        display flex
        justify-content center
        align-items center
        border-bottom 1px solid #e9e9e9
        >span
          font-size 1rem
          color #333
      .item
        width calc(100% - 2rem)
        height 3rem
        background-color #ffffff
        border-bottom 1px solid #e9e9e9
        margin-left 1rem
        display flex
        align-items center
        &:last-child
          border-bottom none
        .item-name
          width 6rem
          flex-row-vertical-center()
          text-overflow(1)
          >span
            font-size 1rem
        .item-input
          flex 1
          display flex
          flex-direction row-reverse
          justify-content left
          align-items center
          >span
            color #666666
        .item-icon-right
          width 1rem
          font-size 1rem
          color #999999
          display flex
          flex-direction row-reverse
          align-items center
      .buttons
        width: 100%;
        height: 3.5rem;
        border-top 1px solid #efefef
        display flex
        flex-direction row
        .button
          flex 1
          height 100%
          display flex
          justify-content center
          align-items center

</style>
