<template>
  <div class="item">
    <div class="title">
      <div class="left">
        <div class="title-info">
          <div class="shop-name">
            <div class="iconfont icon">&#xe60b;</div>
            <div class="name">{{shop_name}}</div>
          </div>
        </div>
        <!--<div class="iconfont icon">&#xe625;</div>-->
      </div>
      <div class="right">
        <div
          class="status"
          v-if="order_type >= 0"
          :style="{
            color:
            typeof order_types[order_type] !== 'undefined' ?
            order_types[order_type].color :
            '#666'}">{{
                typeof order_types[order_type] !== 'undefined' ?
                order_types[order_type].text :
                ''}}</div>
        <div
          v-if="method == 1"
          class="action">自行协商</div>
        <div
          v-if="method == 2"
          class="action">集中采购</div>
      </div>
    </div>
    <div class="create-time">
      下单时间: &nbsp;&nbsp;{{createTime}}
    </div>
    <template v-for="(item,idx) in goods">
      <div
        v-waves
        v-if="idx < 3"
        @click="jump(`/order_detail/${orderNo}`)"
        class="goods">
        <div class="thumb">
          <img :src="cutImg(completePath(item.url), 80, 0, 2)" :alt="item.goods_name">
        </div>
        <div class="info">{{item.goods_name}}</div>
        <div class="data">
          <div class="price">￥{{item.price}}</div>
          <div class="numbers">×{{item.buy_num}}</div>
        </div>
      </div>
    </template>
    <div
      v-if="goods.length > 3"
      class="show-more"
      @click="jump(`/order_detail/${orderNo}`)">
      <div class="show-more-text">查看更多</div>
      <div class="iconfont show-more-icon">&#xe610;</div>
    </div>
    <template
    v-if="refund_data">
      <div
        v-if="refund_order_type === 5 ||
        refund_order_type === 1"
        class="return-reason">
        <span>买家退货原因</span>
        <p>{{refund_data.buyer_refund_content}}</p>
        <span>退货凭证</span>
        <div
          v-if="refund_data.buyer_refund_img &&
          refund_data.buyer_refund_img.length > 0"
          class="return-voucher">
          <div
            v-for="img in refund_data.buyer_refund_img"
            class="thumb">
            <img :src="completePath(img)">
          </div>
        </div>
      </div>
      <div
        v-if="refund_order_type === 4 ||
        refund_order_type === 6"
        class="return-reason">
        <span>卖家拒绝原因</span>
        <p>{{ refund.seller_refund_content }}</p>
      </div>
      <div
        v-if="refund_order_type === 9"
        class="return-reason">
        <span>卖家取消订单原因</span>
        <p>{{ refund.seller_refund_content }}</p>
      </div>
    </template>
    <div class="statistics-bar">
      <span class="sub">（不含运费）</span>
      <span class="price">￥{{Number(total_price).toFixed(2)}}</span>
      <span>共{{goods?goods.length:0}}种商品 合计:</span>
    </div>
    <div class="tool-bar">
      <div class="buttons">
        <template v-if="refund_order_type !== 24 && refund_order_type !== 25">
          <template
            v-if="order_type === 9 ||
        order_type === 10">
            <!--<div-->
            <!--v-if="goods_appraise_state === 1"-->
            <!--class="button">-->
            <!--<span>查看评论</span>-->
            <!--</div>-->
          </template>
          <template v-if="order_type === 8">
            <!--<div-->
            <!--v-if="goods_appraise_state === 1"-->
            <!--class="button">-->
            <!--<span>查看评论</span>-->
            <!--</div>-->
            <div
              class="button"
              @click="jump('/?m=PublicTemplate&c=ApiPublic&a=withdrawalsInfoPage', true)"
              style="border-color: #249af9;">
              <span style="color: #249af9;">去提现</span>
            </div>
          </template>
          <template v-if="order_type === 2">
            <div
              class="button"
              @click="confirmDelivery">
              <span>确认发货</span>
            </div>
            <div
              class="button"
              @click="jump(`/cancel/${orderNo}`)">
              <span>取消订单</span>
            </div>
          </template>
          <template v-if="order_type === 3">
            <div
              class="button"
              @click="remindReceipt">
              <span>提醒收货</span>
            </div>
          </template>
          <template v-if="order_type === 6">
            <template v-if="refund_order_type === 15">
              <div class="button" style="background-color: #eeeeee;border-color: #eeeeee;">
                <span style="color: #999999">拒绝退款</span>
              </div>
              <div class="button" style="background-color: #eeeeee;border-color: #eeeeee;">
                <span style="color: #999999">同意退款</span>
              </div>
            </template>

            <template v-if="refund_order_type === 20">
              <div
                class="button"
                @click="setUnCancelOrder">
                <span>取消申请</span>
              </div>
            </template>
            <template v-if="refund_order_type === 21">
              <div
                class="button"
                @click="setUnCancelOrder">
                <span>取消申请</span>
              </div>
              <div
                class="button"
                @click="sellerAgainApply">
                <span>再次申请</span>
              </div>
            </template>
            <template v-if="refund_order_type === 14">
              <div
                class="button"
                @click="setRefundConfirm(0)">
                <span>同意退款</span>
              </div>
              <div
                class="button"
                @click="showEnterReason = true;reasonId = 'refuse-refund';">
                <span>拒绝退款</span>
              </div>
            </template>
          </template>
          <template v-if="order_type === 11">
            <template v-if="refund_order_type === 15">
              <div class="button" style="background-color: #eeeeee;border-color: #eeeeee;">
                <span style="color: #999999">拒绝退款</span>
              </div>
            </template>
            <template v-if="refund_order_type === 16">
              <div class="button"
                   @click="setReturnGoodsConfirm">
                <span>同意退货</span>
              </div>
              <div class="button"
                   @click="showEnterReason = true;reasonId = 'refuse-return'">
                <span>拒绝退货</span>
              </div>
            </template>
            <template v-if="refund_order_type === 19">
              <div class="button" style="background-color: #eeeeee;border-color: #eeeeee;">
                <span style="color: #999999">同意退货</span>
              </div>
            </template>
            <template v-if="refund_order_type === 17">
              <div class="button" style="background-color: #eeeeee;border-color: #eeeeee;">
                <span style="color: #999999">拒绝退货</span>
              </div>
            </template>
            <template v-if="refund_order_type === 18">
              <div
                class="button"
                @click="setRefundConfirm(1)">
                <span>同意退款</span>
              </div>
            </template>
            <template v-if="refund_order_type === 20">
              <div
                class="button"
                @click="setUnCancelOrder">
                <span>取消申请</span>
              </div>
            </template>
            <template v-if="refund_order_type === 21">
              <div
                class="button"
                @click="setUnCancelOrder">
                <span>取消申请</span>
              </div>
              <div
                class="button"
                @click="sellerAgainApply">
                <span>再次申请</span>
              </div>
            </template>
          </template>
        </template>
        <div
          class="button"
          @click="call(tel)">
          <span>联系买家</span>
        </div>
      </div>
    </div>

    <ui-alert
      :title="alertTitle"
      :z-index="10"
      :message="alertMessage"
      :id="alertID"
      :buttons="alertButtons"
      :show="showAlert"
      @close="showAlert = false"></ui-alert>
    <ui-reason
    :show="showEnterReason"
    @submit="reason"
    @close="showEnterReason = false"
    ></ui-reason>
    <ui-input-items
      :bgEvent="true"
      :zIndex="11"
      :buttons="inputItemsButtons"
      :inputsItem="inputsItem"
      :show="showInputItems"
      @close="showInputItems = false"
      :title="inputItemsTitle">
    </ui-input-items>
    <ui-drivers
      :show="showDrivers"
      :z-index="11"
      :bg-event="true"
      title="选择发货司机"
      @edit="editDrivers"
      @close="showDrivers = false"
      :driversItem="driversItem"
      @delete="deleteDriver"
      @create="createDriver"
      @select="selectDrivers"
    ></ui-drivers>
  </div>
</template>
<script>
  import uiAlert from '@components/alert.vue'
  import uiReason from '@views/order/child/reason.vue'
  import uiInputItems from '@components/inputItems.vue'
  import uiDrivers from '@components/drivers.vue'
  export default {
    components: {
      uiAlert,
      uiReason,
      uiInputItems,
      uiDrivers
    },
    props: {
      // 下单时间
      createTime: {
        type: String
      },
      // 订单编号
      orderNo: {
        type: String
      },
      // 店铺名称
      shop_name: {
        type: String
      },
      // (0:其他；1:自行协商;2:集中采购)
      method: {
        type: Number,
        default: 0
      },
      // 订单状态
      order_type: {
        type: Number
      },
      // 订单商品
      goods: {
        type: Array,
        default: null
      },
      // 订单总价
      total_price: {
        type: Number,
        default: 0
      },
      // 买家联系电话
      tel: {
        type: String
      },
      // 退款退货时的订单状态
      refund_order_type: {
        type: Number
      },
      // 订单是否被评价
      goods_appraise_state: {
        type: Number,
        default: 2
      },
      // 退款退货原因数据
      refund_data: {
        default: null
      }
    },
    data () {
      return {
        // 司机列表信息
        driversItem: [],
        // 默认车辆信息
        defaultCart: {},
        // 显示选择司机列表弹窗
        showDrivers: false,
        // 输入列表弹窗 底部按钮
        inputItemsButtons: [],
        // 输入列表弹窗标题
        inputItemsTitle: '',
        // 输入列表项
        inputsItem: [],
        // 显示输入列表弹窗
        showInputItems: false,
        reasonId: '',
        // 填写原因弹窗
        showEnterReason: false,
        // alert弹框提示消息
        alertMessage: '',
        // 是否显示alert弹窗
        showAlert: false,
        // alert弹窗ID,用于识别不同用途的alert
        alertID: '',
        // alert底部按钮
        alertButtons: [],
        // alert标题
        alertTitle: '',
        // 订单状态描述
        order_types: {
          2: {text: '待发货', color: '#fb3338'},
          3: {text: '待收货', color: '#fb3338'},
          6: {text: '退款', color: '#fb3338'},
          8: {text: '可提现', color: '#fb3338'},
          9: {text: '提现中', color: '#fb3338'},
          10: {text: '已提现', color: '#666'},
          11: {text: '退货', color: '#fb3338'},
          13: {text: '交易关闭', color: '#666'}
        }
      }
    },
    watch: {
      defaultCart (val) {
        // 默认车辆修改之后重新渲染到视图
        this.showDefaultCart()
      }
    },
    methods: {

      // 再次申请取消订单
      sellerAgainApply () {
        this
          .$auxiliary
          .popup
          .confirm({
            title: '提示',
            message: '确定要再次申请吗?',
            callback: (id, close) => {
              if (id === 'close') {
                return false
              }
              close()
              this.$auxiliary.loading.show()
              this
               .$api
               .order
               .sellerAgainApply(this.orderNo)
               .then(r => {
                 this.$auxiliary.loading.hide()
                 this.$auxiliary.toast('申请成功')
                 this.getData()
               })
            }
          })
      },
      // 添加车辆信息
      createDriver (data) {
        // 添加车辆
        data.order_num = this.orderNo
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .setDeliverInfo(data)
          .then(r => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('添加成功')
            this.driversItem.push({
              id: r.car_news_id,
              car_tel: data.car_tel,
              car_num: data.car_num,
              is_default: 0
            })
            this.showDefaultCart()
          })
      },
      // 将数据渲染到视图
      showDefaultCart () {
        this.inputsItem =
          this.inputsItem.map(item => {
            item.disabled = true
            if (item.id === 'car_tel') {
              item.value = this.defaultCart.car_tel
            }
            if (item.id === 'car_num') {
              item.value = this.defaultCart.car_num
            }
            return item
          })
      },
      // 编辑司机信息
      editDrivers (val) {
        // 检测信息是否被修改过,如果没有背修改则不进行请求
        let isUpdate = true
        this.driversItem.map(item => {
          if (item.id === val.id) {
            console.log(item, val)
            if (String(item.car_num) === String(val.car_num) &&
              String(item.car_tel) === String(val.car_tel)) {
              isUpdate = false
            }
          }
        })
        if (!isUpdate) {
          this.$auxiliary.toast('没有数据被修改!')
          return false
        }
        this.$auxiliary.loading.show()
        val.order_num = this.orderNo
        this
          .$api
          .order
          .updateDeliverInfo(val)
          .then(r => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('修改成功')
            this.driversItem =
              this.driversItem.map(item => {
                if (item.id === val.id) {
                  item.car_tel = val.car_tel
                  item.car_num = val.car_num
                }
                /* 解决浅拷贝问题导致修改后不能更新数据
                 (defaultCart数据提前变化不能被监听到)
                 在这里修改后重新渲染一下inputsItem数据
                 */
                this.showDefaultCart()
                return item
              })
          })
      },
      // 获取选中的司机信息
      selectDrivers (_, data) {
        this.showDrivers = false
        this.defaultCart = data
      },
      /**
       * 卖家找车发货
       * @param type （1：买家找车；2：卖家找车）
       */
      setConfirmOrder (type) {
        if (!type || (type !== 1 && type !== 2)) {
          this.$auxiliary.toast('缺少物流方式!')
          return false
        }
        let data = {}
        data.type = type
        data.order_num = this.orderNo
        data.driver_phone = this.defaultCart.car_tel
        data.car_num = this.defaultCart.car_num
        if (this.defaultCart.id) {
          data.id = this.defaultCart.id
        }
        this.$auxiliary.loading.show()
        this.showInputItems = false
        this
          .$api
          .order
          .setConfirmOrder(data)
          .then(r => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('确认成功!')
            this.$parent.refresh()
          })
      },
      /**
       * 删除司机
       * @param id
       */
      deleteDriver (id) {
        this
          .$auxiliary
          .popup
          .confirm({
            title: '提示',
            message: '确定删除吗？',
            callback: (_id, close) => {
              close()
              if (_id === 'close') {
                return false
              }
              this.$auxiliary.loading.show()
              this.$auxiliary.toast('删除成功')
              this
                .$api
                .order
                .delDeliverInfo(this.orderNo, id)
                .then(r => {
                  this.$auxiliary.loading.hide()
                  this.driversItem =
                    this.driversItem.filter(item => {
                      if (item.id === id) {
                        return false
                      }
                      return true
                    })
                  if (id === this.defaultCart.id &&
                    this.driversItem.length > 0) {
                    this.defaultCart = this.driversItem[0]
                  } else if (this.driversItem.length <= 0) {
                    this.defaultCart = {}
                  }
                })
            }
          })
      },
      /*
      ** 确认发货
      ** @notice 该方法逻辑比较复杂。 总体大概分为三种情况,
      *   一: 卖家找车-无默认车辆
      *       1. 添加车辆信息
      *       2. 确认发货
      *   二: 卖家找车-有默认车辆
      *       直接确认发货
      *       选择车辆信息
        *       车辆信息操作
          *       新增
          *       删除车辆信息
          *       编辑车辆信息
      *   三: 买家找车
      *       1. 直接确认发货
      */
      confirmDelivery () {
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
            }
          }
        ]
        // 声明输入列表项
        this.inputsItem = [
          {
            id: 'car_tel',
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
          }
        ]
        this.$auxiliary.loading.show()
        // 获取物流信息数据
        this
          .$api
          .order
          .logisticsInfo(this.orderNo)
          .then(r => {
            this.driversItem = r.seller_find_car
            this.$auxiliary.loading.hide()
            // 卖家找车逻辑
            if (r.send_type === 1) {
              // todo 卖家找车
              this.inputItemsTitle = '请填写车辆信息'
              // todo 没有默认车辆信息逻辑
              if (this.isEmptyObject(r.seller_find_car)) {
                // 给提交按钮添加事件回调函数
                this.inputItemsButtons =
                  this.inputItemsButtons.map(item => {
                    // 移出编辑按钮
                    if (item.id === 'edit') {
                      return null
                    }
                    if (item.id === 'submit') {
                      item.callback = data => {
                        // todo 发货逻辑
                        if (!data.car_tel) {
                          this.$auxiliary.toast('请填写司机电话')
                          return false
                        }
                        if (!data.car_num) {
                          this.$auxiliary.toast('请填写车牌号码')
                          return false
                        }
                        this.defaultCart = data
                        this.showInputItems = false
                        // todo 发货请求
                        this.setConfirmOrder(2)
                      }
                    }
                    return item
                  })
                this.inputsItem =
                  this.inputsItem.map(item => {
                    // 重置输入项默认值
                    item.value = ''
                    // 解除输入项禁止输入
                    item.disabled = false
                    return item
                  })
              } else {
                // todo 有车辆信息
                this.inputItemsTitle = '请确认车辆信息'
                r.seller_find_car.map(item => {
                  if (item.is_default === 1) {
                    this.defaultCart = item
                  }
                })
                // 如果没有设置默认车辆则取第一个
                if (this.isEmptyObject(this.defaultCart)) {
                  this.defaultCart = r.seller_find_car[0]
                }
                // 给每个输入项添加默认值
                this.inputsItem =
                  this.inputsItem.map(item => {
                    item.disabled = true
                    if (item.id === 'car_tel') {
                      item.value = this.defaultCart.car_tel
                    }
                    if (item.id === 'car_num') {
                      item.value = this.defaultCart.car_num
                    }
                    return item
                  })
                // 添加编辑按钮
                let edit = {
                  id: 'edit',
                  text: '编辑车辆',
                  is_close: false,
                  style: {
                    backgroundColor: '#ff4700',
                    color: '#ffffff'
                  },
                  callback: () => {
                    // todo 此处应该弹出选择司机的列表弹窗
                    this.showDrivers = true
                  }
                }
                this.inputItemsButtons.splice(1, 0, edit)
                // 给提交按钮添加事件回调
                this.inputItemsButtons =
                  this.inputItemsButtons.map(item => {
                    if (item.id === 'submit') {
                      item.callback = data => {
                        if (!data.car_tel || !data.car_num) {
                          this.$auxiliary.toast('请至少添加一个完整车辆信息')
                          return false
                        }
                        // todo 发货请求
                        this.setConfirmOrder(2)
                      }
                    }
                    return item
                  })
              }
              // 买家找车逻辑
            } else if (r.send_type === 2) {
              this.inputItemsTitle = '请确认车辆信息'
              // 给提交按钮添加事件回调
              this.inputItemsButtons =
                this.inputItemsButtons.map(item => {
                  // 删除编辑按钮
                  if (item.id === 'edit') {
                    return null
                  }
                  if (item.id === 'submit') {
                    item.callback = data => {
                      // todo 发货逻辑
                      this.setConfirmOrder(1)
                    }
                  }
                  return item
                })
              // 给列表项添加默认值
              this.defaultCart = r.buyer_find_car
              this.inputsItem =
                this.inputsItem.map(item => {
                  if (item.id === 'car_tel') {
                    item.value = this.defaultCart.car_tel
                  }
                  if (item.id === 'car_num') {
                    item.value = this.defaultCart.car_num
                  }
                  item.disabled = true
                  return item
                })
            }
            this.showInputItems = true
          })
      },
      // 取消申请取消订单
      setUnCancelOrder () {
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .setUnCancelOrder(this.orderNo)
          .then(r => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('取消成功')
            this.$parent.refresh()
          })
      },
      /**
       * 同意退货
       */
      setReturnGoodsConfirm () {
        this
          .$auxiliary
          .popup
          .confirm({
            title: '提示',
            message: '确定同意吗?',
            callback: (id, close) => {
              if (id === 'close') {
                return false
              }
              close()
              this.$auxiliary.loading.show()
              this
                .$api
                .order
                .setReturnGoodsConfirm(this.orderNo)
                .then(() => {
                  this.$auxiliary.loading.hide()
                  this.$parent.refresh()
                  this.$auxiliary.toast('您已同意退货!')
                })
            }
          })
      },
      /**
       * 输入原因弹窗回调
       * @param content 输入的内容
       */
      reason (content) {
        if (this.reasonId === 'refuse-refund') {
          this.setRefundReject(content)
        }
        if (this.reasonId === 'refuse-return') {
          this.setReturnGoodsReject(content)
        }
      },
      /**
       *  拒绝退货
       */
      setReturnGoodsReject (content) {
        if (!content) {
          this.$auxiliary.toast('请填写原因!')
          return false
        }
        this.showEnterReason = false
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .setReturnGoodsReject(this.orderNo, content)
          .then(r => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('拒绝成功')
            this.$parent.refresh()
          })
      },
      /**
       * 拒绝退款
       * @param content 退款原因
       */
      setRefundReject (content) {
        if (!content) {
          this.$auxiliary.toast('请填写原因!')
          return false
        }
        this.showEnterReason = false
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .setRefundReject(this.orderNo, content)
          .then(r => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('拒绝成功')
            this.$parent.refresh()
          })
      },
      /**
       * 同意或拒绝买家申请退款
       * @param type 操作类型 0: 同意 1: 拒绝
       */
      setRefundConfirm (_type = 0) {
        this
          .$auxiliary
          .popup
          .confirm({
            title: '提示',
            message: '确定同意吗?',
            callback: (id, close) => {
              if (id === 'close') {
                return false
              }
              close()
              this.$auxiliary.loading.show()
              this
                .$api
                .order
                .setRefundConfirm(this.orderNo, _type)
                .then(r => {
                  this.$auxiliary.loading.hide()
                  this.$parent.refresh()
                  this.$auxiliary.toast('退款成功')
                })
            }
          })
      },
      // 提醒收货
      remindReceipt () {
        // 获取卖家可提醒次数
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .getRemindTakeTime(this.orderNo)
          .then(r => {
            if (Number(r.time) === 0) {
              this.$auxiliary.toast('该订单今日已提醒3次,明日才可提醒!')
              return false
            }
            this.$auxiliary.loading.hide()
            this.alertTitle = '提醒收货'
            this.alertButtons = [
              {
                text: '关闭'
              }
            ]
            this.alertMessage = `
          <p>若买家收货后未及时确认收货,您可通过此功能提醒买家收货。</p>
          <p>若多次提醒买家仍不确认收货,请电话联系买家</p>
          <p style="color: red">已提醒${3 - r.time}次,
          今日还可提醒${r.time}次</p>
        `
            this.alertId = 'remindReceipt'
            if (r.time > 0) {
              this.alertButtons.push(
                {
                  id: 'submit',
                  text: '确认提醒',
                  is_close: false,
                  style: {
                    backgroundColor: '#249af9',
                    color: '#ffffff'
                  },
                  callback: () => {
                    this.$auxiliary.loading.show({zIndex: 11})
                    this
                      .$api
                      .order
                      .setTakeRemind(this.orderNo)
                      .then(() => {
                        this.$auxiliary.loading.hide()
                        this.alertMessage = `
          <p>若买家收货后未及时确认收货,您可通过此功能提醒买家收货。</p>
          <p>若多次提醒买家仍不确认收货,请电话联系买家</p>
          <p style="color: red">已提醒${3 - (r.time - 1)}次,
          今日还可提醒${(r.time - 1)}次</p>
        `
                        if (r.time === 1) {
                          this.alertButtons.pop()
                        }
                        this.showAlert = false
                      })
                  }
                })
            }
            this.showAlert = true
          })
      }
    }
  }
</script>
<style scoped lang="stylus" src="@styl/order/child/item.styl"></style>
