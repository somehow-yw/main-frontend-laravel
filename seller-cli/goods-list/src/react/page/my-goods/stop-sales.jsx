import GoodsList from '../../components/goods-list/goods_list.jsx';
import EmptyTemp from './EmptyTemp.jsx';
import ChangePrice from './change-price.jsx';
import FooterLoading from '../../components/footer-loading/footer-loading.jsx';
import CountGoods from './countGoods.jsx';
/*
* 下架的商品列表*/

class StopSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultPara : {
                shop_id: 0,
                type: 3,
                start: 0,
                end: 0
            },
            goodsList: [],
            isLoad: true,
            loadEnd: false,
            total: 1,                 //是否有数据;
            currentGoodsData: null,  //当前改价格的商品ID;
            currentGoodsIndex: null,    //当前改价的商品分类ID和index
            statistics: {}           //列表中需要的统计数据（在售，审核中，优先）
        };

        this.delGoods = this.delGoods.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.updateSaleStatus = this.updateSaleStatus.bind(this);
        this.changePriceFinish = this.changePriceFinish.bind(this);
    }

    //初始化数据
    componentWillMount(){
        this.getGoodsList();
    }

    //创建滑动
    componentDidMount(){
        this.createScroll();
    }

    //获取商品列表
    getGoodsList(){
        let defaultPara = this.state.defaultPara,
            goodsList = this.state.goodsList;
        defaultPara.end = defaultPara.start + 19;
        H.we_loading.show();
        H.server.getList(defaultPara, (res) => {
            if(res.code == 0){
                H.we_loading.hide();
                goodsList = goodsList.concat(res.data.goods);
                if(goodsList.length >= res.data.total) {
                    this.state.loadEnd = true;
                }else {
                    defaultPara.start = defaultPara.end +1;
                }
                this.state.total = res.data.total;
                this.setState({
                    goodsList: goodsList,
                    isLoad: true,
                    statistics: res.data.statistics
                }, () => {
                    this.state.SCROLL.refresh();
                });
            }else{
                H.operationState(res.message);
            }
        });
    }

    //创建滑动
    createScroll(){
        var wrapper = document.getElementById('stopSales_goods_list'),
            SCROLL = new IScroll(wrapper, {
                zoom: true,
                scrollX: false,  //是不中可以横向滚动;
                scrollY: true,  //是否可以纵向滚动;
                mouseWheel: true, //是否监听鼠标滚轮;
                wheelAction: 'zoom',
                probeType: 2,
                preventDefault: false
            });
        this.state.SCROLL = SCROLL;
        //document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
        SCROLL.on('scroll', () => {
            if(this.state.loadEnd) return;
            if((SCROLL.y - SCROLL.maxScrollY) < 300) {
                if(this.state.isLoad) {
                    this.setState({isLoad: false}, () => {
                        this.getGoodsList();
                    });
                }
            }
        });
    }

    //创建商品列表;
    createGoodsList(){
        let order = ['thumb', 'name', 'xinghao', 'price', 'unit'],
            type = (<div className="flex-num1"><div className="flex-box">
                <p className="flex-num1">友情提醒：请仔细阅读商品规范书</p><a href="#my-goods/stop-sales/spec-article" style={{color: '#888', textDecoration: 'underline'}}>商品规范?</a>
            </div></div>);
        return <GoodsList btnNames={['删除']} goodsList = {this.state.goodsList} order={order} style={null} style={'goods-list-stop'} type={type}
                          cellStyle={'goods-list-item'} delGoods={this.delGoods} btnGroupStyle={'button-sale'} changePriceHandler={this.changePriceHandler}
                          iconBtnNames={['上架', '成为优选', '预览/分享']} iconStyle={['icon-sell-in icon-font', 'icon-Preferred icon-font', 'icon-share icon-font']}
                            btnClick = {this.updateSaleStatus} signingType={this.props.sellerShopInfo.signing_type}/>;
    }

    //删除商品
    delGoods(e){
        let node = e.target,
            index = node.dataset.index,
            goodsList = this.state.goodsList,
            shop_id = goodsList[index].goods_id;

        H.sheet.create({
            title: '<span>删除商品</span>',
            content: '<div class="actionsheet_cell read-only">' +
            '<div class="actionsheet_item" style="font-size: 14px;color: #888;"><p style="margin: 30px 0;text-align: center;width: 100%;">确定要删除该商品吗，删除之后不可恢复，请谨慎操作</p></div></div>',
            cancel: '取消',
            confirm: '删除',
            confirmCallback: () => {
                H.we_loading.show();
                H.server.delGoods({goods_ids: shop_id}, (res) => {
                    if(res.code == 0){
                        H.we_loading.hide();
                        H.operationState('删除成功');
                        $(node).parents('.goods-list-item').slideUp(400, () => {
                            goodsList.splice(index, 1);
                            $('.goods-list-item').show();
                            this.setState({
                                goodsList: goodsList
                            }, () => {
                                this.state.SCROLL.refresh();
                            });
                        });
                    }else{
                        H.operationState(res.message);
                    }
                });
            }
        });
    }

    //上架;
    updateSaleStatus(index, e){
        if(e.target.className.indexOf('cells-row') != -1) return;
        let node = e.target,
            key = e.target.className.indexOf('cell-column') == -1 ? $(node).parents('.cell-column').data('para') : $(node).data('para'),
            x = e.target.className.indexOf('cell-column') == -1 ? $(node).parents('.cell-column').data('index') : $(node).data('index'),
            goodsList = this.state.goodsList,
            goods = goodsList[key],
            goods_id = goods.goods_id,
            new_price = goods.price,
            name = goods.name,
            unit = goods.unit;
        switch (x) {
            case 0:
                H.sheet.create({
                    title: '确认上架后的新价格',
                    content: '<div class="actionsheet_cell read-only"><div class="actionsheet_item">商品名：'+ name + '</div>' +
                    '<div class="actionsheet_item center">新价格：<div class="in-new-price"><input type="number" id="input_sale" class="input-inline"/>元/'+ unit +'</div></div></div>',
                    cancel: '取消',
                    confirm: '上架',
                    confirmCallback: () => {
                        H.we_loading.show();
                        new_price = $('#input_sale').val();
                        H.server.updateSaleStatus({goods_id: goods_id, on_sale: 1, new_price: new_price}, (res) => {
                            if(res.code == 0){
                                H.we_loading.hide();
                                $(node).parents('.goods-list-item').addClass('left-hide');
                                setTimeout(() => {
                                    $('.goods-list-item').removeClass('left-hide');
                                    goodsList.splice(index, 1);
                                    this.setState({
                                        goodsList: goodsList
                                    }, () => {
                                        this.state.SCROLL.refresh();
                                    });
                                }, 400);
                            }else{
                                H.operationState(res.message);
                            }
                        });
                    }
                });
                $('#input_sale').val(Number(new_price));
                break;
            case 1:
                let num = this.state.statistics,
                    server = H.server;
                if(this.props.sellerShopInfo.signing_type == 1) {   //还没签约的用户;
                    H.sheet.create({
                        style: 1,
                        title: '提示',
                        content: '<div class="actionsheet_cell" id="copy_goods_name"><div style="line-height: 2"><p style="color: #1498fc;">申请成为优选商品？</p>' +
                        '<p>优选商品将会在买家浏览商品时排序靠前</p>' +
                        '<p>只有与平台签约才能上传优先商品</p></div></div>',
                        cancel: '取消',
                        confirm: '联系客服',
                        confirmCallback: () => {
                            location.href = 'tel:18000500400';
                        }
                    });
                }else {
                    if(goods.on_signing) {    //该商品已经是签约商品，作取消处理;
                        H.sheet.create({
                            style: 1,
                            title: '提示',
                            content: '<div class="actionsheet_cell" id="copy_goods_name"><div style="line-height: 2"><p style="color: #1498fc;">取消优选商品？</p>' +
                            '<p>优选商品将会在买家浏览商品时排序靠前</p>' +
                            '<p>您确定要取消该优选商品吗</p></div></div>',
                            cancel: '取消',
                            confirm: '确定',
                            confirmCallback: () => {  /*确定取消优选;*/
                                H.we_loading.show();
                                server.delSigning(JSON.stringify({goods_id: goods_id}), (res) => {
                                    H.we_loading.hide();
                                    if(res.code == 0) {
                                        goods.on_signing = false;
                                        num.signing_num--;
                                        this.setState({goodsList: goodsList, statistics: num});
                                    }else{
                                        H.operationState(res.message);
                                    }
                                });
                            }
                        });
                    }else {  //该商品不是签约商品，可成功优选商品;
                        if(num.max_signing_num > num.signing_num) {   //签约商品数量未满;
                            H.sheet.create({
                                style: 1,
                                title: '提示',
                                content: '<div class="actionsheet_cell" id="copy_goods_name"><div style="line-height: 2"><p style="color: #1498fc;">申请成为优选商品？</p>' +
                                '<p>优选商品将会在买家浏览商品时排序靠前</p>' +
                                '<p>在售商品申请后需要重新审核</p>' +
                                '<p>才能上架为<span style="color: #1498fc;">优选商品</span>哦！</p></div></div>',
                                cancel: '取消',
                                confirm: '确定',
                                confirmCallback: () => {
                                    H.we_loading.show();
                                    server.setSigning(JSON.stringify({goods_id: goods_id}), (res) => {
                                        H.we_loading.hide();
                                        if(res.code == 0) {
                                            //goods.on_signing = true;
                                            num.signing_num++;
                                            num.on_sell_num--;
                                            num.audit++;
                                            this.props.getAuditingNum && this.props.getAuditingNum();
                                            $('.goods-list-item').removeClass('left-hide');
                                            goodsList.splice(index, 1);
                                            this.setState({goodsList: goodsList, statistics: num}, () => {
                                                this.state.SCROLL.refresh();
                                            });
                                        }else{
                                            H.operationState(res.message);
                                        }
                                    });
                                }
                            });
                        }else {    //签约商品数量已满;
                            H.sheet.create({
                                style: 1,
                                title: '提示',
                                content: '<div class="actionsheet_cell" id="copy_goods_name"><div style="line-height: 5"><p>您的签约数量已满</p></div></div>',
                                confirm: '确定'
                            });
                        }
                    }
                }
                break;
            case 2:
                window.location.href = '/show_page.php?pageTag=5&gid=' + goods_id;
                break;
        }
    }
    //执行改价;
    changePriceHandler(e){
        let data = this.state.goodsList,
            node = e.target,
            index = node.dataset.index;
        this.setState({currentGoodsData: data[index], currentGoodsIndex: index});
    }
    //改价格完成;
    changePriceFinish(price, obj) {
        let index = this.state.currentGoodsIndex,
            data = this.state.goodsList;
        data[index].price = price;
        data[index].price_rules = obj.price_rules;
        this.setState({data: data, currentGoodsData: null, currentGoodsIndex: null});
    }

    closePrice() {
        this.setState({currentGoodsData: null, currentGoodsIndex: null});
    }
    render() {
        return (
            <div>
                <CountGoods num={this.state.statistics} />
                <div id="stopSales_goods_list" className="stopSales-goods-list">
                    <div className="scroller">
                        {this.createGoodsList()}
                        {
                            !this.state.loadEnd && !this.state.isLoad ? <FooterLoading /> : ''
                        }
                        {this.state.total == 0 ? (<EmptyTemp SCROLL={this.state.SCROLL} />) : null}
                    </div>
                </div>
                {
                    this.state.currentGoodsData ?
                        <ChangePrice data={this.state.currentGoodsData}
                                     changePriceFinish={this.changePriceFinish} closePrice={this.closePrice.bind(this)} />
                        : null
                }
            </div>
        );
    }
}

export default StopSales;