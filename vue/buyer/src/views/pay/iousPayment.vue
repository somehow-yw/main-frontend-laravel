<template>
  <div class="content">
    <template v-if="show">
      <div class="item-hint">贷款申请</div>
      <div class="list">
        <div class="item">
          <div class="item-title">订单编号</div>
          <div class="item-content">{{orderNo}}</div>
        </div>
        <div class="item">
          <div class="item-title">下单时间</div>
          <div class="item-content">{{time}}</div>
        </div>
        <div class="item">
          <div class="item-title">订单金额</div>
          <div class="item-content">{{Number(price).toFixed(2)}}元</div>
        </div>
      </div>
      <div class="list">
        <div class="item">
          <div class="item-title">贷款金额</div>
          <div class="item-content">{{Number(price).toFixed(2)}}元</div>
        </div>
        <div class="item">
          <div class="item-title">贷款期限</div>
          <div
            class="item-content">
            <select v-model.trim="date">
              <template v-for="item in [10,20,30]">
                <option
                  :selected="item === date"
                  :value="item">{{item}}天</option>
              </template>
            </select>
          </div>
          <div class="iconfont item-right-icon">&#xe608;</div>
        </div>
        <!--<div class="item">-->
          <!--<div class="item-title">年利率</div>-->
          <!--<div class="item-content">{{Number(rate.year_interest_rate).toFixed(2)}}元</div>-->
        <!--</div>-->
        <div class="item">
          <div class="item-title">贷款利率</div>
          <div class="item-content">每天{{Number(rate.interest_rate).toFixed(2)}}元</div>
        </div>
        <div class="item">
          <div class="item-title">贷款利息</div>
          <div class="item-content">{{(Number(rate.interest) / 100).toFixed(2)}}元</div>
        </div>
      </div>
      <div
        style="height: 2.5rem;
        color: #000000;
        font-size: 1rem
      "
        class="item-hint">
        我的贷款可以额度:&nbsp;&nbsp;
        <span style="color: #249af9; font-size: 1.2rem;">{{(Number(rate.available) / 100 ).toFixed(2)}}</span>元
      </div>
      <div class="agree">
        <div
          class="radio-box"
          @click="active = !active"
          :class="{active: active}"></div>
        <div class="agree-text">
          我已阅读并同意
          <span>《借款合同》</span>
          与
          <span>《代扣协议》</span>
        </div>
      </div>
      <div
        class="submit"
        @click="submit"
        :class="{disabled: !active}"
        v-waves>
        确认支付
      </div>
    </template>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        // 订单编号
        orderNo: '',
        // 订单总价
        price: 0,
        // 是否同意协议
        active: false,
        // 下单时间
        time: '',
        show: false,
        // 贷款期限
        date: 30,
        rate: {}
      }
    },
    watch: {
      date (val) {
        this.$auxiliary.loading.show()
        this.calculation()
      }
    },
    methods: {
      submit () {
        // todo 提交贷款支付
        if (!this.active) {
          return false
        }
        let data = {
          apply_data: {
            main_order_no: this.payOrderNo,
            loan_money: this.rate.price,
            loan_period: this.date,
            interest_rate: this.rate.interest_rate,
            interest: this.rate.interest
          },
          final_protocol: {
            loan_contract: Number(this.active),
            withhold_contract: Number(this.active)
          }
        }
        this.$auxiliary.loading.show()
        this
          .$api
          .pay
          .iousApply(data)
          .then(r => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('支付成功')
            this.jump('/order/shipment_pending/pay_back')
          })
      },
      /**
       * 计算利率
       */
      calculation () {
        this
          .$api
          .pay
          .getInterestRate(
            this.payOrderNo,
            this.price,
            this.date
          ).then(r => {
            this.rate = r
            this.show = true
            this.$auxiliary.loading.hide()
          })
      }
    },
    created () {
      this.orderNo = this.$route.params.order_no
      if (!this.orderNo) {
        this.$auxiliary.toast('缺少订单编号!')
        window.location.go(-1)
      }
      this.$auxiliary.loading.show()
      this
        .$api
        .order
        .orderDetail(this.orderNo)
        .then(r => {
          console.log(r)
          let data = r.progress_list.pop()
          this.price = data.all_price
          this.time = data.time
          this.calculation()
        })
    }
  }
</script>
<style
  scoped
  lang="stylus">
  .content
    width 100%
    .item-hint
      width calc(100% - 2rem)
      padding 0 1rem
      height 2.5rem
      font-size .9rem
      color #999999
      display flex
      align-items center
    .list
      width calc(100% - 2rem)
      padding 0 1rem
      background-color #ffffff
      margin-bottom 1rem
      .item
        width 100%
        height 3rem
        border-bottom 1px solid #eeeeee
        display flex
        align-items center
        &:last-child
          border-bottom none
        .item-title
          width 6rem
          font-size 1rem
        .item-content
          flex 1
          font-size 1rem
          text-align right
          select
            width 100%
            font-size 1rem
            text-align right
            direction: rtl;
            -webkit-appearance: none;
            background-color:transparent;
            border-color:transparent;
            option
              text-align right
        .item-right-icon
          width 1.5rem
          font-size .8rem
          text-align right
    .agree
      width calc(100% - 2rem)
      padding 0 1rem
      display flex
      align-items center
      height 3rem
      .radio-box
        width .8rem
        height .8rem
        border-radius 1rem
        background-color #ffffff
        border 1px solid #999999
        &.active
          border-color #249af9
          background-color #249af9
      .agree-text
        font-size .8rem
        margin-left .5rem
        >span
          color #249af9
    .submit
      width calc(100% - 2rem)
      margin 0 0 1rem 1rem
      height 3rem
      display flex
      align-items center
      justify-content center
      color #ffffff
      background-color #249af9
      border-radius 3px
      &.disabled
        background-color #cccccc
</style>
