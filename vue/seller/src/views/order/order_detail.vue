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
                    <div
                      v-if="refundOrderType === 24 ||
                      refundOrderType === 25" class="right">自行协商</div>
                    <div v-else class="right">{{item.pay_way}}</div>
                  </div>
                  <template v-if="refundOrderType !== 24 && refundOrderType !== 25">
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
                      &nbsp;&nbsp;司机电话:
                    </div>
                    <div class="item-text">
                      {{progress.seller_send_car.seller_car_tel}}
                    </div>
                  </div>
                  <div class="receiving-item">
                    <div class="item-title">
                      &nbsp;&nbsp;车牌号码:
                    </div>
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
                          class="nums">×{{goods.return_goods_buy_num}}
                        </div>
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
                        ? '优惠' + Number(progress.buyer_return_goods_data_info.order_reduce) + '元' : ''
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
                      &nbsp;&nbsp;司机电话:
                    </div>
                    <div class="item-text">
                      {{progress.buyer_send_car.buyer_send_car_tel}}
                    </div>
                  </div>
                  <div class="receiving-item">
                    <div class="item-title">
                      &nbsp;&nbsp;车牌号码:
                    </div>
                    <div class="item-text">
                      {{progress.buyer_send_car.buyer_send_car_num}}
                    </div>
                  </div>
                  <div class="receiving-item">
                    <div class="item-title">
                      &nbsp;&nbsp;发货地址:
                    </div>
                    <div class="item-text">
                      {{progress.buyer_send_car.buyer_send_car_adress}}
                    </div>
                  </div>
                  <div class="receiving-item">
                    <div class="item-title">
                      &nbsp;&nbsp;发货时间:
                    </div>
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
        <template v-if="refundOrderType !== 24 && refundOrderType!== 25">
          <template
            v-if="orderType === 9 ||
        orderType === 10">
            <!--<div-->
            <!--v-if="goodsAppraiseState === 1"-->
            <!--class="button">-->
            <!--<span>查看评论</span>-->
            <!--</div>-->
          </template>
          <template v-if="orderType === 8">
            <!--<div-->
            <!--v-if="goodsAppraiseState === 1"-->
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
          <template v-if="orderType === 2">
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
          <template v-if="orderType === 3">
            <div
              class="button"
              @click="remindReceipt">
              <span>提醒收货</span>
            </div>
          </template>
          <template v-if="orderType === 6">
            <template v-if="refundOrderType === 15">
              <div class="button" style="background-color: #eeeeee;border-color: #eeeeee;">
                <span style="color: #999999">拒绝退款</span>
              </div>
              <div class="button" style="background-color: #eeeeee;border-color: #eeeeee;">
                <span style="color: #999999">同意退款</span>
              </div>
            </template>
            <template v-if="refundOrderType === 14">
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

            <template v-if="refundOrderType === 20">
              <div
                class="button"
                @click="setUnCancelOrder">
                <span>取消申请</span>
              </div>
            </template>
            <template v-if="refundOrderType === 21">
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
          <template v-if="orderType === 11">
            <template v-if="refundOrderType === 15">
              <div class="button" style="background-color: #eeeeee">
                <span style="color: #999999">拒绝退款</span>
              </div>
            </template>
            <template v-if="refundOrderType === 16">
              <div class="button"
                   @click="showEnterReason = true;reasonId = 'refuse-return'">
                <span>拒绝退货</span>
              </div>
              <div class="button"
                   @click="setReturnGoodsConfirm">
                <span>同意退货</span>
              </div>
            </template>
            <template v-if="refundOrderType === 17">
              <div class="button" style="background-color: #eeeeee">
                <span style="color: #999999">拒绝退货</span>
              </div>
            </template>
            <template v-if="refundOrderType === 19">
              <div class="button" style="background-color: #eeeeee">
                <span style="color: #999999">同意退货</span>
              </div>
            </template>
            <template v-if="refundOrderType === 18">
              <div
                class="button"
                @click="setRefundConfirm(1)">
                <span>同意退款</span>
              </div>
            </template>
          </template>
        </template>
        <div
          class="button"
          @click="call(orderData.buyer_tel)">
          <span>联系买家</span>
        </div>
      </template>
    </div>

    <ui-input-items
      :bgEvent="true"
      :zIndex="100"
      :buttons="inputItemsButtons"
      :inputsItem="inputsItem"
      :show="showInputItems"
      @close="showInputItems = false"
      :title="inputItemsTitle">
    </ui-input-items>
    <ui-drivers
      :show="showDrivers"
      :z-index="100"
      :bg-event="true"
      title="选择发货司机"
      @edit="editDrivers"
      @close="showDrivers = false"
      :driversItem="driversItem"
      @delete="deleteDriver"
      @create="createDriver"
      @select="selectDrivers"
    ></ui-drivers>
    <ui-alert
      :title="alertTitle"
      :z-index="100"
      :message="alertMessage"
      :id="alertID"
      :buttons="alertButtons"
      :show="showAlert"
      @close="showAlert = false"></ui-alert>
    <ui-reason
      :z-index="100"
      :show="showEnterReason"
      @submit="reason"
      @close="showEnterReason = false"
    ></ui-reason>
  </div>
</template>
<script>
  import uiAlert from '@components/alert.vue'
  import uiReason from '@views/order/child/reason.vue'
  import uiLoadMore from '@components/loadMoreView.vue'
  import uiInputItems from '@components/inputItems.vue'
  import uiDrivers from '@components/drivers.vue'
  export default {
    components: {
      uiLoadMore,
      uiInputItems,
      uiDrivers,
      uiAlert,
      uiReason
    },
    data () {
      return {
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
        // 司机列表信息
        driversItem: [],
        // 默认车辆信息
        defaultCart: {},
        // 显示选择司机列表弹窗
        showDrivers: false,
        // 订单状态
        orderType: 0,
        // 退款退货状态
        refundOrderType: 0,
        // 最近一次状态名称
        firstStatusName: '',
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
        // 订单详情数据
        orderData: {},
        // 订单是否已经评价
        goodsAppraiseState: 0,
        // 输入列表弹窗 底部按钮
        inputItemsButtons: [],
        // 输入列表弹窗标题
        inputItemsTitle: '',
        // 输入列表项
        inputsItem: [],
        // 显示输入列表弹窗
        showInputItems: false
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
            this.getData()
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
                  this.getData()
                  this.$auxiliary.toast('您已同意退货!')
                })
            }
          })
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
            this.getData()
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
            this.getData()
          })
      },
      /**
       * 同意或拒绝买家申请退款
       * @param type 操作类型 0: 同意 1: 拒绝
       */
      setRefundConfirm (type = 0) {
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
                .setRefundConfirm(this.orderNo, type)
                .then(r => {
                  this.$auxiliary.loading.hide()
                  this.getData()
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
      // 获取选中的司机信息
      selectDrivers (_, data) {
        this.showDrivers = false
        this.defaultCart = data
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
            this.getData()
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
                        console.log('卖家找车,有默认车辆', data)
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
      // 获取订单详情数据
      getData () {
        this.loaded = true
        this
          .$api
          .order
          .detail(this.orderNo)
          .then(r => {
            if (typeof r.old_order !== 'undefined' && Number(r.old_order) === 1) {
              this.$auxiliary.toast('抱歉,旧订单无法查看详情!')
              this.$router.go(-1)
              return false
            }
            this.load = 2
            this.loaded = false
            this.orderData = r
            this.orderType = this.orderData.order_state
            this.firstStatusName = this.orderData.progress_list[0].state_name
            this.goodsAppraiseState = this.orderData.goods_appraise_state
            this.refundOrderType = this.orderData.refund_order_type
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
      if (!this.orderNo) {
        this.$auxiliary.toast('缺少订单编号!')
        this.$router.go(-1)
        return false
      }
      this.getData()
    }
  }
</script>
<style scoped lang="stylus" src="@styl/order/order_detail.styl"></style>
