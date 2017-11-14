// const Promise = require('es6-promise').Promise
import * as http from '@api/http'
/**
 * 获取各种类型订单未处理的数量
 */
export function getOrderCount () {
  return http
    .get('order.getOrderCount')
    .then(r => {
      return {
        all: r.data.all_order,
        shipment_pending: r.data.wait_send_order,
        waiting_for_delivery: r.data.already_send_order,
        refund_goods: r.data.refund_order
      }
    })
}

/**
 * 获取订单列表
 * @param status
 * @param page
 * @param size
 * @returns {Promise<any>}
 */
export function orderItem (status = 'all', page = 1, size = 20) {
  let type = {
    all: '', // 全部
    shipment_pending: 2, // 待发货
    waiting_for_delivery: 3, // 待收货
    refund_goods: 5 // 退款/退货
  }
  return http
    .get('order.orderItem', {
      order_type: type[status],
      page: page,
      size: size
    }).then(r => r.data)
}

/**
 * 获取订单详情
 * @param orderNo 订单编号
 */
export function detail (orderNo = '') {
  return http
    .get('order.detail', {
      order_num: orderNo
    }).then(r => r.data)
}

/**
 * 提醒买家收货
 * @param orderNo
 * @returns {Promise<any>}
 */
export function setTakeRemind (orderNo) {
  return http
    .post('order.setTakeRemind', {
      order_num: orderNo
    }).then(r => r.data)
}
/**
 * 获取提醒买家收货次数
 * @param orderNo
 * @returns {Promise<any>}
 */
export function getRemindTakeTime (orderNo) {
  return http
    .get('order.getRemindTakeTime', {
      order_num: orderNo
    }).then(r => r.data)
}

/**
 * 同意或拒绝买家申请退款
 * @param orderNo 订单编号
 * @param type 操作类型 0: 同意退款 1: 同意退货退款
 * @returns {Promise<any>}
 */
export function setRefundConfirm (orderNo, type) {
  return http
    .post('order.setRefundConfirm', {
      order_num: orderNo,
      order_type: type
    }).then(r => r.data)
}

/**
 * 拒绝退款
 * @param orderNo 订单编号
 * @param refuseReason 拒绝原因
 * @returns {Promise<any>}
 */
export function setRefundReject (orderNo, refuseReason) {
  return http
    .post('order.setRefundReject', {
      order_num: orderNo,
      refuse_reason: refuseReason
    }).then(r => r.data)
}

/**
 * 拒绝退货
 * @param orderNo 订单编号
 * @param refuseReason 拒绝原因
 * @returns {Promise<any>}
 */
export function setReturnGoodsReject (orderNo, refuseReason) {
  return http
    .post('order.setReturnGoodsReject', {
      order_num: orderNo,
      refuse_reason: refuseReason
    }).then(r => r.data)
}

/**
 * 同意退货
 * @param orderNo 订单编号
 * @returns {Promise<any>}
 */
export function setReturnGoodsConfirm (orderNo) {
  return http
    .post('order.setReturnGoodsConfirm', {
      order_num: orderNo
    }).then(r => r.data)
}

/**
 * 取消申请取消订单
 * @param orderNo
 * @returns {Promise<any>}
 */
export function setUnCancelOrder (orderNo) {
  return http
    .post('order.setUnCancelOrder', {
      order_num: orderNo
    }).then(r => r.data)
}

/**
 * 获取发货方式
 * @param orderNo
 * @returns {Promise<any>}
 */
export function logisticsInfo (orderNo) {
  return http
    .get('order.logisticsInfo', {
      order_num: orderNo
    }).then(r => r.data)
}
/**
 * 删除一个车辆信息
 * @param orderNo 订单编号
 * @param cartId 车辆ID
 * @returns {Promise<any>}
 */
export function delDeliverInfo (orderNo, cartId) {
  return http
    .post('order.delDeliverInfo', {
      order_num: orderNo,
      car_news_id: cartId
    }).then(r => r.data)
}

/**
 * 修改发货车辆信息
 * @param data = {
 *  order_num: '', 订单编号
 *  car_news_id: '', 车辆ID
 *  car_tel: '', 司机电话
 *  car_num: '' 车牌号码
 * }
 * @returns {Promise<any>}
 */
export function updateDeliverInfo (data) {
  return http
    .post('order.updateDeliverInfo', data)
    .then(r => r.data)
}
/**
 * 添加车辆信息
 * @param data = {
 *  order_num: '', 订单编号
 *  car_tel: '', 司机电话
 *  car_num: '' 车牌号码
 * }
 * @returns {Promise<any>}
 */
export function setDeliverInfo (data) {
  return http
    .post('order.setDeliverInfo', data)
    .then(r => r.data)
}
/**
 * 确认发货
 * @param data = {
 *  order_num: '', 订单编号
 *  driver_phone: '', 司机电话
 *  car_num: '',车牌号码
 *  type: '', （1：买家找车；2：卖家找车）
 *  id: '' 车辆信息ID(可为空)
 * }
 * @returns {Promise<any>}
 */
export function setConfirmOrder (data) {
  return http
    .post('order.setConfirmOrder', data)
    .then(r => r.data)
}

/**
 * 获取取消订单商品信息
 * @param orderNo 订单编号
 * @returns {Promise<any>}
 */
export function getCancelGoodsList (orderNo) {
  return http
    .get('order.getCancelGoodsList', {
      order_num: orderNo
    }).then(r => r.data)
}

/**
 * 获取取消订单原因列表
 * @returns {Promise<any>}
 */
export function getOrderCancelInfo () {
  return http
    .get('order.getOrderCancelInfo')
    .then(r => r.data)
}

/**
 * 获取取消订单金额
 * @param data = {
    "order_num":"132132146545465-0", 订单编号
    "refuse_goods":[ 退款商品信息
        {
            "order_goods_id":123, 商品ID
            "num":1 取消的商品数量
        },
        {
            "order_goods_id":132,
            "num":1
        }
    ]
}
 * @returns {Promise<any>}
 */
export function getOrderCancelMoney (data) {
  return http
    .post('order.getOrderCancelMoney', data)
    .then(r => r.data)
}

/**
 * 申请取消订单
 * @param data = {
  "order_num":"132132146545465-0", 订单编号
  "refuse_reason":1,
  "refuse_add":"补充说明",
  "refuse_goods":[
    {
      "order_goods_id":123,
      "num":1
    },
      {
      "order_goods_id":132,
      "num":1
    }
  ]
}
 */
export function setCancelOrder (data) {
  return http
    .post('order.setCancelOrder', data)
    .then(r => r.data)
}

/**
 * 卖家再次申请取消订单
 * @param orderNo
 * @returns {Promise.<TResult>|*|Promise<any>}
 */
export function sellerAgainApply (orderNo) {
  return http
    .post('order.sellerAgainApply', {
      order_num: orderNo
    }).then(r => r)
}
