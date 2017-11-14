<!--
---- 修改订单
--->
<template>
  <div class="body" v-if="loaded">
    <div class="body-content">
      <div class="goods">
        <div class="hint">
          <span>选择商品</span>
          <span style="color:#ff0000;">&nbsp(减多少退多少)</span>
        </div>
        <template v-for="(item, idx) in goods">
          <div class="goods-item">
            <div class="thumb">
              <img :src="completePath(item.img)">
            </div>
            <div class="content">
              <div class="name">{{item.title}}</div>
              <div class="tags">
                <div
                  v-if="Number(item.discounts) > 0"
                  style="color: #249af9"
                  class="tag">
                  <span
                    style="background-color: #249af9;">
                    惠</span>
                  已优惠{{Number(item.discounts).toFixed(2)}}
                </div>
              </div>
            </div>
            <div class="action-box">
              <div class="price">￥{{Number(item.unit).toFixed(2)}}</div>
              <div class="num">×{{item._num}}</div>
              <div class="adjusted-quantity">
                  <div
                    class="add-one-tenth"
                    v-if="Number(item._num) < Number(item.num)"
                    @click="increase(idx)">+</div>
                  <div class="num-content" @click="enterNum(item._num, idx)">{{item._num}}</div>
                  <div
                    class="minus-one"
                    v-if="Number(item._num) > 0"
                    @click="reduce(idx)">-</div>
              </div>
            </div>
          </div>
        </template>
        <div class="statistics">
          <span class="sub">&nbsp;(不含运费)</span>
          <span class="price">￥{{Number(statistics.buy_num).toFixed(2)}}</span>
          <span>
            共{{statistics.goods_kind}}件商品
            <!--<template>-->
              <!--优惠222元-->
            <!--</template>-->
            合计:</span>
        </div>
        <div class="refund-amount">
          <div class="desc">退款金额</div>
          <div class="input">{{Number(statistics.return_money).toFixed(2)}}</div>
          <div class="unit">元</div>
        </div>

        <div class="refund-reason">
          <div class="name">退款原因</div>
          <div class="reason-content">
            <div
              class="reason-item"
              @click="selectedReasonId = item.num"
              v-for="item in reasons">
              <div
                class="radio-box"
                :class="{active: item.num === selectedReasonId}"></div>
              <div class="radio-label">{{item.name}}</div>
            </div>
            <textarea
              placeholder="其他原因"
              v-model.trim="reasonReplenish"
              class="supplement"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div
      class="body-footer">
      <div
        class="button"
        style="background-color: #249af9"
        @click="submit"
        v-waves>
        <span style="color: #ffffff">提交申请</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        // 其他原因
        reasonReplenish: '',
        // 商品信息
        goods: [],
        // 订单ID
        orderNo: '',
        // 是否加载完毕
        loaded: false,
        // 退款原因选择列表
        reasons: [],
        // 选择的退款原因ID
        selectedReasonId: 0,
        // 数量被改变过的商品列表
        reduceGoods: [],
        // 修改是对商品数据进行时时统计
        statistics: {
          return_money: 0, // 退款总金额
          goods_kind: 0, // 商品种类
          buy_num: 0 // 未退款商品总金额
        }
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
          if (item._num < item.num) {
            this.reduceGoods.push({
              goods_id: item.goods_id,
              goods_num: (item.num - item._num)
            })
          }
        })
//        if (!this.isEmptyObject(this.reduceGoods)) {
          // todo 获取修改商品金额
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .getReturnGoodsMoney(this.orderNo, this.reduceGoods)
          .then(r => {
            this.statistics = {
              return_money: r.return_money, // 退款总金额
              goods_kind: r.return_kind, // 商品种类
              buy_num: r.buy_money // 未退款商品总金额
            }
            this.$auxiliary.loading.hide()
          })
//        }
      }
    },
    methods: {
      /**
       * 提交申请
       */
      submit () {
        if (this.isEmptyObject(this.reduceGoods)) {
          this.$auxiliary.toast('没有商品的数量被修改!')
          return false
        }
        if (!this.selectedReasonId) {
          this.$auxiliary.toast('请选择退款原因!')
          return false
        }
        let data = {}
        data.type = 1
        data.order_num = this.orderNo
        data.reason = this.selectedReasonId
        data.return_goods = this.reduceGoods
        data.reason_replenish = this.reasonReplenish
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .setOrderReturn(data)
          .then(r => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('申请成功,请等待卖家回应!')
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
                this.$auxiliary.toast('请输入非零整数!')
                return false
              }
              let isClose = true
              this.goods =
                this.goods.map((item, index) => {
                  if (index === idx) {
                    if (Number(r) <= item.num) {
                      item._num = parseInt(r)
                    } else {
                      isClose = false
                      this.$auxiliary.toast(`该商品数量不能超过${item.num}`)
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
              if (item._num < item.num) {
                item._num += 1
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
            if (idx === index && item._num > 0) {
              item._num -= 1
            }
            return item
          })
      }
    },
    created () {
      this.orderNo = this.$route.params.order_no
      // 获取商品信息
      this.$auxiliary.loading.show()
      this
        .$api
        .order
        .getCancelGoodsList(this.orderNo)
        .then(r => {
          console.log(r)
          this.$auxiliary.loading.hide()
          this.goods = r.goods_info
          this.statistics = {
            return_money: r.return_money, // 退款总金额
            goods_kind: r.goods_kind, // 商品种类
            buy_num: r.buy_num // 未退款商品总金额
          }
          this.loaded = true
          this.goods =
            this.goods.map((item) => {
              item._num = item.num
              return item
            })
        })
      // 获取退款原因列表
      this
        .$api
        .order
        .reason(2)
        .then(r => {
          this.reasons = r
        })
    }
  }
</script>
<style
  scoped
  lang="stylus"
  src="@styl/order/refundMoney.styl"></style>
