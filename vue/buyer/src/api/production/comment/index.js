import * as http from '@api/http'
/**
 * 根据订单号获取对应商品信息列表
 * @param orderNo 订单编号
 * @returns {Promise<any>}
 */
export function allGoodsOnOrder (orderNo) {
  return http
    .get('comment.allGoodsOnOrder', {
      sub_order_no: orderNo
    }).then(r => r)
}

/**
 * 评价订单商品
 * @param data 评价数据
 * @returns {Promise<any>}
 */
export function createOrderComment (data = {}) {
  return http
    .post('comment.createOrderComment', data)
    .then(r => r)
}

/**
 * 追加评价
 * @param data
 * @returns {Promise<any>}
 */
export function reComment (data = {}) {
  return http
    .post('comment.reComment', data)
    .then(r => r)
}
