/**
 * Created by Hc on 2015/11/6.
 */
;(function (global,factory) {
    if ( typeof module === 'object' && typeof module.exports === 'object' ){
        module.exports = global.document ?
            factory( global ,true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( 'I required a window with a document' );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }
}(typeof window !== 'undefined' ? window : this , function(window,noGlobal){
    //my lib's here    
    /**
     * functon method added
     */
    Function.prototype.method = function(name,fn){
        this.prototype[name] = fn;
        return this;
    };
    
    /**
     * string trim
     *
     */
    if ( !String.prototype.trim ) {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g,'');
        }
    }

    var H = {},
        strundefined = typeof undefined,
        varType = {},
        toString = varType.toString,
        rnotwhite = /\S+/g,
        rclass = /[\t\r\n\f]/g;

    var proUtils = {
        eachVarType: function(v){
            var arr = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
            arr.forEach(function(name){
                v['[object ' + name + ']'] = name.toLowerCase();
            });
            return v;
        },
        type: function(obj){
            if (obj == null) {
                return obj+'';
            }
            return typeof obj === 'object' || typeof obj === 'function' ?
                varType[ toString.call(obj) ] || 'object' : typeof obj;
        }
    };
    proUtils.eachVarType(varType);

    /**
     * 对象方法
     */
    H.isObject = function (obj){
        return proUtils.type(obj) === 'object';
    };

    H.isFunction = function (obj){
        return proUtils.type(obj) === 'function';
    };

    H.isArray = function (obj) {
        return proUtils.type(obj) === 'array';
    };

    H.isString = function (obj){
        return proUtils.type(obj) === 'string' ;
    };

    H.namespace = function(name){
        if ( H.isString( name ) ) {
            return ns( name );
        } else if ( H.isFunction( name )  ) {
           var new_ns =  name.call( this );
           if ( !H.isString( new_ns ) ){
                throw "必须返回一个有效的字符串。"
                return;
           } else {
               return ns( new_ns );
           }
        } else {
            throw "not strings in ";
        }

        function ns(names){
            var parts = names.split('.'),
                current = H ;
            for ( var i in parts ) {
                if ( !current[ parts[ i ] ] ) {
                    current[ parts[ i ] ] = {};
                };
                current = current[ parts[ i ] ];
            }
            return current;
        }
    };

    H.isMobile = function(mobile) {
        var myreg = /^(((17[0-9]{1})|(13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/, 
            zuoji = /^0\d{2,3}-?\d{7,8}$/;
        return myreg.test(mobile) || zuoji.test(mobile);
    };

    H.isEmail = function(email) {
        var myreg = /^[^\[\]\(\)\\<>:;,@.]+[^\[\]\(\)\\<>:;,@]*@[a-z0-9A-Z]+(([.]?[a-z0-9A-Z]+)*[-]*)*[.]([a-z0-9A-Z]+[-]*)+$/g;
        return myreg.test(email);
    };

    H.priceSwitch = function(price) {
        var money = (price || price==0) ? price/100 : -1;
        return money;
    };

    H.getSingleton = function(fn) {
        var result;
        return function() {
            if (!arguments[0]) {
                result = null;
                return;
            }
            return result || (result = fn.apply(this,arguments));
        }
    };

    /**
     *  dialog
     *
     */
    (function() {
        var defaults = {
                title: '提示信息',
                content: '',
                autoClose: true,
                cancel: false,
                cancelText: '取消',
                cancelCallback: function() {},
                okText: '确定',
                okCallback: function() {}
            };
        var Modal = function(options){
            if (H.isString(options)) {
                options = {content: options,};
            };
            // this.settings = Object.assign({},defaults,options||{});    
            this.settings = $.extend({},defaults,options||{});
            this.init();
        };

        Modal.method('init',function(){
            this.render();      
        });

        Modal.method('render',function(){
            var $body = $('body'),
                _this = this;
            
            // $body
            //     .append(this.createDom())
            //     .find('.dialog-content')
            //     .show()
            //     .addClass('zoomIn');

            $body.append(this.createDom());
            
            $body.on('touchstart', '.dialog_cancel', function(e) {
                e.preventDefault();
                _this.settings.cancelCallback && _this.settings.cancelCallback();
                if (_this.settings.autoClose) _this.destroy();
            });

            $body.on('touchstart','.dialog_confirm', function(e){
                e.preventDefault();
                _this.settings.okCallback && _this.settings.okCallback();
                if (_this.settings.autoClose) _this.destroy();
            });

        });

        Modal.method('createDom',function(){
            var settings = this.settings,
                dom = '<div class="dialog-warp" id="dialog">' +
                        '<div class="dialog-mask"></div>' +
                        '<div class="dialog-content animated zoomIn">' +
                           '<div class="dialog-head"><strong class="dialog-title">' + settings.title + '</strong></div>' +
                            '<div class="dialog-body">' + settings.content + '</div>' +
                            '<div class="dialog-btn-group">' +
                                '<a href="javascript:;" class="weui_btn_dialog default dialog_cancel" style="display: '+ (settings.cancel ? 'block' : 'none')  +'">'+this.settings.cancelText+'</a>' +
                                '<a href="javascript:;" class="weui_btn_dialog primary dialog_confirm">'+this.settings.okText+'</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
            return dom;
        });

        Modal.method('destroy',function(){
            // webkitTransitionEnd 要事先检测是否要添加前缀，本来要应该通过mordernizr来检测，现在两个都写上
            // $('.dialog-mask').hide();
            // $('.dialog-content').removeClass('zoomIn').one('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function(){
            //     $('.dialog-warp').remove();
            // });

			// 注意注意
            $('body').off('touchstart');
            $('.dialog-warp').remove();
            // 初始化单例代理
            dialog(false);
        });

        Modal.method('reRender',function(settings){
            if (H.isString(settings)) {
                var settings = {content: settings,autoClose: true};
            }
            // this.settings = Object.assign({}, defaults, settings || {});
            this.settings = $.extend({},defaults,settings||{});    
            var dom = this.createDom();
            $('#dialog').remove();
            // $('body')
            //     .append(dom)
            //     .find('.dialog-content')
            //     .show()
            //     .addClass('zoomIn');
            $('body').append(dom);
        });

        var dialog = H.getSingleton(function(){
            var options = arguments[0];
            // 这个匿名函数必须要有返回值。
            return new Modal(options);
        });

        H.dialog = function(options) {
            return dialog(options);
        };

    })(H);

    H.we_loading = (function(){

        function show(html,classname) {
            var classname = classname || '',
                mask = $('<div class="weui_mask_transparent"></div>').appendTo(document.body),
                tpl = '<div class="weui_toast ' + classname + '">' + html + '</div>',
                dialog = $(tpl).appendTo(document.body);
            dialog.show().addClass('weui_toast_visible');
        }

        function showLoading(text){
            var html = '<div class="weui_loading">';
            for (var i=0 ; i<12 ; i++) {
                html += '<div class="weui_loading_leaf weui_loading_leaf_' + i + '"></div>';
            }
            html += '</div>'; 
            html += '<p class="weui_toast_content">' + (text||"数据加载中") + '</p>';
            show(html,'weui_loading_toast');
        }

        function hideLoading(){
            $('.weui_mask_transparent').hide();
            $('.weui_toast_visible').removeClass('weui_toast_visible').on('webkitTransitionEnd',function(){
                $(this).remove();
                $('.weui_mask_transparent').remove();
            });
        }

        return {
            show: showLoading,
            hide: hideLoading
        }

    })();

    //弹出分享层;
    H.share = (function() {
        //先获取微信授权的配置数据;
        $.ajax({
            type: 'POST',
            url: 'index.php?m=FrontPublic&c=WeSdk&a=js_sdk_signature',
            data: 'signPageUrl='+encodeURIComponent(location.href),
            success: function(msg){
                var signData = JSON.parse(msg);
                var signInfo = signData.signPackage,
                    wx_config = {
                        debug: false,
                        appId: signInfo.appId,
                        timestamp: signInfo.timestamp,
                        nonceStr: signInfo.nonceStr,
                        signature: signInfo.signature,
                        jsApiList: [
                            'chooseWXPay'
                        ]
                    };
                wx.config(wx_config);
                wx.ready(function(){

                });
            }
        });
    })();

    H.allKeys = function(obj) {
        if (!H.isObject) return [];
        var keys = [];
        for (var key in obj) keys.push(key);
        return keys;
    };

    H.getCookie = function(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    };

    //对时间进行处理;
    H.time = {
        //将指定的日期格式转换为时间戳,如：2016-09-07 12:06:11;
        timeStamp: function(dateStr){
            if(!dateStr) return {};
            var date = typeof dateStr === 'string' ? Date.parse(dateStr.replace(/-/gi,"/")) : dateStr;
            var dd = new Date(date);
            var y = dd.getFullYear();
            var m = dd.getMonth()+1;//获取当前月份的日期
            var d = dd.getDate();
            return {
                stamp: date,  //时间戳;
                year: y,   //年;
                month: m,  //月;
                day: d,  //日;
                date: y+"年"+m+"月"+d+"日"  //年月日;
            };
        },
        count: function(AddDayCount) { //获取n天后的日期;
            var dd = new Date();
            dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期;
            var y = dd.getFullYear();
            var m = dd.getMonth()+1;//获取当前月份的日期
            var d = dd.getDate();
            return {
                "time1":y+"-"+m+"-"+d,
                "time2":m+"月"+d+"日",
                "time3":dd.getTime()
            };
        }
    };

    // if ( typeof noGlobal === strundefined ){
        window.H = H;
    // }
}));

