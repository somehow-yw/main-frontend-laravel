/*
* xy 2017-11-06
* 卖家中心->卖家的工具列表
* */

class ToolsPage extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.params.id);
        this.state = {
            num: 0,
            id: props.params.id || 1
        };
    }

    componentDidMount() {
        this.createScroll();
    }

    componentDidUpdate() {
        this.SCROLL.refresh();
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

        let SCROLL = new IScroll('#toolsWrop', scrollOptions);
        this.SCROLL = SCROLL;
    }

    handler(num) {
        let n = this.state.num;
        console.log(num);
        this.setState({num: n == num ? 0 : num});
    }

    render() {
        let num = this.state.num,
            id = this.state.id;
        return (
            <div className="tools-wrap" id="toolsWrop">
                <div className="scroller">
                    <ul className="tools-content">
                        <li className={id == 2 || id == 3 ? 'tools-cell active' : 'tools-cell'} onClick={this.handler.bind(this, 1)}>
                            <div className="hd">
                                <div className="tools-item icon icon-huizhang1"></div>
                                <div className="tools-name">特殊徽章</div>
                                <button className="tools-status">{id == 2 || id == 3 ? '已开通' : '未开通'}</button>
                            </div>
                            <p className={num == 1 ? 'tools-note active' : 'tools-note'}>
                                签约的卖家/商品将会得到徽章标记，是获得认可的高级卖家的身份象征。
                            </p>
                        </li>
                        <li className={id == 2 || id == 3 ? 'tools-cell active' : 'tools-cell'} onClick={this.handler.bind(this, 2)}>
                            <div className="hd">
                                <div className="tools-item icon icon-g-paixu1"></div>
                                <div className="tools-name">排序优先</div>
                                <button className="tools-status">{id == 2 || id == 3 ? '已开通' : '未开通'}</button>
                            </div>
                            <p className={num == 2 ? 'tools-note active' : 'tools-note'}>
                                签约的卖家/商品在商品/店铺列表中将会优先排序，更容易被买家看到。
                            </p>
                        </li>
                        <li className={id == 2 ? 'tools-cell active' : 'tools-cell'} onClick={this.handler.bind(this, 3)}>
                            <div className="hd">
                                <div className="tools-item icon icon-renyuanguanli1"></div>
                                <div className="tools-name">客户管理</div>
                                <button className="tools-status">{id == 2 ? '已开通' : '未开通'}</button>
                            </div>
                            <p className={num == 3 ? 'tools-note active' : 'tools-note'}>
                                客户管理功能可以帮助您管理客户信息，随时查阅客户的购买记录，进货趋势。还有客户流失预警功能，协助您轻松做好客户维护。
                            </p>
                        </li>
                        <li className={id == 2 ? 'tools-cell active' : 'tools-cell'} onClick={this.handler.bind(this, 4)}>
                            <div className="hd">
                                <div className="tools-item icon icon-shengyicanmou"></div>
                                <div className="tools-name">生意参谋</div>
                                <button className="tools-status">{id == 2 ? '已开通' : '未开通'}</button>
                            </div>
                            <p className={num == 4 ? 'tools-note active' : 'tools-note'}>
                                生意参谋功能主要针对店铺各项数据进行分析、对比，让卖家了解到自家店铺与其他店铺之间的差异，诊断店铺问题，及时改进。
                            </p>
                        </li>
                        <li className={id == 2 || id == 3 ? 'tools-cell active' : 'tools-cell'} onClick={this.handler.bind(this, 5)}>
                            <div className="hd">
                                <div className="tools-item icon icon-cuxiaotejialei"></div>
                                <div className="tools-name">促销功能</div>
                                <button className="tools-status">{id == 2 || id == 3 ? '已开通' : '未开通'}</button>
                            </div>
                            <p className={num == 5 ? 'tools-note active' : 'tools-note'}>
                                签约商品/店铺可获得限量特惠/限时特惠的促销功能，有上首页的机会。
                            </p>
                        </li>
                        <li className={id == 2 || id == 3 ? 'tools-cell active' : 'tools-cell'} onClick={this.handler.bind(this, 6)}>
                            <div className="hd">
                                <div className="tools-item icon icon-shenhetongyi"></div>
                                <div className="tools-name">急速审核</div>
                                <button className="tools-status">{id == 2 || id == 3 ? '已开通' : '未开通'}</button>
                            </div>
                            <p className={num == 6 ? 'tools-note active' : 'tools-note'}>
                                签约商品将会被平台优先审核，快速上架。
                            </p>
                        </li>
                        <li className={id == 2 ? 'tools-cell active' : 'tools-cell'} onClick={this.handler.bind(this, 7)}>
                            <div className="hd">
                                <div className="tools-item icon icon-kefu1"></div>
                                <div className="tools-name">专属客服</div>
                                <button className="tools-status">{id == 2 ? '已开通' : '未开通'}</button>
                            </div>
                            <p className={num == 7 ? 'tools-note active' : 'tools-note'}>
                                专属客服，专属服务，快速解决卖家的问题。
                            </p>
                        </li>
                        <li className={id == 2 || id == 3 ? 'tools-cell active' : 'tools-cell'} onClick={this.handler.bind(this, 8)}>
                            <div className="hd">
                                <div className="tools-item icon icon-shouye"></div>
                                <div className="tools-name">首页专区</div>
                                <button className="tools-status">{id == 2 || id == 3 ? '已开通' : '未开通'}</button>
                            </div>
                            <p className={num == 8 ? 'tools-note active' : 'tools-note'}>
                                签约商品/店铺将会将会获得在首页展示的机会。
                            </p>
                        </li>
                        <li className="tools-cell" onClick={this.handler.bind(this, 9)}>
                            <div className="hd">
                                <div className="tools-item icon icon-shoukuan"></div>
                                <div className="tools-name">提前收款</div>
                                <button className="tools-status">未开通</button>
                            </div>
                            <p className={num == 9 ? 'tools-note active' : 'tools-note'}>
                                卖家确认发货后，通过审核，可提前收到货款。
                            </p>
                        </li>
                        <li className="tools-cell" onClick={this.handler.bind(this, 10)}>
                            <div className="hd">
                                <div className="tools-item icon icon-tixian"></div>
                                <div className="tools-name">免手续费</div>
                                <button className="tools-status">未开通</button>
                            </div>
                            <p className={num == 10 ? 'tools-note active' : 'tools-note'}>
                                免除提现手续费。
                            </p>
                        </li>
                        <li className="tools-cell" onClick={this.handler.bind(this, 11)}>
                            <div className="hd">
                                <div className="tools-item icon icon-jujuedingdan"></div>
                                <div className="tools-name">拒单权利</div>
                                <button className="tools-status">未开通</button>
                            </div>
                            <p className={num == 11 ? 'tools-note active' : 'tools-note'}>
                                买家太讨厌？缺货？不想接的单子可以拒绝。
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default ToolsPage;