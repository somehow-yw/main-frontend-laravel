
class Help extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            help: [{
                index: '一',
                title: '关于商品审核',
                content: [
                    {question: '1、问：我上传商品后，多久能通过审核？', answer: '答：一般情况下，一个工作日内会通过审核。遇特殊情况，如周末节假日，审核周期会有延迟。请耐心等待。'},
                    {question: '2、问：新增商品需要审核，修改商品也要审核吗？', answer: '答：是的，新增商品和修改商品信息，均需后台审核，审核通过后方可呈现。若只对商品价格进行修改，则无需审核。'}
                ]}, {
                index: '二',
                title: '关于商品排序',
                content: [
                    {question: '问：为什么我的商品排在后面，如何才能把我的商品往前排？', answer: '答：商品的排序，跟商品价格是否过期、是否有检验报告、店铺等级、店铺好评率、店铺已成交订单数、店铺违规率等因素有关。总之，越遵守平台规则，在线订单越多，排名越靠前。'}
                ]}, {
                index: '三',
                title: '关于商品维护',
                content: [
                    {question: '1、为避免交易纠纷，若商品价格发生变化，请及时修改。'},
                    {question: '2、为保持您在平台的信用度，若商品缺货、无货，请及时下架商品。待商品有货后，再行上架。'}
                ]}, {
                index: '四',
                title: '关于店铺等级',
                content: [
                    {question: '问：店铺等级是怎么来的？我家店铺现在平台排名是多少？', answer: '答：店铺等级功能还在完善中。。。'}
                ]}, {
                index: '五',
                title: '关于钻石商城',
                content: [
                    {question: '问：怎样能获得钻石，钻石有什么用？', answer: '答：在线交易1元，系统赠送1个钻石。钻石可在卖家中心-钻石商城中兑换。'}
                ]}, {
                index: '六',
                title: '关于集采报价',
                content: [
                    {question: '1、问：什么是集采报价？怎么知道我有没有集采订单呢？', answer: '答：买家在下单时，可以选择集采后支付，若有单个买家下大单，或多个买家汇集成大单，您可以试情况，选择是否给予一个新的报价。'},
                    {question: '每天8:00系统集中推送集采订单，您可以进入卖家中心，查看是否有集采订单。'},
                    {question: '点击进入集采详情，即可报价。超过8:30未报价，视为放弃报价。'},
                    {question: '2、问：集采订单，我报价之后，买家一定会下单吗？', answer}
                ]}, {
                index: '七',
                title: '关于集采报价',
                content: [
                    {question: '店铺等级是怎么来的？我家迪纳普现在平台排名是多少？', answer: '店铺等级功能还在完善中'}
                ]}, {
                index: '八',
                title: '关于接单',
                content: [
                    {question: '店铺等级是怎么来的？我家迪纳普现在平台排名是多少？', answer: '店铺等级功能还在完善中'}
                ]}, {
                index: '九',
                title: '关于收款',
                content: [
                    {question: '店铺等级是怎么来的？我家迪纳普现在平台排名是多少？', answer: '店铺等级功能还在完善中'}
                ]}, {
                index: '十',
                title: '关于退货',
                content: [
                    {question: '店铺等级是怎么来的？我家迪纳普现在平台排名是多少？', answer: '店铺等级功能还在完善中'}
                ]}]
        };
    }

    /**
     * 准备工作
     */

    componentDidMount(){
        this.createScroll();
    }

    createScroll(){
        let SCROLL = new IScroll('#help', H.scrollOption);
        this.SCROLL = SCROLL;

        SCROLL.on('beforeScrollStart', () => {
            SCROLL.refresh();
        });
    }


    /**
     * View构建
     */

    // 创建头部
    createHead(){
        return (<div className="help-header">
            <div className="help-img"><img src={H.getCdn()+'/Public/images/seller-cli/home/help.png@150w_100Q.png'}/></div>
        </div>);
    }


    // 创建列表
    createList(){
        let help = this.state.help;

        let helpList = [];
        help.map((h, i)=>{
            let helpContent = [];
            h.content.map((c, j)=>{
                helpContent.push(<div key={i+'_'+j} className="help-content">
                    <div className="question">问：{c.question}</div>
                    <div className="answer">答：{c.answer}</div>
                </div>);
            });

            helpList.push(<li key={i}>
                <div className="help-title" onClick={this.open.bind(this)}>
                    <div className="title-name"><span className="help-index">{h.index}</span>{h.title}</div>
                    <i className="icon right"></i>
                </div>
                {helpContent}
            </li>);
        });

        helpList.push(<li key={help.length}>
            <div className="help-title">
                <div className="title-name"><span className="help-index"></span>以上信息仍不能解决我的问题</div>
            </div>
        </li>);

        return (<ul className="help-list">
            {helpList}
        </ul>);
    }

    /**
     * 一些事件
     */

    open(e){
        let node = e.target,
            content = node.parentNode.parentNode.children[1];

        if(node.className.indexOf('active') == -1){
            node.className = 'icon right active';
            content.className = 'help-content active';
        }else{
            node.className = 'icon right';
            content.className = 'help-content';
        }
    }

    render() {
        return (<section id="help" className="help-center">
            <div className="scroller">
                {this.createHead()}
                {this.createList()}
            </div>
        </section>);
    }
}

export default Help;