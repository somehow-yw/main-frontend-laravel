export default {
  // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/shop-cart
  cart: {
    // 获取店铺信息 GET
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/member-shop-info#%E5%BE%AE%E4%BF%A1%E7%AB%AF%E5%BD%93%E5%89%8D%E7%99%BB%E5%BD%95%E4%BC%9A%E5%91%98%E8%87%AA%E8%BA%AB%E5%BA%97%E9%93%BA%E4%BF%A1%E6%81%AF
    getMemberInfo: '/?m=Member&c=Shop&a=getInfo',
    // 购物车商品列表 GET
    goodsInfo: '/?m=Buyers&c=ShopCart&a=goodsInfo',
    // 购物车选中商品总价计算接口 GET
    getSelectedGoodsTotalPrice: '/?m=Buyers&c=ShopCart&a=getSelectedGoodsTotalPrice',
    // 购物车商品数量调整接口 POST
    buyNumRejig: '/?m=Buyers&c=ShopCart&a=buyNumRejig',
    // 购物车商品删除接口 POST
    deleteGoods: '/?m=Buyers&c=ShopCart&a=delGoods',
    // 购物车结算信息接口 GET
    settlementInfo: '/?m=Buyers&c=ShopCart&a=settlementInfo',
    // 购物车商品生成订单接口 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/shop-cart#%E6%8F%90%E4%BA%A4%E8%B4%AD%E7%89%A9%E8%BD%A6%E4%BF%A1%E6%81%AF%E7%94%9F%E6%88%90%E8%AE%A2%E5%8D%95%E6%8E%A5%E5%8F%A3
    createOrder: '/?m=Buyers&c=ShopCart&a=genOrder',
    // 收货车辆设置 POST
    setVehicles: '/?m=Buyers&c=ShopCart&a=setVehicles',
    // 收货地址设置 POST
    setTakeAddress: '/?m=Buyers&c=ShopCart&a=setTakeAddress',
    // 默认的收货车辆设置 POST
    setDefaultVehicles: '/?m=Buyers&c=ShopCart&a=setDefaultVehicles',
    // 获取会员车辆信息列表 GET
    getVehicles: '/?m=Buyers&c=ShopCart&a=getVehicles',
    // 获取会员收货地址列表 GET
    getTakeAddress: '/?m=Buyers&c=ShopCart&a=getTakeAddress',
    // 获取购物车商品数量 GET
    /**
     * 因为文档没找到,这里贴出返回的数据
     * {code: 0, message: '', data: {goods_count: 3, goods_total_price: "1.03", diamond_num: 30, preferential_price: 0}}
     */
    getGetCartInfo: '/?m=Buyers&c=ShopCart&a=getInfo',
    // 批量加入常购
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/often-buy#会员常购商品添加-一次加入多个
    addSomeOftenBuyGoods: '/?m=Buyers&c=OftenBuyGoodsMain&a=addSomeOftenBuyGoods'
  },
  // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface
  order: {
    // 获取订单列表信息 GET
    orderItem: '/?m=Buyers&c=BuyOrderMain&a=orderList',
    // 确认收货 POST
    orderTake: '/?m=Buyers&c=BuyOrderMain&a=orderTake',
    // 订单详情 GET
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#7-%E8%8E%B7%E5%8F%96%E8%AE%A2%E5%8D%95%E8%AF%A6%E6%83%85%E7%9B%AE%E5%89%8D%E5%9C%A8%E6%8E%A5%E5%8F%A3%E5%86%85%E9%83%A8%E8%B0%83%E7%94%A8%E7%9A%84%E6%98%AF%E5%8D%96%E5%AE%B6%E7%AB%AF%E7%9A%84%E6%8E%A5%E5%8F%A3
    detail: '/?m=Buyers&c=Order&a=getOrderInfo',
    // 取消订单 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#4-%E5%8F%96%E6%B6%88%E8%AE%A2%E5%8D%95
    cancel: '/?m=Buyers&c=Order&a=setOrderCancel',
    // 取消订单原因
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#20-%E8%8E%B7%E5%8F%96%E9%80%80%E6%AC%BE%E9%80%80%E8%B4%A7%E5%8F%96%E6%B6%88%E8%AE%A2%E5%8D%95%E5%8E%9F%E5%9B%A0%E5%88%97%E8%A1%A8
    reason: '/?m=Buyers&c=Order&a=getCancelReasonList',
    // 提醒发货 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#3-%E6%8F%90%E9%86%92%E5%8F%91%E8%B4%A7
    setShipmentRemind: '/?m=Buyers&c=Order&a=setShipmentRemind',
    // 退款退货商品列表信息 GET
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#19-%E9%80%80%E6%AC%BE%E9%80%80%E8%B4%A7%E5%95%86%E5%93%81%E5%88%97%E8%A1%A8%E4%BF%A1%E6%81%AF
    getCancelGoodsList: '/?m=Buyers&c=Order&a=getCancelGoodsList',
    // 再次购买 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#12-%E5%86%8D%E6%AC%A1%E8%B4%AD%E4%B9%B0%E9%87%8D%E6%96%B0%E4%B8%8B%E5%8D%95
    buyAgain: '/?m=Buyers&c=Order&a=setAgainBuy',
    // 取消退款退货 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#10-%E4%B9%B0%E5%AE%B6%E5%8F%96%E6%B6%88%E7%94%B3%E8%AF%B7%E9%80%80%E6%AC%BE%E9%80%80%E8%B4%A7
    setUnReturn: '/?m=Buyers&c=Order&a=setUnreturn',
    // 再次申请退款退货 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#13-%E5%86%8D%E6%AC%A1%E7%94%B3%E8%AF%B7%E9%80%80%E6%AC%BE%E9%80%80%E8%B4%A7
    setAgainReturn: '/?m=Buyers&c=Order&a=setAgainReturn',
    // 申请退货程序-确认发货 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#16-%E7%A1%AE%E8%AE%A4%E9%80%80%E8%B4%A7%E5%8F%91%E8%B4%A7
    setReturnSend: '/?m=Buyers&c=Order&a=setReturnSend',
    // 同意获取拒绝卖家申请取消订单 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#17-%E5%90%8C%E6%84%8F%E6%8B%92%E7%BB%9D%E5%8D%96%E5%AE%B6%E7%94%B3%E8%AF%B7
    setReturnAct: '/?m=Buyers&c=Order&a=setReturnAct',
    // 获取修改订单的订单详情 GET
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#5-%E8%8E%B7%E5%8F%96%E4%BF%AE%E6%94%B9%E8%AE%A2%E5%8D%95%E8%AF%A6%E6%83%85
    getOrderUpdateInfo: '/?m=Buyers&c=Order&a=getOrderUpdateInfo',
    // 修改订单 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#6-%E4%BF%AE%E6%94%B9%E8%AE%A2%E5%8D%95
    editOrderInfo: '/?m=Buyers&c=Order&a=editOrderInfo',
    // 修改订单时,时时计算订单金额以及优惠 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#9-%E8%AE%A2%E5%8D%95%E9%80%80%E6%AC%BE%E9%80%80%E8%B4%A7%E9%80%89%E4%B8%AD%E5%95%86%E5%93%81%E9%87%91%E9%A2%9D%E7%AD%89%E8%AE%A1%E7%AE%97
    getReturnGoodsMoney: '/?m=Buyers&c=Order&a=getReturnGoodsMoney',
    // 申请退款或申请退货接口 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#8-%E8%AE%A2%E5%8D%95%E9%80%80%E6%AC%BE%E9%80%80%E8%B4%A7
    setOrderReturn: '/?m=Buyers&c=Order&a=setOrderReturn',
    // 获取不同状态订单数量 GET
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#11-%E4%B8%8D%E5%90%8C%E7%8A%B6%E6%80%81%E8%AE%A2%E5%8D%95%E6%95%B0%E9%87%8F
    orderStatusNumber: '/?m=Buyers&c=Order&a=getOrderNum',
    // 修改退款金额获取商城的退款金额信息 GET
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#14-%E4%BF%AE%E6%94%B9%E9%80%80%E6%AC%BE%E9%87%91%E9%A2%9D%E5%89%8D-%E8%8E%B7%E5%BE%97%E4%BB%A5%E5%89%8D%E9%80%80%E6%AC%BE%E9%87%91%E9%A2%9D%E4%BF%A1%E6%81%AF
    getReturnInfo: '/?m=Buyers&c=Order&a=getReturnInfo',
    // 修改退款金额 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/seller-order-interface#15-%E4%BF%AE%E6%94%B9%E9%80%80%E6%AC%BE%E9%87%91%E9%A2%9D
    setReturnMoney: '/?m=Buyers&c=Order&a=setReturnMoney'
  },
  pay: {
    // 获取支付凭证 GET
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/payment#13获取支付凭证
    pay: '/?m=Buyers&c=BuyOrderMain&a=getPaymentCharge',
    // 获取支付方式 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/order-interface-specifications#7%E8%8E%B7%E5%8F%96%E6%94%AF%E4%BB%98%E6%96%B9%E5%BC%8F
    payMethods: '/?m=Buyers&c=BuyOrderMain&a=orderPaymentMode',
    // 获取贷款利率 GET
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/ious#%E8%8E%B7%E5%8F%96%E8%B4%B7%E6%AC%BE%E5%88%A9%E7%8E%87
    getInterestRate: '/?m=Buyers&c=Ious&a=getInterestRate',
    // 白条确认支付 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/ious#%E7%A1%AE%E8%AE%A4%E6%94%AF%E7%94%A8%E7%94%B3%E8%AF%B7
    iousApply: '/?m=Buyers&c=Ious&a=apply',
    // 获取已经使用银行卡快捷支付成功的身份信息
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/payment#%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E5%B7%B2%E6%94%AF%E4%BB%98%E6%88%90%E5%8A%9F%E7%9A%84%E8%BA%AB%E4%BB%BD%E4%BF%A1%E6%81%AF
    getPayIdentity: '/?m=Buyers&c=Payment&a=getPayIdentity'
  },
  // 订单评价
  // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/order-appraise
  comment: {
    // 获取订单全部商品 GET
    allGoodsOnOrder: `/?m=buyers&c=Appraise&a=goodsList`,
    // 订单评价写入 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/order-appraise#%E8%AE%A2%E5%8D%95%E8%AF%84%E4%BB%B7%E5%86%99%E5%85%A5
    createOrderComment: `/?m=Buyers&c=BuyOrderMain&a=orderAppraise`,
    // 追加评论 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/order-appraise#5%E4%B9%B0%E5%AE%B6%E8%BF%BD%E5%8A%A0%E8%AF%84%E8%AE%BA
    reComment: `/?m=buyers&c=Appraise&a=supplemental`
  },
  // 获取jsSdk POST
  jsSdk: '/?m=FrontPublic&c=WeSdk&a=js_sdk_signature',
  // 获取行政区域 GET
  // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/new-area#%E8%A1%8C%E6%94%BF%E5%8C%BA%E5%A4%84%E7%90%86%E4%BD%BF%E7%94%A8%E5%9B%BD%E5%AE%B6%E8%A1%8C%E6%94%BF%E5%8C%BA%E5%88%92%E7%BC%96%E5%8F%B7
  area: '/?m=DataCenter&c=Area&a=getList'
}
