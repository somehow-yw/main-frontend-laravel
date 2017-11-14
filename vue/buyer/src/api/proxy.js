/**
 * Api入口,如果是Vue插件,则以插件方式暴露
 * @type {boolean}
 */

import Vue from 'vue'
const $vue = new Vue()
let _Proxy = (function () {
  function _Proxy (obj, getter) {
    this.target = obj
    let _this = this
    for (let name in obj) {
      Object.defineProperty(_this, name, {
        get: function () {
          return getter.get(_this.target, name)
        }
      })
    }
  }
  return _Proxy
})()
// // 因为iphone低版本的safari的不兼容,暂时弃用
let obj = {
  cart: 'cart',
  comment: 'comment',
  order: 'order',
  other: 'other',
  pay: 'pay'
}
export default new _Proxy(obj, {
  get (target, key) {
    try {
      if (key === 'install') {
        return null
      }
      return require(`@api/${process.env.NODE_ENV}/${key}/index.js`)
    } catch (e) {
      $vue.$auxiliary.toast('ERROR:' + e.message)
      console.error(e)
    }
  }
})
