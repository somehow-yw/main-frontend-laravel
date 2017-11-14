const Promise = require('es6-promise').Promise

/**
 * 获取支付方式
 * @param orderNo 主订单编号
 * @returns {Promise<any>}
 */
export function payMethods (orderNo) {
  let data = {
    code: 0,
    message: '',
    data: {
      // remind: '亲,该笔订单中的部分商品价格已发送变动,为了避免您的损失,请您重新下单'
      'ious': {
        'payment_mode': '冻品白条',
        'remark': '人工确认',
        'status': 1
      },
      'baofoo_wechat_pub': {
        'payment_mode': '微信安全支付',
        'remark': '自动确认',
        'status': 1
      },
      'baofoo_quick_pub': {
        'payment_mode': '银行卡快捷支付',
        'remark': '自动确认',
        'status': 1
      }
      // ,
      // 'bank': {
      //   'payment_mode': '网银转账',
      //   'remark': '人工确认',
      //   'status': 1
      // }
    }
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 500)
  })
}
export function weChatPay () {
  let data = {
    'code': 0,
    'data': {
      'isRaw': 0,
      'charge': {
        'appId': 'wxdfd8ecdd1ae6f5f1',
        'nonceStr': '585266098e37e',
        'package': 'prepay_id=wx20161215174441a07b24df620060939365',
        'signType': 'MD5',
        'paySign': '25F9BBC479CF569B4008876E5A0D7036',
        'timestamp': '1481795081'
      }
    },
    'message': 'OK'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    })
  }, 500)
}

/**
 * 获取贷款利率
 * @param orderNo 订单编号
 * @param loanMoney 贷款金额(分)
 * @param loanPeriod 贷款期数
 */
export function getInterestRate (orderNo, loanMoney, loanPeriod) {
  let data = {
    'code': 0,
    'data': {
      'available': 10000,
      'interest_rate': 0.1,
      'year_interest_rate': 0.18,
      'interest': 19500,
      'status_date': '2017-01-01 00:00:00',
      'expire_date': '2017-01-10 00:00:00'
    },
    'message': 'OK'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    })
  }, 1000)
}

/**
 * 申请白条支付
 * @param data
 */
export function iousApply (data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    })
  }, 1000)
}

/**
 * 获取已经使用银行卡快捷支付成功的身份信息
 * @returns {Promise<any>}
 */
export function getPayIdentity () {
  let data = {
    'code': 0,
    'data': [
      {
        'payment_id': 1,
        'name': '宇航科技',
        'id_card_no': '510722199207114506',
        'bank_name': '工商银行',
        'bank_card_no': '7036'
      },
      {
        'payment_id': 2,
        'name': '宇航科技',
        'id_card_no': '510722199207114506',
        'bank_name': '工商银行',
        'bank_card_no': '7036'
      },
      {
        'payment_id': 3,
        'name': '宇航科技',
        'id_card_no': '510722199207114506',
        'bank_name': '工商银行',
        'bank_card_no': '7036'
      }
    ],
    'message': 'OK'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}

/**
 * 获取银联支付凭证
 * @param data
 * @returns {Promise<any>}
 */
export function unionPay (data) {
  let _data = {
    'code': 0,
    'data': {
      'isRaw': 0,
      'charge': {
        'appId': 'wxdfd8ecdd1ae6f5f1',
        'nonceStr': '585266098e37e',
        'package': 'prepay_id=wx20161215174441a07b24df620060939365',
        'signType': 'MD5',
        'paySign': '25F9BBC479CF569B4008876E5A0D7036',
        'timestamp': '1481795081'
      }
    },
    'message': 'OK'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_data.data)
    }, 1000)
  })
}
