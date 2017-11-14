/*
* xy 2017-11-06
* 在售和已下架顶部数量;
* */

class CountGoods extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let num = this.props.num || {};
        return (
            <div className="count-goods flex-box justify-content-space-between">
                <div>在售<span className="num">{num.on_sell_num}件</span></div>
                <div>审核中<span className="num">{num.audit}件</span></div>
                <div>优选<span className="num">{num.signing_num}/{num.max_signing_num}</span></div>
            </div>
        );
    }
}

export default CountGoods;