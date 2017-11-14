const Promise = require('es6-promise').Promise

/**
 * 获取订单列表
 * @param type 订单状态
 * @param page 页码
 * @param pageNum 每页显示数量
 * @returns {Promise<any>}
 */
export function orderItem (type = null, page = 1, pageNum = 20) {
  let data = {
    code: 0,
    data: {
      order_infos: [
        {
          'shop_id': 12,
          order_time: '2017-11-11 12:21',
          'order_num': '2-1452958295-Ucey8XJF',
          'seller_shop_name': '测试号杨氏冷冻',
          'seller_phone': '18280933708',
          'main_status': 1,
          'other_status': 19,
          'appraise': 3,
          'goods_kind': 1,
          'all_money': '6000.00',
          'goods_info': [
            {
              'goods_name': '测试冻品',
              'unit_price': '500.00',
              'num': 5,
              'goods_img': '',
              'refund_num': 1
            },
            {
              'goods_name': '测试冻品',
              'unit_price': '500.00',
              'num': 5,
              'goods_img': '',
              'refund_num': 1
            },
            {
              'goods_name': '测试冻品',
              'unit_price': '500.00',
              'num': 5,
              'goods_img': '',
              'refund_num': 1
            },
            {
              'goods_name': '测试冻品',
              'unit_price': '500.00',
              'num': 5,
              'goods_img': '',
              'refund_num': 1
            }
          ],
          'refund': {
            'buyer_apply_reason': '321',
            'seller_refuse_reason': '陈浩州',
            'money': '0.00',
            'evidence': [
              'dada/saddsada.jpg',
              'deda.jpg',
              'dadsd.jpg'
            ]
          }
        },
        {
          shop_id: 2,
          order_time: '2017-11-11 12:21',
          'order_num': '2-1452958295-Ucey8XJF',
          'seller_shop_name': '测试号杨氏冷冻',
          'seller_phone': '18280933708',
          'main_status': 2,
          'other_status': 16,
          'appraise': 3,
          'goods_kind': 1,
          'all_money': '6000.00',
          'goods_info': [
            {
              'goods_name': '测试冻品',
              'unit_price': '500.00',
              'num': 5,
              'goods_img': '',
              'refund_num': 1
            }
          ],
          'refund': {
            'buyer_apply_reason': '321',
            'seller_refuse_reason': '陈浩州',
            'money': '0.00',
            'evidence': [
              'dada/saddsada.jpg',
              'deda.jpg',
              'dadsd.jpg'
            ]
          }
        },
        {
          shop_id: 9,
          order_time: '2017-11-11 12:21',
          'order_num': '2-1452958295-Ucey8XJF',
          'seller_shop_name': '测试号杨氏冷冻',
          'seller_phone': '18280933708',
          'main_status': 4,
          'other_status': 16,
          'appraise': 2,
          'goods_kind': 1,
          'all_money': '6000.00',
          'goods_info': [
            {
              'goods_name': '测试冻品',
              'unit_price': '500.00',
              'num': 5,
              'goods_img': '',
              'refund_num': 1
            }
          ],
          'refund': {
            'buyer_apply_reason': '321',
            'seller_refuse_reason': '陈浩州',
            'money': '0.00',
            'evidence': [
              'dada/saddsada.jpg',
              'deda.jpg',
              'dadsd.jpg'
            ]
          }
        },
        {
          shop_id: 8,
          order_time: '2017-11-11 12:21',
          'order_num': '2-1452958295-Ucey8XJF',
          'seller_shop_name': '测试号杨氏冷冻',
          'seller_phone': '18280933708',
          'main_status': 4,
          'other_status': 16,
          'appraise': 4,
          'goods_kind': 1,
          'all_money': '6000.00',
          'goods_info': [
            {
              'goods_name': '测试冻品',
              'unit_price': '500.00',
              'num': 5,
              'goods_img': '',
              'refund_num': 1
            }
          ],
          'refund': {
            'buyer_apply_reason': '321',
            'seller_refuse_reason': '陈浩州',
            'money': '0.00',
            'evidence': [
              'dada/saddsada.jpg',
              'deda.jpg',
              'dadsd.jpg'
            ]
          }
        },
        {
          shop_id: 89,
          order_time: '2017-11-11 12:21',
          'order_num': '2-1452958295-Ucey8XJF',
          'seller_shop_name': '测试号杨氏冷冻',
          'seller_phone': '18280933708',
          'main_status': 3,
          'other_status': 16,
          'appraise': 3,
          'goods_kind': 1,
          'all_money': '6000.00',
          'goods_info': [
            {
              'goods_name': '测试冻品',
              'unit_price': '500.00',
              'num': 5,
              'goods_img': '',
              'refund_num': 1
            }
          ],
          'refund': {
            'buyer_apply_reason': '321',
            'seller_refuse_reason': '陈浩州',
            'money': '0.00',
            'evidence': [
              'dada/saddsada.jpg',
              'deda.jpg',
              'dadsd.jpg'
            ]
          }
        }
      ],
      page: 1,
      total_count: 50,
      diff_count: {
        waitPayCount: 0,
        waitSendCount: 0,
        waitGetCount: 3,
        waitAppraiseCount: 1
      }
    },
    message: '获取成功'
  }
  if (type === 'pending_payment') {
    data.data.order_infos = []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}
/**
 * 获取订单详情
 * @param order_no 订单编号
 */
export function orderDetail (orderNo = '') {
  let data = {
    code: 0,
    message: 'ok',
    data: {
      order_id: 123456789,
      order_num: '547414848799243IU5ynwH-0',
      order_state: 2,
      refund_order_type: 19,
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
          field: 'buyer_send_data',
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
          field: 'seller_agree_return'
        },
        {
          state_name: '卖家拒绝退货',
          time: '2017-06-06 23:00:00',
          field: 'seller_refuse_return',
          seller_refuse_return_reason: '商品已打包'
        },
        {
          state_name: '买家申请退货',
          time: '2017-06-06 23:00:00',
          field: 'buyer_return_goods_data',
          buyer_return_goods_data_info: {
            return_kind_num: 4,
            order_reduce: 10.00,
            all_price: 1000.00,
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
            all_price: 1000.00,
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
 * 获取不同状态的未操作的订单数量
 */
export function orderStatusNumber () {
  let data = {
    'code': 0,
    'data': {
      'wait_pay_count': Math.round(Math.random() * 100),
      'wait_send_count': Math.round(Math.random() * 100),
      'wait_get_count': Math.round(Math.random() * 100),
      'wait_appraise_count': Math.round(Math.random() * 100)
    },
    'message': '获取成功'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        pending_payment: data.data.wait_pay_count,
        shipment_pending: data.data.wait_send_count,
        waiting_for_delivery: data.data.wait_get_count,
        waiting_for_evaluation: data.data.wait_appraise_count
      })
    }, 500)
  })
}

/**
 * 取消订单
 * @param orderNum 订单编号
 * @param cancelId 取消订单的理由ID
 * @param cancelMsg 取消订单补充说明
 * @returns {Promise<any>}
 */
export function cancel (orderNum, cancelId, cancelMsg) {
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
 *  获取退款/退货/取消订单原因列表
 * @param type Number 原因类型:1=>买家取消订单 2=>买家退款 3=>买家退货
 * @returns {Promise<any>}
 */
export function reason (type) {
  let data = {
    code: 0,
    data: [
      {
        name: '不想买了',
        num: 1
      },
      {
        name: '订单无法支付',
        num: 2
      },
      {
        name: '订单信息报错',
        num: 3
      },
      {
        name: '价格不合适',
        num: 4
      },
      {
        name: '订单下错了',
        num: 5
      },
      {
        name: '线下交易',
        num: 6
      },
      {
        name: '其他',
        num: 7
      }
    ],
    'message': 'ok'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}
/**
 * 提醒卖家发货
 * @param orderNo
 * @returns {*|Promise<any>|Promise.<TResult>}
 */
export function setShipmentRemind (orderNo) {
  let data = {
    code: 0,
    message: '提醒成功',
    data: {
      num: 2
    }
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}
/**
 * 获取退款或退款退货时的商品列表信息
 * @param orderNo
 * @returns {*|Promise<any>|Promise.<TResult>}
 */
export function getCancelGoodsList (orderNo) {
  let data = {
    code: 0,
    data: {
      return_money: 25.00,
      goods_kind: 3,
      buy_num: 100.00,
      goods_info: [
        {
          title: '优信1 雪花培根，2斤一袋，10袋一件',
          discounts: '0',
          goods_id: 1,
          unit: '145.00',
          num: 5,
          img: ''
        },
        {
          title: '优信2 雪花培根，2斤一袋，10袋一件',
          discounts: '0',
          goods_id: 2,
          unit: '145.00',
          num: 4,
          img: ''
        },
        {
          title: '优信3 雪花培根，2斤一袋，10袋一件',
          discounts: '0',
          goods_id: 3,
          unit: '145.00',
          num: 3,
          img: ''
        }
      ]
    },
    message: 'ok'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 再次购买
 * @param orderNo 订单编号
 * @returns {Promise<any>}
 */
export function buyAgain (orderNo) {
  let data = {
    code: 0,
    message: '下单成功',
    data: []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 确认收货
 * @param orderNo 订单编号
 * @returns {Promise<any>}
 */
export function orderTake (orderNo) {
  let data = {
    cde: 0,
    data: {
      reward_way: 1,
      reward_quantity: 5
    },
    message: '收货成功，感谢您的支持！'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 取消退款或取消退货
 * @param orderNo 订单编号
 * @param type 类型 1: 取消退款 2取消退货
 */
export function setUnReturn (orderNo, type) {
  let data = {
    code: 0,
    message: '取消成功',
    data: []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 再次申请退款或退货
 * @param orderNo 订单编号
 * @param type 类型 1:再次申请退款, 2: 再次申请退货
 * @returns {Promise<any>}
 */
export function setAgainReturn (orderNo, type) {
  let data = {
    code: 0,
    message: '申请成功',
    data: []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
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
  let _data = {
    code: 0,
    message: '确认发货成功',
    data: []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_data.data)
    }, 1000)
  })
}

/**
 * 买家同意/拒绝卖家取消订单
 * @param orderNo 订单编号
 * @param type 操作类型 1:同意申请, 2:拒绝申请
 * @returns {Promise<any>}
 */
export function setReturnAct (orderNo, type) {
  let data = {
    code: 0,
    message: '已同意/已拒绝',
    data: []
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 获取修改订单的展示数据
 * @param orderNo
 * @returns {Promise<any>}
 */
export function getOrderUpdateInfo (orderNo) {
  let data = {
    'code': 0,
    'data': {
      'order_code': '100381474725987mRjAA94S-0',
      'all_money': '80.00',
      'all_discounts': '0.00',
      'real_money': '80.00',
      'buy_method': 1,
      'logistics_type': 3,
      'goods_info': [
        {
          'goods_id': 1,
          'goods_img': 'Public/Uploads/goodsimg/20151211/1449801062655.jpg',
          'goods_name': '川渝生抠鸭肠 大鸭 每件16kg ',
          'goods_unit_price': '80.00',
          'goods_num': 1,
          'goods_unit': '件',
          'discount': ''
        },
        {
          'goods_id': 2,
          'goods_img': 'Public/Uploads/goodsimg/20151211/1449801062655.jpg',
          'goods_name': '川渝生抠鸭肠 大鸭 每件16kg ',
          'goods_unit_price': '80.00',
          'goods_num': 1,
          'goods_unit': '件',
          'discount': ''
        },
        {
          'goods_id': 3,
          'goods_img': 'Public/Uploads/goodsimg/20151211/1449801062655.jpg',
          'goods_name': '川渝生抠鸭肠 大鸭 每件16kg ',
          'goods_unit_price': '80.00',
          'goods_num': 1,
          'goods_unit': '件',
          'discount': ''
        }
      ],
      'market_info': {
        'market_id': 1,
        'market_name': '四川省成都市青白江区青白江市场',
        'cart_info': {
          'driver_mobile': '15694052728',
          'license_plate': '川A8888eqwew',
          'location': 'c口',
          'time': '2017-09-23 12:09:32'
        }
      },
      address: {
        concat: '郭华彬',
        detail: '四川省遂宁市船山区纵横市场水产冻品区6/7号',
        area: '四川省 遂宁市 船山区',
        mobile: '15196915003'
      }
    },
    'message': '获取成功'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 修改订单
 * @param data 需要修改的订单数据
 * @returns {Promise<any>}
 */
export function editOrderInfo (data) {
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
 * 修改订单时,时时计算订单金额和优惠金额
 * @param orderNo
 * @param data
 * @returns {Promise<any>}
 */
export function getReturnGoodsMoney (orderNo, data) {
  let _data = {
    code: 0,
    data: {
      buy_money: 245.12,
      return_money: 265.50,
      return_kind: 2
    },
    message: 'ok'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_data.data)
    }, 1000)
  })
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
  let _data = {
    code: 0,
    data: [],
    message: 'ok'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_data.data)
    }, 1000)
  })
}

/**
 * 修改退款金额获取之前的退款金额
 * @param orderNo 子订单号
 */
export function getReturnInfo (orderNo) {
  let data = {
    code: 0,
    data: {
      returnMoney: '2500.00',
      realReturnMoney: '250.00'
    },
    message: 'ok'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 修改退款金额
 * @param orderNo
 * @param money
 * @returns {Promise<any>}
 */
export function setReturnMoney (orderNo, money) {
  let data = {
    code: 0,
    data: [],
    message: 'ok'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}
