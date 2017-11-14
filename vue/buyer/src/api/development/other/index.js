const Promise = require('es6-promise').Promise
import * as http from '@api/http'
let url = window.location.href
/**
 * 获取微信js sdk 签名
 * @param _url
 * @returns {Promise<any>}
 */
export function jsSdkConfig (_url = url) {
  let data = {
    status: 0,
    message: 'ok',
    signPackage: {
      appId: 'wxdfd8ecdd1ae6f5f1',
      nonceStr: '4mdja9bq18OkhcaV',
      timestamp: 1507880640,
      url: 'http://test.m.zdongpin.com/index.php?m=PublicTemplate&c=ApiPublic&a=buyerIndex&code=011ZN4ug0zw3eB1lwctg0W1lug0ZN4uY&state=zdongpin',
      signature: '212b994afee67c240b617936ac323a7d594c768b',
      rawString: 'jsapi_ticket=kgt8ON7yVITDhtdwci0qef-5GBSBxAWHpYiM04COEOdL6KA2J9_0Ko55gnNJ7PhdBc2Sqeua-m4Vv4brn3y37w&noncestr=4mdja9bq18OkhcaV&timestamp=1507880640&url=http://test.m.zdongpin.com/index.php?m=PublicTemplate&c=ApiPublic&a=buyerIndex&code=011ZN4ug0zw3eB1lwctg0W1lug0ZN4uY&state=zdongpin',
      jsapiTicket: 'kgt8ON7yVITDhtdwci0qef-5GBSBxAWHpYiM04COEOdL6KA2J9_0Ko55gnNJ7PhdBc2Sqeua-m4Vv4brn3y37w'
    }
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.signPackage)
    }, 1000)
  })
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
