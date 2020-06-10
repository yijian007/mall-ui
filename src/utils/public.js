/* 使es6支持promise */
require('es6-promise').polyfill()
/* 导入axios */
import axios from 'axios'
import Qs from 'qs'

//封装请求
export default {
  //get请求
  requestGet(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
//get请求不带参数
  requestQuickGet(url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //post请求
  requestPost(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //post请求
  requestPostForm(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //post请求，表单文件上传
  requestPostFile(url, params = new FormData()) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //post请求，表单文件上传
  requestPutFile(url, params = new FormData()) {
    return new Promise((resolve, reject) => {
      axios.put(url, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //put请求
  requestPut(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, params, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //delete请求
  requestDelete(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, params, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * 使用qs，以键值对的形式提交表单，使其可以像以前那样传参数
   * @param url
   * @param params
   * @returns {Promise<any>}
   */
  requestPostKey(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, {
        transformRequest: [
          function (params) {
            return Qs.stringify(params)
          }
        ],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  requestPutKey(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, params, {
        transformRequest: [
          function (params) {
            return Qs.stringify(params)
          }
        ],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //excel下载
  requestDownloadExcel(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, {
        headers: {
          'Content-Type': 'application/json'
        },
        responseType:'blob'
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}



