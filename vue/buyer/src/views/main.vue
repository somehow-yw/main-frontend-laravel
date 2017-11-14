<!--
---- 首页框架文件
--->
<template>
  <div class="body">
    <div
      class="main-content"
      :class="{full:hideToolBar}">
      <transition name="fade" appear>
        <router-view></router-view>
      </transition>
    </div>
    <div
      class="toolbar"
      :class="{full:hideToolBar}">
      <div
        v-waves
        v-for="(item, idx) in items"
        :class="['item',item.active?'active':'']"
        v-if="item.show"
        @click="jump(item.path, item.external)">
          <div class="iconfont icon">
            <div
              class="badge"
              v-if="item.badge > 0">{{item.badge > 99 ? '...' : item.badge}}</div>
            <span v-html="item.icon"></span>
            <span class="active" v-html="item.icon_active"></span>
          </div>
          <div class="text">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        full: false,
        items: {
          home: {
            name: '首页',
            icon: '&#xe801;',
            icon_active: '&#xe802;',
            path: '/index.php?m=PublicTemplate&c=ApiPublic&a=buyerIndex',
            active: false,
            badge: 0,
            external: true,
            show: true
          },
          cart: {
            name: '购物车',
            icon: '&#xe803;',
            icon_active: '&#xe804;',
            path: '/cart',
            active: false,
            badge: 0,
            external: false,
            show: true
          },
          order: {
            name: '订单',
            icon: '&#xe805;',
            icon_active: '&#xe806;',
            path: '/order',
            active: false,
            badge: 0,
            external: false,
            show: true
          },
          collection: {
            name: '常购',
            icon: '&#xe807;',
            icon_active: '&#xe808;',
            path: '/index.php?m=PublicTemplate&c=ApiPublic&a=oftenbuy#/often',
            external: true,
            active: false,
            badge: 0,
            show: true
          },
          main: {
            name: '我的',
            icon: '&#xe809;',
            icon_active: '&#xe809;',
            path: '/index.php?m=Buyers&c=user&a=info',
            active: false,
            badge: 0,
            external: true,
            show: true
          }
        }
      }
    },
    watch: {
      cartGoodsNumber (val) {
        this.items.cart.badge = val
      },
      showCart (val) {
        this.items.cart.show = val
      },
      // 监听路由变化
      $route (route) {
        // 更新购物车商品数量
        this.$store.dispatch('getCartGoodsNumber')
        // 检测是否显示购物车
        this.$store.dispatch('showCart')
        if (
          route.matched[1].name &&
          route.matched[1].name === 'cart') {
          this.$store.dispatch('hideToolBar')
        } else {
          this.$store.dispatch('showToolBar')
        }
        for (let i in this.items) {
          // 解决路由层级不同意
          if (route.matched.length >= 2) {
            if (i === route.matched[1].name) {
              // todo full值未更新
              this.items[i].active = true
            } else {
              this.items[i].active = false
            }
          } else {
            console.log('路由未找到')
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'cartGoodsNumber',
        'showCart',
        'hideToolBar'
      ])
    },
    created () {
      if (this.$route.matched.length >= 2) {
        let name = this.$route.matched[1].name
        this.items[name].active = true
        if (name === 'cart') {
          this.$store.dispatch('hideToolBar')
        } else {
          this.$store.dispatch('showToolBar')
        }
      } else {
        console.log('路由未找到')
      }
      // 如果访问退款退货订单列表时,不显示底部toolbar
      if (this.$route.params.type === 'refund_goods') {
        this.$store.dispatch('hideToolBar')
      }
    },
    mounted () {
    },
    updated () {
    }
  }
</script>
<style
  scoped
  lang="stylus"
  src="@styl/main.styl"></style>
