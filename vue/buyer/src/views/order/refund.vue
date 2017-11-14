<!--
---- 修改订单
--->
<template>
  <div class="body" v-if="loaded">
    <div class="body-content">
      <div class="goods">
        <div class="hint">
          <span>选择退货商品</span>
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
        <div class="notice" style="text-align: right">
          退款金额:
          <span v-if="Number(enter_return_money) > 0">{{Number(enter_return_money).toFixed(2)}}</span>
          <span v-else>{{Number(statistics.return_money).toFixed(2)}}</span>
          元
        </div>
        <div
          class="refund-amount"
          @click="enterRefund">
          <div class="desc">手动输入</div>
          <div
            class="input">
            <input
              type="text"
              disabled
              :value="enter_return_money"
              v-model.trim="enter_return_money"
              :placeholder="`最多可输入${Number(statistics.return_money).toFixed(2)}`">
          </div>
          <div class="unit">元</div>
        </div>

        <div class="refund-reason">
          <div class="name">退货原因</div>
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

        <div class="upload-img">
          <div class="name">上传凭证</div>
          <div class="images">
            <template v-for="(image, idx) in imgLocalIds">
              <div class="image">
                <img :src="image">
                <div class="remove"
                @click="removeImg(idx)">×</div>
              </div>
            </template>
            <div
              class="image"
              @click="chooseImage"
              v-if="imgLocalIds.length < 5"
              v-waves>
              <div class="add">+</div>
            </div>
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
  import weChatSDK from '@vendor/weChatJsSDK/jweixin-1.2.0'
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
        loaded: true,
        // 退货原因选择列表
        reasons: [],
        // 选择的退货原因ID
        selectedReasonId: 0,
        // 数量被改变过的商品列表
        reduceGoods: [],
        // 修改是对商品数据进行时时统计
        statistics: {
          return_money: 0, // 退款总金额
          goods_kind: 0, // 商品种类
          buy_num: 0 // 未退款商品总金额
        },
        enter_return_money: '', // 手动输入金额
        // 图片本地ID
        imgLocalIds: [],
        // 图片serviceId
        imgServerId: []
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
            this.enter_return_money = ''
            this.$auxiliary.loading.hide()
          })
//        }
      }
    },
    methods: {
      // 获取微信jsSDK 签名配置
      // 获取微信jsSDK 签名配置
      weChatConfig () {
        this
          .$api
          .other
          .jsSdkConfig()
          .then(r => {
            weChatSDK.config({
              debug: false,
              appId: r.appId,
              timestamp: r.timestamp,
              nonceStr: r.nonceStr,
              signature: r.signature,
              jsApiList: ['chooseImage', 'uploadImage']
            })
          })
          .catch(e => {

          })
      },
      /**
       * 选择图片
       */
      chooseImage () {
        // 获取剩余可传图片数量
        let count = (5 - this.imgLocalIds.length)
        console.log('计算可上传图片数量:', count)
        if (count <= 0) {
          this.$auxiliary.toast('最多可传5张图片!')
          return false
        }
        console.log('count:', count)
        weChatSDK.chooseImage({
          count: count,
          // 可以指定是原图还是压缩图，默认二者都有
          sizeType: ['original', 'compressed'],
          // 可以指定来源是相册还是相机，默认二者都有
          sourceType: ['album', 'camera'],
          success: res => {
            console.log(res)
            res.localIds.map(localId => {
              this.imgLocalIds.push(localId)
            })
          }
        })
      },
      /**
       * 上传图片
       * @param localIds 本地图片路径
       * @param success 上传成功回调函数
       * @returns {boolean}
       */
      upload (localIds, success) {
        if (localIds.length < 1) {
          return false
        }
        let _this = this
        let localId = localIds.shift()
        weChatSDK.uploadImage({
          localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: res => {
            this.imgServerId.push(res.serverId)
            console.log(this.imgServerId)
            console.log(localIds)
            if (localIds.length < 1) {
              typeof success === 'function' && success()
            } else {
              _this.upload(localIds, success)
            }
          }
        })
      },
      // 删除选择的图片
      removeImg (idx) {
        this.imgLocalIds.splice(idx, 1)
      },
      /**
       *  手动输入退款金额
       */
      enterRefund () {
        this
          .$auxiliary
          .popup
          .prompt({
            title: '退款金额',
            value: Number(this.statistics.return_money).toFixed(2),
            placeholder: `最多可输入${Number(this.statistics.return_money).toFixed(2)}元`,
            textAlign: 'center',
            submit: (r, close) => {
              if (!Number(r) || Number(r) <= 0) {
                this.$auxiliary.toast('请输入大于0的数字')
                return false
              }
              if (Number(r) > Number(this.statistics.return_money)) {
                this
                  .$auxiliary
                  .toast(`当前最多可退款${Number(this.statistics.return_money).toFixed(2)}元`)
                return false
              }
              this.enter_return_money = Number(r)
              close()
            }
          })
      },
      /**
       * 提交申请
       */
      submit () {
        if (this.isEmptyObject(this.reduceGoods)) {
          this.$auxiliary.toast('没有商品的数量被修改!')
          return false
        }
        if (!this.selectedReasonId) {
          this.$auxiliary.toast('请选择退货原因!')
          return false
        }
        if (this.isEmptyObject(this.imgLocalIds)) {
          this.$auxiliary.toast('请至少上传一张凭证图片!')
          return false
        }
        let data = {}
        data.type = 2
        data.order_num = this.orderNo
        data.reason = this.selectedReasonId
        data.return_goods = this.reduceGoods
        data.reason_replenish = this.reasonReplenish
        data.refund_money = parseInt(Number(this.statistics.return_money) * 100)
        // 如果退款金额是手动输入的,则去手动输入的那个
        if (Number(data.enter_return_money) > 0) {
          data.refund_money = Number(this.statistics.return_money)
        }
        // 开始上传图片
        this.upload(this.imgLocalIds.slice(0), () => {
          data.img = this.imgServerId
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
    mounted () {
      this.orderNo = this.$route.params.order_no
      this.weChatConfig()
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
      // 获取退货原因列表
      this
        .$api
        .order
        .reason(3)
        .then(r => {
          this.reasons = r
        })
    }

  }
</script>
<style
  scoped
  lang="stylus"
  src="@styl/order/refund.styl"></style>
