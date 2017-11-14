/**
 * 接口地址
 */
export default {
  // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface
  order: {
    // 提醒买家收货 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#8-%E6%8F%90%E9%86%92%E4%B9%B0%E5%AE%B6%E6%94%B6%E8%B4%A7
    setTakeRemind: '/?m=seller&c=Order&a=setTakeRemind',
    // 获取提醒买家收货次数 GET
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#7-%E8%8E%B7%E5%8F%96%E6%8F%90%E9%86%92%E4%B9%B0%E5%AE%B6%E6%94%B6%E8%B4%A7%E7%9A%84%E6%AC%A1%E6%95%B0
    getRemindTakeTime: '/?m=seller&c=Order&a=getRemindTakeTime',
    // 同意退款 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#12-%E5%90%8C%E6%84%8F%E9%80%80%E6%AC%BE
    setRefundConfirm: '/?m=seller&c=Order&a=setRefundConfirm',
    // 拒绝退款 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#11-%E6%8B%92%E7%BB%9D%E9%80%80%E6%AC%BE
    setRefundReject: '/?m=seller&c=Order&a=setRefundReject',
    // 拒绝退货 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#13-%E6%8B%92%E7%BB%9D%E9%80%80%E8%B4%A7
    setReturnGoodsReject: '/?m=seller&c=Order&a=setReturnGoodsReject',
    // 同意退货 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#14-%E5%90%8C%E6%84%8F%E9%80%80%E8%B4%A7
    setReturnGoodsConfirm: '/?m=seller&c=Order&a=setReturnGoodsConfirm',
    // 取消申请取消订单 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#5-%E5%8D%96%E5%AE%B6%E5%8F%96%E6%B6%88%E7%94%B3%E8%AF%B7%E5%8F%96%E6%B6%88%E8%AE%A2%E5%8D%95
    setUnCancelOrder: '/?m=seller&c=Order&a=setUncancelOrder',
    // 获取发货物流信息 GET
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#17-%E8%8E%B7%E5%8F%96%E5%8F%91%E8%B4%A7%E4%BF%A1%E6%81%AF
    logisticsInfo: '/?m=seller&c=Order&a=getDeliverGoodsInfo',
    // 删除车辆信息 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#20-%E5%88%A0%E9%99%A4%E5%8F%91%E8%B4%A7%E4%BF%A1%E6%81%AF
    delDeliverInfo: '/?m=seller&c=Order&a=delDeliverInfo',
    // 修改发货车辆信息 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#19-%E4%BF%AE%E6%94%B9%E5%8F%91%E8%B4%A7%E4%BF%A1%E6%81%AF
    updateDeliverInfo: '/?m=seller&c=Order&a=updateDeliverInfo',
    // 添加车辆信息 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#18-%E6%B7%BB%E5%8A%A0%E5%8F%91%E8%B4%A7%E4%BF%A1%E6%81%AF
    setDeliverInfo: '/?m=seller&c=Order&a=setDeliverInfo',
    // 确认发货 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#6-%E7%A1%AE%E8%AE%A4%E5%8F%91%E8%B4%A7
    setConfirmOrder: '/?m=seller&c=Order&a=setConfirmOrder',
    // 获取取消订单商品列表 GET
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#3-%E8%8E%B7%E5%8F%96%E5%8F%96%E6%B6%88%E8%AE%A2%E5%8D%95%E5%95%86%E5%93%81%E5%88%97%E8%A1%A8
    getCancelGoodsList: '/?m=seller&c=Order&a=getCancelGoodsList',
    // 申请取消订单 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#4-%E5%8D%96%E5%AE%B6%E7%94%B3%E8%AF%B7%E5%8F%96%E6%B6%88%E8%AE%A2%E5%8D%95
    setCancelOrder: '/?m=seller&c=Order&a=setCancelOrder',
    // 获取取消订单原因列表 GET
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#15-%E8%8E%B7%E5%8F%96%E5%8D%96%E5%AE%B6%E5%8F%96%E6%B6%88%E8%AE%A2%E5%8D%95%E7%9A%84%E5%8E%9F%E5%9B%A0%E5%88%97%E8%A1%A8
    getOrderCancelInfo: '/?m=seller&c=Order&a=getOrderCancelInfo',
    // 获取取消订单退款金额 POST
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#16-%E8%8E%B7%E5%8F%96%E5%8F%96%E6%B6%88%E8%AE%A2%E5%8D%95%E7%9A%84%E9%80%80%E6%AC%BE%E9%87%91%E9%A2%9D
    getOrderCancelMoney: '/?m=seller&c=Order&a=getOrderCancelMoney',
    // 获取订单详情信息 GET
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#10-%E8%8E%B7%E5%8F%96%E8%AE%A2%E5%8D%95%E8%AF%A6%E6%83%85%E4%BF%A1%E6%81%AF
    detail: '/?m=seller&c=Order&a=getOrderInfo',
    // 获取订单列表 GET
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#1-%E8%8E%B7%E5%8F%96%E8%AE%A2%E5%8D%95%E5%88%97%E8%A1%A8%E4%BF%A1%E6%81%AF
    orderItem: '/?m=seller&c=Order&a=getList',
    // 获取订单各种状态的数量 GET
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#9-%E7%BB%9F%E8%AE%A1%E5%90%84%E7%A7%8D%E7%8A%B6%E6%80%81%E7%9A%84%E6%95%B0%E9%87%8F
    getOrderCount: '/?m=seller&c=Order&a=getOrderNum',
    // 卖家再次申请取消订单
    // http://dev.idongpin.com/zdp-dev/main-laravel/wikis/sellers-order-interface#21-%E5%8D%96%E5%AE%B6%E5%86%8D%E6%AC%A1%E7%94%B3%E8%AF%B7
    sellerAgainApply: '/?m=seller&c=Order&a=setAgainApply'
  }
}
