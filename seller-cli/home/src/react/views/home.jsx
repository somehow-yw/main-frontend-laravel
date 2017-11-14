/**
 * 卖家中心
 * @author 魏华东
 * 签约类型 1=未签约 2=店铺签约 3=商品签约
 */

import Seller from '../components/home/seller.jsx';
import Withdraw from '../components/home/withdraw.jsx';
import Order from '../components/home/order.jsx';
import ShopInfo from '../components/home/shopInfo.jsx';
import Operate from '../components/home/operate.jsx';
import Banner from '../components/home/banner.jsx';
import Tools from '../components/home/tools.jsx';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shopInfo: {},
            shopDetail: {},
            favorable: 0,
            stopBanner: false,
            notify: false,
            meInfo: {}
        };
    }


    async componentWillMount(){
        document.title = '卖家中心';

        H.loading.show();
        await new Promise(resolve => this.getShopInfo(resolve));
        await new Promise(resolve => this.getShopDetail(resolve));
        await new Promise(resolve => this.getSoldOut(resolve));
        await new Promise(resolve => this.getMe(resolve));
        this.getOrderNum();
        H.loading.hide();
    }

    componentDidMount(){
        this.createScroll();
    }

    createScroll(){
        let scrollOptions = {
            zoom: true,
            scrollX: false,  //是不中可以横向滚动;
            scrollY: true,  //是否可以纵向滚动;
            mouseWheel: true, //是否监听鼠标滚轮;
            wheelAction: 'zoom',
            probeType: 2,
            preventDefault: false
        };

        let SCROLL = new IScroll('#sellerHome', scrollOptions);
        this.SCROLL = SCROLL;

        SCROLL.on('beforeScrollStart', () => {
            SCROLL.refresh();
        });
    }

    //获取用户信息;
    getMe(resolve){
        H.server.getMe({}, (res)=>{
            if(res.code == 0){
                let me = res.data.shop_infos;
                this.setState({
                    meInfo: me
                });
                if(resolve){
                    resolve('ok');
                }
            } else{
                H.toast(res.message);
            }
        });
    }

    // 获取店铺详情
    getShopDetail(resolve){
        H.server.getShopInfo({}, (res)=>{
            if(res.status == 0){
                this.setState({
                    shopDetail: res.data
                }, this.getShopAppraise);
            }else{
                alert(res.message);
            }
            if(resolve) resolve('ok');
        });
    }

    // 获取店铺信息
    getShopInfo(resolve){
        let date = '',
            now = new Date();

        date = now.getFullYear() + '-' + ((now.getMonth()+1)<10?'0'+(now.getMonth()+1):(now.getMonth()+1));

        H.server.getShop({date: date, queryAct: 0}, (res)=>{
            this.setState({
                shopInfo: res
            }, ()=>{resolve('ok');});
        });
    }

    //获取是否改价
    getSoldOut(resolve){
        H.server.getSoldOut({}, (res)=>{
            if(res.code == 0){
                if(res.data.num > 0){
                    document.getElementById('change').style.display = 'block';
                    setTimeout(()=>{
                        document.getElementById('changeItem').style.opacity = '1';
                    }, 300);
                }
            }else{
                H.toast(res.message);
            }
            if(resolve) resolve('ok');
        });
    }

    // 获取好评率
    getShopAppraise(){
        H.server.getAvg({shop_id: this.state.shopDetail.shopid}, (res)=>{
            if(res.code == 0){
                this.setState({
                    favorable: res.data.favorable_rate
                });
            }else {
                H.toast(res.message);
            }
        });
    }

    //获取各个订单状态数量;
    getOrderNum() {
        H.server.getOrderNum({}, (res) => {
            if(res.code == 0) {
                this.setState({orderNum: res.data});
            }else {
                H.toast(res.message);
            }
        });
    }

    stopAuto(){
        this.setState({
            stopBanner: true
        });
    }

    toPage(type){
        switch (type){
            case 1:
                window.location.href = '#';
                break;
            case 2:
                window.location.href = '/index.php?m=PublicTemplate&c=ApiPublic&a=sellerGoodsListPage#my-goods';
                break;
            case 3:
                window.location.href = '/seller-client/order';
                break;
            case 4:
                window.location.href = '#/setting';
                break;
        }
    }

    render() {
        return (<div id="sellerHome" className="seller-home">
            <div className="scoller">
                <Banner stop={this.state.stopBanner}/>
                <div className="section s1">
                    <Seller shopInfo={this.state.shopDetail} meInfo={this.state.meInfo} setting={this.toPage.bind(this, 4)}/>
                    <Withdraw shopInfo={this.state.shopInfo}/>
                </div>
                <div className="section s1">
                    <Order orderNum={this.state.orderNum}/>
                </div>
                <div className="section info">
                    <ShopInfo shopInfo={this.state.shopInfo} favorable={Math.round(this.state.favorable*1000)/10}/>
                </div>
                <div className="section s1">
                    <Tools meInfo={this.state.meInfo}/>
                </div>
                <div className="section s1">
                    <Operate shopDetail={this.state.shopDetail} stopAuto={this.stopAuto.bind(this)}/>
                </div>
                <div style={{width: '100%', height: '80px'}}></div>
            </div>
            <div className="tab">
                <div className="tab-item active" onClick={this.toPage.bind(this, 1)}><div className="tab-icon"><i className="icon all"></i></div><p>首页</p></div>
                <div className="tab-item" onClick={this.toPage.bind(this, 2)}><div className="tab-icon"><i className="icon goods"></i></div><p>商品</p></div>
                <div className="tab-item" onClick={this.toPage.bind(this, 3)}><div className="tab-icon"><i className="icon order"></i></div><p>订单</p></div>
            </div>
            <div className="change" id="change">
                <div className="change-item" id="changeItem">
                    <div className="change-title">商品改价提醒</div>
                    <div className="change-body">
                        <p>您有商品在售，请核对今天是否改价，是否有货:</p>
                        <p>1、未确认价格的商品，当天不可销售</p>
                        <p>2、无货商品请点击下架</p>
                    </div>
                    <div className="change-footer" onClick={this.toPage.bind(this, 2)}>立即改价</div>
                </div>
            </div>

        </div>);
    }
}

export default Home;