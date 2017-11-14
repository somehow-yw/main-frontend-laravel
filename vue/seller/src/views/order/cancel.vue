<!--
---- 取消订单
--->
<template>
  <div class="body" v-if="loaded">
    <div class="body-content">
      <div class="goods">
        <div class="hint">
          <span>选择取消商品</span>
          <span style="color:#ff0000;">&nbsp(减多少退多少)</span>
        </div>
        <template v-for="(item,idx) in goods">
          <div class="goods-item">
            <div class="thumb">
              <img :src="completePath(item.img_url)" :alt="item.goods_name">
            </div>
            <div class="content">
              <div class="name">{{item.goods_name}}</div>
              <div class="tags">
                <div
                  style="color: #249af9"
                  class="tag"
                  v-if="Number(item.reduce_price) > 0">
                  <span
                    style="background-color: #249af9;">减</span>
                  共优惠{{Number(item.reduce_price).toFixed(2)}}
                </div>
              </div>
            </div>
            <div class="action-box">
              <div class="price">￥{{Number(item.price).toFixed(2)}}</div>
              <div class="num">×{{item.num}}</div>
              <div class="adjusted-quantity">
                  <div
                    class="add-one-tenth"
                    @click="increase(idx)"
                    v-if="item.num < item.buy_num"
                  >+</div>
                  <div class="num-content" @click="enterNum(item.num, idx)">{{item.num}}</div>
                  <div
                    class="minus-one"
                    @click="reduce(idx)"
                    v-if="item.num > 0">-</div>
              </div>
            </div>
          </div>
        </template>
        <div class="statistics">
          <span class="sub">&nbsp;(不含运费)</span>
          <span class="price">￥{{Number(statistics.total_price).toFixed(2)}}</span>
          <span>
            共{{statistics.goods_count}}件商品
            <!--<template v-if="Number(statistics.order_reduce_price) > 0">-->
              <!--优惠{{Number(statistics.order_reduce_price).toFixed(2)}}元-->
            <!--</template>-->
            合计:</span>
        </div>
        <div class="refund-amount">
          <div class="desc">退款金额</div>
          <div class="input" style="text-align: right;color: red">
            {{Number(statistics.reduce_price).toFixed(2)}}
          </div>
          <div class="unit">元</div>
        </div>
        <div class="refund-reason">
          <div class="name">取消原因</div>
          <div class="reason-content">
            <template v-for="reason in reasons">
              <div
                class="reason-item"
                @click="reasonId = reason.num">
                  <div
                    class="radio-box"
                    :class="{active: reason.num === reasonId}"></div>
                  <div class="radio-label">{{reason.name}}</div>
              </div>
            </template>
            <textarea
              placeholder="其他原因"
              class="supplement"
              v-model="refuseReason"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div
      class="body-footer">
      <div
        class="button"
        style="background-color: #249af9"
        v-waves>
        <span
          style="color: #ffffff"
          @click="submit">提交申请</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        // 是否加载完成
        loaded: false,
        // 商品信息
        goods: [],
        // 订单编号
        orderNo: '',
        // 原因列表
        reasons: [],
        // 选中原因ID
        reasonId: 0,
        // 退款补充说明
        refuseReason: '',
        // 数量被改变过的商品列表
        reduceGoods: [],
        // 商品信息统计数据(总优惠,总数量,总价,总退款等)
        statistics: {}
      }
    },
    methods: {
      // 提交申请
      submit () {
        if (this.isEmptyObject(this.reduceGoods)) {
          this.$auxiliary.toast('没有商品的数量被修改!')
          return false
        }
        if (!this.reasonId) {
          this.$auxiliary.toast('请选择退货原因')
          return false
        }
        let data = {}
        data.order_num = this.orderNo
        data.refuse_reason = this.reasonId
        data.refuse_add = this.refuseReason
        data.refuse_goods = this.reduceGoods
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .setCancelOrder(data)
          .then(r => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('申请成功,请等待买家回应')
            this.$router.go(-1)
          })
      },
      // 手动输入商品数量
      enterNum (num, idx) {
        this
          .$auxiliary
          .popup
          .prompt({
            title: '商品数量',
            value: num,
            placeholder: '请输入购买数量',
            textAlign: 'center',
            submit: (r, close) => {
              if ((!Number(r) && Number(r) !== 0) || Number(r) < 0) {
                this.$auxiliary.toast('请输入非负整数!')
                return false
              }
              let isClose = true
              this.goods =
                this.goods.map((item, index) => {
                  if (index === idx) {
                    if (Number(r) <= item.buy_num) {
                      item.num = parseInt(r)
                    } else {
                      isClose = false
                      this.$auxiliary.toast(`该商品数量不能超过${item.buy_num}`)
                    }
                  }
                  return item
                })
              isClose && close()
            }
          })
      },
      /**
       * 增加一个商品数量
       * @param idx
       */
      increase (idx) {
        this.goods =
          this.goods.map((item, index) => {
            if (idx === index) {
              if (item.num < item.buy_num) {
                item.num += 1
              } else {
                return item
              }
            }
            return item
          })
      },
      /**
       * 减少一个商品数量
       * @param idx
       */
      reduce (idx) {
        this.goods =
          this.goods.map((item, index) => {
            if (idx === index && item.num > 0) {
              item.num -= 1
            }
            return item
          })
      }
    },
    watch: {
      /**
       * 监听并提取变化的商品
       * @param val
       */
      goods (val) {
        this.reduceGoods = []
        this.goods.map(item => {
          if (item.num < item.buy_num) {
            this.reduceGoods.push({
              order_goods_id: item.order_goods_id,
              num: (item.buy_num - item.num)
            })
          }
        })
//        if (!this.isEmptyObject(this.reduceGoods)) {
          // todo 获取修改商品金额
        let data = {}
        data.refuse_goods = this.reduceGoods
        data.order_num = this.orderNo
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .getOrderCancelMoney(data)
          .then(r => {
            this.$auxiliary.loading.hide()
            // 商品种类数量
            this.statistics = {
              goods_count: r.goods_count,
              order_reduce_price: r.reduce_price,
              reduce_price: r.price,
              total_price: r.total_price
            }
          })
//        }
      }
    },
    created () {
      // 获取订单编号
      this.orderNo = this.$route.params.order_no
      if (!this.orderNo) {
        this.$auxiliary.toast('缺少订单编号')
        this.$router.go(-1)
        return false
      }
      // 获取商品数据
      this.$auxiliary.loading.show()
      this
        .$api
        .order
        .getCancelGoodsList(this.orderNo)
        .then(r => {
          this.loaded = true
          this.$auxiliary.loading.hide()
          // 商品种类数量
          this.statistics.goods_count = r.goods_count
          // 订单总优惠
          this.statistics.order_reduce_price = r.order_reduce_price
          // 商品总价
          this.statistics.total_price = r.total_price
          // 退款金额
          this.statistics.reduce_price = 0
          this.goods = r.goods_info
          this.goods =
            this.goods.map(item => {
              item.num = item.buy_num
              return item
            })
        })
      // 获取原因列表
      this
        .$api
        .order
        .getOrderCancelInfo()
        .then(r => {
          this.reasons = r
        })
    }
  }
</script>
<style
  scoped
  lang="stylus"
  src="@styl/order/cancel.styl"></style>
