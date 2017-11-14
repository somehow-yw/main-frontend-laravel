/**
 * Created by Doden on 2017.05.03
 */

import React from 'react';

class Tools extends React.Component {
    constructor(props) {
        super(props);
    }

    toMore(){
        location.href = '#/tools/'+this.props.meInfo.signing_type;
    }

    handler(index) {
        if(this.props.meInfo.signing_type != 2) { //未签约;
            H.sheet.create({
                title: '提示',
                content: '<div class="actionsheet_cell"><div class="actionsheet_item center" id="upload"><div style="padding: 15px 0;line-height: 2">' +
                '<p style="color: #1498fc;">特权功能仅签约商品-店铺签约可以使用</p>' +
                '<p>签约商品及更多功能详询客服</p></div></div></div>',
                cancel: '取消',
                confirm: '联系客服',
                confirmCallback: () => {
                    location.href = 'tel:18000500400';
                }
            });
        }else {
            if(index == 3) {
                location.href = 'tel:18011510362';
            }else {
                H.sheet.create({
                    title: '提示',
                    content: '<div class="actionsheet_cell"><div class="actionsheet_item center" id="upload"><div style="padding: 15px 0;line-height: 2"><p style="color: #1498fc;">功能开发中</p>' +
                    '<p>工程师正在快马加鞭地写代码</p></div></div></div>',
                    confirm: '取消'
                });
            }
        }
    }

    render() {
        return (<div id="order" className="order">
            <div className="order-title"><p>特权功能</p><p onClick={this.toMore.bind(this)}>查看全部 <i className="icon right"></i></p></div>
            <div className="order-content">
                <div className="order-item" onClick={this.handler.bind(this, 1)}>
                    <div className="order-icon" ><i className="icon icon-renyuanguanli1"></i></div>
                    <p>客户管理</p>
                </div>
                <div className="order-item" onClick={this.handler.bind(this, 2)}>
                    <div className="order-icon" ><i className="icon icon-shengyicanmou"></i></div>
                    <p>生意参谋</p>
                </div>
                <div className="order-item" onClick={this.handler.bind(this, 3)}>
                    <div className="order-icon" ><i className="icon icon-kefu1"></i></div>
                    <p>专属客服</p>
                </div>
            </div>
        </div>);
    }
}

export default Tools;