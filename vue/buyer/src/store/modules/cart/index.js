import api from '@api'
export default {
  state: {
    cart: {
      goodsNumber: 0, // 购物车上数量
      show: true // 是否显示购物车
    }
  },
  mutations: {
    getCartGoodsNumber: (state, number) => {
      state.cart.goodsNumber = number
    },
    showCart: (state, isShow) => {
      state.cart.show = isShow
    }
  },
  actions: {
    getCartGoodsNumber ({commit}) {
      api
        .cart
        .getGetCartInfo()
        .then(r => {
          commit('getCartGoodsNumber', r.goods_count)
        })
    },
    showCart ({commit}) {
      api
        .cart
        .getMemberInfo()
        .then(r => {
          let show = true
          if (Number(r.shop_infos.shop_type_number) === 11 ||
            Number(r.shop_infos.shop_type_number) === 12) {
            show = false
          }
          commit('showCart', show)
        })
    }
  },
  getters: {
    cartGoodsNumber: state => state.cart.goodsNumber,
    showCart: state => state.cart.show
  }
}
