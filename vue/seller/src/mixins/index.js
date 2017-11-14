import config from '@config'
export default {
  methods: {
    /**
     * 判断一个对象是否为空对象 `{}`
     * @param obj
     * @returns {boolean}
     */
    isEmptyObject (obj) {
      for (let name in obj) {
        return false
      }
      return true
    },
    getType (obj) {
      // toString会返回对应不同的标签的构造函数
      let toString = Object.prototype.toString
      let map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
      }
      if (obj instanceof Element) {
        return 'element'
      }
      return map[toString.call(obj)]
    },

    /**
     * 对象深拷贝
     * @param data
     * @returns {{}}
     */
    deepClone (data) {
      let obj = {}
      let originQueue = [data]
      let copyQueue = [obj]
      // 以下两个队列用来保存复制过程中访问过的对象，以此来避免对象环的问题（对象的某个属性值是对象本身）
      let visitQueue = []
      let copyVisitQueue = []
      while (originQueue.length > 0) {
        let _data = originQueue.shift()
        let _obj = copyQueue.shift()
        visitQueue.push(_data)
        copyVisitQueue.push(_obj)
        for (let key in _data) {
          let _value = _data[key]
          if (typeof _value !== 'object') {
            _obj[key] = _value
          } else {
            // 使用indexOf可以发现数组中是否存在相同的对象(实现indexOf的难点就在于对象比较)
            let index = visitQueue.indexOf(_value)
            if (index >= 0) {
              _obj[key] = copyVisitQueue[index]
            }
            originQueue.push(_value)
            _obj[key] = {}
            copyQueue.push(_obj[key])
          }
        }
      }
      return obj
    },
    /**
     * @introduction: 剪切URL路径，组装需要规格的图片地址 目前只支持阿里云OSS
     * @date: 2015-03-26 12：58
     * @param:url String 图片地址
     * @param:width Number 图片宽度
     * @param:height Number 图片高度
     * @returns {*}
     */
    cutImg (url, width, height, type = 1) {
      switch (parseInt(type)) {
        case 1 :
          if (parseInt(width) && parseInt(height)) {
            // 按比例裁剪
            url = url + '?x-oss-process=image/crop,x_' + width + ',y_' + height
          }
          break
        case 2 :
          // 按照宽度缩放
          if (parseInt(width)) {
            url = url + '?x-oss-process=image/resize,w_' + width
          }
          break
        case 3 :
          // 按照高度缩放
          if (parseInt(height)) {
            url = url + '?x-oss-process=image/resize,h_' + height
          }
          break
        default:
          return url
      }
      return url
    },
    /**
     * 获取图片完整路径
     * @param path 图片路径
     * @param type oss或tencent
     */
    completePath (path, type = 'oss') {
      if (type === 'oss') {
        return config.AliOssPictureCdn + path
      } else if (type === 'tencent') {
        return config.TencentPictureCdn + path
      }
    },
    /**
     * 路由跳转 函数
     * @param path
     * @param type 跳转方式, false: 内部路由, true: 外部url
     */
    jump (path, type = false) {
      if (typeof path === 'object') {
        this.$router.push(path)
      } else {
        if (type) {
          window.location.href = path
        } else {
          // 因为线上多目录的问题,在这里统一添加一个路由前缀
          if (path.indexOf('/') === 0) {
            path = `${config.routePrefix}${path}`
          } else {
            path = `${config.routePrefix}/${path}`
          }
          this.$router.push(path)
        }
      }
    },
    /**
     * 拨打电话
     * @param phoneNumber
     */
    call (phoneNumber) {
      if (!phoneNumber) {
        this.$auxiliary.toast('未找到电话号码!')
        return false
      }
      window.location.href = 'tel://' + phoneNumber
    }
  }
}
