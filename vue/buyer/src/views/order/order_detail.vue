<template>
  <div class="body">
    <div class="body-content">
      <div class="top-status">
        <div
          class="status-item">
          <template v-if="orderNo">
            <div class="status-item-left">
              订单编号: {{orderNo}}
            </div>
            <div
              v-clipboard:copy="orderNo"
              v-clipboard:success="onCopy"
              v-clipboard:error="onCopyError"
              class="status-item-right copy">
              <span>复制编号</span>
            </div>
          </template>
        </div>
        <div class="status-item">
          <div class="status-item-left">
            <span style="color: red">
              {{firstStatusName}}
            </span>
          </div>
        </div>
      </div>
      <ui-load-more
        v-if="loaded"
        :message="loadText[load]"></ui-load-more>
      <div class="time-axis">
        <template v-for="(progress, key) in orderData.progress_list">
          <div
            class="item"
            v-if="!isEmptyObject(progress)">
            <div class="status">
              <div class="status-node">
                <div class="mark">
                  <div class="hollow-circle">
                    <div class="solid-circle"></div>
                  </div>
                </div>
                <div class="top"></div>
                <div class="bottom"></div>
              </div>
              <div class="status-text">
                {{progress.state_name}} {{progress.time}}
              </div>
            </div>
            <template
              v-if="progress.field === 'order_create_data'">
                <div
                  class="item-content">
                  <template v-for="item in progress.goods_data">
                    <div class="goods-info">
                      <div class="shop-title">
                        <div class="desc">购买商品</div>
                        <div class="name">
                          <div class="iconfont">&#xe736;</div>
                          <div class="text">{{item.seller_name}}</div>
                        </div>
                      </div>
                      <div
                        v-for="goods in item.goods_info"
                        class="goods-item">
                        <div class="thumb">
                          <img :src="cutImg(completePath(goods.goods_img), 64, 0, 2)">
                        </div>
                        <div class="title">{{goods.goods_name}}</div>
                        <div class="price-nums">
                          <div class="price">￥{{goods.unit_price}}</div>
                          <div class="nums">×{{goods.buy_num}}</div>
                        </div>
                      </div>
                      <div class="statistics">
                        <span class="sub">(不含运费)</span>
                        <span class="price">￥{{Number(item.all_price).toFixed(2)}}</span>
                        <span>
                    共{{item.buy_kind_num}}种商品
                    {{
                          Number(item.order_reduce) > 0
                            ? '优惠'+Number(item.order_reduce).toFixed(2)+'元'
                            : ''
                          }} 合计:
                  </span>
                      </div>
                    </div>
                    <div class="pay-method">
                      <div class="left">支付方式</div>
                      <div v-if="orderData.refund_order_type === 24 ||
                    orderData.refund_order_type === 25" class="right">自行协商</div>
                      <div v-else class="right">{{item.pay_way}}</div>
                    </div>
                    <template v-if="orderData.refund_order_type !== 24 &&
                    orderData.refund_order_type !== 25">
                      <template
                        v-if="item.get_goods_way == 2">
                        <div class="receiving-mode">
                          <div class="receiving-item">
                            <div class="item-title">收货方式:</div>
                            <div class="item-text">
                              <div
                                class="call"
                                @click="call(item.get_goods_data.buyer_find_car.car_tel)">
                                <div class="iconfont">&#xe60a;</div>
                                <span>联系司机</span>
                              </div>
                              <span>买家找车</span>
                            </div>
                          </div>
                          <div class="receiving-item">
                            <div class="item-title">买家姓名:</div>
                            <div class="item-text">
                              {{item.get_goods_data.buyer_find_car.buyer_name}}
                            </div>
                          </div>
                          <div class="receiving-item">
                            <div class="item-title">司机电话:</div>
                            <div class="item-text">
                              {{item.get_goods_data.buyer_find_car.car_tel}}
                            </div>
                          </div>
                          <div class="receiving-item">
                            <div class="item-title">车牌号码:</div>
                            <div class="item-text">
                              {{item.get_goods_data.buyer_find_car.car_num}}
                            </div>
                          </div>
                          <div class="receiving-item">
                            <div class="item-title">装车时间:</div>
                            <div class="item-text">
                              {{item.get_goods_data.buyer_find_car.car_time}}
                            </div>
                          </div>
                          <div class="receiving-item">
                            <div class="item-title">装车位置:</div>
                            <div class="item-text">
                              {{item.get_goods_data.buyer_find_car.car_address}}
                            </div>
                          </div>
                        </div>
                      </template>
                      <template
                        v-if="item.get_goods_way == 3">
                        <div class="receiving-mode">
                          <div class="receiving-item">
                            <div class="item-title">收货方式:</div>
                            <div class="item-text">卖家找车</div>
                          </div>
                          <div class="receiving-item">
                            <div class="item-title">收货信息:</div>
                            <div class="item-text">
                              {{item.get_goods_data.seller_find_car.buyer_name}}
                              {{item.get_goods_data.seller_find_car.buyer_tel}}
                            </div>
                          </div>
                          <div class="receiving-item">
                            <div class="item-text">
                              {{item.get_goods_data.seller_find_car.buyer_address}}
                            </div>
                          </div>
                        </div>
                      </template>
                    </template>
                  </template>
                </div>
            </template>
            <template v-if="progress.field === 'seller_refunds_data'">
              <div class="item-content">
                <div class="goods-info">
                  <div class="shop-title">
                    <div class="desc">取消商品</div>
                  </div>
                  <template
                    v-for="goods in progress.refunds_data_info.refunds_goods">
                    <div class="goods-item">
                      <div class="thumb">
                        <img :src="cutImg(completePath(goods.refunds_goods_img), 80, 0, 2)" />
                      </div>
                      <div class="title">
                        {{goods.refunds_goods_name}}
                      </div>
                      <div class="price-nums">
                        <div class="price">￥{{Number(goods.refunds_goods_price).toFixed(2)}}</div>
                        <div
                          style="line-height: 2rem"
                          class="nums">×{{goods.refunds_goods_buy_num}}
                        </div>
                        <div class="nums">退 {{goods.refunds_goods_num}}</div>
                      </div>
                    </div>
                  </template>
                  <div class="statistics">
                    <span class="sub">（退款总金额）</span>
                    <span class="price">
                      ￥{{progress.refunds_data_info.refunds_total_price}}
                    </span>
                    <span>
                      共{{progress.refunds_data_info.refunds_kind_num}}种商品
                      {{
                      Number(progress.refunds_data_info.order_reduce) > 0
                        ? '优惠' + Number(progress.refunds_data_info.order_reduce).toFixed(2) + '元'
                        : ''
                      }} 合计:
                    </span>
                  </div>
                  <div class="return-reason">
                    <span>卖家取消原因</span>
                    <p>
                      {{progress.refunds_data_info.refunds_reason_info}}
                      {{progress.refunds_data_info.refunds_reason}}
                    </p>
                  </div>
                </div>
              </div>
            </template>
            <template
              v-if="
            progress.field === 'refunds_data'">
              <div class="item-content">
                <div class="goods-info">
                  <div class="shop-title">
                    <div class="desc">退款商品</div>
                  </div>
                  <template
                    v-for="goods in progress.refunds_data_info.refunds_goods">
                    <div class="goods-item">
                      <div class="thumb">
                        <img :src="cutImg(completePath(goods.refunds_goods_img), 80, 0, 2)" />
                      </div>
                      <div class="title">
                        {{goods.refunds_goods_name}}
                      </div>
                      <div class="price-nums">
                        <div class="price">￥{{Number(goods.refunds_goods_price).toFixed(2)}}</div>
                        <div
                          style="line-height: 2rem"
                          class="nums">×{{goods.refunds_goods_buy_num}}</div>
                        <div class="nums">退 {{goods.refunds_goods_num}}</div>
                      </div>
                    </div>
                  </template>
                  <div class="statistics">
                    <span class="sub">（退款总金额）</span>
                    <span class="price">
                      ￥{{progress.refunds_data_info.refunds_total_price}}
                    </span>
                    <span>
                      共{{progress.refunds_data_info.refunds_kind_num}}种商品
                      {{
                      Number(progress.refunds_data_info.order_reduce) > 0
                        ? '优惠'+Number(progress.refunds_data_info.order_reduce).toFixed(2)+'元'
                        : ''
                      }} 合计:
                    </span>
                  </div>
                  <div class="return-reason">
                    <span>买家退款原因</span>
                    <p>
                      {{progress.refunds_data_info.refunds_reason_info}}
                      {{progress.refunds_data_info.refunds_reason}}
                    </p>
                  </div>
                </div>
              </div>
            </template>
            <template
              v-if="progress.field === 'seller_refuse_refund'">
              <div class="item-content">
                <div class="return-reason">
                  <span>拒绝原因</span>
                  <p>
                    {{progress.refuse_reason}}
                  </p>
                </div>
              </div>
            </template>
            <template
              v-if="progress.field === 'seller_send_data'">
              <div class="item-content">
                <div class="receiving-mode">
                  <div class="receiving-item">
                    <div class="item-title">车辆信息:</div>
                    <div class="item-text">
                      <div
                        class="call"
                        @click="call(progress.seller_send_car.seller_car_tel)">
                        <div class="iconfont">&#xe60a;</div>
                        <span>联系司机</span>
                      </div>
                    </div>
                  </div>
                  <div class="receiving-item">
                    <div class="item-title">
                      &nbsp;&nbsp;司机电话:</div>
                    <div class="item-text">
                      {{progress.seller_send_car.seller_car_tel}}
                    </div>
                  </div>
                  <div class="receiving-item">
                    <div class="item-title">
                      &nbsp;&nbsp;车牌号码:</div>
                    <div class="item-text">
                      {{progress.seller_send_car.seller_car_num}}
                    </div>
                  </div>
                </div>
              </div>

            </template>
            <template
              v-if="progress.field === 'buyer_return_goods_data'">
              <div class="item-content">
                <div class="goods-info">
                  <div class="shop-title">
                    <div class="desc">退货商品</div>
                    <!--<div class="name">-->
                    <!--<div class="iconfont">&#xe736;</div>-->
                    <!--<div class="text">山河食品山河食品山河食品</div>-->
                    <!--</div>-->
                  </div>
                  <template
                    v-for="goods in progress.buyer_return_goods_data_info.return_goods">
                    <div class="goods-item">
                      <div class="thumb">
                        <img :src="cutImg(completePath(goods.return_goods_img), 80, 0, 2)" alt="">
                      </div>
                      <div class="title">{{goods.return_goods_name}}</div>
                      <div class="price-nums">
                        <div class="price">
                          ￥{{Number(goods.return_goods_price).toFixed(2)}}
                        </div>
                        <div
                          style="line-height: 2rem"
                          class="nums">×{{goods.return_goods_buy_num}}</div>
                        <div class="nums">退{{goods.return_goods_num}}</div>
                      </div>
                    </div>
                  </template>
                  <div class="statistics">
                    <span class="sub">（退款总金额）</span>
                    <span class="price">
                      ￥{{Number(progress.buyer_return_goods_data_info.return_total_price).toFixed(2)}}
                    </span>
                    <span>
                      共{{progress.buyer_return_goods_data_info.return_kind_num}}种商品
                      {{
                      Number(progress.buyer_return_goods_data_info.order_reduce) > 0
                        ? '优惠' + Number(progress.buyer_return_goods_data_info.order_reduce) + '元' :''
                      }}

                      合计:</span>
                  </div>
                  <div class="return-reason">
                    <template v-if="progress.buyer_return_goods_data_info.return_reason">
                      <span>买家退货原因</span>
                      <p>{{progress.buyer_return_goods_data_info.return_reason}}</p>
                    </template>
                    <template
                      v-if="progress.buyer_return_goods_data_info.return_reason_img.length > 0">
                      <span>退货凭证</span>
                      <div class="return-voucher">
                        <div
                          v-for="img in progress.buyer_return_goods_data_info.return_reason_img"
                          class="thumb">
                          <img :src="cutImg(completePath(img), 100, 0, 2)">
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </template>
            <template
              v-if="progress.field === 'seller_refuse_return'">
              <div class="item-content">
                <div class="return-reason">
                  <span>拒绝原因</span>
                  <p>
                    {{progress.seller_refuse_return_reason}}
                  </p>
                </div>
              </div>
            </template>
            <template
              v-if="progress.field === 'buyer_send_data'">
              <div class="item-content">
                <div class="receiving-mode">
                  <div class="receiving-item">
                    <div class="item-title">车辆信息:</div>
                    <div class="item-text">
                      <div class="call"
                        @click="call(progress.buyer_send_car.buyer_send_car_tel)">
                        <div class="iconfont">&#xe60a;</div>
                        <span>联系司机</span>
                      </div>
                    </div>
                  </div>
                  <div class="receiving-item">
                    <div class="item-title">
                      &nbsp;&nbsp;司机电话:</div>
                    <div class="item-text">
                      {{progress.buyer_send_car.buyer_send_car_tel}}
                    </div>
                  </div>
                  <div class="receiving-item">
                    <div class="item-title">
                      &nbsp;&nbsp;车牌号码:</div>
                    <div class="item-text">
                      {{progress.buyer_send_car.buyer_send_car_num}}
                    </div>
                  </div>
                  <div class="receiving-item">
                    <div class="item-title">
                      &nbsp;&nbsp;发货地址:</div>
                    <div class="item-text">
                      {{progress.buyer_send_car.buyer_send_car_adress}}
                    </div>
                  </div>
                  <div class="receiving-item">
                    <div class="item-title">
                      &nbsp;&nbsp;发货时间:</div>
                    <div class="item-text">
                      {{progress.buyer_send_car.buyer_send_car_time}}
                    </div>
                  </div>
                </div>
              </div>

            </template>
          </div>
        </template>

      </div>
    </div>
    <div class="body-footer">
      <template v-if="!loaded">
        <template v-if="orderData.refund_order_type !== 24 && orderData.refund_order_type !== 25">
          <template v-if="orderData.order_state === 1">
            <div
              style="border-color:#249af9"
              class="button"
              v-if="otherStatus !== 22"
              @click="payNow">
            <span
              style="color: #249af9;">立即支付</span>
            </div>
            <div class="button"
                 @click="cancelOrder">
              <span>取消订单</span>
            </div>
            <div
              @click="jump(`/update/${orderNo}`)"
              class="button">
              <span>修改地址</span>
            </div>
          </template>
          <template v-if="orderData.order_state === 2">
            <div
              @click="jump(`/refund_money/${orderNo}`)"
              class="button">
              <span>申请退款</span>
            </div>
            <div
              class="button"
              @click="remindShipment">
              <span>提醒发货</span>
            </div>
          </template>
          <template v-if="orderData.order_state === 3">
            <div
              @click="jump(`/refund/${orderNo}`)"
              class="button">
              <span>退款/退货</span>
            </div>
            <div
              @click="confirmReceipt"
              class="button">
              <span>确认收货</span>
            </div>
          </template>
          <template v-if="orderData.order_state === 4">
            <div
              v-if="appraise === 2"
              @click="jump(`/comment/${orderNo}`)"
              class="button">
              <span>评价订单</span>
            </div>
            <div
              v-if="appraise === 4"
              @click="jump(`/re_comment/${orderNo}`)"
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
          <template v-if="orderData.order_state === 6">
            <div
              class="button"
              @click="withdraw(1)"
              v-if="orderData.refund_order_type === 14 ||
            orderData.refund_order_type === 15">
              <span>取消申请</span>
            </div>
            <div
              class="button"
              @click="agentApply(1)"
              v-if="orderData.refund_order_type === 15">
              <span>再次申请</span>
            </div>
          </template>
          <!--退货-->
          <template v-if="orderData.order_state === 11">
            <div
              class="button"
              @click="withdraw(2)"
              v-if="orderData.refund_order_type === 16 ||
            orderData.refund_order_type === 17">
              <span>取消申请</span>
            </div>
            <div
              class="button"
              @click="agentApply(2)"
              v-if="orderData.refund_order_type === 17">
              <span>再次申请</span>
            </div>
            <div
              class="button"
              @click="updateReturnMoney"
              v-if="orderData.refund_order_type === 16">
              <span>修改退款金</span>
            </div>
            <div
              class="button"
              @click="confirmDelivery"
              v-if="orderData.refund_order_type === 19">
              <span>确认发货</span>
            </div>
          </template>
          <!--退款退货共有状态-->
          <template v-if="orderData.order_state === 6 || orderData.order_state === 11">
            <div
              class="button"
              @click="setReturnAct(1)"
              v-if="orderData.refund_order_type === 20">
              <span>同意申请</span>
            </div>
            <div
              class="button"
              @click="setReturnAct(2)"
              v-if="orderData.refund_order_type === 20">
              <span>拒绝申请</span>
            </div>
          </template>
          <template v-if="orderData.order_state === 13">
            <div
              @click="buyAgain"
              class="button">
              <span>再次购买</span>
            </div>
          </template>

        </template>
        <div
          v-if="!loaded"
          class="button"
          @click="concatSeller">
          <span>联系卖家</span>
        </div>
      </template>
    </div>
    <pay-methods
      :z-index="10"
      title="请选择支付方式"
      :order-no="orderNo"
      :pay-methods="payMethodsData"
      @close="showPayMethods = false"
      :show="showPayMethods"></pay-methods>
    <ui-cancel-order
      title="取消订单"
      :z-index="10"
      :bg-event="true"
      :order-no="orderNo"
      :show="showCancelPopup"
      @cancel-success="getData"
      @close="showCancelPopup = false"></ui-cancel-order>
    <ui-alert
      :title="alertTitle"
      :z-index="10"
      :message="alertMessage"
      :id="alertID"
      :buttons="alertButtons"
      :show="showAlert"
      @close="showAlert = false"></ui-alert>
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
  import uiAlert from '@components/alert.vue'
  import uiCancelOrder from '@views/order/child/cancel.vue'
  import uiLoadMore from '@components/loadMoreView.vue'
  import payMethods from '@components/payMethods.vue'
  import uiInputItems from '@components/inputItems'
  export default {
    components: {
      uiLoadMore,
      payMethods,
      uiCancelOrder,
      uiAlert,
      uiInputItems
    },
    data () {
      return {
        // 输入列表弹窗 底部按钮
        inputItemsButtons: [],
        // 输入列表弹窗标题
        inputItemsTitle: '',
        // 输入列表项
        inputsItem: [],
        // 显示输入列表弹窗
        showInputItems: false,
        firstStatusName: '',
        // 是否显示alert弹窗
        showAlert: false,
        // 是否显示取消订单弹窗
        showCancelPopup: false,
        // 支付方式列表
        payMethodsData: [],
        // 是否显示支付方式弹窗
        showPayMethods: false,
        // 订单编号
        orderNo: '',
        // 第一次是否加载完毕
        loaded: true,
        // 第一次加载
        load: 1,
        // 加载提示文字
        loadText: {
          1: '数据载入中...',
          2: '刷新中...'
        },
        // 订单状态
        order_type: null,
        // 评价状态
        appraise: null,
        // 订单退款退货状态
        refund_order_type: null,
        orderData: {},
        // alert弹窗ID,用于识别不同用途的alert
        alertID: '',
        // alert底部按钮
        alertButtons: [],
        // alert标题
        alertTitle: '标题',
        // alert内容
        alertMessage: ''
        // 订单主状态描述
//        order_states: {
//          1: '待付款',
//          2: '待发货',
//          3: '待收货',
//          4: '交易完成',
//          6: '退款',
//          8: '交易完成',
//          11: '退货',
//          13: '交易关闭'
//        }
      }
    },
    methods: {

      /**
       * 修改退款金额
       */
      updateReturnMoney () {
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .getReturnInfo(this.orderNo)
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
                    .setReturnMoney(this.orderNo, parseInt((val) * 100))
                    .then(() => {
                      this.$auxiliary.toast('修改成功')
                      this.$parent.refresh()
                    })
                }
              })
          })
      },
      // 联系卖家
      concatSeller () {
        if (!this.isEmptyObject(this
            .orderData
            .seller_contact) &&
          this
            .orderData
            .seller_contact.length === 1
        ) {
          this.call(this
                      .orderData
                      .seller_contact[0]
                      .seller_tel)
          return false
        }
        if (this.isEmptyObject(this
          .orderData
          .seller_contact)) {
          this.$auxiliary.toast('抱歉,未找到联系电话！')
          return false
        }
        let items = []
        this
          .orderData
          .seller_contact
          .map((item, idx) => {
            items.push({
              id: idx,
              name: item.seller_shop_name
            })
          })
        this
          .$auxiliary
          .popup
          .select({
            bgEvent: true,
            items: items,
            callback: (id, close) => {
              this.call(this.orderData.seller_contact[id].seller_tel)
              close()
            }
          })
      },
      /**
       * 同意(拒绝)卖家申请
       */
      setReturnAct (type) {
        this.$auxiliary.loading.show()
        this
          .$api
          .order
          .setReturnAct(this.orderNo, type)
          .then(() => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('确认成功')
            this.getData()
          })
      },

      /**
       * 退货时确认发货
       */
      confirmDelivery () {
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
              data.order_num = this.orderNo
              this
                .$api
                .order
                .setReturnSend(data)
                .then(() => {
                  this.$auxiliary.loading.hide()
                  this.$auxiliary.toast('确认成功')
                  this.getData()
                })
            }
          }
        ]
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
          .setAgainReturn(this.orderNo, type)
          .then(r => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('申请成功')
            this.getData()
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
          .setUnReturn(this.orderNo, type)
          .then(r => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('取消成功')
            this.getData()
          })
      },
      // 确认收货
      confirmReceipt () {
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
                .orderTake(this.orderNo)
                .then(r => {
                  this.$auxiliary.loading.hide()
                  this.$auxiliary.toast('确认成功')
                  this.getData()
                })
            }
          }
        ]
        this.showAlert = true
      },
      // 提醒发货
      remindShipment () {
        this.alertTitle = '提醒发货'
        this.alertMessage = `<p>您可通过此功能提醒卖家发货。若您急需用货,请电话联系卖家。</p>`
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
                .setShipmentRemind(this.orderNo)
                .then(r => {
                  this.$auxiliary.loading.hide()
                  this.$auxiliary.toast(`${r.message}:今日还可提醒${3 - (r.data.num)}次`)
                })
            }
          }
        ]
        this.showAlert = true
      },
      // 立即支付
      payNow () {
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
      // 再次购买/重新购买
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
      // 取消订单
      cancelOrder () {
        this.showCancelPopup = true
      },
      // 获取订单详情数据
      getData () {
        this.loaded = true
        this
          .$api
          .order
          .orderDetail(this.orderNo)
          .then(r => {
            if (typeof r.old_order !== 'undefined' && Number(r.old_order) === 1) {
              this.$auxiliary.toast('抱歉,旧订单无法查看详情!')
              this.$router.go(-1)
              return false
            }
            this.load = 2
            this.loaded = false
            this.orderData = r
            this.order_type = this.orderData.order_state
            this.firstStatusName = this.orderData.progress_list[0].state_name
            this.appraise = this.orderData.goods_appraise_state
            this.refund_order_type = this.orderData.refund_order_type
          })
      },
      onCopy (e) {
        this.$auxiliary.toast('复制成功')
      },
      onCopyError (e) {
        this.$auxiliary.toast('复制失败')
      }
    },
    created () {
      this.orderNo = this.$route.params.order_no
      this.getData()
    }
  }
</script>
<style scoped lang="stylus" src="@styl/order/order_detail.styl"></style>
