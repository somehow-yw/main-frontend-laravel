<template>
  <div class="popup-cancel-order"
       :style="{zIndex, zIndex}"
       v-if="isShow"
       @click.self="close(bgEvent)">
    <div class="popup-cancel-order-content" :style="style">
      <div
        v-if="title"
        class="title">
        <span>{{title}}</span>
      </div>
      <div class="cancel-reason">
        <div class="hint">取消原因</div>
        <div class="cancel-reason-items">
          <template v-for="item in reason">
            <div
              class="cancel-reason-item"
              v-waves
              @click="selectedId = item.num"
              >
              <div
                class="radio-box"
                :class="{active: selectedId === item.num}"></div>
              <div class="radio-label">{{item.name}}</div>
            </div>
          </template>
        </div>
        <textarea
          v-model.trim="cancelMsg"
          placeholder="补充说明（限30字）"
          class="supplement"></textarea>
        <div class="hint">您确定要取消订单吗？订单取消后，不可恢复。</div>
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
      'bgEvent',
      'zIndex',
      'orderNo'
    ],
    data () {
      return {
        reason: [],
        selectedId: 0,
        cancelMsg: '',
        style: {
          bottom: '-80%'
        },
        selfButtons: [
          {
            id: 'close',
            text: '关闭'
          },
          {
            id: 'submit',
            text: '确认取消',
            is_close: false,
            style: {
              backgroundColor: '#fd4b4d',
              color: '#ffffff'
            }
          }
        ],
        isShow: false
      }
    },
    watch: {
      show (val) {
        if (!val) {
          this.$store.dispatch('showToolBar')
          this.style.bottom = '-80%'
          setTimeout(() => {
            this.isShow = val
          }, 50)
        } else {
          this.$store.dispatch('hideToolBar')
          this.selectedId = 0
          this.cancelMsg = ''
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
        if (buttonId === 'close') {
          this.close()
          return false
        }
        if (buttonId === 'submit') {
          if (!this.selectedId) {
            this.$auxiliary.toast('请选择取消原因')
            return false
          }
          if (!this.cancelMsg && this.cancelMsg.length > 30) {
            this.$auxiliary.toast('补充说明限30字以内')
            return false
          }
          this.close()
          this.$auxiliary.loading.show()
          this
            .$api
            .order
            .cancel(
              this.orderNo,
              this.selectedId,
              this.cancelMsg
            ).then(() => {
              this.$emit('cancel-success')
              this.$auxiliary.loading.hide()
              this.$auxiliary.toast('取消成功')
            })
        }
      }
    },
    mounted () {
      // 获取原因列表
      this
        .$api
        .order
        .reason(1)
        .then(r => {
          this.reason = r
        })
      this.isShow = this.show
    }
  }
</script>
<style scoped lang="stylus">
  .popup-cancel-order
    position fixed
    width 100%
    height 100%
    background-color rgba(0,0,0,0.5)
    top 0
    left 0
    .popup-cancel-order-content
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
      .cancel-reason
        width calc(100% - 2rem)
        padding 0 1rem
        .cancel-reason-items
          width 100%
          .cancel-reason-item
            width 33.33%
            height 2rem
            float left
            display flex
            align-items center
            .radio-label
              font-size .8rem
              margin-left .3rem
            .radio-box
              width .9rem
              height .9rem
              border-radius 1rem
              border 1px solid #999999
              &.active
                background-color #fd4b4d
                border-color #fd4b4d
        .supplement
          width calc(100% - 1rem)
          height 5rem
          padding .5rem
          margin-top .5rem
          background-color #eeeeee
          border-radius 3px
        .hint
          font-size .8rem
          line-height 2rem
          color #666666
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
