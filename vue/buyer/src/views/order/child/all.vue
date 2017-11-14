<template>
  <div>
    <template v-for="item in data">
      <item
        :order-num="item.order_num"
        :shop-name="item.seller_shop_name"
        :status="Number(item.main_status)"
        :goods="item.goods_info"
        :appraise="item.appraise"
        :shop-id="item.shop_id"
        :order-time="item.order_time"
        @call="callMerchant(
          item.main_status === 1 ?
          item.seller_shop:
          {tel:item.seller_phone, name:item.seller_shop_name}, item.main_status)"
        @confirm-delivery="confirmDelivery(item.order_num)"
        @pay-now="payNow(item.order_num)"
        @remind-shipment="remindShipment(item.order_num)"
        @confirm-receipt="confirmReceipt(item.order_num)"
        @cancel-order="cancelOrder(item.order_num)"
        :other-status="Number(item.other_status)"
        :all-money="Number(item.all_money)"
      ></item>
    </template>
    <ui-load-more
      :message="message[isFirst[type]]"
      @load-more="loadMore"
      :disabled="disabledLoadMore[type]"
      :scroll="scroll"
      :haveData="haveData[type]"
      :baseline="afterNotData[type]"></ui-load-more>
    <ui-item-popup
      :z-index="10"
      title="卖家信息"
      @close="showPhoneNumberInfo = false"
      :item-data="callPhoneItemData"
      :buttons="phoneNumberInfoButtons"
      :show="showPhoneNumberInfo"></ui-item-popup>
    <ui-cancel-order
      title="取消订单"
      :z-index="10"
      :bg-event="true"
      :order-no="orderNo"
      :show="showCancelPopup"
      @cancel-success="refresh"
      @close="showCancelPopup = false"></ui-cancel-order>
    <ui-alert
      :title="alertTitle"
      :z-index="10"
      :message="alertMessage"
      :id="alertID"
      :buttons="alertButtons"
      :show="showAlert"
      @close="showAlert = false"></ui-alert>
    <pay-methods
      :z-index="10"
      title="请选择支付方式"
      :order-no="orderNo"
      from="order"
      :pay-methods="payMethodsData"
      @close="showPayMethods = false"
      :show="showPayMethods"></pay-methods>
    <ui-input-items
      :bgEvent="true"
      :zIndex="11"
      :buttons="inputItemsButtons"
      :inputsItem="inputsItem"
      :show="showInputItems"
      @close="showInputItems = false"
      :title="inputItemsTitle"></ui-input-items>
  </div>
</template>
<script>
  import weChatSDK from '@vendor/weChatJsSDK/jweixin-1.2.0'
  import uiAlert from '@components/alert'
  import uiCancelOrder from './cancel.vue'
  import uiItemPopup from '@components/itemPopup'
  import uiLoadMore from '@components/loadMoreView'
  import item from '@views/order/child/item'
  import payMethods from '@components/payMethods'
  import uiInputItems from '@components/inputItems'
  export default {
    components: {
      item,
      uiLoadMore,
      uiItemPopup,
      uiCancelOrder,
      uiAlert,
      payMethods,
      uiInputItems
    },
    data () {
      /**
       * 状态字段说明
       * all 全部订单
       * pending_payment 待付款订单
       * shipment_pending 待发货订单
       * waiting_for_delivery 待收货订单
       * waiting_for_evaluation 待评价订单
       */
      return {
        // 输入列表弹窗 底部按钮
        inputItemsButtons: [],
        // 输入列表弹窗标题
        inputItemsTitle: '',
        // 输入列表项
        inputsItem: [],
        // 显示输入列表弹窗
        showInputItems: false,
        // 支付方式
        payMethodsData: [],
        // 支付时的订单编号
        orderNo: '',
        // 选择支付方式弹窗
        showPayMethods: false,
        // 订单状态
        type: 'all',
        // 当前展示的订单数据
        data: [],
        // loading 提示文字,不同时期加载显示不同提示语
        message: {
          1: '订单载入中...',
          2: '加载中...',
          3: '正在刷新订单...'
        },
        // 滚动窗口节点
        scroll: null,
        // 第一次加载完毕之后当前状态是否有数据
        haveData: {
          all: true,
          pending_payment: true,
          shipment_pending: true,
          waiting_for_delivery: true,
          waiting_for_evaluation: true,
          refund_goods: true
        },
        // 是否是第一次加载,如果是则显示loading
        isFirst: {
          all: 1,
          pending_payment: 1,
          shipment_pending: 1,
          waiting_for_delivery: 1,
          waiting_for_evaluation: 1,
          refund_goods: 1
        },
        // 当前页码 默认为第一页
        pages: {
          all: 1,
          pending_payment: 1,
          shipment_pending: 1,
          waiting_for_delivery: 1,
          waiting_for_evaluation: 1,
          refund_goods: 1
        },
        // 订单数据(各种状态的数据容器)
        items: {
          all: [],
          pending_payment: [],
          shipment_pending: [],
          waiting_for_delivery: [],
          waiting_for_evaluation: [],
          refund_goods: []
        },
        // 是否禁用加载更多组件
        disabledLoadMore: {
          all: false,
          pending_payment: false,
          shipment_pending: false,
          waiting_for_delivery: false,
          waiting_for_evaluation: false,
          refund_goods: false
        },
        // 是否是最后一页
        afterNotData: {
          all: false,
          pending_payment: false,
          shipment_pending: false,
          waiting_for_delivery: false,
          waiting_for_evaluation: false,
          refund_goods: false
        },
        // 订单状态
        status: {
          all: null,
          pending_payment: 1,
          shipment_pending: 2,
          waiting_for_delivery: 3,
          waiting_for_evaluation: 4,
          refund_goods: 5
        },
        // 联系商家信息弹窗列表数据
        callPhoneItemData: [],
        // 是否显示拨打电话的信息弹窗
        showPhoneNumberInfo: false,
        // 拨打电话的信息弹窗底部按钮
        phoneNumberInfoButtons: [],
        // 控制取消订单弹窗显示
        showCancelPopup: false,
        // 取消订单底部操作按钮数据
        cancelOrderPopupButtons: [],
        // alert弹框提示消息
        alertMessage: '',
        // 是否显示alert弹窗
        showAlert: false,
        // alert弹窗ID,用于识别不同用途的alert
        alertID: '',
        // alert底部按钮
        alertButtons: [],
        // alert标题
        alertTitle: ''
      }
    },
    watch: {
      $route (route) {
        this.type = route.params.type
        this.refresh()
      }
    },
    methods: {
      /**
       * 退货时确认发货
       */
      confirmDelivery (orderNo) {
        // 输入列表弹窗标题
        this.inputItemsTitle = '发货信息'
        // 输入列表项
        this.inputsItem = [
          {
            id: 'driver_tel',
            name: '司机电话',
            type: 'text',
            value: '',
            placeholder: '请填写司机电话',
            disabled: false
          },
          {
            id: 'car_num',
            name: '车牌号码',
            type: 'text',
            value: '',
            placeholder: '请填写车牌号码',
            disabled: false
          },
          {
            id: 'shipment_address',
            name: '取货地址',
            type: 'text',
            value: '',
            placeholder: '请填写取货地址',
            disabled: false
          },
          {
            id: 'shipment_time',
            name: '取货时间',
            type: 'datetime-local',
            value: '',
            placeholder: '请选择取货时间',
            disabled: false
          }
        ]
        // 显示输入列表弹窗
        this.showInputItems = true
        // 输入列表弹窗 底部按钮
        // 声明输入列表基础按钮
        this.inputItemsButtons = [
          {
            id: 'close',
            text: '关闭',
            is_close: true
          },
          {
            id: 'submit',
            text: '确认发货',
            is_close: false,
            style: {
              backgroundColor: '#249af9',
              color: '#ffffff'
            },
            callback: (id, data) => {
              if (id === 'close') {
                return false
              }
              if (!data.driver_tel) {
                this.$auxiliary.toast('请填写司机电话!')
                return false
              }
              if (!data.car_num) {
                this.$auxiliary.toast('请填写车牌号码!')
                return false
              }
              if (!data.shipment_address) {
                this.$auxiliary.toast('请填写取货地址!')
                return false
              }
              if (!data.shipment_time) {
                this.$auxiliary.toast('请选择取货时间!')
                return false
              }
              this.showInputItems = false
              this.$auxiliary.loading.show()
              data.order_num = orderNo
              this
                .$api
                .order
                .setReturnSend(data)
                .then(() => {
                  this.$auxiliary.loading.hide()
                  this.$auxiliary.toast('确认成功')
                  this.refresh()
                })
            }
          }
        ]
      },
      /**
       * 刷新订单列表
       */
      refresh () {
        // 刷新订单状态数量
        this.$parent.getBadge()
        this.pages[this.type] = 1
        this.disabledLoadMore[this.type] = false
        this.afterNotData[this.type] = false
        this.items[this.type] = []
        this.haveData[this.type] = true
        if (this.isFirst[this.type] > 1) {
          this.isFirst[this.type] = 3
        }
        this.getItems(this.type, this.pages[this.type])
      },
      // 立即支付
      payNow (orderNo) {
        this.orderNo = orderNo
        this.$auxiliary.loading.show()
        this
          .$api
          .pay
          .payMethods(this.orderNo)
          .then(r => {
            this.$auxiliary.loading.hide()
            if (typeof r.remind !== 'undefined') {
              this
                .$auxiliary
                .popup
                .confirm({
                  title: '提醒',
                  message: r.remind,
                  buttons: [
                    {
                      id: 'confirm',
                      name: '重新下单',
                      close: false,
                      style: {
                        color: '#249af9'
                      }
                    },
                    {
                      id: 'cancel',
                      name: '取消',
                      close: true
                    }
                  ],
                  callback: (id, close) => {
                    close()
                    if (id === 'cancel') {
                      return false
                    }
                    this.buyAgain()
                  }
                })
            } else {
              this.showPayMethods = true
              this.payMethodsData = r
            }
          })
      },
      // 提醒发货
      remindShipment (orderNum) {
        this.alertTitle = '提醒发货'
        this.alertMessage = `<p>您可通过此功能提醒卖家发货。若您继续用货,请电话联系卖家。</p>`
        this.alertButtons = [
          {
            text: '关闭'
          },
          {
            id: 'submit',
            text: '确认提醒',
            is_close: false,
            style: {
              backgroundColor: '#249af9',
              color: '#ffffff'
            },
            callback: () => {
              this.showAlert = false
              this.$auxiliary.loading.show({zIndex: 100})
              this
                .$api
                .order
                .setShipmentRemind(orderNum)
                .then(r => {
                  if (Number(r.data.num) === 0) {
                    this.$auxiliary.toast('该订单今日已提醒3次,明日才可提醒!')
                    return false
                  }
                  this.$auxiliary.loading.hide()
                  this.$auxiliary.toast(`${r.message},今日还可提醒${r.data.num}次`)
                })
            }
          }
        ]
        this.showAlert = true
      },
      // 再次购买
      buyAgain () {
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .buyAgain(this.orderNo)
          .then(() => {
            this.$auxiliary.loading.hide()
            this.jump('/cart')
          })
      },
      // 确认收货
      confirmReceipt (orderNum) {
        this.alertTitle = '确认收货'
        this.alertMessage = '请先确认收到的商品无误（数量够，包装完整，质量与描述相符），在点击确认收货。一旦确认收货，将不能申请退款/退货'
        this.alertButtons = [
          {
            text: '关闭'
          },
          {
            id: 'submit',
            text: '确认收货',
            is_close: false,
            style: {
              backgroundColor: '#249af9',
              color: '#ffffff'
            },
            callback: () => {
              this.showAlert = false
              this.$auxiliary.loading.show()
              this
                .$api
                .order
                .orderTake(orderNum)
                .then(r => {
                  this.$auxiliary.loading.hide()
                  this.$auxiliary.toast('确认成功')
                  this.refresh()
                })
            }
          }
        ]
        this.showAlert = true
      },
      // 取消订单
      cancelOrder (orderNo) {
        this.orderNo = orderNo
        this.showCancelPopup = true
      },
      /**
       * 联系商家信息弹窗
       * @param data 联系方式数据
       * @param status 订单状态
       */
      callMerchant (data, status) {
        if (status === 1) {
          if (this.isEmptyObject(data) || data.length < 1) {
            this.$auxiliary.toast('抱歉,未找到联系电话！')
            return false
          }
          if (!this.isEmptyObject(data) && data.length === 1) {
            this.phoneNumberInfoButtons = [
              {
                text: '关闭'
              },
              {
                id: 'submit',
                text: '联系卖家',
                is_close: false,
                style: {
                  backgroundColor: '#249af9',
                  color: '#ffffff'
                },
                callback: () => {
                  this.call(data[0].seller_phone)
                }
              }
            ]
            this.callPhoneItemData = [
              {
                key: '供应商',
                val: data[0].seller_shop_name
              },
              {
                key: '联系电话',
                val: data[0].seller_phone
              }
            ]
            this.showPhoneNumberInfo = true
            return false
          } else {
            console.log('测试联系电话', data)
            let _items = []
            data.forEach((item, idx) => {
              _items.push({
                id: idx,
                name: `${item.seller_shop_name}`
              })
            })
            this
              .$auxiliary
              .popup
              .select({
                bgEvent: true,
                items: _items,
                callback: (id, close) => {
                  _items = []
                  close()
                  this.phoneNumberInfoButtons = [
                    {
                      text: '关闭'
                    },
                    {
                      id: 'submit',
                      text: '联系卖家',
                      is_close: false,
                      style: {
                        backgroundColor: '#249af9',
                        color: '#ffffff'
                      },
                      callback: () => {
                        this.call(data[id].seller_phone)
                      }
                    }
                  ]
                  this.callPhoneItemData = [
                    {
                      key: '供应商',
                      val: data[id].seller_shop_name
                    },
                    {
                      key: '联系电话',
                      val: data[id].seller_phone
                    }
                  ]
                  this.showPhoneNumberInfo = true
                }
              })
          }
        } else {
          this.phoneNumberInfoButtons = [
            {
              text: '关闭'
            },
            {
              id: 'submit',
              text: '联系卖家',
              is_close: false,
              style: {
                backgroundColor: '#249af9',
                color: '#ffffff'
              },
              callback: () => {
                this.call(data.tel)
              }
            }
          ]
          this.callPhoneItemData = [
            {
              key: '供应商',
              val: data.name
            },
            {
              key: '联系电话',
              val: data.tel
            }
          ]
          this.showPhoneNumberInfo = true
          return false
        }
      },
      /**
       * 获取列表数据
       * @param status 订单类型
       * @param page 页码
       * @param size 每页显示条数
       */
      getItems (type, page, size = 10) {
        // 加载之前禁用加载更多组件, 防滑动进行多次请求
        this.disabledLoadMore[this.type] = true
        this.data = this.items[type]
        this.$api.order.orderItem(type, page).then(r => {
          if (r.order_infos.length > 0) {
            this.isFirst[type] = 2
          } else if ( // 如果没有数据则给出提示
          r.order_infos.length < 1 &&
          this.isFirst[type] !== 2) {
            this.haveData[type] = false
            return false
          }
          // 储存数据
          this.items[type] = this.items[type]
            .concat(r.order_infos)
          // 渲染数据到列表
          this.data = this.items[type]
          // 解除当前列表的加载更多组件禁用状态
          this.disabledLoadMore[this.type] = false
          // 当前这次请求是否是最后一页
          if (r.total_count <= (size * page) ||
            (r.order_infos && r.order_infos.length < 1)) {
            this.afterNotData[type] = true
            return false
          } else {
            this.pages[type] += 1
          }
        })
      },
      // 加载更多
      loadMore () {
        this.getItems(this.type, this.pages[this.type])
      },
      /**
       * 解决退款退货ios10.0下url地址不变导致微信jssdk授权失败不能上传图像问题,在此页面先进行授权
       */
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
      }
    },
    mounted () {
      this.scroll = this.$parent.$refs.scroll
    },
    created () {
      this.weChatConfig()
      this.type = this.$route.params.type
      this.getItems(
        this.type,
        this.pages[this.type]
      )
    }
  }
</script>
