import * as http from '@api/http'
/**
 * 获取订单列表
 * @param type 订单状态
 * @param page 页码
 * @param pageNum 每页显示数量
 * @returns {Promise<any>}
 */
export function orderItem (type = null, page = 1, pageNum = 20) {
  let _type = {
    all: '',
    pending_payment: 1,
    shipment_pending: 2,
    waiting_for_delivery: 3,
    waiting_for_evaluation: 4,
    refund_goods: 5
  }
  return http
    .get('order.orderItem', {
      type: _type[type],
      page_size: pageNum,
      page_num: page
    }).then(r => r.data)
}
/**
 * 获取订单详情
 * @param orderNo 订单编号
 */
export function orderDetail (orderNo = '') {
  return http.get('order.detail', {
    order_num: orderNo
  }).then(r => r.data)
}
/**
 * 获取不同状态的未操作的订单数量
 */
export function orderStatusNumber () {
  return http
    .get('order.orderStatusNumber')
    .then(r => {
      return {
        pending_payment: r.data.wait_pay_count,
        shipment_pending: r.data.wait_send_count,
        waiting_for_delivery: r.data.wait_get_count,
        waiting_for_evaluation: r.data.wait_appraise_count
      }
    }
  )
}
/**
 * 取消订单
 * @param orderNum 订单编号
 * @param cancelId 取消订单的理由ID
 * @param cancelMsg 取消订单补充说明
 * @returns {Promise<any>}
 */
export function cancel (orderNum, cancelId, cancelMsg) {
  return http
    .post('order.cancel', {
      order_num: orderNum,
      cancel_id: cancelId,
      cancel_msg: cancelMsg
    }).then(r => r.data)
}
/**
 *  获取退款/退货/取消订单原因列表
 * @param type Number 原因类型:1=>买家取消订单 2=>买家退款 3=>买家退货
 * @returns {Promise<any>}
 */
export function reason (type) {
  return http
    .get('order.reason', {
      type: type
    }).then(r => r.data)
}
/**
 * 提醒卖家发货
 * @param orderNo
 * @returns {*|Promise<any>|Promise.<TResult>}
 */
export function setShipmentRemind (orderNo) {
  return http
    .post('order.setShipmentRemind', {
      order_num: orderNo
    }).then(r => r)
}

/**
 * 获取退款或退款退货时的商品列表信息
 * @param orderNo
 * @returns {*|Promise<any>|Promise.<TResult>}
 */
export function getCancelGoodsList (orderNo) {
  return http
    .get('order.getCancelGoodsList', {
      order_num: orderNo
    }).then(r => r.data)
}
/**
 * 再次购买
 * @param orderNo 订单编号
 * @returns {Promise<any>}
 */
export function buyAgain (orderNo) {
  return http
    .post('order.buyAgain', {
      order_num: orderNo
    }).then(r => r.data)
}
/**
 * 确认收货
 * @param orderNo 订单编号
 * @returns {Promise<any>}
 */
export function orderTake (orderNo) {
  return http
    .post('order.orderTake', {
      sub_order_id: orderNo
    }).then(r => r.data)
}
/**
 * 取消退款或取消退货
 * @param orderNo 订单编号
 * @param type 类型 1: 取消退款 2取消退货
 */
export function setUnReturn (orderNo, type) {
  return http
    .post('order.setUnReturn', {
      order_num: orderNo,
      type: type
    }).then(r => r.data)
}
/**
 * 再次申请退款或退货
 * @param orderNo 订单编号
 * @param type 类型 1:再次申请退款, 2: 再次申请退货
 * @returns {Promise<any>}
 */
export function setAgainReturn (orderNo, type) {
  return http
    .post('order.setAgainReturn', {
      order_num: orderNo,
      type: type
    }).then(r => r.data)
}

/**
 * 退货时确认发货操作
 * @param data = {
 *  order_num: '', 订单编号
 *  driver_tel: '', 司机电话
 *  car_num: '', 车牌号码
 *  shipment_address: '', 取货地址
 *  shipment_time: '' 取货时间
 * }
 * @returns {Promise<any>}
 */
export function setReturnSend (data) {
  return http
    .post('order.setReturnSend', data)
    .then(r => r.data)
}
/**
 * 买家同意/拒绝卖家取消订单
 * @param orderNo 订单编号
 * @param type 操作类型 1:同意申请, 2:拒绝申请
 * @returns {Promise<any>}
 */
export function setReturnAct (orderNo, type) {
  return http
    .post('order.setReturnAct', {
      order_num: orderNo,
      type: type
    }).then(r => r.message)
}

/**
 * 获取修改订单的展示数据
 * @param orderNo
 * @returns {Promise<any>}
 */
export function getOrderUpdateInfo (orderNo) {
  return http
    .get('order.getOrderUpdateInfo', {
      order_num: orderNo
    }).then(r => r.data)
}

/**
 * 修改订单
 * @param data 需要修改的订单数据
 * @returns {Promise<any>}
 */
export function editOrderInfo (data) {
  return http
    .post('order.editOrderInfo', data).then(r => r.data)
}

/**
 * 修改订单时,时时计算订单金额和优惠金额
 * @param orderNo 订单编号
 * @param data 需修改的商品数据
 * @returns {Promise<any>}
 */
export function getReturnGoodsMoney (orderNo, data) {
  return http
    .post('order.getReturnGoodsMoney', {
      order_num: orderNo,
      goods_info: data
    }).then(r => r.data)
}
/**
 * 申请退款或者申请退货
 * @param data = {
    { // 退款 请求参数
        "type":1,
        "order_num":"105141484892370icPq9FPe-3",
        "user_id":10514,
        "reason":1,
        "reason_replenish":"不想要了",
        "return_goods":[
          {
            "goods_id":14112,
            "goods_num":1
          },
          {
            "goods_id":16062,
            "goods_num":1
          }
        ]
    }
    { //退货时请求参数
      "type":2,
      "order_num":"105141484892370icPq9FPe-3",
      "user_id":10514,
      "reason":1,
      "refund_money":31,
      "reason_replenish":"不想要了",
      "img":[
        "dadsdasd.jpg",
        "dsadadsdad.png"
      ],
      "return_goods":[
        {
            "goods_id":14112,
            "goods_num":1
        },
        {
            "goods_id":16062,
            "goods_num":1
        }
      ]
    }
 * }
 * @returns {Promise<any>}
 */
export function setOrderReturn (data) {
  return http
    .post('order.setOrderReturn', data)
    .then(r => r.data)
}

/**
 * 修改退款金额获取之前的退款金额
 * @param orderNo 子订单号
 */
export function getReturnInfo (orderNo) {
  return http
    .get('order.getReturnInfo', {
      order_num: orderNo
    }).then(r => r.data)
}

/**
 * 修改退款金额
 * @param orderNo
 * @param money
 * @returns {Promise<any>}
 */
export function setReturnMoney (orderNo, money) {
  return http
    .post('order.setReturnMoney', {
      order_num: orderNo,
      money: money
    }).then(r => r.data)
}
