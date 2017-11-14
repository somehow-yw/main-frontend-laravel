import * as http from '@api/http'

let url = window.location.href

/**
 * 获取jsSDK签名信息
 * @param _url
 * @returns {Promise<any> | Promise.<signPackage> | *}
 */
export function jsSdkConfig (_url = url) {
  return http
    .post('jsSdk', {
      signPageUrl: _url
    }).then(r => r.signPackage)
}

/**
 * 通过pid获取区域信息
 * @param pid
 */
export function getArea (pid = '') {
  return http
    .get('area', {
      pid: pid
    }).then(r => r.data)
}
