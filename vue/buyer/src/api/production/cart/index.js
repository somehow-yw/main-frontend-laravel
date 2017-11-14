const Promise = require('es6-promise').Promise
import Vue from 'vue'
let $vue = new Vue()
import * as http from '@api/http'
/**
 * @purpose 获取购物车商品
 * @returns {Promise<any>}
 */
export function cartData () {
  return http
    .get('cart.goodsInfo')
    .then(r => r.data)
}

/**
 * @purpose 购物车调整商品数量
 * @param shopCartGoodsId
 * @param goodsNumber
 */
export function quantity (shopCartGoodsId, goodsNumber) {
  let error = false
  let errorMessage = ''
  if (!shopCartGoodsId) {
    error = true
    errorMessage = `ERROR: The parameter 'shopCartGoodsId' 
    cannot is empty!`
  }
  if (!goodsNumber && goodsNumber !== 0) {
    error = true
    errorMessage = `ERROR: The parameter 'goodsNumber' 
    cannot is empty!`
  }
  if (goodsNumber <= 0) {
    error = true
    errorMessage = `ERROR: The parameter 'goodsNumber' 
    must be greater then 0!`
  }
  if (error) {
    return new Promise((resolve, reject) => {
      $vue.$auxiliary.toast(errorMessage)
      reject(new Error(errorMessage))
    })
  }
  let data = {
    shop_cart_goods_id: shopCartGoodsId,
    goods_number: parseInt(goodsNumber)
  }

  return http.post('cart.buyNumRejig', data)
    .then(r => r)
}

/**
 * @purpose 购物车选中商品总价计算
 * @param shopCartGoodsIds 购物车商品ID串 格式：1,2,3
 */
export function getSelectedGoodsTotalPrice (shopCartGoodsIds) {
  return http.get('cart.getSelectedGoodsTotalPrice', {
    shop_cart_goods_ids: shopCartGoodsIds
  }).then(r => r.data)
}
/**
 * @purpose 删除购物车商品
 * @param shopCartGoodsIds 购物车商品ID串 格式如：1,2,3
 * @returns {Promise<any>}
 */
export function deleteGoods (shopCartGoodsIds) {
  if (!shopCartGoodsIds) {
    return new Promise((resolve, reject) => {
      let errorMessage = `ERROR: The parameter 'shopCartGoodsIds' 
      cannot is empty!`
      $vue.$auxiliary.toast(errorMessage)
      reject(new Error(errorMessage))
    })
  }
  return http.post('cart.deleteGoods', {
    shop_cart_goods_ids: shopCartGoodsIds
  }).then(r => r)
}

/**
 * @purpose 批量加入常购
 * @param goodsIds 商品ID串 格式如：1,2,3
 */
export function addSomeOftenBuyGoods (goodsIds) {
  if (!goodsIds) {
    return new Promise((resolve, reject) => {
      let errorMessage = `ERROR: The parameter 'goodsIds' 
      cannot is empty!`
      $vue.$auxiliary.toast(errorMessage)
      reject(new Error(errorMessage))
    })
  }
  return http.post('cart.addSomeOftenBuyGoods', {
    goods_ids: goodsIds
  }).then(r => r)
}

/**
 * @purpose 获取商品结算信息
 * @param shopCartGoodsIds 购物车商品ID串 格式如：1,2,3
 */
export function settlementInfo (shopCartGoodsIds) {
  if (!shopCartGoodsIds) {
    return new Promise((resolve, reject) => {
      let errorMessage = `ERROR: The parameter 'shopCartGoodsIds' 
      cannot is empty!`
      $vue.$auxiliary.toast(errorMessage)
      reject(new Error(errorMessage))
    })
  }
  return http.get('cart.settlementInfo', {
    shop_cart_goods_ids: shopCartGoodsIds
  }).then(r => r.data)
}

/**
 * @purpose 添加车辆信息
 * @param data
 */
export function createVehicles (data) {
  console.log('createVehicles:', data)
  let errorMessage = ''
  let error = false
  if (!data.license_plates) {
    errorMessage = '缺少车牌号码'
    error = true
  }
  if (!data.vehicle_location) {
    errorMessage = '缺少停放位置'
    error = true
  }
  if (!data.driver_tel) {
    errorMessage = '缺少司机电话'
    error = true
  }
  let _data = {
    market_id: data.market_id,
    driver_tel: data.driver_tel,
    license_plates: data.license_plates,
    vehicle_location: data.vehicle_location
  }
  if (error) {
    return new Promise((resolve, reject) => {
      $vue.$auxiliary.toast(errorMessage)
      reject(new Error(errorMessage))
    })
  }
  return http.post('cart.setVehicles', _data)
    .then(r => r.data)
}

/**
 * @purpose 修改车辆信息
 * @param id
 * @param data
 */
export function updateVehicles (id, data) {
  console.log('updateVehicles:', data)
  let errorMessage = ''
  let error = false
  if (!data.driver_tel) {
    errorMessage = '缺少司机电话'
    error = true
  }
  if (!data.license_plates) {
    errorMessage = '缺少车牌号码'
    error = true
  }
  if (!data.vehicle_location) {
    errorMessage = '缺少停放位置'
    error = true
  }
  let _data = {
    id: id,
    market_id: data.market_id,
    driver_tel: data.driver_tel,
    license_plates: data.license_plates,
    vehicle_location: data.vehicle_location
  }
  if (error) {
    return new Promise((resolve, reject) => {
      $vue.$auxiliary.toast(errorMessage)
      reject(new Error(errorMessage))
    })
  }
  return http.post('cart.setVehicles', _data)
     .then(r => r.data)
}

/**
 * @purpose 删除车辆信息
 * @param id
 */
export function deleteVehicles (id) {
  return http.post('cart.setVehicles', {
    id: id
  }).then(r => r)
}

/**
 * 修改收货地址
 * @param id
 * @param data
 */
export function updateAddress (id, data) {
  let error = false
  let errorMessage = ''
  if (!data.contacts) {
    error = true
    errorMessage = '缺少联系人'
  }
  if (!data.contact_tel) {
    error = true
    errorMessage = '缺少联系电话'
  }
  if (!data.address) {
    error = true
    errorMessage = '缺少详细地址'
  }
  if (!data.province_id) {
    error = true
    errorMessage = '缺少区域信息'
  }
  if (!data.city_id) {
    error = true
    errorMessage = '缺少区域信息'
  }
  if (!data.county_id) {
    error = true
    errorMessage = '缺少区域信息'
  }

  if (error) {
    return new Promise((resolve, reject) => {
      $vue.$auxiliary.toast(errorMessage)
      reject(new Error(errorMessage))
    })
  }
  let _data = {
    id: id,
    contacts: data.contacts,
    contact_tel: data.contact_tel,
    address: data.address,
    province_id: data.province_id,
    city_id: data.city_id,
    county_id: data.county_id
  }
  console.log('data:', _data)
  return http.post('cart.setTakeAddress', _data)
    .then(r => r)
}

/**
 * 添加收货地址
 * @param data
 * @returns {Promise<any>}
 */
export function createAddress (data) {
  console.log('createAddress:', data)
  let error = false
  let errorMessage = ''
  if (!data.contacts) {
    error = true
    errorMessage = '缺少联系人'
  }
  if (!data.contact_tel) {
    error = true
    errorMessage = '缺少联系电话'
  }
  if (!data.address) {
    error = true
    errorMessage = '缺少详细地址'
  }
  if (!data.province_id) {
    error = true
    errorMessage = '缺少区域信息'
  }
  if (!data.city_id) {
    error = true
    errorMessage = '缺少区域信息'
  }
  if (!data.county_id) {
    error = true
    errorMessage = '缺少区域信息'
  }

  if (error) {
    return new Promise((resolve, reject) => {
      $vue.$auxiliary.toast(errorMessage)
      reject(new Error(errorMessage))
    })
  }
  let _data = {
    contacts: data.contacts,
    contact_tel: data.contact_tel,
    address: data.address,
    province_id: data.province_id,
    city_id: data.city_id,
    county_id: data.county_id
  }
  console.log('_data:', data)
  return http.post('cart.setTakeAddress', _data)
    .then(r => r.data)
}
/**
 * @purpose 删除收货地址
 * @param id 收货地址ID
 * @returns {Promise<any>}
 */
export function deleteAddress (id) {
  return http.post('cart.setTakeAddress', {
    id: id
  }).then(r => r)
}

/**
 * @purpose 创建订单
 * @param data
 */
export function createOrder (data) {
  console.log('createOrder:', data)
  return http.post('cart.createOrder', data)
    .then(r => r.data)
}
/**
 * 获取购物车信息
 */
export function getGetCartInfo () {
  return http
    .get('cart.getGetCartInfo')
    .then(r => r.data)
}

/**
 * 获取店铺信息
 * @returns {Promise<any>}
 */
export function getMemberInfo () {
  return http
    .get('cart.getMemberInfo')
    .then(r => r.data)
}
