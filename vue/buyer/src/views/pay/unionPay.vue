<template>
  <div class="content" v-if="loaded">
    <template v-if="type === 'select'">
      <div class="item-hint">请选择支付银行卡</div>
      <div
        class="list"
        @click="selectedId = item.payment_id"
        v-for="item in bankCards">
        <div class="item">
          <div class="iconfont item-left-icon">&#xe809;</div>
          <div class="item-title">{{item.name}}</div>
        </div>
          <div
            class="item">
            <div
              class="iconfont item-left-icon"
              :class="{active: item.payment_id === selectedId}">
              <span class="not-checked">&#xe66c;</span>
              <span class="checked">&#xe730;</span>
            </div>
            <div class="item-title">{{item.bank_name}}</div>
            <div class="item-content">**** **** **** {{item.bank_card_no}}</div>
          </div>
      </div>
      <div
        class="submit"
        @click="submit('select')"
        :class="{disabled: selectedId <= 0}"
        v-waves>下一步</div>
      <div class="create">
          <span
            class="iconfont"
            @click="jump(`/union_pay/add/${orderNo}`)">&#xe684;</span>
          <span
            style="font-size: 0.9rem;margin-left: .4rem;"
            @click="jump(`/union_pay/add/${orderNo}`)">使用新的身份信息</span>
      </div>
    </template>
    <template v-if="type === 'add'">
      <div class="item-hint">请填写身份信息</div>
      <div class="list">
        <div class="item">
          <div
            class="iconfont item-left-icon">
            <div class="iconfont item-left-icon">&#xe809;</div>
          </div>
          <div class="item-input">
            <input
              v-model.trim="name"
              type="text"
              placeholder="请输入姓名">
          </div>
        </div>
        <div class="item">
          <div
            class="iconfont item-left-icon">
            <div class="iconfont item-left-icon">&#xe886;</div>
          </div>
          <div class="item-input">
            <input
              v-model.trim="id_card_no"
              type="text"
              placeholder="请输入身份证号">
          </div>
        </div>
      </div>
      <div class="notice">
        <span class="iconfont">&#xe62b;</span>
        <span style="margin-left: .2rem;">请填写准确真实的姓名和身份证,已保证支付成功</span>
      </div>
      <div
        class="submit"
        @click="submit('add')"
        v-waves>下一步</div>
    </template>
    <form
      style="display: none"
      name="pay"
      ref="form"
      :action="voucher.form_action"
      method="post">
      <input name="version" type="hidden" :value="voucher.version" />
      <input name="input_charset" type="hidden" :value="voucher.input_charset" />
      <input name="language" type="hidden" :value="voucher.language" />"
      <input name="terminal_id" type="hidden" :value="voucher.terminal_id" />
      <input name="member_id" type="hidden" :value="voucher.member_id" />
      <input name="data_type" type="hidden" :value="voucher.data_type" />"
      <textarea name="data_content" style="display:none;">{{voucher.data_content}}</textarea>
    </form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        orderNo: '',
        type: '',
        selectedId: 0,
        loaded: false,
        // 新增身份证号码
        id_card_no: '',
        // 新增身份对应名字
        name: '',
        bankCards: [],
        // 支付凭证
        voucher: {}
      }
    },
    watch: {
      $route (route) {
        this.type = route.params.type
      }
    },
    methods: {
      submit (type) {
        let data = {}
        if (type === 'add') {
          if (!this.name) {
            this.$auxiliary.toast('请填写姓名!')
            return false
          }
          if (!this.id_card_no) {
            this.$auxiliary.toast('请填写身份证号码!')
            return false
          }
          data = {
            main_order_no: this.orderNo,
            pay_method: 'baofoo_quick_pub',
            id_card_no: this.id_card_no,
            name: this.name
          }
        } else if (type === 'select') {
          if (!this.selectedId) {
//            this.$auxiliary.toast('请选择银行卡!')
            return false
          }
          data = {
            main_order_no: this.orderNo,
            pay_method: 'baofoo_quick_pub',
            payment_id: this.selectedId
          }
        }
        this.$auxiliary.loading.show()
        this
          .$api
          .pay
          .unionPay(data)
          .then(r => {
            if (!r || this.isEmptyObject(r)) {
              this.$auxiliary.loading.hide()
              this.$auxiliary.toast('支付凭证获取失败')
              return false
            }
            this.voucher = r.charge
            this.$nextTick(() => {
              this.$refs.form.submit()
            })
          })
      }
    },
    created () {
      this.type = this.$route.params.type
      this.orderNo = this.$route.params.order_no
      if (!this.orderNo) {
        this.$auxiliary.toast('缺少订单编号')
        window.location.go(-1)
      }
      // 获取身份信息
      this.$auxiliary.loading.show()
      this
        .$api
        .pay
        .getPayIdentity()
        .then(r => {
          this.loaded = true
          this.$auxiliary.loading.hide()
          if (r.length < 1) {
            this.type = 'add'
          } else {
            this.bankCards = r
          }
        })
    }
  }
</script>
<style scoped lang="stylus">
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
      margin-left 1rem
      background-color #ffffff
      margin-bottom 1rem
      border-radius 3px
      .item
        width calc(100% - 1rem)
        padding 0 .5rem
        height 3rem
        border-bottom 1px solid #eeeeee
        display flex
        align-items center
        &:last-child
          border-bottom none
        .item-title
          width 6rem
          font-size .9rem
        .item-content
          flex 1
          font-size .9rem
          text-align right
        .item-right-icon
          width 1.5rem
          font-size .8rem
          text-align right
        .item-left-icon
          width 2rem
          font-size 1.3rem
          text-align center
          color #888
          span.checked
            display none
            color #249af9
          span.not-checked
            display block
            color #249af9
          &.active
            span.checked
              display block
            span.not-checked
              display none
        .item-input
          flex 1
          >input
            width 100%
            height 2rem
            font-size 1rem

    .submit
      width calc(100% - 2rem)
      margin-left 1rem
      height 3rem
      display flex
      align-items center
      justify-content center
      color #ffffff
      background-color #249af9
      border-radius 3px
      &.disabled
        background-color #cccccc
    .create
      width 100%
      display flex
      margin 2rem 0
      color #249af9
      align-items center
      justify-content center
    .notice
      width calc(100% - 2rem)
      margin 0 0 1rem 1rem
      display flex
      align-items center
      color #aaa
      height 1rem

      font-size .8rem
</style>
