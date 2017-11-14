// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from '../views/App.vue'
import Mixins from '@mixins'
Vue.mixin(Mixins)
import Api from '@api/plugin'
Vue.use(Api)
import Auxiliary from 'vue-auxiliary'
Vue.use(Auxiliary)
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
// store
import store from '@store'
// 设置http请求请求中间件
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
// 加载路由
import router from '@router'
// 加载weui.css
// import 'weui/dist/style/weui.min.css'
// 加载公共css文件
import '@styl/common.styl'

Vue.config.productionTip = false

// 导入自定义指令
import './directive'

// 设置网页标题
router.beforeEach((to, from, next) => {
  to.matched.some((record, index, arr) => {
    if (index === arr.length - 1) {
      document.title = record.meta.title ? record.meta.title : '找冻品网'
    }
  })
  let $vue = new Vue()
  $vue.$auxiliary.loading.show()
  next()
})
router.afterEach((to, from, next) => {
  let $vue = new Vue()
  $vue.$auxiliary.loading.hide()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
