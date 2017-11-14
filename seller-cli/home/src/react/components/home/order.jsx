/**
 * Created by Doden on 2017.05.03
 */

import React from 'react';

class Order extends React.Component {
    constructor(props) {
        super(props);
    }

    toOrder(type){
        location.href = '/seller-client/order/'+type;
    }

    render() {
        if(!this.props.orderNum) return null;
        return (<div id="order" className="order">
            <div className="order-title"><p>我的订单</p><p onClick={this.toOrder.bind(this, 'all')}>全部订单 <i className="icon right"></i></p></div>
            <div className="order-content">
                <div className="order-item" onClick={this.toOrder.bind(this, 'shipment_pending')}>
                    <div className={'order-icon '+(this.props.orderNum.wait_send_order>0?'message':'')} data-message={this.props.orderNum.wait_send_order}><i className="icon wait"></i></div>
                    <p>待发货</p>
                </div>
                <div className="order-item" onClick={this.toOrder.bind(this, 'waiting_for_delivery')}>
                    <div className={'order-icon '+(this.props.orderNum.already_send_order>0?'message':'')} data-message={this.props.orderNum.already_send_order}><i className="icon receive"></i></div>
                    <p>待收货</p>
                </div>
                <div className="order-item" onClick={this.toOrder.bind(this, 'refund_goods')}>
                    <div className={'order-icon '+(this.props.orderNum.refund_order>0?'message':'')} data-message={this.props.orderNum.refund_order}><i className="icon refund"></i></div>
                    <p>退款/退货</p>
                </div>
            </div>
        </div>);
    }
}

export default Order;