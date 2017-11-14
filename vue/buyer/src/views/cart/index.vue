<template>
  <div class="cart-box">
    <transition name="fade">
      <div
        v-show="showNavigation"
        class="navigation-shadow"></div>
    </transition>
    <div
      :class="{show:showNavigation}"
      class="navigation-content">
      <div
        v-if="!edit"
        @click="showNavigation = !showNavigation"
        class="show-navigation">
        <div class="iconfont icon">{{showNavigation ? '&#xe60d;' :'&#xe60b;'}}</div>
        <div class="text">
          <template v-if="showNavigation">
            <span>收起</span>
          </template>
          <template v-else>
            <span>快速</span>
            <span>导航</span>
          </template>
        </div>
      </div>
      <template v-for="(item,key) in navigation">
        <div
          @click="jump(item.path, item.external)"
          class="item">
          <div class="iconfont icon" v-html="item.icon"></div>
          <div class="text">{{item.name}}</div>
        </div>
      </template>
    </div>
    <div
      @click="edit = !edit"
      class="iconfont edit">{{edit?'&#xe676;':'&#xe67b;'}}</div>
    <div class="cart-content scroll">
      <template v-if="notData">
        <div class="not-product">
          <div class="img">
            <img :src="cartNotProduct">
          </div>
          <div class="not-product-desc">
            购物车尽然是空的,去商城看看吧!!
          </div>
        </div>
      </template>
      <template
        v-for="(item, idx) in productData">
        <div class="goods-list">
          <div class="shop-name">
            <div
              class="iconfont get-all"
              :class="{active: item.select}"
              @click="selectMarket(idx, item)">
              <span>&#xe670;</span>
              <span class="active">&#xe7c0;</span>
            </div>
            <div class="shop-name-text">
              {{ item.market_name }}
            </div>
          </div>
          <template
            v-for="(product,index) in item.goods_infos">
            <div class="goods-item">
              <div
                v-if="!product.effective && !edit"
                class="can-not-action"></div>
              <div
                class="iconfont select-checkbox"
                :class="{active: product.select}"
                @click="selectProduct(idx, index, item)">
                <span>&#xe670;</span>
                <span class="active">&#xe7c0;</span>
              </div>
              <div class="thumb">
                <img :src="cutImg(completePath(product.goods_picture), 80, 0, 2)">
              </div>
              <div class="goods-data">
                <div class="title">{{product.goods_name}}</div>
                <div class="action-bar">
                  <div class="price">￥{{(Number(product.price) * Number(product.buy_number)).toFixed(2)}}元</div>
                  <div class="sum-total">
                    <div
                      class="left"
                      @click="increase(idx,index, item)">
                      <span>﹢</span>
                    </div>
                    <div
                      @click="enterNum(product.buy_number, idx, index, item)"
                      class="center">
                      <span>{{product.buy_number}}</span>
                    </div>
                    <div
                      class="right"
                      @click="reduce(idx, index, item)">
                      <span>﹣</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
      <ui-load-more
        :styles="{marginTop: '2rem'}"
      v-if="firstLoad && !notData"
      message="数据载入中..."
      ></ui-load-more>
    </div>
    <div class="cart-toolbar">
      <div
        class="iconfont cart-select-all"
        :class="{active: selectAll}"
      @click="selectAll = !selectAll">
        <span>&#xe670;</span>
        <span class="active">&#xe7c0;</span>
        <div class="get-all-text">全选</div>
      </div>
      <div class="cart-toolbar-content">
        <template v-if="!edit">
          <div class="real-total">
            <span class="sub">(不含运费)</span>
            <span>
            合计: <span style="color: red;">￥{{Number(cope_total_price).toFixed(2)}}元</span>
          </span>
          </div>
          <div class="total">
          <span>
            总额: {{Number(goods_total_price).toFixed(2)}}元
            <template v-if="Number(reduced_price) > 0">
              优惠{{Number(reduced_price).toFixed(2)}}元
            </template>
          </span>
          </div>
        </template>
        <template v-else>
          <div
            class="add-to-collection">
            <span
              @click="addSomeOftenBuyGoods"
              v-waves>加入常购</span>
          </div>
        </template>
      </div>
      <div
        class="cart-go-pay"
        v-waves
        @click="pay">
        <span>{{edit?'删除':'结算'}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  const Promise = require('es6-promise').Promise
  import uiLoadMore from '@components/loadMoreView.vue'
  import cartNotProduct from '@assets/images/cart-not-product.png'
  export default {
    components: {
      uiLoadMore
    },
    data () {
      return {
        cartNotProduct: cartNotProduct,
        goods_total_price: 0, // 商品总价
        cope_total_price: 0, // 实际支付
        reduced_price: 0, // 优惠金额
        notData: false, // 购物车是否有数据 false有,true没有
        firstLoad: true, // 是否是第一次加载购物车数据
        showNavigation: false, // 显示导航
        navigation: [], // 父级导航数据
        selectAll: false, // 是否全选
        totalPrice: 0, // 购物车选中商品总价格
        edit: false, // 编辑模式
        productData: [],
        loading: null, // 加载中timeauto对象
        selectedCartGoodsIds: '', // 选中商品购物车ID字符串
        goodsIds: '' // 选中商品ID
      }
    },
    watch: {
      /**
       *  监测全选
       */
      selectAll (val) {
        this.productData.forEach((item, idx) => {
          item.select = val
          item.goods_infos.forEach(goods => {
            if (!goods.effective && !this.edit) {
              return false
            }
            goods.select = val
          })
          this.productData.splice(idx, 1, item)
        })
      },
      /**
       * 检测编辑模式
       */
      edit (val) {
        this.productData.forEach((item, idx) => {
          item.goods_infos.forEach(goods => {
            if (!goods.effective &&
              val &&
              item.select) {
              goods.select = true
            } else if (!goods.effective &&
              !val &&
              item.select) {
              goods.select = false
            }
          })
          this.productData.splice(idx, 1, item)
        })
        this.getSelectCartGoodsIds()
      },
      productData () {
        this.getSelectCartGoodsIds()
      }
    },
    methods: {
      // 加入商品到常购
      addSomeOftenBuyGoods () {
        if (!this.goodsIds) {
          this.$auxiliary.toast('请至少选择一个商品')
          return false
        }
        this.$auxiliary.loading.show()
        this
          .$api
          .cart
          .addSomeOftenBuyGoods(this.goodsIds)
          .then(r => {
            this.$auxiliary.loading.hide()
            this.$auxiliary.toast('加入成功')
          })
      },
      /**
       * 获取选中商品
       */
      getSelectCartGoodsIds () {
        this.selectedCartGoodsIds = ''
        this.goodsIds = ''
        this.productData.forEach((market) => {
          market.goods_infos.forEach(goods => {
            if (!goods.effective && !this.edit) {
              return false
            }
            if (goods.select) {
              this.selectedCartGoodsIds +=
                goods.shop_cart_goods_id + ','
              this.goodsIds += goods.goods_id + ','
            }
          })
        })
        this.selectedCartGoodsIds =
          this.selectedCartGoodsIds.substring(
            0, this.selectedCartGoodsIds.length - 1)
        this.goodsIds =
          this.goodsIds.substring(
            0, this.goodsIds.length - 1)
        console.log(this.goodsIds)
        this.getSelectedGoodsTotalPrice()
      },
      /**
       * 新增一个商品数量
       * @param idx 市场索引
       * @param index 市场下商品索引
       * @param item 当前市场数据
       */
      increase (idx, index, item) {
        let num = item.goods_infos[index].buy_number
        this.quantity(
          item.goods_infos[index].shop_cart_goods_id,
          num + 1
        ).then(() => {
          item.goods_infos[index].buy_number += 1
          this.productData.splice(idx, 1, item)
        })
        return false
      },
      /**
       * 减去一个商品数量
       * @param idx 市场索引
       * @param index 市场下商品索引
       * @param item 当前市场数据
       */
      reduce (idx, index, item) {
        let num = item.goods_infos[index].buy_number
        let cartGoodsId = item.goods_infos[index].shop_cart_goods_id
        if (num > 1) {
          this.quantity(
            cartGoodsId,
            num - 1
          ).then(() => {
            item.goods_infos[index].buy_number -= 1
            this.productData.splice(idx, 1, item)
          })
        } else {
          this.$auxiliary.popup.confirm({
            title: '提示',
            message: '确定要从购物车删除该商品吗?',
            callback: (id, close) => {
              close()
              if (id === 'confirm') {
                this.$auxiliary.loading.show()
                this.$api.cart.deleteGoods(cartGoodsId).then(r => {
                  this.$auxiliary.loading.hide()
                  item.goods_infos.splice(index, 1)
                  if (item.goods_infos.length > 0) {
                    this.productData.splice(idx, 1, item)
                  } else {
                    this.productData.splice(idx, 1)
                  }
                })
              }
            }
          })
        }
        return false
      },
      /**
       * 修改服务器商品数量
       */
      quantity (shopCartGoodsId, num) {
        if (this.loading) {
          clearTimeout(this.loading)
        }
        this.loading = setTimeout(() => {
          this.$auxiliary.loading.show()
        }, 200)
        return new Promise((resolve, reject) => {
          this.$api.cart.quantity(
            shopCartGoodsId,
            num).then(r => {
              clearTimeout(this.loading)
              this.$auxiliary.loading.hide()
              if (r.code === 0) {
                resolve()
              } else {
                reject(r.message)
              }
            }
          )
        })
      },
      /**
       * 手动输入数量
       * @param num 当前商品数量
       * @param idx 市场索引
       * @param index 市场下商品索引
       * @param item 当前市场数据
       */
      enterNum (_num, idx, index, item) {
        let cartGoodsId = item.goods_infos[index].shop_cart_goods_id
        this.$auxiliary.popup.prompt({
          title: '商品数量',
          value: _num,
          placeholder: '请输入您需要购买的数量',
          textAlign: 'center',
          submit: (num, close) => {
            num = Number(num)
            close()
            if (num === _num) {
              return false
            }
            if (num && num > 0) {
              this.quantity(
                cartGoodsId,
                num
              ).then(() => {
                item.goods_infos[index].buy_number = num
                this.productData.splice(idx, 1, item)
              })
            } else {
              this.$auxiliary.toast('请输入合理的整数!')
            }
          }
        })
      },
      /**
       * 去支付/删除
       */
      pay () {
        // 编辑模式,当前操作为删除商品
        if (this.edit) {
          this.deleteGoods()
        } else { // 非编辑模式
          if (!this.selectedCartGoodsIds) {
            this.$auxiliary.toast('请至少选择一个商品!')
            return false
          }
          // 临时解决iOS10.0下url地址不更新问题,导致微信支付失败
          // 这里暂时不使用vue的路由,直接使用浏览器跳转方式
          let url = window.location.protocol + '//' + window.location.hostname + '/buyer-client/settlement/' + this.selectedCartGoodsIds
          this.jump(url, true)
        }
      },
      /**
       * 市场全选/全不选
       * @param idx 市场下标
       * @param item 当前市场数据
       */
      selectMarket (idx, item) {
        item.select = !item.select
        item.goods_infos.forEach(goods => {
          // 如果当前商品为无效状态,且不是在编辑模式下,则跳过对当前商品的操作
          if (!goods.effective && !this.edit) {
            return
          }
          goods.select = item.select
        })
        this.productData.splice(idx, 1, item)
      },
      /**
       * 商品选中/为选中
       * @param idx 市场下标
       * @param index 商品下标
       * @param item 市场信息
       */
      selectProduct (idx, index, item) {
        // 当前商品未无效,且不是在编辑模式下,则无法操作
        if (!item.goods_infos[index].effective && !this.edit) {
          return false
        }
        item.goods_infos[index].select =
          !item.goods_infos[index].select

        // 如果当前商品未反选中,设置当前市场为未选中
        if (!item.goods_infos[idx].select) {
          item.select = false
        }
        // 检测当前市场商品是否全部选中(无效商品除外)
        // 检测商品是否全部选中(无效商品除外)
        let allGoodsSelect = true
        item.goods_infos.forEach(goods => {
          if (!goods.effective && !this.edit) {
            return false
          }
          if (!goods.select) {
            allGoodsSelect = false
          }
        })
        item.select = allGoodsSelect
        // 更新数据
        this.productData.splice(idx, 1, item)
      },
      // 获取选中商品价格信息
      getSelectedGoodsTotalPrice () {
        if (this.edit) {
          return false
        }
        console.log(this.selectedCartGoodsIds)
        this.$api.cart.getSelectedGoodsTotalPrice(this.selectedCartGoodsIds)
            .then(r => {
              this.goods_total_price = r.goods_total_price // 商品总价
              this.cope_total_price = r.cope_total_price // 实际支付
              this.reduced_price = r.reduced_price // 优惠金额
            })
      },
      // 删除购物车商品
      deleteGoods () {
        if (!this.selectedCartGoodsIds) {
          this.$auxiliary.toast('请选择要删除的商品!')
          return false
        }
        this.$auxiliary.loading.show()
        this.$api
          .cart
          .deleteGoods(this.selectedCartGoodsIds)
          .then(() => {
            this.$auxiliary.loading.hide()
            // 利用JSON.stringify 实现数组深度拷贝
            let products = JSON.parse(JSON.stringify(this.productData))
            let data = products.map((market) => {
              market.goods_infos = market.goods_infos.filter(goods => {
                return (this
                  .selectedCartGoodsIds
                  .indexOf(goods.shop_cart_goods_id) === -1)
              })
              if (market.goods_infos.length >= 0) {
                return market
              } else {
                return null
              }
            }).filter(market => {
              return market.goods_infos.length > 0
            })
            this.productData = data
            if (this.productData.length <= 0) {
              this.notData = true
              this.edit = false
              this.selectAll = false
              this.goods_total_price = 0 // 商品总价
              this.cope_total_price = 0 // 实际支付
              this.reduced_price = 0 // 优惠金额
            }
          })
      }
    },
    created () {
      /**
       * 获取购物车数据
       */
      this.firstLoad = true
      this.notData = false
      this.$api.cart.cartData().then(r => {
        this.firstLoad = false
        if (this.isEmptyObject(r) ||
          this.isEmptyObject(r.market_info)) {
          this.notData = true
          return false
        }
        this.goods_total_price = r.buy_prices.goods_total_price
        this.reduced_price = r.buy_prices.reduced_price
        this.cope_total_price = r.buy_prices.cope_total_price
        this.productData = r.market_info
        this.productData.forEach((item) => {
          item.select = true // 设置全部市场选中
          item.goods_infos.forEach(goods => {
            goods.effective = true // 设置全部商品为有效
            goods.select = true // 设置全部商品选中
            if (goods.goods_status !== 2 ||
              goods.price_expired ||
              goods.on_sale !== 2) {
              goods.select = false // 设置当前商品未选中
//              item.select = false // 设置当前市场未选中
              goods.effective = false // 设置当前商品无效
              return false
            }
          })
        })
        this.selectAll = true
      })
      // 深度拷贝父级导航栏数据
      this.navigation = this.deepClone(this.$parent.$data.items)
      delete this.navigation['cart']
      this.navigation.feedback = {
        name: '反馈',
        icon: '&#xe624;',
        path: '/index.php?m=PublicTemplate&c=ApiPublic&a=userFeedback',
        active: false,
        badge: 0,
        external: true,
        show: true
      }
      this.navigation.help = {
        name: '帮助',
        icon: '&#xe658;',
        path: '/Public/html/help.html ',
        active: false,
        badge: 0,
        external: true,
        show: true
      }
    }
  }
</script>
<style scoped lang="stylus" src="@styl/cart/index.styl"></style>
