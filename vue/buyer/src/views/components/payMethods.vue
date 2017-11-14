<template>
  <div class="pay-method"
       :style="{zIndex, zIndex}"
       v-if="isShow"
       @click.self="close(bgEvent)">
    <div
      class="pay-method-content"
      :style="style">
      <div
        v-if="title"
        class="title">
        <span>{{title}}</span>
      </div>
      <div>
      <template v-for="(item, key, idx) in payMethods">
        <div
          class="item"
          @click="goTo(key,item.status)"
          v-waves>
          <div class="item-content">
            <div class="icon">
              <img :src="icon[key]" alt="">
            </div>
            <div class="text">{{item.payment_mode}}</div>
            <!--<div class="item-hint">查看限额</div>-->
            <div class="iconfont icon-right">&#xe608;</div>
          </div>
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
    name: 'payMethods',
    props: [
      'title',
      'show',
      'bgEvent',
      'zIndex',
      'buttons',
      'orderNo',
      'payMethods',
      'from'
    ],
    data () {
      return {
        style: {
          bottom: '-80%'
        },
        selfButtons: [
          {
            text: '关闭'
          }
        ],
        isShow: false,
        icon: {
          baofoo_wechat_pub: `data:image/png;base64,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`,
          baofoo_quick_pub: 'data:image/png;base64,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',
          bank: 'data:image/png;base64,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',
          ious: 'data:image/png;base64,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'
        }
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
      goTo (type, status) {
        // 选择微信支付则通知父组件
        if (type === 'baofoo_wechat_pub' || type === 'wechat_pub') {
          this.weChatPay(type)
          return false
        }
        let path = ''
        switch (type) {
          case 'ious':
            path = '/lous_payment/'
            break
          case 'baofoo_quick_pub':
            path = '/union_pay/select/'
            break
        }
        path += this.orderNo
        this.jump(path, false, this.from === 'settlement')
      },
      /**
       * 微信支付
       */
      weChatPay (type) {
        this.showPayMethods = false
        this.$auxiliary.loading.show()
        this
          .$api
          .pay
          .weChatPay(this.orderNo, type)
          .then(r => {
            this.$auxiliary.loading.hide()
            /*eslint-disable */
            let data = {
              "appId": r.charge.appId,     // 公众号名称，由商户传入
              "timeStamp": r.charge.timeStamp,         // 时间戳，自1970年以来的秒数
              "nonceStr": r.charge.nonceStr, // 随机串
              "package": r.charge.package,
              "signType": r.charge.signType,         // 微信签名方式：
              "paySign": r.charge.paySign // 微信签名
            }
            /*eslint-enable */
            window.WeixinJSBridge.invoke(
              'getBrandWCPayRequest', data,
              r => {
                if (r.err_msg === 'get_brand_wcpay_request:ok') {
                  this.$auxiliary.toast('支付成功')
                  this.$emit('wechat-pay-success')
                } else {
                  this.$auxiliary.toast('支付失败:' + JSON.stringify(r))
                }
              }
            )
          })
      },
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
        if (typeof callback === 'function') {
          callback(buttonId, buttonId, this.id)
        }
        // 通知父组件
        this.$emit(buttonId, buttonId, this.id)
        // 是否关闭
        if (isClose) {
          this.close()
        }
      }
    },
    mounted () {
      this.isShow = this.show
    },
    created () {
      this.icon.wechat_pub = this.icon.baofoo_wechat_pub
    }
  }
</script>
<style scoped lang="stylus">
  .pay-method
    position fixed
    width 100%
    height 100%
    background-color rgba(0,0,0,0.5)
    top 0
    left 0
    .pay-method-content
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
      .item
        width 100%
        height calc(3rem + 1px)
        &:last-child
          .item-content
            border-bottom none
        .item-content
          width calc(100% - 2rem)
          margin  0 1rem
          height 3rem
          display flex
          align-items center
          border-bottom 1px solid #eeeeee
          .item-hint
            width 5rem
            height @height
            font-size .9rem
            color #999999
            display flex
            align-items center
            flex-direction row-reverse
          .icon
            width 1.5rem
            height 1.5rem
            margin-right .75rem
          .icon-right
            width 1.5rem
            height @height
            display flex
            align-items center
            flex-direction row-reverse
            color #999999
          .text
            flex 1
            font-size 1rem
          img
            width 100%
            height 100%
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
