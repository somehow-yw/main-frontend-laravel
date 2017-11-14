/*
* xy 2017.07.11
* 代扣协议
* */
import React from 'react';

class Withholding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.applyData
        }
    }

    componentWillMount() {
        if(!this.state.data) {
            H.server.getApplyData({}, (res) => {
                if(res.code == 0) {
                    this.setState({data: res.data});
                    this.props.setApplyData(res.data);
                }else {
                    H.dialog(res.message);
                }
            });
        }
    }

    componentDidMount() {
        this.scrollCreator();
    }

    scrollCreator(){
        // 创建iscroll实例
        var wrapper = document.getElementById("Withholding"),
            SCROLL = new IScroll(wrapper, {
                zoom: true,
                scrollX: false,  //是不中可以横向滚动;
                scrollY: true,  //是否可以纵向滚动;
                mouseWheel: true, //是否监听鼠标滚轮;
                wheelAction: 'zoom',
                probeType: 2,
                preventDefault: false,
                topOffset: 50
            });
        SCROLL.on('beforeScrollStart', () => {
            SCROLL.refresh();
        });
    }

    render() {
        let data = this.state.data,
            xml = null;
        if(data.identity_data && data.bank_data) {
            xml = (
                <div className="content">
                    <h1>委托扣款授权书</h1>
                    <p>授权人（代扣账户所有人）：</p>
                    <p className="text-indent">单位名称：</p>
                    <p className="flex-box text-indent">或个人姓名：<spna className="border-bottom color-red flex-num1 text-center">{data.identity_data.name}</spna></p>
                    <p className="flex-box text-indent">身份证号码：<spna className="border-bottom color-red flex-num1 text-center">{data.identity_data.id_card}</spna></p>
                    <p>被授权人（向支付机构发送扣款指令人）：<br />
                        <span className="border-bottom color-red text-indent" style={{display: 'block', textAlign: 'center'}}>徙木金融信息服务（上海）有限公司</span></p>
                    <p>第三方支付机构：宝付网络科技（上海）有限公司</p>
                    <p className="text-indent">鉴于授权人与被授权人的合作方（即【 <span className="color-red" style={{textDecoration: 'underline'}}>上海宝象金融信息服务有限公司</span><span className="color-red">—</span><span style={{textDecoration: 'underline'}} className="color-red">平台上的出借人</span>】）签署了《借款合同》（以下简称“合同”），授权人作出如下不可撤销的授权、理解下述各项规定，同意并遵守：</p>
                    <h2 className="flex-box text-indent">一、代扣及转账资金</h2>
                    <p className="flex-box text-indent">1、授权人同意授权被授权人，可以向委托的第三方支付机构-宝付网络科技（上海）有限公司（下称“支付机构”）发送扣款指令，由支付机构提供资金代扣及转账服务。</p>
                    <p className="flex-box text-indent">2、授权人授权被授权人委托的支付机构从授权人在本授权书指定的代扣账户内，按照被委托人扣款指令或资费标准扣除应付的费用并划转至被授权人合作方的账户，而无需在任何一次扣除前取得授权人的同意或通知授权人。</p>
                    <p className="flex-box text-indent">3、授权人指定的代扣账户信息如下：</p>
                    <p className="flex-box text-indent">户名：{data.identity_data.name}</p>
                    <p className="flex-box text-indent">银行账号：{data.bank_data.debit_card.card_number}</p>
                    <p className="flex-box text-indent">开户银行：{data.bank_data.debit_card.open_bank_branch}</p>
                    <p className="flex-box text-indent">身份证号码：{data.identity_data.id_card}</p>
                    <p className="flex-box text-indent">联系人：{data.identity_data.name}</p>
                    <p className="flex-box text-indent">联系电话：{data.bank_data.debit_card.mobile_code}</p>
                    <p className="flex-box text-indent">4、授权人确认并承诺：本授权书中第一条第3款列明的代扣账户为以授权人真实身份开立的合法有效的对公或个人银行结算账户。</p>
                    <h2 className="flex-box text-indent">二、代扣账户信息变更</h2>
                    <p className="flex-box text-indent">授权人承诺并保证确保代扣账户的有效性：</p>
                    <p className="flex-box text-indent">1.授权人变更代扣账户信息的，应至少于当期款项交付日前10个工作日以书面形式通知被授权人和支付机构。</p>
                    <p className="flex-box text-indent">2.因支付机构在收到变更授权人代扣账户通知之前已按照本授权书执行代扣或转账，或因授权人怠于通知所产生的一切责任与支付公司无关，因此产生的后果由授权人承担。</p>
                    <h2 className="flex-box text-indent">三、承诺及保证</h2>
                    <p className="flex-box text-indent">1、授权人在指定账户中必须留有足够余额，否则因账户余额不足或不可归责于被授权人委托方的任何事由，导致无法及时扣款或扣款错误、失败，责任由授权人自行承担。</p>
                    <p className="flex-box text-indent">2、授权人确认并同意：支付机构不对其根据本授权书所做的操作结果作任何承诺或保证。本授权书项下的资金代扣及转账操作相关的任何责任，与支付机构无关，因此产生的后果由授权人承担。</p>
                    <p className="flex-box text-indent">3、授权人保证本授权书的真实性、合法性、有效性，被授权人依据本授权书进行的委托扣款操作引起的一切法律纠纷或风险，由授权人独立承担或解决。</p>
                    <h2 className="flex-box text-indent">四、其他事项</h2>
                    <p className="flex-box text-indent">1、合同效力中止或终止后，本授权书效力同时中止或终止，被授权人暂停或终止委托划付款项，合同效力恢复后，本授权书效力随即恢复。</p>
                    <p className="flex-box text-indent">2、本授权书为授权人对支付机构从其代扣账户中扣款和/或转账的授权证明，不作为收付现金的凭据。</p>
                    <p className="flex-box text-indent">3、本授权书自授权人签字或盖章之日起生效，至授权人通知终止授权、或授权账户终止、或合同效力终止时终止。</p>
                    <br/><br/>
                    <p className="text-right" style={{paddingRight: '50px'}}>授权人（盖章或签名）：{data.identity_data.name}</p>
                    <p className="text-right" style={{paddingRight: '50px'}}>年  月  日</p>
                </div>
            );
        }
        return (
            <div id="Withholding" className="withholding">
                <div className="scroller">
                    {xml}
                </div>
            </div>
        );
    }
}

export default Withholding;