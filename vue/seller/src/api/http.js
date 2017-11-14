require('es6-promise').polyfill()
import axios from 'axios'
import config from '@config'
import Vue from 'vue'
import qs from 'qs'
const Promise = require('es6-promise').Promise
let $vue = new Vue()
let instance = axios.create({
  baseURL: config.baseUri
})
let headers = {
  // 'Accept': '*/*',
  'Accept': 'application/json',
  // 'Content-Type': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
}
/**
 * @purpose http POST 请求
 * @param path
 * @param data
 * @param type 请求方式 json   formData
 */
export function post (path = '', data = {}, type = 'json') {
  let url = _getApi(path)
  if (!url) {
    $vue.$auxiliary.loading.hide()
    return new Promise((resolve, reject) => {
      $vue.$auxiliary.toast(
        'Parameter [path] cannot is empty')
      reject(new Error(
        'Parameter [path] cannot is empty'))
    })
  }
  if (type === 'formData') {
    headers.Accept = '*/*'
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: headers,
      transformRequest: [data => {
        if (type === 'json') {
          return JSON.stringify(data)
        } else if (type === 'formData') {
          return qs.stringify(data)
        }
      }]
    }).then(r => {
      console.log('post:', r)
      $vue.$auxiliary.loading.hide()
      if (r.status === 200) {
        if (typeof r.data === 'undefined' ||
          r.data === '' ||
          $vue.isEmptyObject(r.data) ||
        !r.data) {
          $vue.$auxiliary.toast(
            '服务器响应数据为空')
          console.warn(
            'Error returning data format. Response is empty!',
            url)
          reject(new Error('服务器响应数据为空'))
          return
        }
        if (typeof r.data.status === 'undefined' &&
          typeof r.data.code === 'undefined') {
          $vue.$auxiliary.toast('服务器未响应状态码！')
          reject(new Error('服务器未响应状态码'))
          return false
        }
        if ((typeof r.data.status !== 'undefined' &&
            parseInt(r.data.status) !== 0) ||
          (typeof r.data.code !== 'undefined' &&
            parseInt(r.data.code) !== 0)) {
          $vue.$auxiliary.toast(r.data.message)
          reject(new Error(r.data.message))
          return false
        }
        resolve(r.data)
      } else {
        $vue.$auxiliary.toast('网络不给力,请稍后再试!')
        reject(new Error('请求错误: ', r))
      }
    }).catch(e => {
      $vue.$auxiliary.loading.hide()
      $vue.$auxiliary.toast('网络不给力,请稍后再试!')
      reject(new Error('请求错误: ', e))
    })
  })
}
/**
 * @purpose http GET 请求
 * @param path
 * @param data
 */
export function get (path = '', data = {}) {
  let url = _getApi(path)
  if (!url) {
    $vue.$auxiliary.loading.hide()
    return new Promise((resolve, reject) => {
      $vue.$auxiliary.toast('Parameter [path] cannot is empty')
      reject(new Error('Parameter [path] cannot is empty'))
    })
  }
  return new Promise((resolve, reject) => {
    instance.get(url, {params: data}, {
      headers: headers
    }).then(r => {
      $vue.$auxiliary.loading.hide()
      if (r.status === 200) {
        if (typeof r.data === 'undefined' ||
          r.data === '' ||
          $vue.isEmptyObject(r.data) ||
          !r.data) {
          $vue.$auxiliary.toast(
            '服务器响应数据为空')
          console.warn(
            'Error returning data format. Response is empty!',
            url)
          reject(new Error('服务器响应数据为空'))
          return
        }
        if (typeof r.data.status === 'undefined' &&
          typeof r.data.code === 'undefined') {
          $vue.$auxiliary.toast('服务器未响应状态码！')
          reject(new Error('服务器未响应状态码'))
          return false
        }
        if ((typeof r.data.status !== 'undefined' &&
            parseInt(r.data.status) !== 0) ||
          (typeof r.data.code !== 'undefined' &&
            parseInt(r.data.code) !== 0)) {
          $vue.$auxiliary.toast(r.data.message)
          reject(new Error(r.data.message))
          return false
        }
        resolve(r.data)
      } else {
        $vue.$auxiliary.toast('网络不给力,请稍后再试!')
        reject(new Error('请求错误: ', r))
      }
    }).catch(e => {
      $vue.$auxiliary.loading.hide()
      $vue.$auxiliary.toast('网络不给力,请稍后再试!')
      reject(new Error('请求错误: ', e))
    })
  })
}
/**
 * @purpose 获取api路径
 * @param path
 * @private
 */
function _getApi (path) {
  if (!path) {
    $vue.$auxiliary.toast(`Api '${path}' is not found`)
    return false
  }
  let api = require('@config/api')
  if (api.default) {
    api = api.default
  }
  if (path.indexOf('.') < 0) {
    return api[path]
  }
  path = path.split('.')
  path.forEach(item => {
    api = api[item]
  })
  return api
}
