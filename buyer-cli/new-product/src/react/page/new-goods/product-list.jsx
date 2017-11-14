//新品推荐商品列表;

import FooterLoading from '../../component/footer-loading/footer-loading.jsx';
import DataEnd from '../../component/data-end/data-end.jsx';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SCROLL: null,
            page: 1,
            size: 20,
            data: null,
            list: [],
            statistical: {},  //统计数据;
            isLoad: true,   //是否可加载数据;
            loadEnd: false  //数据加载完了;
        };
        this.getData = this.getData.bind(this);
        this.scrollCreator = this.scrollCreator.bind(this);
        this.scrollRefresh = this.scrollRefresh.bind(this);
        this.setOftenBuyStatus = this.setOftenBuyStatus.bind(this);
    }

    componentWillMount() {
        H.we_loading.show();
        //数据统计;
        H.server.goods_new({}, (res) => {
            if(res.code == 0) {
                this.setState({statistical: res.data}, () => {
                    this.getData();  //获取商品列表
                });
            }else {
                H.we_loading.hide();
                H.operationState(res.message);
            }
        });
    }

    getData() {
        let server = H.server,
            param = {
                page: this.state.page,
                size: this.state.size,
                date: $showDate
            };
        server.getNewProductList(param, (res) => {
            let list = this.state.list.concat(res.data.goods);
            if(res.code == 0) {
                if(!this.state.data) {
                    this.props.setTourists(res.data.visitor_status, res.data.is_seller);
                }
                if(param.page == 1) {
                    //设置分享;
                    let desc = '';
                    if(res.data.goods[0]) {
                        desc = res.data.goods[0].goods_name + '等' + this.state.statistical.new_goods + '种好货上架，同样的货，还是“找冻品网”买得放心';
                    }else {
                        desc = '各种好货上架，同样的货，还是“找冻品网”买得放心';
                    }
                    H.share.changeShare({
                        img: H.localhost + 'Public/images/buyer-cli/new-goods-share.jpg?v='+version,
                        url: window.location.host + '/show_page.php?pageTag=2&showDate=' + $showDate,
                        title: '【找冻品网】今日最新上架' + this.state.statistical.new_goods + '种产品，来看看有没有你需要的？',
                        desc: desc
                    });
                }
                if(res.data.goods.length > 0) {
                    this.setState({
                        data: res.data,
                        list: list,
                        isLoad: true,
                        loadEnd: res.data.goods.length < param.size ? true : false,
                        page: this.state.page + 1
                    }, () => {
                        this.scrollRefresh();
                        H.imgLoad({box: '.product-list'});
                    });
                }else {
                    this.setState({loadEnd: true});
                }
            }else {
                H.operationState(res.message);
            }
            H.we_loading.hide();
        });
    }

    componentDidMount() {
        this.scrollCreator(this.getData);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.goodsId) {
            this.setOftenBuyStatus(nextProps.goodsId, nextProps.isGoodsOften);
        }
        if(nextProps.pageStatus == 0 && this.state.data) {
            //设置分享;
            let desc = '';
            if(this.state.data.goods[0]) {
                desc = this.state.data.goods[0].goods_name + '等' + this.state.statistical.new_goods + '种好货上架，同样的货，还是“找冻品网”买得放心';
            }else {
                desc = '各种好货上架，同样的货，还是“找冻品网”买得放心';
            }
            H.share.changeShare({
                img: H.localhost + 'Public/images/buyer-cli/new-goods-share.jpg?v='+version,
                url: window.location.host + '/show_page.php?pageTag=2&showDate=' + $showDate,
                title: '【找冻品网】今日最新上架' + this.state.statistical.new_goods + '种产品，来看看有没有你需要的？',
                desc: desc
            });
        }
    }

    scrollCreator(fn) {
        // 创建iscroll实例
        var wrapper = document.getElementById('new_goods_wrap'),
            SCROLL = new IScroll(wrapper, {
                zoom: true,
                scrollX: false,  //是不中可以横向滚动;
                scrollY: true,  //是否可以纵向滚动;
                mouseWheel: true, //是否监听鼠标滚轮;
                probeType: 3,
                wheelAction: 'zoom',
                click: true,
                scrollbars: true,
                shrinkScrollbars: 'scale',
                fadeScrollbars: true
            });
        H.scrollY = 0;
        this.setState({SCROLL: SCROLL});
        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        SCROLL.on('scroll', () => {
            if((H.scrollY - SCROLL.y) > 30) {
                H.imgLoad({box: '.product-list'});
                H.scrollY = SCROLL.y;
            }
            if(this.state.loadEnd) return;
            if((SCROLL.y - SCROLL.maxScrollY) < 300) {
                if(this.state.isLoad) {
                    this.setState({isLoad: false});
                    fn && fn();
                }
            }
        });
    }

    scrollRefresh() {
        this.state.SCROLL.refresh();
    }

    //点击商品进入详情页;
    goodsListHandler(goodsId, goods_enshrine) {
        this.props.goodsInfoPage && this.props.goodsInfoPage(goodsId, goods_enshrine);
    }

    //加入购物车;
    addBuyCar(goodsId, e) {
        e.stopPropagation();
        if(!goodsId) return;
        //visitor_status:访问者的状态 1=注册用户 2=访客 3=小黑屋;
        if(this.state.data.visitor_status == 1) {
            H.we_loading.show();
            H.server.getGoodsConfirmInfo({goods_id: goodsId}, (res) => {
                if(res.code == 0) {
                    let options = res.data;
                    options.goods_id = goodsId;
                    H.sheet.addCar(options, () => {
                        this.props.getCarData();
                    });
                }else {
                    H.operationState(res.message);
                }
                H.we_loading.hide();
            });
        }else {
            H.sheet.promptLogin();
        }
    }

    //咨询点击事件;
    consultingHandler(goodsId, e) {
        e.stopPropagation();
        H.we_loading.show('');
        H.server.getConsultInfo({goods_id: goodsId}, (res) => {
            if(res.code == 0) {
                H.sheet.consulting(res.data);
            }else {
                H.operationState(res.message);
            }
            H.we_loading.hide('');
        });
    }

    //加入常购;
    addOftenBuyGoods(goodsId, e) {
        e.stopPropagation();
        H.we_loading.show();
        H.server.addOftenBuyGoods({goods_id: goodsId}, (res) => {
            if(res.code == 0) {
                this.setOftenBuyStatus(goodsId, 1);
                H.operationState('加入常购成功');
            }else {
                H.operationState(res.message);
            }
            H.we_loading.hide();
        });
    }

    //取消常购;
    delOftenBuyGoods(goodsId, e) {
        e.stopPropagation();
        H.we_loading.show();
        H.server.delOftenBuyGoods({goods_id: goodsId}, (res) => {
            if(res.code == 0) {
                this.setOftenBuyStatus(goodsId, 0);
                H.operationState('取消常购成功');
            }else {
                H.operationState(res.message);
            }
            H.we_loading.hide();
        });
    }

    //加入常购之后，把加入的标记;
    setOftenBuyStatus(goodsId, status) {
        let list = this.state.list;
        for(let i in list) {
            if(list[i].goods_id == goodsId) {
                list[i].goods_enshrine = status;
                this.setState({list: list});
                break;
            }
        }
    }

    render() {
        return (
            <div id="new_goods_wrap" className="new-goods-wrap">
                <div className="scroller" style={{paddingBottom: '52px'}}>
                    <header className="product-header">
                        <div className="product-header-info">
                            <p>昨日新增：<span className="color-orange">{this.state.statistical.new_goods}</span>种</p>
                            <p>当前在售商品：{this.state.statistical.all_goods}种</p>
                        </div>
                    </header>
                    <ul className="product-list">
                        {
                            this.state.list.map((data, index) => {
                                let addCarBtn = '';
                                if(this.state.data.is_seller == 0) {
                                    addCarBtn = (<a className="btn btn-green btn-addcar" onClick={this.addBuyCar.bind(this, data.goods_id)}>加入购物车</a>);
                                }
                                return(
                                    <li key={index} className="flex-box goods-list" onClick={this.goodsListHandler.bind(this, data.goods_id, data.goods_enshrine)}  >
                                        <div className="goods-img">
                                            <img data-url={data.goods_image == '' ? H.defaultImg()[2] : H.localhost + data.goods_image + H.imgSize()[110]} src={H.defaultImg()[2]} />
                                            <span className="pic-num">{data.goods_image_count}张</span>
                                        </div>
                                        <div className="flex-num1">
                                            <div className="goods-title">
                                                <span className="goods-title-clamp">
                                                    {data.goods_title ? data.goods_title : data.goods_name + '' + data.goods_brand + '' + data.goods_guigei + '' + data.goods_xinghao}
                                                </span>
                                            </div>
                                            <div className="price">
                                                <span className="color-orange">一口价：￥{data.goods_price}</span>
                                                {
                                                    this.state.data.visitor_status != 1 ? '(登录可见)' : ''
                                                }

                                            </div>
                                            <div className="time">
                                                上架时间：{H.time.timeStamp(data.putaway_time).date}
                                            </div>
                                            <div className="flex-box btn-wrap">
                                                {addCarBtn}
                                                <a className="btn btn-green-the btn-small" onClick={this.consultingHandler.bind(this, data.goods_id)}>咨询</a>
                                                {
                                                    this.state.data.visitor_status == 1 ?
                                                        <div className="flex-num1 collection">
                                                            {
                                                                data.goods_enshrine == 1 ?
                                                                    <a className="has" onClick={this.delOftenBuyGoods.bind(this, data.goods_id)}></a>
                                                                    : <a className="not" onClick={this.addOftenBuyGoods.bind(this, data.goods_id)}></a>
                                                            }
                                                        </div> :
                                                        ''
                                                }
                                            </div>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    {
                        this.state.loadEnd && this.state.list.length > 7 ? <DataEnd /> : ''
                    }
                    {
                        !this.state.isLoad && !this.state.loadEnd ? <FooterLoading /> : ''
                    }
                </div>
            </div>
        );
    }
}

export default ProductList;