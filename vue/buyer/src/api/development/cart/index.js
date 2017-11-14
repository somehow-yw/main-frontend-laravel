const Promise = require('es6-promise').Promise

/**
 * 获取购物车商品
 * @returns {Promise<any>}
 */
export function cartData () {
  console.log('api: cartData')
  let data = {
    code: 0,
    message: 0,
    data: {
      'shop_transfer': 1,
      'payment_after_arrival': 2,
      buy_prices: {
        goods_total_price: 500,
        reduced_price: 5,
        cope_total_price: 495,
        goods_total_num: '25件',
        preferential: [
          {
            preferential_unit: '件或元',
            preferential_name: '赠或减',
            preferential_value: 15
          }
        ]
      }
    }
  }
  data.data.market_info = [
    {
      province_name: '所在省',
      city_name: '所在市',
      market_id: 1,
      market_name: '海霸王市场',
      goods_infos: [
        {
          goods_id: 565,
          shop_cart_goods_id: 1,
          goods_name: '海霸王市场商品1',
          goods_status: 2,
          model_number: '10KG',
          buy_number: 2,
          price: 100.00,
          price_expired: true,
          on_sale: 2,
          preferential_text: '15元',
          preferential_name: '减',
          goods_picture: '商品图片的地址',
          price_rules: [
            {
              price_rule_id: 1,
              rules: [
                {
                  buy_num: 10,
                  preferential_value: 2,
                  preferential_unit: '元'
                }
              ]
            }
          ]
        },
        {
          goods_id: 565,
          shop_cart_goods_id: 2,
          goods_name: '海霸王市场商品2',
          goods_status: 2,
          model_number: '10KG',
          buy_number: 2,
          price: 100.00,
          price_expired: false,
          on_sale: 2,
          preferential_text: '15元',
          preferential_name: '减',
          goods_picture: '商品图片的地址',
          price_rules: [
            {
              price_rule_id: 1,
              rules: [
                {
                  buy_num: 10,
                  preferential_value: 2,
                  preferential_unit: '元'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      province_name: '所在省',
      city_name: '所在市',
      market_id: 1,
      market_name: '青白江市场',
      goods_infos: [
        {
          goods_id: 565,
          shop_cart_goods_id: 3,
          goods_name: '青白江市场商品1',
          goods_status: 2,
          model_number: '10KG',
          buy_number: 2,
          price: 100.00,
          price_expired: false,
          on_sale: 2,
          preferential_text: '15元',
          preferential_name: '减',
          goods_picture: '商品图片的地址',
          price_rules: [
            {
              price_rule_id: 1,
              rules: [
                {
                  buy_num: 10,
                  preferential_value: 2,
                  preferential_unit: '元'
                }
              ]
            }
          ]
        },
        {
          goods_id: 565,
          shop_cart_goods_id: 4,
          goods_name: '青白江市场商品2',
          goods_status: 2,
          model_number: '10KG',
          buy_number: 2,
          price: 100.00,
          price_expired: false,
          on_sale: 2,
          preferential_text: '15元',
          preferential_name: '减',
          goods_picture: '商品图片的地址',
          price_rules: [
            {
              price_rule_id: 1,
              rules: [
                {
                  buy_num: 10,
                  preferential_value: 2,
                  preferential_unit: '元'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 2000)
  })
}

/**
 * 购物车调整商品数量
 * @param shopCartGoodsId
 * @param goodsNumber
 */
export function quantity (shopCartGoodsId, goodsNumber) {
  console.log('api: quantity')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        'code': 0,
        'data': {
          'preferential_value': 100.01,
          'preferential_name': '减',
          'preferential_text': '100.01元'
        },
        'message': 'OK'
      })
    }, 500)
  })
}

/**
 * 购物车选中商品总价计算
 * @param shopCartGoodsIds 购物车商品ID串 格式：1,2,3
 */
export function getSelectedGoodsTotalPrice (shopCartGoodsIds) {
  console.log('api: getSelectedGoodsTotalPrice')
  let data = {
    'code': 0,
    'data': {
      'goods_total_price': 2350,
      'reduced_price': 10,
      'cope_total_price': 695,
      'goods_total_num': '25件',
      'preferential': [
        {
          'preferential_unit': '件或元',
          'preferential_name': '赠或减',
          'preferential_value': 15
        }
      ]
    },
    'message': 'OK'
  }
  if (!shopCartGoodsIds) {
    data.data.goods_total_price = 0
    data.data.reduced_price = 0
    data.data.cope_total_price = 0
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 200)
  })
}
/**
 * 删除购物车商品
 * @param shopCartGoodsIds 购物车商品ID串 格式如：1,2,3
 * @returns {Promise<any>}
 */
export function deleteGoods (shopCartGoodsIds) {
  console.log('api: shopCartGoodsIds')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        'code': 0,
        'data': [],
        'message': 'OK'
      })
    }, 500)
  })
}

/**
 * 批量加入常购
 * @param goodsIds 商品ID串 格式如：1,2,3
 */
export function addSomeOftenBuyGoods (goodsIds) {
  console.log(goodsIds)
  let data = {
    'code': 0,
    'data': [],
    'message': '添加成功'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 500)
  })
}

/**
 * 获取商品结算信息
 * @param shopCartGoodsIds 购物车商品ID串 格式如：1,2,3
 */
export function settlementInfo (shopCartGoodsIds) {
  let data = {
    code: 0,
    data: {
      shop_transfer: 1,
      voiture_info: [
        {
          market_id: 1,
          market_name: '海霸王市场',
          infos: [
          ]
        },
        {
          market_id: 2,
          market_name: '青白江市场',
          infos: [
            {
              'vehicles_id': 3,
              'vehicle_location': '停放位置',
              'license_plates': '川A25698',
              'driver_tel': '13365458975',
              'is_default': 1
            }
          ]
        }
      ],
      take_infos: [
        {
          id: 1,
          province_id: 510000,
          city_id: 510100,
          county_id: 510124,
          province_name: '四川省',
          city_name: '成都市',
          county_name: '郫县',
          address: '详细地址 吧啦吧啦吧啦',
          contacts: '联系人',
          phone: '2',
          is_default: 2
        },
        {
          id: 2,
          province_id: 510000,
          city_id: 510100,
          county_id: 510124,
          province_name: '四川省',
          city_name: '成都市',
          county_name: '郫县',
          address: '详细地址 吧啦吧啦吧啦',
          contacts: '联系人',
          phone: '3',
          is_default: 2
        },
        {
          id: 3,
          province_id: 510000,
          city_id: 510100,
          county_id: 510124,
          province_name: '四川省',
          city_name: '成都市',
          county_name: '郫县',
          address: '详细地址 吧啦吧啦吧啦',
          contacts: '联系人',
          phone: '4',
          is_default: 2
        },
        {
          id: 4,
          province_id: 510000,
          city_id: 510100,
          county_id: 510124,
          province_name: '四川省',
          city_name: '成都市',
          county_name: '郫县',
          address: '详细地址 吧啦吧啦吧啦',
          contacts: '联系人',
          phone: '5',
          is_default: 2
        }
      ]
    },
    message: 'OK'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 500)
  })
}

/**
 * 添加车辆信息
 * @param data
 */
export function createVehicles (data) {
  console.log('createVehicles:', data)
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
    marker_id: data.marker_id,
    driver_tel: data.driver_tel,
    license_plates: data.license_plates,
    vehicle_location: data.vehicle_location
  }
  console.log(_data)
  return new Promise((resolve, reject) => {
    if (error) {
      reject(errorMessage)
    }
    setTimeout(() => {
      resolve({id: 232})
    }, 300)
  })
}

/**
 * 修改车辆信息
 * @param id
 * @param data
 */
export function updateVehicles (id, data) {
  console.log('updateVehicles:', data)
  console.log(id, data)
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
  return new Promise((resolve, reject) => {
    if (error) {
      reject(errorMessage)
    }
    setTimeout(() => {
      resolve()
    }, 300)
  })
}

/**
 * 删除车辆信息
 * @param id
 */
export function deleteVehicles (id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 300)
  })
}

/**
 * 修改收货地址
 * @param id
 * @param data
 */
export function updateAddress (id, data) {
  console.log('updateAddress:', data)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 300)
  })
}

/**
 * 添加收货地址
 * @param data
 * @returns {Promise<any>}
 */
export function createAddress (data) {
  console.log('updateAddress:', data)
  let _data = {}
  _data.id = parseInt(Math.random() * 100)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_data)
    }, 300)
  })
}
/**
 * 删除收货地址
 * @param id 收货地址ID
 * @returns {Promise<any>}
 */
export function deleteAddress (id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}

/**
 * 创建订单
 * @param data
 */
export function createOrder (data) {
  let _data = {
    'code': 0,
    'data': {'main_order_no': 'sfjsdkfdslfskf'},
    'message': 'OK'
  }
  return new Promise((resolve, reject) => {
    setTimeout(resolve(_data.data))
  }, 500)
}

/**
 * 获取购物车信息
 */
export function getGetCartInfo () {
  let data = {
    code: 0,
    message: '',
    data: {
      goods_count: Math.round(Math.random() * 100),
      goods_total_price: '1.03',
      diamond_num: 30,
      preferential_price: 0
    }
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 500)
  })
}

/**
 * 获取店铺信息
 * @returns {Promise<any>}
 */
export function getMemberInfo () {
  let data = {
    code: 0,
    data: {
      shop_infos: {
        shop_id: 2,
        area_id: 3,
        shop_type_number: 1,
        shop_name: '店铺名',
        user_name: '会员名',
        mobile: '联系电话',
        province_id: 21,
        city_id: 1,
        county_id: 1,
        province_name: '省',
        city_name: '市',
        county: '区、县',
        user_role: 0,
        diamond: 100,
        user_status: 1
      }
    },
    message: 'OK'
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.data)
    }, 1000)
  })
}
