// const Promise = require('es6-promise').Promise
// import Vue from 'vue'
// let $vue = new Vue()
import * as http from '@api/http'

/**
 * 获取支付方式
 * @param orderNo
 */
export function payMethods (orderNo) {
  return http.get('pay.payMethods', {
    main_order_no: orderNo
  }).then(r => r.data)
}

/**
 * 获取微信支付凭证
 * @param orderNo
 * @param payMethod
 */
export function weChatPay (orderNo = '', payMethod = 'baofoo_wechat_pub') {
  return http.post('pay.pay', {
    main_order_no: orderNo,
    pay_method: payMethod
  }).then(r => r.data)
}

/**
 * 获取贷款利率
 * @param orderNo 订单编号
 * @param loanMoney 贷款金额(分)
 * @param loanPeriod 贷款期数
 */
export function getInterestRate (orderNo, loanMoney, loanPeriod) {
  loanMoney = parseInt(loanMoney * 100)
  return http.get('pay.getInterestRate', {
    main_order_no: orderNo,
    loan_money: loanMoney,
    loan_period: loanPeriod
  }).then(r => r.data)
}
/**
 * 申请白条支付
 * @param data
 */
export function iousApply (data) {
  return http.post('pay.iousApply', data)
    .then(r => r)
}

/**
 * 获取已经使用银行卡快捷支付成功的身份信息
 * @returns {Promise<any>}
 */
export function getPayIdentity () {
  return http.get('pay.getPayIdentity')
    .then(r => r.data)
}

/**
 * 获取银联支付凭证
 * @param data
 * @returns {*|Promise<any>|Promise.<TResult>}
 */
export function unionPay (data) {
  return http.post('pay.pay', data)
    .then(r => r.data)
}
