/*
* xy 2017-10-08
* 加入购物车的弹窗页
* */

class AddCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            num: 1
        };
    }

    componentWillMount() {
        //获取购买的商品的信息;
        H.we_loading.show();
        H.server.getGoodsConfirmInfo({goods_id: this.props.goodsId}, (res) => {
            if(res.code == 0) {
                this.setState({data: res.data, num: res.data.goods_start_num});
            }else {
                H.operationState(res.message);
            }
            H.we_loading.hide();
        });
    }

    //关闭弹窗口;
    close() {
        this.props.that.setState({carPage: null});
    }

    //输入框改变时;
    numChange(e) {
        let data = this.state.data,
            val = e.target.value;
        if(val != '') {
            if(parseInt(val) > data.goods_inventory || parseInt(val) < data.goods_start_num) return;
        }
        this.setState({num: parseInt(val)});
    }

    //数量加减时;
    changeHandle(n) {
        let num = this.state.num,
            data = this.state.data;
        if(num+n>=data.goods_start_num && num+n<=data.goods_inventory) {
            this.setState({num: num+n});
        }
    }

    //加入购物车事件;
    addCar(state) {
        let data = this.state.data,
            num = this.state.data;
        if(num > data.goods_inventory || num < data.goods_start_num) {
            H.operationState('购买数量不能小于起卖数量，不能大于库存数量');
            return;
        }
        let param = {
            goods_id: this.props.goodsId,
            buy_number: this.state.num
        };
        H.server.addGoodsToShopCart(param, (res) => {
            if(res.code == 0) {
                if(state == 1) {
                    H.operationState('成功加入购物车');
                    this.close();
                    this.props.getCarData && this.props.getCarData();
                }else {
                    location.href = '/buyer-client/settlement/'+res.data.shop_cart_goods_id;
                }
            }else {
                H.operationState(res.message);
            }
        });
    }

    createPriceRules() {
        let data = this.state.data.price_rules,
            XML = [];
        for(let i in data) {
            let itemXml = [],
                ruleText = '',
                d = data[i];
            if(i == 1) {
                ruleText = '减';
            }else if(i == 2) {
                ruleText = '赠';
            }
            for(let j = 0 ; j < d.length ; j++) {
                itemXml.push(
                    <span className="item" key={i+'_'+j}>买{d[j].buy_num}{this.state.data.goods_unit}{ruleText}{d[j].preferential_value}{d[j].preferential_unit}</span>
                );
            }

            XML.push(
                <p className="item-cell"><span className="sale">{ruleText}</span>
                    {itemXml}
                </p>
            );
        }

        return XML;
    }

    render() {
        let data = this.state.data;
        if(!data) return null;
        return (
            <div className="addCar-wrap">
                <div className="mask" onClick={this.close.bind(this)}></div>
                <div className="content">
                    <div className="hd flex-box flex-end">
                        <div className="goods-imgs"><img src={H.localhost + data.goods_image + '@110w_90Q.jpg'}/></div>
                        <div className="flex-num1"><div><span className="price">￥{data.goods_price}</span>/件</div><p className="sales">已售：{data.sell_num}件</p></div>
                        <div className="close" onClick={this.close.bind(this)}></div>
                    </div>
                    <div className="bd">
                        <div className="flex-box item-cell"><div className="flex-num1">{data.goods_name}</div><p className="">重量：{data.goods_rough_weight}kg</p></div>
                        {this.createPriceRules()}

                        <div className="flex-box item-cell">
                            <div className="flex-num1">购买数量</div>
                            <div>
                                <span className="reduction" onClick={this.changeHandle.bind(this, -1)}>-</span>
                                <input className="car-num" type="number" pattern="[0-9]*" value={this.state.num} onChange={this.numChange.bind(this)} />
                                <span className="add" onClick={this.changeHandle.bind(this, 1)}>+</span>
                            </div>
                        </div>
                        <p className="item-cell">{data.goods_start_num}件起售，最多购买{data.goods_inventory}件</p>
                    </div>
                    <div className="ft flex-box">
                        <div className="flex-num1 add-car" onClick={this.addCar.bind(this, 1)}>加入购物车</div>
                        <div className="flex-num1 shopping" onClick={this.addCar.bind(this, 2)}>立即购买</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddCar;