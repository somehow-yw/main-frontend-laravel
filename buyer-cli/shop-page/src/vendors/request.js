(function(){

    var server = H.namespace('server');
    /**
     * 发起请求方法
     * @param type{get|post}    请求类型
     * @param api               请求地址 url
     * @param parameters        请求发布参数
     * @param success           回调方法,(错误也会调用)
     * @param async             事后异步请求
     * @returns {*}             ajax对象
     */
    var send = function (type, api, parameters, success, contentType) {
        typeof success == 'function' || (success = function () {
        });
        var Headers = contentType ?
        {"Cache-Control": "no-cache", "Accept": "application/json", "Content-Type": contentType} :
        {"Cache-Control": "no-cache", "Accept": "application/json"};
        var request = $.ajax({
            url: api + "?r=" + Math.random(),
            data: parameters,
            type: type,
            dataType: 'json',
            async: true,
            cache: false,
            headers: Headers,
            timeout: 300000,
            success: function (data, textStatus, jqXHR) {
                success.call(this, data, textStatus, jqXHR);
            },
            error: function (jqXHR, textStatus, errorThrown) {

                //alert(jqXHR+errorThrown+textStatus);
                if (jqXHR.status == 401) {
                    location.href = contextPath;
                } else {
                    if (!errorThrown) {
                        return false;
                    }
                    var errors = {
                        101: "网络不稳定或不畅通，请检查网络设置",
                        403: "服务器禁止此操作！",
                        500: "服务器遭遇异常阻止了当前请求的执行<br/><br/><br/>"
                    };

                    var msg = null;
                    switch (textStatus) {
                        case "timeout":
                            msg = "网络连接超时，请检查网络是否畅通！";
                            break;
                        case "error":
                            if (errors[jqXHR.status]) {
                                var data = null;
                                try {
                                    data = jQuery.parseJSON(jqXHR.responseText);
                                } catch (e) {
                                }
                                if (data && data.message) {
                                    msg = data.message;
                                } else {
                                    msg = errors[jqXHR.status];
                                }
                            } else {
                                msg = "服务器响应异常<br/><br/>" + (jqXHR.status == 0 ? "" : jqXHR.status) + "&nbsp;" + errorThrown;
                            }
                            break;
                        case "abort":
                            msg = null;//"数据连接已被取消！";
                            break;
                        case "parsererror":
                            msg = "数据解析错误！";
                            break;
                        default:
                            msg = "出现错误:" + textStatus + "！";
                    }
                    if (errorThrown.code != null && errorThrown.message != null && !errors[errorThrown.code]) {
                        msg += "</br>[code:" + errorThrown.code + "][message:" + errorThrown.message + "]" + (null == errorThrown.stack ? "" : errorThrown.stack);
                    }
                    if (msg == null) {
                        msg = '';
                    }
                    success.call(this, {code: jqXHR.status, message: msg}, textStatus, jqXHR, errorThrown);
                }
            }
        });
        return request;
    };

    //买家端展示卖家店铺信息
    server.getShopInfo  = function(params, callback){
        return send('get', '/mock/getShopInfo.json', params , callback);
    } ;

    //店铺信息
    server.getSellerShopInfo = function (data, callback) {
        return send('get', '/mock/shopGoods/shop.json', data, callback);
    };
    // 获取店铺评分
    server.shopAppraise = function (data, callback) {
        return send('get', '/mock/shopGoods/appraise.json', data, callback);
    };
    // 获取店铺商品分类
    server.getGoodsCategory = function (data, callback) {
        return send('get', '/mock/shopGoods/goodsCategory.json', data, callback);
    };
    // 获取店铺商品
    server.getMainGoodsList = function (data, callback) {
        return send('get', '/mock/shopGoods/goodsList.json', data, callback);
    };

    //店铺商品分类列表
    server.getMainGoodsTypeList = function (data, callback) {
        return send('get', '/mock/common/shop/shopCategory.json', data, callback, 'application/json');
    };

    // 下单时，获取当前商品的信息;
    server.getGoodsConfirmInfo = function(params,callback) {
        return send('get', '/mock/buyers/order.json', params, callback);
    };

    // 添加到购物车接口;
    server.addGoodsToShopCart = function(params,callback) {
        return send('get', '/mock/buyers/addGoodsToShopCart.json', params, callback);
    };

    //购物车数据;
    server.shopCartInfo = function(params,callback) {
        return send('get', '/mock/buyers/cardata.json', params, callback);
    };

    //咨询窗口信息;
    server.getConsultInfo = function(params,callback) {
        return send('get', '/mock/buyers/consulting.json', params, callback);
    };

    //填写报价请求
    server.addQuotation = function(params,callback) {
        return send('post', '/mock/buyers/goods/quotation/add.json', params, callback);
    };

    //添加常购
    server.addOftenBuyGoods = function(params,callback) {
        return send('get', '/mock/buyers/addOftenBuyGoods.json', params, callback);
    };

    //取消常购
    server.delOftenBuyGoods = function(params,callback) {
        return send('get', '/mock/buyers/delOftenBuyGoods.json', params, callback);
    };

    //商品详情
    server.getGoodsInfo = function(params,callback) {
        //return send('get', contextPath + '/buyers/list', params, callback);
        return send('get', '/mock/buyers/goodsinfo.json', params, callback);
    };

    // 商品详情中评价;
    server.evaluate = function(params,callback) {
        //return send('get', contextPath + '/buyers/list', params, callback);
        return send('get', '/mock/buyers/evaluate.json', params, callback);
    };

    //获取当前登录的用户信息;
    server.getInfo = function (params, callback) {
        return send('get', '/mock/base/getInfo.json', params, callback);
    };

    //一批商在线下单获取相关信息;
    server.getGoodsBuyData = function (params, callback) {
        return send('get', '/mock/getGoodsBuyData.json', params, callback);
    };

    //一批商在线下单;
    server.genGoodsOrder = function (params, callback) {
        return send('get', '/mock/genGoodsOrder.json', params, callback);
    };

    //二批商咨询商品微信通知卖家接口
    server.sendGoodsConsultNotice = function (params, callback) {
        return send('get', '/mock/sendGoodsConsultNotice.json', params, callback);
    };

    //获取当前登录的用户信息;
    server.getInfo = function (params, callback) {
        return send('get', '/mock/base/getInfo.json', params, callback);
    };

    // 获取供应商评价
    server.getShopProvider = function (params, callback) {
        return send('get', '/mock/common/appraise.json', params, callback);
    };

    // 获取改价通知
    server.getSoldOut = function(params, callback) {
        return send('get', '/mock/common/soldout.json', params, callback);
    };

    // 获取浏览量
    server.getB = function (params, callback) {
        return send('get', '/mock/browses.json', params, callback);
    };





    // 获取该商家的所有买家评价
    server.getAppraise = function (params, callback) {
        return send('get', '/mock/appraise/appraise.json', params, callback);
    };
    // 点赞
    server.praise = function (params, callback) {
        return send('get', '/mock/appraise/status.json', params, callback);
    };

    // 商品详情中评价;
    server.getAppraiseGoods = function(params,callback) {
        //return send('get', contextPath + '/buyers/list', params, callback);
        return send('get', '/mock/getAppraiseGoods.json', params, callback);
    };

    //评价点赞;
    server.appraisePraise = function (params, callback) {
        return send('get', '/mock/appraisePraise.json', params, callback);
    };

})();