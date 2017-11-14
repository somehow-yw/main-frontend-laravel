<template>
  <div
    class="content"
    ref="content">
    <div
      :class="{full: hideToolBar}"
      class="tabs"
      ref="tabs">
      <template v-for="tab in tabs">
        <div
          v-waves
          :class="['tab',routeName === tab.name ? 'active':'']"
          @click="jump(tab.path)">
          <template v-if="tab.name !== 'all'">
            <div
              class="badge"
              v-if="badge[tab.name] > 0">
              {{badge[tab.name]}}
            </div>
          </template>
          <span>{{tab.title}}</span>
        </div>
      </template>
    </div>
    <div
      class="tab-content"
      :class="{full: hideToolBar}"
      ref="scroll">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        routeName: '',
        tabs: [
          {
            title: '全部',
            path: '/order/all',
            name: 'all'
          },
          {
            title: '待付款',
            path: '/order/pending_payment',
            name: 'pending_payment'
          },
          {
            title: '待发货',
            path: '/order/shipment_pending',
            name: 'shipment_pending'
          },
          {
            title: '待收货',
            path: '/order/waiting_for_delivery',
            name: 'waiting_for_delivery'
          },
          {
            title: '待评价',
            path: '/order/waiting_for_evaluation',
            name: 'waiting_for_evaluation'
          }
        ],
        badge: {}
      }
    },
    watch: {
      $route (route) {
        this.$parent.$data.items.order.path =
          `/order/${route.params.type}`
        this.routeName = route.params.type
        if (this.routeName === 'refund_goods') {
          this.$store.dispatch('hideToolBar')
        } else {
          this.$store.dispatch('showToolBar')
        }
        this.getBadge()
      }
    },
    methods: {
      // 获取未操作订单数量
      getBadge () {
        this
          .$api
          .order
          .orderStatusNumber()
          .then(r => {
            this.badge = r
          })
      }
    },
    computed: {
      ...mapGetters([
        'hideToolBar'
      ])
    },
    created () {
      this.getBadge()
      this
        .$parent
        .$data
        .items
        .order.path = `/order/${this.$route.params.type}`
      this.routeName = this.$route.params.type
        ? this.$route.params.type
        : 'all'
    }
  }
</script>
<style
  scoped
  lang="stylus"
  src="@styl/order/index.styl"></style>
