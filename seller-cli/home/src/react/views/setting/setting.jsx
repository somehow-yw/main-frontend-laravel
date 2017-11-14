/**
 * 卖家中心店铺管理的列表，和之前的店铺管理用的接口是一样的，只是更改了界面
 * @author 魏华东
 */

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shopDetail: {}
        };
    }

    /**
     * 准备工作
     */

    componentDidMount(){
        this.getData();
        this.createScroll();
        H.weSign(['chooseImage', 'uploadImage', 'previewImage']);
    }

    createScroll(){
        let SCROLL = new IScroll('#setting', H.scrollOption);
        this.SCROLL = SCROLL;

        SCROLL.on('beforeScrollStart', () => {
            SCROLL.refresh();
        });
    }

    /**
     * 获取数据
     */
    async getData(){
        H.loading.show();
        await new Promise(resolve => this.getShopDetail(resolve));
        H.loading.hide();
    }

    // 获取店铺详情
    getShopDetail(resolve){
        H.server.getShopInfo({}, (res)=>{
            if(res.status == 0){
                this.setState({
                    shopDetail: res.data
                });
            }else{
                alert(res.message);
            }
            resolve('ok');
        });
    }

    /**
     * 创建View
     */

    // 创建头部
    createHead(){
        let info = this.state.shopDetail;

        return (
            <section className="head">
                <div className="head-img" onClick={this.modifyHeadImg.bind(this)}>
                    {
                        this.state.localHeadImg ?
                            <img src={this.state.localHeadImg} /> :
                            <img src={H.getCdn()+info.cardpic+H.imgSize()[110]}/>
                    }
                </div>
                <div className="head-info">
                    <p className="name">{info.dianpuname}</p>
                    <p className="address"><i className="icon address"></i>{info.xiangxidizi}</p>
                </div>
            </section>
        );
    }

    // 创建操作项
    createList(){
        let info = this.state.shopDetail;

        return (<section className="oper">
            <ul className="oper-list">
                <li onClick={this.change.bind(this, 'name')} className="oper-item"><div className="label"><i className="icon me"></i>你的名字</div><div className="input">{info.xingming} <i className="icon right"></i></div></li>
                <li onClick={this.change.bind(this, 'phone')} className="oper-item"><div className="label"><i className="icon phone-fill"></i>接单电话</div><div className="input">{info.jiedantel} <i className="icon right"></i></div></li>
                <li onClick={this.toMember.bind(this)} className="oper-item"><div className="label"><i className="icon admin"></i>员工管理</div><div className="input"><i className="icon right"></i></div></li>
                <li onClick={this.toShop.bind(this)} className="oper-item"><div className="label"><i className="icon shop"></i>我的店铺</div><div className="input"><i className="icon right"></i></div></li>
                <li onClick={this.change.bind(this, 'intro')} className="oper-item"><div className="label"><i className="icon business"></i>主营业务</div><div className="input">{info.dianpujianjie}<i className="icon right"></i></div></li>
            </ul>
        </section>);
    }

    /**
     * 一些操作
     */

    // 修改信息
    change(type){
        let info = this.state.shopDetail;

        let title = '提示', content = '', callback, params;

        switch (type){
            case 'name':
                title = '修改你的名字';
                content = '<input type="text" id="modify" class="modifyInput" placeholder="请输入你的名字" value="'+info.xingming+'">';
                callback = ()=>{ params = {'userName': document.getElementById('modify').value}; };
                break;
            case 'phone':
                title = '修改接单电话';
                content = '<input type="tel" id="modify" class="modifyInput" placeholder="请输入接单电话" value="'+info.jiedantel+'">';
                callback = ()=>{ params = {'jiedanTel': document.getElementById('modify').value}; };
                break;
            case 'intro':
                title = '修改主营业务';
                content = '<textarea type="tel" id="modify" class="modifyArea" placeholder="请输入主营业务">'+info.dianpujianjie+'</textarea>';
                callback = ()=>{ params = {'shopIntro': document.getElementById('modify').value}; };
                break;
        }

        H.dialog({
            title: title,
            content: '<div class="modify">'+content+'</div>',
            cancel: true,
            okText: '保存信息',
            okCallback: ()=>{
                callback();
                H.server.update(params, (res)=>{
                    if(res.code == 0 || res.status == 0){
                        H.toast('修改成功');
                        this.getData();
                    }else{
                        H.toast(res.message);
                    }
                });
            }
        });

        H.setInputPosition('modify', -1);
    }

    // 去往我的店铺
    toShop(){
        let info = this.state.shopDetail;

        window.location.href = '/index.php?m=PublicTemplate&c=ApiPublic&a=shopShow&shopId='+info.shopid;
    }

    // 去往管理员
    toMember(){
        window.location.href = '#/setting/member';
    }

    // 去往帮助中心
    toHelp(){
        window.location.href = '/index.php?m=PublicTemplate&c=ApiPublic&a=ionicseller#/tab/help';
    }

    headImgHand() {
        H.sheet.create({
            title: '修改店铺头像',
            content: '<div class="actionsheet_cell"><div class="actionsheet_item center" id="upload">上传头像</div></div>' +
            '<div class="actionsheet_cell"><div class="actionsheet_item center" id="bigImg">查看大图</div></div>',
            cancel: '取消'
        });
        $('#upload').click(() => {this.modifyHeadImg();});
        $('#bigImg').click(() => {
            let p = {
                current: this.state.localHeadImg || 'http://test.m.zdongpin.com/Public/images/tspic.png', // 当前显示图片的http链接
                urls: [this.state.localHeadImg || 'http://test.m.zdongpin.com/Public/images/tspic.png'] // 需要预览的图片http链接列表
            };
            wx.previewImage(p);
        });
    }

    //修改头像;
    modifyHeadImg() {
        let that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有;
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有;
            success: function (res) {
                //res={"sourceType":"album","localds":["地址1","地址2"],"errMsg":"chooselmage:ok"};
                var localIds = res.localIds; //返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片;
                wx.uploadImage({
                    localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得;
                    isShowProgressTips: 1, // 默认为1，显示进度提示;
                    success: function(res){
                        H.we_loading.show('上传中');
                        H.server.setHeadPortrait({head_portrait: res.serverId}, (res) => {
                            H.we_loading.hide();
                            if(res.code == 0){
                                that.setState({localHeadImg: localIds[0]});
                                H.operationState('上传成功');
                                //H.sheet.hide();
                            }else{
                                H.operationState(res.message);
                            }
                        });
                    }
                });
            }
        });
    }

    render() {
        return (<div id="setting" className="setting-page">
            <div className="scroller">
                {this.createHead()}
                {this.createList()}
            </div>
        </div>);
    }
}

export default Setting;