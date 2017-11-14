import Vue from 'vue'
import Router from 'vue-router'
import config from '@config'
const routePrefix = config.routePrefix
Vue.use(Router)
const _import = file => () => import('@views/' + file + '.vue')
export default new Router({
  mode: 'history',
  routes: [
    {
      path: routePrefix,
      name: 'main',
      component: _import('main'),
      meta: {
        title: '找冻品网'
      },
      children: [
        {
          path: 'cart',
          name: 'cart',
          component: _import('cart/index'),
          meta: {
            title: '购物车'
          }
        },
        {
          path: 'order',
          name: 'order',
          component: _import('order/index'),
          meta: {
            title: '订单'
          },
          children: [
            {
              path: '',
              redirect: 'all'
            },
            {
              path: ':type',
              name: 'all',
              component: _import('order/child/all'),
              meta: {
                title: '订单'
              }
            },
            {
              path: ':type/:from',
              name: 'all',
              component: _import('order/child/all'),
              meta: {
                title: '订单'
              }
            }
            // {
            //   path: ':type',
            //   name: 'pending_payment',
            //   component: _import('order/child/all'),
            //   meta: {
            //     title: '待付款'
            //   }
            // },
            // {
            //   path: ':type',
            //   name: 'shipment_pending',
            //   component: _import('order/child/all'),
            //   meta: {
            //     title: '待发货'
            //   }
            // },
            // {
            //   path: ':type',
            //   name: 'waiting_for_delivery',
            //   component: _import('order/child/all'),
            //   meta: {
            //     title: '待收货'
            //   }
            // },
            // {
            //   path: ':type',
            //   name: 'waiting_for_evaluation',
            //   component: _import('order/child/all'),
            //   meta: {
            //     title: '待评价'
            //   }
            // },
            // {
            //   path: ':type',
            //   name: 'refund_goods',
            //   component: _import('order/child/all'),
            //   meta: {
            //     title: '退款/退货'
            //   }
            // }
          ]
        }
      ]
    },
    {
      path: routePrefix + '/refund/:order_no',
      name: 'refund_order',
      component: _import('order/refund'),
      meta: {
        title: '退款退货'
      }
    },
    {
      path: routePrefix + '/refund_money/:order_no',
      name: 'refund_money',
      component: _import('order/refundMoney'),
      meta: {
        title: '退款'
      }
    },
    {
      path: routePrefix + '/update/:order_no',
      name: 'update_order',
      component: _import('order/update'),
      meta: {
        title: '修改订单'
      }
    },
    {
      path: routePrefix + '/order_detail/:order_no',
      name: 'order_detail',
      component: _import('order/order_detail'),
      meta: {
        title: '订单详情'
      }
    },
    {
      path: routePrefix + '/settlement/:ids',
      name: 'settlement',
      component: _import('cart/settlement'),
      meta: {
        title: '确认订单'
      }
    },
    {
      path: routePrefix + '/comment/:order_no',
      name: 'comment',
      component: _import('comment/index'),
      meta: {
        title: '订单评论'
      }
    },
    {
      path: routePrefix + '/re_comment/:order_no',
      name: 're_comment',
      component: _import('comment/re_comment'),
      meta: {
        title: '追加评论'
      }
    },
    {
      path: routePrefix + '/help',
      name: 'help',
      component: _import('help'),
      meta: {
        title: '帮助中心'
      }
    },
    {
      path: routePrefix + '/lous_payment/:order_no',
      name: 'iousPayment',
      component: _import('pay/iousPayment'),
      meta: {
        title: '冻品白条支付'
      }
    },
    {
      path: routePrefix + '/union_pay/:type/:order_no',
      name: 'unionPay',
      component: _import('pay/unionPay'),
      meta: {
        title: '银联支付'
      }
    },
    { path: '*', component: _import('components/notFoundComponent') },
    { path: routePrefix + '/test', component: _import('test') }
  ]
})
