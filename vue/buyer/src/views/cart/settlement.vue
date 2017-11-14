<template>
  <div class="content">
    <div
      @click="jump('/Public/html/help.html', true)"
      class="help">帮助</div>
    <div class="content-body">
      <div class="hint">支付方式</div>
      <div class="list">
        <div
          class="item"
          v-waves
          @click="payMethod = 1">
          <div class="item-content">
            <div class="item-content-box">
              <div
                class="iconfont icon"
                :class="{active: payMethod === 1}">
                <span>&#xe670;</span>
                <span class="active">&#xe7c0;</span>
              </div>
              <div class="text">在线支付</div>
            </div>
          </div>
        </div>
        <!--二级item Begin-->
        <!--<div v-waves class="item">-->
          <!--<div class="item-content">-->
            <!--<div class="item-content-box child">-->
              <!--<div class="iconfont icon">-->
                <!--<span>&#xe670;</span>-->
                <!--<span class="active">&#xe7c0;</span>-->
              <!--</div>-->
              <!--<div class="text">微信支付</div>-->
              <!--<div class="hint">查看余额</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div v-waves class="item">-->
          <!--<div class="item-content">-->
            <!--<div class="item-content-box child">-->
              <!--<div class="iconfont icon active">-->
                <!--<span>&#xe670;</span>-->
                <!--<span class="active">&#xe7c0;</span>-->
              <!--</div>-->
              <!--<div class="text">银行卡快捷支付</div>-->
              <!--<div class="hint">查看余额</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--二级item End-->
        <div
          class="item"
          v-waves
          @click="payMethod = 6">
          <div class="item-content">
            <div class="item-content-box">
              <div
                class="iconfont icon"
                :class="{active: payMethod === 6}">
                <span>&#xe670;</span>
                <span class="active">&#xe7c0;</span>
              </div>
              <div class="text">
                <span>集采后支付</span>
                <span class="sub">(什么是集采)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hint">收货方式</div>
      <div class="list">
        <div class="item">
          <div class="item-content">
            <div class="item-content-box" v-waves>
              <div
                @click="logisticsMode = 2"
                :class="['iconfont', 'icon',logisticsMode === 2?'active':'']">
                <span>&#xe670;</span>
                <span class="active">&#xe7c0;</span>
              </div>
              <div
                @click="logisticsMode = 2"
                class="text">买家找车</div>
            </div>
            <div class="item-content-box" v-waves>
              <div
                @click="logisticsMode = 3"
                :class="['iconfont', 'icon',logisticsMode === 3?'active':'']">
                <span>&#xe670;</span>
                <span class="active">&#xe7c0;</span>
              </div>
              <div
                @click="logisticsMode = 3"
                class="text">
                <span>卖家找车</span>
              </div>
            </div>
          </div>
        </div>
        <template v-if="logisticsMode === 2">
          <template
            v-for="(market, idx) in voitureInfo">
            <div
              class="item"
              @click="showEdit(market,idx)">
              <div class="item-content">
                <div class="item-content-box child">
                  <div class="text">{{market.market_name}}</div>
                  <div
                    class="hint"
                    v-if="market.infos.length <= 0">请输入车辆信息</div>
                  <div
                    class="hint"
                    v-else>修改车辆信息</div>
                  <div
                    class="iconfont icon-right"
                    v-if="market.infos.length > 0">&#xe67b;</div>
                </div>
              </div>
            </div>
            <template
              v-if="market.infos.length > 0">
              <div class="item">
                <div class="item-content">
                  <div class="item-content-box child">
                    <div
                      class="text"
                      style="font-size: 0.9rem;color: #999;">司机电话</div>
                    <div class="hint">{{market.infos[0].driver_tel}}</div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="item-content">
                  <div class="item-content-box child">
                    <div
                      class="text"
                      style="font-size: 0.9rem;color: #999;">车牌号码</div>
                    <div class="hint">{{market.infos[0].license_plates}}</div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="item-content">
                  <div class="item-content-box child">
                    <div
                      class="text"
                      style="font-size: 0.9rem;color: #999;">停放位置</div>
                    <div class="hint">{{market.infos[0].vehicle_location}}</div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="item-content"
                     @click="showDatePicker = true;marketInfo = market.infos[0]">
                  <div class="item-content-box child">
                    <div
                      class="text"
                      style="font-size: 0.9rem;color: #999;">装车时间</div>
                    <div class="hint">{{market.infos[0].time ? market.infos[0].time : '请选择'}}</div>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </template>
        <template v-if="logisticsMode === 3">
          <div
            v-waves
            v-if="!isEmptyObject(address)"
            @click="showChooseAddress = true"
            class="logistics-item">
            <div class="iconfont icon">&#xe60c;</div>
            <div class="content">
              <div class="concat">
                {{address.contacts}}  {{address.phone}}
              </div>
              <div class="address-detail">
                {{address.province_name}}
                {{address.city_name}}
                {{address.county_name}}
                {{address.address}}
              </div>
            </div>
            <div class="iconfont icon-right">&#xe625;</div>
          </div>
          <div
            v-waves
            v-else
            @click="showChooseAddress = true"
            class="logistics-item">
            <div class="iconfont icon">&#xe60c;</div>
            <div class="content" style="text-align: right">
              请选择收货地址
            </div>
            <div class="iconfont icon-right">&#xe625;</div>
          </div>
        </template>
      </div>
    </div>
    <div class="content-footer">
      <div class="pay-info">
        <div class="pay-total">
          <span>合计:&nbsp;&nbsp;</span>
          <span class="price">{{Number(cope_total_price).toFixed(2)}}元</span>
        </div>
        <div class="desc">
          <span>
            总额:&nbsp;&nbsp;{{Number(goods_total_price).toFixed(2)}}元
            <template v-if="Number(reduced_price) > 0">
              优惠{{Number(reduced_price).toFixed(2)}}元
            </template>
          </span>
          <span>(不含运费)</span>
        </div>
      </div>
      <div
        class="pay-button"
        @click="submit">
        <span>{{payMethod === 1?'去支付':'下单'}}</span>
      </div>
    </div>
    <input-items
    :show="showInputItems"
    :inputs-item="inputsItem"
    :z-index="1"
    @click-area="showDistpicker = true"
    :bg-event="true"
    @submit="itemSubmit"
    @close="result => showInputItems = result"
    ></input-items>
    <choose-address
      @edit="editAddress"
      :show="showChooseAddress"
      :address-item="addressItem"
      :bg-event="false"
      @select="getChooseAddress"
      @create="showCreateAddress"
      :buttons="chooseButtons"
      :title="addressItem.length > 0 ? '请选择收货地址' :'请添加收货地址'"
      @data="r => address = r"
      @delete="deleteAddress"
      @close="result => showChooseAddress = result"
    ></choose-address>
    <pay-methods
      title="请选择支付方式"
      :order-no="orderNo"
      :pay-methods="payMethodsData"
      @close="showPayMethods = false;jump('/order/pending_payment', false, true)"
      from="settlement"
      @wechat-pay-success="jump('/order/shipment_pending/pay_back')"
      :show="showPayMethods"></pay-methods>
    <!--<weui-distpicker-->
      <!--:province="510000"-->
      <!--:city="510100"-->
      <!--:area="510104"-->
      <!--@change="changeDistpicker"-->
      <!--@cancel="showDistpicker = false"-->
      <!--@confirm="showDistpicker = false"-->
      <!--v-if="showDistpicker"-->
    <!--&gt;</weui-distpicker>-->
    <select-area
      :show="showDistpicker"
      :z-index="1000"
      @close="showDistpicker = false"
      @submit="changeDistpicker"></select-area>
    <date-picker
      :show="showDatePicker"
      @close="showDatePicker = false"
      @change="r => marketInfo.time = r"></date-picker>
  </div>
</template>
<script>
  import datePicker from '@components/datePicker'
  import selectArea from '@components/area.vue'
  import inputItems from '@components/inputItems.vue'
  import chooseAddress from '@components/chooseAddress'
//  import weuiDistpicker from 'weui-distpicker'
  import payMethods from '@components/payMethods'
  export default {
    components: {
      inputItems,
      chooseAddress,
      selectArea,
//      weuiDistpicker,
      payMethods,
      datePicker
    },
    data () {
      return {
        marketInfo: {},
        showDatePicker: false,
        // 支付方式列表
        payMethodsData: [],
        // 选择支付方式弹窗
        showPayMethods: false,
        // 添加收货地址时用于零时储存区域信息
        areaInfo: null,
        // 商品总价
        goods_total_price: 0,
        cope_total_price: 0,
        // 实际支付
        reduced_price: 0,
        // 优惠金额
        payMethod: 1,
        // 支付方式 0未选择, 1在线支付, 6集采后支付
        logisticsMode: 2,
        // 物流方式，1未选择,2买家找车,3卖家找车
        showInputItems: false,
        // 是否显示添加车辆信息弹出层
        ids: '',
        // 弹出层item列表参数
        inputsItem: [],
        // 是否显示选择收货地址弹出层
        showChooseAddress: false,
        // 卖家找车收货地址
        address: {},
        // 收货地址列表
        addressItem: [],
        // 市场车辆信息
        voitureInfo: [],
        // 当前市场索引
        thisMarket: null,
        // 选择收货地址底部按钮
        chooseButtons: [],
        // 显示区域选择
        showDistpicker: false,
        // inputItem操作项, cart操作车辆信息, address:操作所有地址
        inputItemType: 'cart',
        // 支付时订单编号, 这里应该是下单成功之后后端返回
        orderNo: ''
      }
    },
    watch: {
      addressItem (val) {
        this.chooseButtons = [
          {
            text: '关闭'
          }
        ]
        if (val.length < 5) {
          this.chooseButtons.push(
            {
              id: 'create',
              text: '添加',
              is_close: false,
              style: {
                backgroundColor: '#249af9',
                color: '#ffffff'
              }
            })
        }
        this.address = val[0]
      }
    },
    methods: {
      /**
       * 提交订单
       */
      submit () {
        let data = {}
        data.shop_cart_goods_ids = this.ids
        data.payment_method = this.payMethod
        data.logistics_method = this.logisticsMode
        data.pay_amount = this.cope_total_price

        if (this.logisticsMode === 2) {
          data.vehicles_info_ids = []
          console.log('submit:', this.voitureInfo)
          this.voitureInfo.forEach((item) => {
            let info = {}
            info.market_id = item.market_id
            info.vehicles_id = item.infos[0].vehicles_id
            info.arrive_time = item.infos[0].time
            if (info.arrive_time.indexOf('.') > -1) {
              info.arrive_time = (info.arrive_time)
                .substring(0, info.arrive_time.indexOf('.'))
            }
            data.vehicles_info_ids.push(info)
          })
        } else if (this.logisticsMode === 3) {
          data.take_info_id = this.address.id
        }

        this.$auxiliary.loading.show()
        this.$api.cart.createOrder(data)
            .then(r => {
              this.orderNo = r.main_order_no
              // TODO 订单创建成功,等待后续处理
              if (this.payMethod === 1) {
                // 在线支付
                // 获取支付方式
                this
                  .$api
                  .pay
                  .payMethods(this.orderNo)
                  .then(r => {
                    // 如果价格发生变动,则不能进行支付
                    if (typeof r.remind !== 'undefined') {
                      this.$auxiliary.toast(r.remind)
                      return false
                    }
                    this.$auxiliary.loading.hide()
                    this.showPayMethods = true
                    this.payMethodsData = r
                  })
              } else if (this.payMethod === 6) {
                // 集采
                this.$auxiliary.toast('下单成功,请等待卖家报价!')
                this.jump('/order/pending_payment', false, true)
              }
            })
      },
      /**
       * 删除收货地址
       * @param id
       */
      deleteAddress (id) {
        this.$auxiliary.popup.confirm({
          title: '提示',
          message: '确定要删除吗?',
          callback: (_, close) => {
            if (_ === 'close') {
              return false
            }
            close()
            this.$auxiliary.loading.show()
            this.$api.cart.deleteAddress(id)
              .then(r => {
                this.$auxiliary.loading.hide()
                let addressItem = this.addressItem.filter(address => {
                  return parseInt(address.id) !== parseInt(id)
                })
                this.addressItem = addressItem
              })
          }
        })
      },
      // 编辑收货地址
      editAddress (data) {
        this.$auxiliary.loading.show()
        this.$api.cart.updateAddress(
          data.id,
          {
            contacts: data.concat_name, // 联系人
            contact_tel: data.concat_mobile, // 联系电话
            address: data.address, // 详细地址
            province_id: data.area.province.id,
            city_id: data.area.city.id,
            county_id: data.area.county.id
          }
        ).then(r => {
          this.$auxiliary.loading.hide()
          let _idx = null
          let address = this.addressItem.filter((address, idx) => {
            if (address.id === data.id) {
              _idx = idx
              return true
            }
          })[0]
          console.log(data)
          address.address = data.address
          address.city_id = data.area.city.id
          address.city_name = data.area.city.name
          address.county_id = data.area.county.id
          address.county_id = data.area.county.name
          address.province_id = data.area.province.id
          address.province_id = data.area.province.name
          address.contacts = data.concat_name
          address.phone = data.concat_mobile
          this.addressItem.splice(_idx, 1, address)
        })
      },
      // 添加地址时获取区域信息
      changeDistpicker (data) {
        this.areaInfo = data
        console.log(data)
        this.inputsItem[2].value = data.province.name + ' ' + data.city.name + ' ' + data.county.name
      },
      // 添加收货地址
      createAddress (data) {
        if (!data.concat_name) {
          this.$auxiliary.toast('请填写收货地姓名')
          return false
        }
        if (!data.concat_mobile) {
          this.$auxiliary.toast('请填写联系电话')
          return false
        }
        if (!data.area) {
          this.$auxiliary.toast('请选择所在区域')
          return false
        }
        if (!data.address) {
          this.$auxiliary.toast('请填写详细地址')
          return false
        }
        this.$auxiliary.loading.show()
        this.$api.cart.createAddress({
          contacts: data.concat_name, // 联系人
          contact_tel: data.concat_mobile, // 联系电话
          address: data.address, // 详细地址
          province_id: this.areaInfo.province.id,
          city_id: this.areaInfo.city.id,
          county_id: this.areaInfo.county.id
        }).then(r => {
          this.addressItem.push({
            address: data.address,
            city_id: this.areaInfo.city.id,
            city_name: this.areaInfo.city.name,
            contacts: data.concat_name,
            county_id: this.areaInfo.county.id,
            county_name: this.areaInfo.county.name,
            id: r.id,
            phone: data.concat_mobile,
            is_default: 2,
            province_id: this.areaInfo.province.id,
            province_name: this.areaInfo.province.name
          })
          this.showInputItems = false
          this.$auxiliary.loading.hide()
        })
      },
      // 获取选中的地址
      getChooseAddress (idx, data) {
        this.address = data
        this.showChooseAddress = false
      },
      // 显示添加收货地址事件
      showCreateAddress () {
        this.inputItemType = 'address'
        this.inputsItem = [
          {
            id: 'concat_name',
            name: '收货人',
            type: 'text',
            value: '',
            placeholder: '请填写收货人姓名',
            showIconRight: false,
            disabled: false
          },
          {
            id: 'concat_mobile',
            name: '联系电话',
            type: 'text',
            value: '',
            placeholder: '请填写联系电话',
            showIconRight: false,
            disabled: false
          },
          {
            id: 'area',
            name: '所在地区',
            type: 'text',
            value: '',
            placeholder: '请选择所在区域',
            showIconRight: true,
            disabled: true
          },
          {
            id: 'address',
            name: '详细地址',
            type: 'text',
            value: '',
            placeholder: '请填写详细地址(精确到门牌号)',
            showIconRight: false,
            disabled: false
          }
        ]
        this.showInputItems = true
      },
      // 显示车辆编写信息
      showEdit (market, idx) {
        this.inputItemType = 'cart'
        this.thisMarket = idx
        if (market.infos.length > 0) {
          // 如果为修改,则注入默认值
          this.inputsItem = [
            {
              id: 'driver_tel',
              name: '司机电话',
              type: 'text',
              value: market.infos[0].driver_tel,
              placeholder: '请填写司机联系电话',
              disabled: false
            },
            {
              id: 'license_plates',
              name: '车牌号码',
              type: 'text',
              value: market.infos[0].license_plates,
              placeholder: '请填写车牌号码',
              disabled: false
            },
            {
              id: 'vehicle_location',
              name: '装货位置',
              type: 'text',
              value: market.infos[0].vehicle_location,
              placeholder: '请填写车辆停放位置',
              disabled: false
            }
          ]
        } else {
          this.inputsItem = [
            {
              id: 'driver_tel',
              name: '司机电话',
              type: 'text',
              value: '',
              placeholder: '请填写司机联系电话',
              disabled: false
            },
            {
              id: 'license_plates',
              name: '车牌号码',
              type: 'text',
              value: '',
              placeholder: '请填写车牌号码',
              disabled: false
            },
            {
              id: 'vehicle_location',
              name: '装货位置',
              type: 'text',
              value: '',
              placeholder: '请填写车辆停放位置',
              disabled: false
            }
          ]
        }
        this.showInputItems = true
      },
      // inputItem组件提交事件
      itemSubmit (data) {
        if (this.inputItemType === 'cart') {
          this.getCartInfo(data)
        } else if (this.inputItemType === 'address') {
          this.createAddress(data)
        }
      },
      // 获取用户现在的车辆信息
      getCartInfo (data) {
        console.log('getCartInfo:', data)
        let market = this.voitureInfo[this.thisMarket]

        if (!data.driver_tel) {
          this
            .$auxiliary
            .toast('请填写司机电话')
          return false
        }
        if (!data.license_plates) {
          this
            .$auxiliary
            .toast('请填写车牌号码')
          return false
        }
        if (!data.vehicle_location) {
          this
            .$auxiliary
            .toast('请填写装货位置')
          return false
        }

        data.market_id = market.market_id
        console.log('updateVehicles:updateVehicles:', data)
        this.$auxiliary.loading.show()
        if (market.infos.length > 0) { // 修改
          this
            .$api
            .cart
            .updateVehicles(market.infos[0].vehicles_id, data)
            .then(r => {
              this.$auxiliary.loading.hide()
              this.$auxiliary.toast('修改成功')
              data.vehicles_id = r.id
              market.infos[0] = data
              this.showInputItems = false
            }
          )
        } else { // 新增
          this.$api.cart.createVehicles(data)
              .then(r => {
                console.log('getCartInfo:create:', r)
                this.$auxiliary.loading.hide()
                this.$auxiliary.toast('添加成功')
                data.vehicles_id = r.id
                market.infos[0] = data
                this.showInputItems = false
              }
            )
        }
        this.voitureInfo.splice(this.thisMarket, 1, market)
        console.log('getCartInfo:', this.voitureInfo)
      },
      // 获取商品价格信息
      getSelectedGoodsTotalPrice () {
        this.$api.cart.getSelectedGoodsTotalPrice(this.ids)
            .then(r => {
              this.goods_total_price = r.goods_total_price // 商品总价
              this.cope_total_price = r.cope_total_price // 实际支付
              this.reduced_price = r.reduced_price // 优惠金额
            })
      },
      // 获取商品结算信息
      getData () {
        let loading =
          setTimeout(() => {
            this.$auxiliary.loading.show()
          })
        this
          .$api
          .cart
          .settlementInfo(this.ids)
          .then(r => {
            clearTimeout(loading)
            this.$auxiliary.loading.hide()
            this.voitureInfo = r.voiture_info
            this.addressItem = r.take_infos
            this.address = this.addressItem[0]
          })
      }
      // 获取微信jsSDK 签名配置
//      weChatConfig () {
//        this
//          .$api
//          .other
//          .jsSdkConfig()
//          .then(r => {
//            weChatSDK.config({
//              debug: false,
//              appId: r.appId,
//              timestamp: r.timestamp,
//              nonceStr: r.nonceStr,
//              signature: r.signature,
//              jsApiList: this.weChatApiList
//            })
//          })
//          .catch(e => {
//
//          })
//      }
    },
    created () {
      this.ids = this.$route.params.ids
      this.getData()
      this.getSelectedGoodsTotalPrice()
      // 获取微信配置
//      this.weChatConfig()
    }
  }
</script>
<style
  scoped
  lang="stylus"
  src="@styl/cart/settlement.styl"></style>
