<!--
---- 首页框架文件
--->
<template>
  <div class="body">
    <div
      class="main-content"
      :class="{full: hideToolBar}">
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
        items: {
          home: {
            name: '首页',
            icon: '&#xe621;',
            icon_active: '&#xe621;',
            path: '/index.php?m=Home',
            external: true,
            active: false,
            badge: 0
          },
          cart: {
            name: '商品',
            icon: '&#xe620;',
            icon_active: '&#xe620;',
            path: '/index.php?m=PublicTemplate&c=ApiPublic&a=sellerGoodsListPage#my-goods',
            external: true,
            active: false,
            badge: 0
          },
          order: {
            name: '订单',
            icon: '&#xe6d6;',
            icon_active: '&#xe6d6;',
            path: '/order',
            external: false,
            active: false,
            badge: 0
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'hideToolBar'
      ])
    },
    watch: {
      $route (route) {
        for (let i in this.items) {
          // 解决路由层级不同意
          if (route.matched.length >= 2) {
            if (i === route.matched[1].name) {
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
    created () {
      this.$store.dispatch('refreshTypeCount')
      if (this.$route.matched.length >= 2) {
        this.items[this.$route.matched[1].name].active = true
      } else {
        console.log('路由未找到')
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
