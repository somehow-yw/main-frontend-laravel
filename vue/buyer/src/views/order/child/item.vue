<template>
  <div class="item">
    <div class="title">
      <div class="left">
        <div class="title-info">
          <div
            class="shop-name"
          @click="jump(`/?m=PublicTemplate&c=ApiPublic&a=shopShow&shopId=${shopId}`, true)">
            <div class="iconfont icon">&#xe736;</div>
            <div class="name">{{shopName}}</div>
          </div>
        </div>
        <div class="iconfont icon">&#xe625;</div>
      </div>
      <div class="right">
        <div
          v-if="otherStatus !== 24 && otherStatus !== 25"
          class="status">{{orderMainStatus[status]}}</div>
        <div class="action">{{otherOtherStatus[otherStatus]}}</div>
      </div>
    </div>
    <div class="create-time">
      下单时间: &nbsp;&nbsp;{{orderTime}}
    </div>
    <template v-for="(item, idx) in goods">
      <div
        v-if="idx < 3"
        @click="jump(`/order_detail/${orderNum}`)"
        class="goods">
        <div class="thumb">
          <img :src="cutImg(completePath(item.goods_img), 64, 0, 2)" :alt="item.goods_name">
        </div>
        <div class="info">{{item.goods_name}}</div>
        <div class="data">
          <div class="price">￥{{Number(item.unit_price).toFixed(2)}}</div>
          <div class="numbers">×{{Number(item.num)}}</div>
        </div>
      </div>
    </template>

    <div
      v-if="goods.length > 3"
      class="show-more"
      @click="jump(`/order_detail/${orderNum}`)">
      <div class="show-more-text">查看更多</div>
      <div class="iconfont show-more-icon">&#xe610;</div>
    </div>
    <div class="statistics-bar">
      <span class="sub">（不含运费）</span>
      <span class="price">￥{{Number(allMoney).toFixed(2)}}</span>
      <span>共{{goods.length}}种商品 合计:</span>
    </div>
    <div class="tool-bar">
      <div class="buttons">
        <template v-if="otherStatus !== 24 && otherStatus !== 25">
          <template v-if="status === 1">
            <div
              v-if="otherStatus !== 22"
              style="border-color:#249af9"
              class="button"
              @click="$emit('pay-now',orderNum)">
            <span
              style="color: #249af9;">立即支付</span>
            </div>
            <div
              @click="$emit('cancel-order')"
              class="button">
              <span>取消订单</span>
            </div>
            <div
              @click="jump(`/update/${orderNum}`)"
              class="button">
              <span>修改地址</span>
            </div>
          </template>
          <template v-if="status === 2">
            <div
              @click="jump(`/refund_money/${orderNum}`)"
              class="button">
              <span>申请退款</span>
            </div>
            <div
              @click="$emit('remind-shipment')"
              class="button">
              <span>提醒发货</span>
            </div>
          </template>
          <template v-if="status === 3">
            <div
              @click="jump(`/refund/${orderNum}`)"
              class="button">
              <span>退款/退货</span>
            </div>
            <div
              @click="$emit('confirm-receipt')"
              class="button">
              <span>确认收货</span>
            </div>
          </template>
          <template v-if="status === 4">
            <div
              v-if="appraise === 2"
              @click="jump(`/comment/${orderNum}`)"
              class="button">
              <span>评价订单</span>
            </div>
            <div
              v-if="appraise === 4"
              @click="jump(`/re_comment/${orderNum}`)"
              class="button">
              <span>追加评价</span>
            </div>
            <div
              @click="buyAgain"
              class="button">
              <span>再次购买</span>
            </div>
          </template>
          <!--退款-->
          <template v-if="status === 6">
            <div
              class="button"
              @click="withdraw(1)"
              v-if="otherStatus === 14 ||
            otherStatus === 15
            ">
              <span>取消申请</span>
            </div>
            <div
              class="button"
              @click="agentApply(1)"
              v-if="otherStatus === 15">
              <span>再次申请</span>
            </div>
          </template>
          <!--退货-->
          <template v-if="status === 11">
            <div
              class="button"
              @click="withdraw(2)"
              v-if="otherStatus === 16 ||
            otherStatus === 17">
              <span>取消申请</span>
            </div>
            <div
              class="button"
              @click="agentApply(2)"
              v-if="otherStatus === 17">
              <span>再次申请</span>
            </div>
            <div
              class="button"
              @click="$emit('confirm-delivery')"
              v-if="otherStatus === 19">
              <span>确认发货</span>
            </div>
            <div
              class="button"
              @click="updateReturnMoney"
              v-if="otherStatus === 16">
              <span>修改退款金</span>
            </div>
          </template>
          <!--退款退货共有状态-->
          <template v-if="(status === 6 || status === 11) && otherStatus === 20">
            <div class="button"
                 @click="setReturnAct(1)">
              <span>同意申请</span>
            </div>
            <div class="button"
                 @click="setReturnAct(2)">
              <span>拒绝申请</span>
            </div>
          </template>
          <template v-if="status === 13">
            <div
              @click="buyAgain"
              class="button">
              <span>再次购买</span>
            </div>
          </template>
        </template>
        <div
          @click="$emit('call')"
          class="button">
          <span>联系卖家</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      // 商品列表
      goods: {
        type: Array,
        default: function () {
          return []
        }
      },
      // 下单时间
      orderTime: {
        type: String,
        default: ''
      },
      // 订单编号
      orderNum: {
        type: String,
        default: ''
      },
      // 店铺名称
      shopName: {
        type: String,
        default: ''
      },
      // 订单状态
      status: {
        type: Number
      },
      // 订单总金额
      allMoney: {
        type: Number,
        default: 0
      },
      // 订单子状态
      otherStatus: {
        type: Number
      },
      // 订单评价状态
      appraise: {
        type: Number
      },
      // 店铺ID
      shopId: {
        type: Number
      }
    },
    data () {
      return {
        // 订单主状态
        orderMainStatus: {
          1: '待付款',
          2: '待发货',
          3: '待收货',
          4: '交易完成',
          6: '退款',
          8: '交易完成',
          11: '退货',
          13: '交易关闭'
        },
        otherOtherStatus: {
          14: '申请退款',
          15: '卖家拒绝退款',
          16: '申请退货',
          17: '卖家拒绝退货',
          18: '等待卖家退款',
          19: '等待退货',
          20: '卖家取消订单',
          21: '拒绝取消订单',
          22: '集采-等待卖家报价',
          23: '集采-待付款',
          24: '自行协商',
          25: '自行协商'
        }
      }
    },
    methods: {
      /**
       * 同意(拒绝)卖家申请
       */
      setReturnAct (type) {
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .setReturnAct(this.orderNum, type)
          .then(() => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('确认成功')
            this.$parent.refresh()
          })
      },
      /**
       * 取消申请退款退货
       * @param type
       */
      withdraw (type) {
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .setUnReturn(this.orderNum, type)
          .then(r => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('取消成功')
            this.$parent.refresh()
          })
      },
      /**
       * 再次申请退款或退货
       * @param type
       */
      agentApply (type) {
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .setAgainReturn(this.orderNum, type)
          .then(r => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('申请成功')
            this.$parent.refresh()
          })
      },
      /**
       * 修改退款金额
       */
      updateReturnMoney () {
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .getReturnInfo(this.orderNum)
          .then(r => {
            this
              .$auxiliary
              .popup
              .prompt({
                title: '修改退款金额',
                placeholder: `最大金额:${r.realReturnMoney}`,
                value: r.realReturnMoney,
                submit: (val, close) => {
                  if (!Number(val)) {
                    this.$auxiliary.toast('请输入数字,保留两位小数')
                    return false
                  }
                  if (Number(val) <= 0) {
                    this.$auxiliary.toast('请输入大于0的数字')
                    return false
                  }
                  if (Number(val) > Number(r.realReturnMoney)) {
                    this.$auxiliary.toast(`本次修改金额不能大于${r.realReturnMoney}元`)
                    return false
                  }
                  if (Number(val) === Number(r.realReturnMoney)) {
                    this.$auxiliary.toast('退款金额没有被修改')
                    return false
                  }
                  close()
                  this.$auxiliary.loading.show()
                  this
                    .$api
                    .order
                    .setReturnMoney(this.orderNum, parseInt((val) * 100))
                    .then(() => {
                      this.$auxiliary.toast('修改成功')
                      this.$parent.refresh()
                    })
                }
              })
          })
      },
      // 再次购买
      buyAgain () {
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .buyAgain(this.orderNum)
          .then(() => {
            this.$auxiliary.loading.hide()
            this.jump('/cart')
          })
      }
    }
  }
</script>
<style scoped lang="stylus" src="@styl/order/child/item.styl"></style>
