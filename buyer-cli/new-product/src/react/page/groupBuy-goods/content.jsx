/*
* 主页
* */
import TouristsFooter from './../../components/tourists-footer.jsx';
import ProductList from './product-list.jsx';
import GoodsInfo from './../../component/goods-info/goods-info.jsx';
import BuyCar from './../../component/buy-car-bar/buy-car.jsx';
import Instruction from './instruction.jsx';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageStatus: 0,
            goodsId: null,
            carData: {   //购物车数据;
                goods_count: 0
            },
            instructionStatus: false,
            isGetRed: false, //是否领了红包;
            isTourists: 1,    //是否是游客;
            isSeller: 1  //是否是一批商;一批商不显示购物车 ,1是一批商,;
        };
        this.goodsInfoPage = this.goodsInfoPage.bind(this);
        this.setTourists = this.setTourists.bind(this);
        this.instructionStatus = this.instructionStatus.bind(this);
        this.getCarData = this.getCarData.bind(this);
        this.setGetRed = this.setGetRed.bind(this);
    }

    componentWillMount() {
        window.onhashchange = () => {
            H.sheet.hide();
            if(location.hash == '') {
                this.setState({pageStatus: 0});
            }
        };
    }

    //获取购物车数据;
    getCarData() {
        H.server.shopCartInfo({}, (res) => {
            if(res.code == 0) {
                this.setState({carData: res.data});
            }else {
                H.operationState(res.message);
            }
        });
    }

    //visitor为1表示是已注册的用户,seller为1表示一批商，不请求购物车数据;
    setTourists(visitor, seller) {
        if(visitor == 1 && seller != 1) {
            this.getCarData();
        }
        this.setState({
            isTourists: visitor,
            isSeller: seller
        });
    }

    //设置是否领取红包;
    instructionStatus(f) {
        this.setState({instructionStatus: f});
    }

    //显示商品详情页，并更改当前显示的商品ID;
    goodsInfoPage(goodsId) {
        this.setState({
            pageStatus: 1,
            goodsId: goodsId
        }, () => {
            window.location.href = '#goodsInfo';
        });
    }

    setGetRed() {
        this.setState({isGetRed: true});
    }

    render() {
        return(
            <div>
                <ProductList
                    goodsInfoPage={this.goodsInfoPage}
                    setTourists={this.setTourists}
                    instructionStatus={this.instructionStatus}
                    getCarData={this.getCarData}
                    isGetRed={this.state.isGetRed}
                    pageStatus={this.state.pageStatus}
                />
                {
                    (this.state.isTourists == 2) ? <TouristsFooter /> : ''
                }
                {
                    (this.state.isTourists == 1) && (this.state.isSeller != 1) && (this.state.carData.goods_count > 0) ? <BuyCar data={this.state.carData} /> : ''
                }
                {
                    this.state.pageStatus == 1 ? <GoodsInfo goodsId={this.state.goodsId} carData={this.state.carData} /> : ''
                }
                {
                    this.state.instructionStatus ? <Instruction instructionStatus={this.instructionStatus} setGetRed={this.setGetRed}/> : ''
                }
            </div>
        );
    }
}

export default Content;