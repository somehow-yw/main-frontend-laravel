<template>
  <div class="content" v-if="loaded">
    <!--<div class="item-hint">订单商品</div>-->
    <!--<div class="body-content">-->
      <!--<div class="goods">-->
        <!--<template v-for="(goods, idx) in goodsItem">-->
          <!--<div class="goods-item">-->
            <!--<div class="thumb"></div>-->
            <!--<div class="content">-->
              <!--<div class="name">{{goods.goods_name}}</div>-->
              <!--<div class="tags">-->
                <!--<div-->
                  <!--v-if="goods.discount.length > 0"-->
                  <!--style="color: #249af9"-->
                  <!--class="tag">-->
                  <!--<span style="background-color: #249af9;">减</span>{{goods.discount}}</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="action-box">-->
              <!--<div class="price">￥{{goods.goods_unit_price}}</div>-->
              <!--<div class="num">×{{goods.goods_num}}</div>-->
              <!--<div class="adjusted-quantity">-->
                <!--<div-->
                  <!--class="add-one-tenth"-->
                  <!--@click="increase(idx)">+</div>-->
                <!--<div-->
                  <!--class="num-content"-->
                  <!--@click="enterNum(goods.goods_num,idx)">{{goods.goods_num}}</div>-->
                <!--<div-->
                  <!--class="minus-one"-->
                  <!--@click="reduce(idx)">-</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</template>-->
        <!--<div class="statistics">-->

        <!--</div>-->
        <!--<div class="refund-amount"-->
          <!--v-if="Number(orderData.all_discounts) > 0">-->
          <!--<div class="desc">优惠金额</div>-->
          <!--<div class="input">{{Number(orderData.all_discounts).toFixed(2)}}</div>-->
          <!--<div class="unit">元</div>-->
        <!--</div>-->
        <!--<div class="refund-amount">-->
          <!--<div class="desc">支付金额</div>-->
          <!--<div class="input">{{Number(orderData.real_money).toFixed(2)}}</div>-->
          <!--<div class="unit">元</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <template v-if="orderData.logistics_type === 3">
      <div class="item-hint">收货地址</div>
      <div class="list">
        <div class="item">
          <div class="item-title">联系人</div>
          <div class="item-content">
            <input
              type="text"
              placeholder="请填写联系人"
              v-model.trim="address.concat"
              :value="address.concat">
          </div>
        </div>
        <div class="item">
          <div class="item-title">联系电话</div>
          <div class="item-content">
            <input
              type="text"
              placeholder="请填写联系电话"
              v-model.trim="address.mobile"
              :value="address.mobile">
          </div>
        </div>
        <!--<div class="item">-->
          <!--<div class="item-title">区域</div>-->
          <!--<div class="item-content">{{address.area}}</div>-->
          <!--<div class="iconfont item-right-icon">&#xe608;</div>-->
        <!--</div>-->
        <div class="item">
          <div class="item-title">收货地址</div>
          <div class="item-content-textarea">
            <textarea
              v-model.trim="address.detail"
              placeholder="请填写详细地址">{{address.detail}}</textarea>
          </div>
        </div>
      </div>
    </template>
    <template v-if="orderData.logistics_type === 2">
      <template v-for="market in marketInfo">
        <div class="item-hint">车辆信息
          <span style="font-size: .8rem;">({{market.market_name}})</span></div>
        <div class="list">
          <div class="item">
            <div class="item-title">司机电话</div>
            <div class="item-content">
              <input
                type="tel"
                placeholder="请填写司机电话"
                v-model.trim="market.cart_info.driver_mobile"
                :value="market.cart_info.driver_mobile">
            </div>
          </div>
          <div class="item">
            <div class="item-title">车牌号码</div>
            <div class="item-content">
              <input
                type="text"
                placeholder="请填写车牌号码"
                v-model.trim="market.cart_info.license_plate"
                :value="market.cart_info.license_plate">
            </div>
          </div>
          <div class="item">
            <div class="item-title">停放位置</div>
            <div class="item-content">
              <input
                type="text"
                placeholder="请填写车辆停放位置"
                v-model.trim="market.cart_info.location"
                :value="market.cart_info.location">
            </div>
          </div>
          <div class="item">
            <div class="item-title">装车时间</div>
            <div class="item-content" @click="showPicker = true;cartInfo = market.cart_info">
              <input
                style="width:100%;height: 100%;"
                type="text"
                disabled="disabled"
                :value="market.cart_info.time"
                v-model.trim="market.cart_info.time"/>
            </div>
          </div>
        </div>
      </template>
    </template>
    <div
      class="submit"
      v-waves
      @click="submit">确定修改</div>
    <picker :show="showPicker" @close="showPicker = false" @change="r => cartInfo.time = r"></picker>
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
        cartInfo: {},
        showPicker: false,
        // 订单编号
        orderNo: '',
        // 订单数据
        orderData: '',
        // 商品列表
        goodsItem: [],
        // 是否加载完毕
        loaded: false,
        // 当前操作商品的索引
        goodsIndex: null,
        // 收货地址
        address: {},
        // 市场信息
        marketInfo: {}
      }
    },
    watch: {
      goodsItem (val) {
        if (this.goodsIndex === null) {
          return false
        }
        let data = []
        val.forEach(item => {
          data.push({
            goods_id: item.goods_id,
            goods_num: item.goods_num,
            goods_unit: item.goods_unit,
            goods_unit_price: item.goods_unit_price
          })
        })
        this.$auxiliary.loading.show('计算中...')
        this
          .$api
          .order
          .getOrderNewMoney(this.orderNo, data)
          .then(r => {
            this.orderData.all_discounts = r.all_disCounts
            this.orderData.all_money = r.all_money
            this.orderData.real_money = r.all_realMoney
            val =
              val.map(item => {
                r.goods_discount.map(discount => {
                  if (item.goods_id === discount.goods_id) {
                    item.discount = discount.discount
                  }
                })
                return item
              })
            this.$auxiliary.loading.hide()
          })
      }
    },
    methods: {
      // 手动输入商品数量
      enterNum (num, idx) {
        this.goodsIndex = idx
        this
          .$auxiliary
          .popup
          .prompt({
            title: '商品数量',
            value: num,
            placeholder: '请输入购买数量',
            textAlign: 'center',
            submit: (r, close) => {
              if (!Number(r) || Number(r) <= 1) {
                this.$auxiliary.toast('请输入大于0的整数')
                return false
              }
              this.goodsItem =
                this.goodsItem.map((item, index) => {
                  if (index === idx) {
                    item.goods_num = parseInt(r)
                  }
                  return item
                })
              close()
            }
          })
      },
      // 增加一个购买数量
      increase (idx) {
        this.goodsIndex = idx
        this.goodsItem =
          this.goodsItem.map((item, index) => {
            if (idx === index) {
              item.goods_num += 1
            }
            return item
          })
      },
      // 减少一个购买数量
      reduce (idx) {
        this.goodsIndex = idx
        this.goodsItem =
          this.goodsItem.map((item, index) => {
            if (idx === index) {
              if (item.goods_num <= 1) {
                this.$auxiliary.toast('删除了该商品')
              } else {
                item.goods_num -= 1
              }
            }
            return item
          })
      },
      /**
       * 提交数据
       */
      submit () {
        let data = {
          order_code: this.orderNo,
          logistics_type: this.orderData.logistics_type
        }
        if (this.orderData.logistics_type === 3) {
          if (!this.address.concat) {
            this.$auxiliary.toast('请填写联系人姓名!')
            return false
          }
          if (!this.address.mobile) {
            this.$auxiliary.toast('请填写联系人手机号码!')
            return false
          }
          if (!this.address.detail) {
            this.$auxiliary.toast('请填写详细收货地址')
            return false
          }
          if (this.address.length > 5 || this.address.length > 80) {
            this.$auxiliary.toast('详细地址字数在5-80字之间')
            return false
          }
          data.address = this.address
        }
        if (this.orderData.logistics_type === 2) {
//          if (!this.marketInfo.cart_info.driver_mobile) {
//            this.$auxiliary.toast('请填写司机电话!')
//            return false
//          }
//          if (!this.marketInfo.cart_info.license_plate) {
//            this.$auxiliary.toast('请填写车牌号码')
//            return false
//          }
//          if (!this.marketInfo.cart_info.location) {
//            this.$auxiliary.toast('请填写装货地址')
//            return false
//          }
//          if (!this.marketInfo.cart_info.time) {
//            this.$auxiliary.toast('请选择收货时间')
//            return false
//          }
          data.cart_info = this.marketInfo
        }
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .editOrderInfo(data)
          .then(r => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('修改成功!')
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          })
      },
      /**
       * 获取订单数据
       */
      getData () {
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .getOrderUpdateInfo(this.orderNo)
          .then(r => {
            this.loaded = true
            this.$auxiliary.loading.hide()
            this.orderData = r
            this.goodsItem = this.orderData.goods_info
            this.address = this.orderData.address
            this.marketInfo = this.orderData.market_info
            console.log(this.marketInfo)
          })
      }
    },
    created () {
      this.orderNo = this.$route.params.order_no
      this.getData()
    }
  }
</script>
<style scoped lang="stylus" src="@styl/order/update.styl"></style>
