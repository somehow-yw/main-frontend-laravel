const Promise = require('es6-promise').Promise
/**
 * 获取各种类型订单未处理的数量
 */
export function getOrderCount () {
  let data = {
    code: 0,
    message: 'ok',
    data: {
      all_order: Math.round(Math.random() * 100),
      wait_send_order: Math.round(Math.random() * 100),
      already_send_order: Math.round(Math.random() * 100),
      refund_order: Math.round(Math.random() * 100)
    }
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        all: data.data.all_order,
        shipment_pending: data.data.wait_send_order,
        waiting_for_delivery: data.data.already_send_order,
        refund_goods: data.data.refund_order
      })
    }, 3000)
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
  let data = {
    code: 0,
    message: 0,
    data: {
      total_num: 200,
      list: []
    }
  }
  let type = {
    shipment_pending: 2,
    waiting_for_delivery: 3
  }
  let types = [2, 3, 6, 11]
  for (let i = 1; i <= size; i++) {
    if (status === 'all') {
      type[status] = types[Math.floor((Math.random() * types.length))]
    }
    if (status === 'refund_goods') {
      type[status] = [6, 11][Math.floor((Math.random() * [6, 11].length))]
    }
    data.data.list.push(
      {
        order_id: (i * page),
        order_num: '3799-1458383249-8QpsdpZU-' + (i * page),
        time: '2016-03-19 18:27:29',
        order_type: 2,
        refund_order_type: 20,
        goods_num: 3,
        total_price: 555.00,
        method: 6,
        shop_name: '测试卖人',
        tel: '13123144888',
        reduced_price: '优惠10元',
        goods_appraise_state: 1,
        goods: [
          {
            id: 123,
            buy_num: 1,
            price: 555.00,
            goods_name: '测试咯哦',
            goods_status: '他咯',
            url: 'Public/Uploads/goodsimg/20160112/59804200_1452568597.jpg'
          },
          {
            id: 123,
            buy_num: 1,
            price: 555.00,
            goods_name: '测试咯哦',
            goods_status: '他咯',
            url: 'Public/Uploads/goodsimg/20160112/59804200_1452568597.jpg'
          },
          {
            id: 123,
            buy_num: 1,
            price: 555.00,
            goods_name: '测试咯哦',
            goods_status: '他咯',
            url: 'Public/Uploads/goodsimg/20160112/59804200_1452568597.jpg'
          },
          {
            id: 123,
            buy_num: 1,
            price: 555.00,
            goods_name: '测试咯哦',
            goods_status: '他咯',
            url: 'Public/Uploads/goodsimg/20160112/59804200_1452568597.jpg'
          }
        ],
        refund_data: {
          refund_goods_num: 1,
          refund_goods_price: 100.00,
          buyer_refund_content: '不想买了',
          buyer_refund_img: [
            'event/public/refund/123646478798.jpg',
            'event/public/refund/123646478790.jpg'
          ],
          seller_refund_content: '买家操作不当导致商品解冻'
        }
      }
    )
  }
  if (status === 'waiting_for_delivery') {
    data.data.list = []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 500)
  })
}

/**
 * 获取订单详情
 * @param order_no 订单编号
 */
export function detail (orderNo = '') {
  let data = {
    code: 0,
    message: 'ok',
    data: {
      order_id: 123456789,
      order_num: '547414848799243IU5ynwH-0',
      order_state: 11,
      refund_order_type: 20,
      goods_appraise_state: 1,
      method: 0,
      buyer_tel: 18228751896,
      seller_tel: 18228751897,
      progress_list: [
        {
          state_name: '提现完成',
          time: '2017-06-06 23:00:00',
          field: 'seller_withdraw'
        },
        {
          state_name: '卖家申请提现',
          time: '2017-06-06 23:00:00',
          field: 'seller_apply_withdraw'
        },
        {
          state_name: '买家确认收货',
          time: '2017-06-06 23:00:00',
          field: 'buyer_get_goods'
        },
        {
          state_name: '卖家退款',
          time: '2017-06-06 23:00:00',
          field: 'seller_agree_refund'
        },
        {
          state_name: '买家退货',
          time: '2017-06-06 23:00:00',
          feild: 'buyer_send_data',
          buyer_send_car: {
            buyer_send_car_tel: '18641028121',
            buyer_send_car_num: '川A243333',
            buyer_send_car_adress: '这里那里',
            buyer_send_car_time: '2017-06-06 23:00:00'
          }
        },
        {
          state_name: '卖家同意退货',
          time: '2017-06-06 23:00:00',
          feild: 'seller_agree_return'
        },
        {
          state_name: '卖家拒绝退货',
          time: '2017-06-06 23:00:00',
          field: 'seller_refuse_return',
          seller_refuse_return_reason: '商品已打包'
        },
        {
          state_name: '买家取消退货',
          time: '2017-06-06 23:00:00',
          field: 'buyer_cancel_return_goods_data'
        },
        {
          state_name: '买家申请退货',
          time: '2017-06-06 23:00:00',
          field: 'buyer_return_goods_data',
          buyer_return_goods_data_info: {
            return_kind_num: 4,
            order_reduce: 10.00,
            return_total_price: 10.00,
            return_goods: [
              {
                return_goods_img: '213546879731434.jpg',
                return_goods_reduce: '减10元',
                return_goods_name: '鸡翅',
                return_goods_guige: '1斤10个',
                return_goods_price: 234.00,
                return_goods_buy_num: 2,
                return_goods_num: 1
              }
            ],
            return_reason_info: '商品缺货',
            return_reason: '就是不想买了',
            return_reason_img: [
              '147984654654.jpg',
              '1479846546544.jpg'
            ]
          }
        },
        {
          state_name: '卖家发货',
          time: '2017-06-06 23:00:00',
          field: 'seller_send_data',
          seller_send_car: {
            seller_car_tel: '18614028121',
            seller_car_num: '川A243333'
          }
        },
        {
          state_name: '卖家退款',
          time: '2017-06-06 23:00:00',
          field: 'seller_agree_refund'
        },
        {
          state_name: '买家同意卖家取消订单',
          time: '2017-06-06 23:00:00',
          field: 'buyer_agree_refund'
        },
        {
          state_name: '卖家取消申请',
          time: '2017-06-06 23:00:00',
          field: 'seller_cancel_refund'
        },
        {
          state_name: '买家拒绝卖家取消订单',
          time: '2017-06-06 23:00:00',
          field: 'buyer_refuse_refund',
          refuse_reason: '很需要'
        },
        {
          state_name: '卖家申请取消订单',
          time: '2017-06-06 23:00:00',
          field: 'seller_refunds_data',
          refund_data_info: {
            refunds_kind_num: 4,
            order_reduce: 10.00,
            refunds_total_price: 10.00,
            refunds_goods: [
              {
                refunds_goods_img: '213546879731434.jpg',
                refunds_goods_reduce: '减10元',
                refunds_goods_name: '鸡翅',
                refunds_goods_guige: '1斤10个',
                refunds_goods_price: 234.00,
                refunds_goods_buy_num: 2,
                refunds_goods_num: 1
              }
            ],
            refunds_reason_info: '其他',
            refunds_reason: '就是不想买了'
          }
        },
        {
          state_name: '买家取消申请',
          time: '2017-06-06 23:00:00',
          field: 'buyer_cancel_refund'
        },
        {
          state_name: '卖家拒绝退款',
          time: '2017-06-06 23:00:00',
          field: 'seller_refuse_refund',
          refuse_reason: '商品已打包'
        },
        {
          state_name: '买家申请退款',
          time: '2017-06-06 23:00:00',
          field: 'refunds_data',
          refund_data_info: {
            refunds_kind_num: 4,
            order_reduce: 10.00,
            refunds_total_price: 10.00,
            refunds_goods: [
              {
                refunds_goods_img: '213546879731434.jpg',
                refunds_goods_reduce: '减10元',
                refunds_goods_name: '鸡翅',
                refunds_goods_guige: '1斤10个',
                refunds_goods_price: 234.00,
                refunds_goods_buy_num: 2,
                refunds_goods_num: 1
              }
            ],
            refunds_reason_info: '其他',
            refunds_reason: '就是不想买了'
          }
        },
        {
          state_name: '支付成功',
          time: '2017-06-06 23:00:00',
          field: 'pay_success_data'
        },
        {
          state_name: '创建订单',
          time: '2017-09-11 20:18:21',
          field: 'order_create_data',
          buyer_name: '测试买的',
          buy_kind_num: 4,
          order_reduce: 10.00,
          all_price: 1000.00,
          goods_info: [
            {
              goods_name: '一个酸奶牛',
              unit_price: 250.00,
              goods_guige: '1斤4盒',
              buy_num: 2,
              reduced_price: '减10元'
            }
          ],
          pay_way: '支付宝',
          get_goods_way: 2,
          get_goods_data: {
            buyer_find_car: {
              car_tel: '18614028121',
              car_num: '川A243333',
              car_time: '2017-06-06 23:00:00',
              car_address: '你猜'
            },
            seller_find_car: {
              buyer_name: '王小二',
              buyer_tel: '1386666888',
              buyer_address: '不猜'
            }
          }
        }
      ]
    }
  }
  if (!orderNo) {
    data = {
      code: 1,
      message: '缺少订单编号',
      data: []
    }
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 提醒买家收货
 * @param orderNo
 * @returns {Promise<any>}
 */
export function setTakeRemind (orderNo) {
  let data = {
    code: 0,
    message: 'ok',
    data: []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 获取提醒买家收货次数
 * @param orderNo
 * @returns {Promise<any>}
 */
export function getRemindTakeTime (orderNo) {
  let data = {
    code: 0,
    message: 'ok',
    data: {
      order_num: '2132465879-0',
      time: 2
    }
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 同意或拒绝买家申请退款
 * @param orderNo 订单编号
 * @param type 操作类型 0: 同意退款 1: 同意退货退款
 * @returns {Promise<any>}
 */
export function setRefundConfirm (orderNo, type) {
  let data = {
    code: 0,
    message: 'ok',
    data: []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 拒绝退款
 * @param orderNo 订单编号
 * @param refuseReason 拒绝原因
 * @returns {Promise<any>}
 */
export function setRefundReject (orderNo, refuseReason) {
  let data = {
    code: 0,
    message: 'ok',
    data: []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 拒绝退货
 * @param orderNo 订单编号
 * @param refuseReason 拒绝原因
 * @returns {Promise<any>}
 */
export function setReturnGoodsReject (orderNo, refuseReason) {
  let data = {
    code: 0,
    message: 'ok',
    data: []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}
/**
 * 同意退货
 * @param orderNo 订单编号
 * @returns {Promise<any>}
 */
export function setReturnGoodsConfirm (orderNo) {
  let data = {
    code: 0,
    message: 'ok',
    data: []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 取消申请取消订单
 * @param orderNo
 * @returns {Promise<any>}
 */
export function setUnCancelOrder (orderNo) {
  let data = {
    code: 0,
    message: 'ok',
    data: []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 获取发货方式
 * @param orderNo
 * @returns {Promise<any>}
 */
export function logisticsInfo (orderNo) {
  let data = {
    code: 0,
    message: 'ok',
    data: {
      send_type: 1,
      buyer_find_car: {
        car_tel: 182287581964,
        car_num: '川A1456'
      },
      seller_find_car: [
        {
          id: 1,
          is_default: 1,
          car_tel: 18228751111,
          car_num: '川A11111'
        },
        {
          id: 2,
          is_default: 0,
          car_tel: 18228752222,
          car_num: '川A12222'
        },
        {
          id: 3,
          is_default: 0,
          car_tel: 18228753333,
          car_num: '川A13333'
        },
        {
          id: 4,
          is_default: 0,
          car_tel: 18228754444,
          car_num: '川A13333'
        },
        {
          id: 5,
          is_default: 0,
          car_tel: 18228755555,
          car_num: '川A13333'
        }
      ]

    }
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 删除一个车辆信息
 * @param orderNo 订单编号
 * @param cartId 车辆ID
 * @returns {Promise<any>}
 */
export function delDeliverInfo (orderNo, cartId) {
  let data = {
    code: 0,
    message: 'ok',
    data: []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
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
  let _data = {
    code: 0,
    message: 'ok',
    data: []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_data.data)
    }, 1000)
  })
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
  let _data = {
    code: 0,
    message: 'ok',
    data: {
      car_news_id: 111
    }
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_data.data)
    }, 1000)
  })
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
  console.log('发货信息:', data)
  let _data = {
    code: 0,
    message: 'ok',
    data: []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_data.data)
    }, 1000)
  })
}

/**
 * 获取取消订单商品信息
 * @param orderNo 订单编号
 * @returns {Promise<any>}
 */
export function getCancelGoodsList (orderNo) {
  let data = {
    code: 0,
    message: 'ok',
    data: {
      goods_count: 1,
      order_reduce_price: 20.00,
      total_price: 120.00,
      goods_info: [
        {
          order_goods_id: 1213,
          goods_name: '鸡翅中大号',
          goods_status: '每袋 1斤4个',
          buy_num: 5,
          price: 200.00,
          reduce_price: 6.00,
          img_url: 'event/public/goods/1231546546546.jpg'
        },
        {
          order_goods_id: 1213,
          goods_name: '鸡翅中大号',
          goods_status: '每袋 1斤4个',
          buy_num: 5,
          reduce_price: 0,
          price: 200.00,
          img_url: 'event/public/goods/1231546546546.jpg'
        },
        {
          order_goods_id: 1213,
          goods_name: '鸡翅中大号',
          goods_status: '每袋 1斤4个',
          buy_num: 5,
          reduce_price: 6.00,
          price: 200.00,
          img_url: 'event/public/goods/1231546546546.jpg'
        }
      ]
    }
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
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
  let _data = {
    code: 0,
    message: 'ok',
    data: []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_data.data)
    }, 1000)
  })
}

/**
 * 获取取消订单原因列表
 * @returns {Promise<any>}
 */
export function getOrderCancelInfo () {
  let data = {
    code: 0,
    message: 'ok',
    data: [
      {
        name: '无货',
        num: 1
      },
      {
        name: '库存不足',
        num: 2
      },
      {
        name: '价格波动',
        num: 3
      },
      {
        name: '量少不想发',
        num: 4
      },
      {
        name: '物流原因',
        num: 5
      },
      {
        name: '其他',
        num: 6
      }
    ]
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
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
  console.log('发货信息:', data)
  let _data = {
    code: 0,
    message: 'ok',
    data: {
      goods_count: 1,
      reduce_price: 10.00,
      total_price: 40.00,
      price: 20.00
    }
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_data.data)
    }, 1000)
  })
}
