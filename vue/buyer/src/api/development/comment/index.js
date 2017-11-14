const Promise = require('es6-promise').Promise

/**
 * 根据订单号获取对应商品信息列表
 * @param orderNo 订单编号
 * @returns {Promise<any>}
 */
export function allGoodsOnOrder (orderNo) {
  let data = {
    data: [
      {
        goods_id: 1,
        name: '渝达鸭肠',
        guige: '2KG×8袋',
        meter_unit: 0,
        buy_num: 10,
        price: '456.00',
        total_price: '4560.00',
        pic: 'Public/Uploads/goodsimg/20150822/55d818519cbb9.jpg'
      },
      {
        goods_id: 2,
        name: '渝达鸭肠',
        guige: '2KG×8袋',
        meter_unit: 0,
        buy_num: 32767,
        price: '456.00',
        total_price: '14941752.00',
        pic: 'Public/Uploads/goodsimg/20150822/55d818519cbb9.jpg'
      },
      {
        goods_id: 4,
        name: '渝达鸭肠',
        guige: '2KG×8袋',
        meter_unit: 0,
        buy_num: 32767,
        price: '381.48',
        total_price: '12500000.00',
        pic: 'Public/Uploads/goodsimg/20150822/55d818519cbb9.jpg'
      }
    ],
    message: 'ok',
    code: 0
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

/**
 * 评价订单商品
 * @param data 评价数据
 * @returns {Promise<any>}
 */
export function createOrderComment (data = {}) {
  let _data = {
    code: 0,
    data: {
      reward: 5,
      next_order_no: '1206-1453187153-O0PJeFSQ-0'
    },
    message: 'OK'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_data)
    }, 1000)
  })
}

/**
 * 追加评价
 * @param data
 * @returns {Promise<any>}
 */
export function reComment (data = {}) {
  let _data = {
    code: 0,
    data: [],
    message: 'OK'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_data)
    }, 1000)
  })
}
