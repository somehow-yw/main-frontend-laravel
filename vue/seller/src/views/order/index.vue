<template>
  <div
    class="content"
    ref="content">
    <div class="tabs" ref="tabs"
         :class="{full: hideToolBar}">
      <template v-for="tab in tabs">
        <div
          v-waves
          :class="['tab',routeName === tab.name?'active':'']"
          @click="jump(tab.path)">
          <div
            class="badge"
            v-if="typeCount[tab.name] > 0 && tab.name !== 'all'">
            {{typeCount[tab.name]}}
          </div>
          <span>{{tab.title}}</span>
        </div>
      </template>
    </div>
    <div
      class="tab-content"
      :class="{full: hideToolBar}"
      ref="scroll">
      <transition name="fade" appear>
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
        routeName: 'all',
        tabs: [
          {
            title: '全部订单',
            path: '/order/all',
            name: 'all'
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
            title: '退款/退货',
            path: '/order/refund_goods',
            name: 'refund_goods'
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'typeCount',
        'hideToolBar'
      ])
    },
    watch: {
      $route (route) {
        this.$parent.$data.items.order.path =
          `/order/${route.params.type}`
        this.routeName = route.params.type
        this.$store.dispatch('refreshTypeCount')
      }
    },
    methods: {
    },
    mounted () {
//      this.scroll = this.$refs.scroll
      this.$parent.$data.items.order.path =
        `/order/${this.$route.params.type}`
      this.routeName = this.$route.params.type ? this.$route.params.type : 'all'
    }
  }
</script>
<style
  scoped
  lang="stylus"
  src="@styl/order/index.styl"></style>
