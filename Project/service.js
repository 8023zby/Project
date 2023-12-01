import axios from 'axios'
import qs from 'qs'

// 网络配置
// axios.defaults.baseURL = process.env.BASE_API
// axios.defaults.timeout = 40000

// Log开关
const logSwitch = false

// HttpType
const HTTP_TYPE = {
  GET: 0,
  POST: 1,
  PUT: 2,
  DELETE: 3,
  UPLOAD_POST: 4,
  UPLOAD_PUT: 5
}

// 网络请求的总方法
const axiosService = (type, url, params, opt) => {
  // axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
  // axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token')
  return new Promise((resolve, reject) => {
    switch (type) {
    case HTTP_TYPE.GET:
      axios.get(spliceApiUrl(url, params), opt)
        .then(result => {
          successLog(params, result)
          resolve(result)
        })
        .catch(error => {
          errorLog(params, error)
          reject(error.response)
        })
      break
    case HTTP_TYPE.POST:
      axios.post(url, params, opt)
        .then(result => {
          successLog(params, result)
          resolve(result)
        })
        .catch(error => {
          errorLog(params, error)
          reject(error.response)
        })
      break
    case HTTP_TYPE.PUT:
      axios.put(url, qs.stringify(params))
        .then(result => {
          successLog(params, result)
          resolve(result)
        })
        .catch(error => {
          errorLog(params, error)
          reject(error.response)
        })
      break
    case HTTP_TYPE.DELETE:
      axios.delete(spliceApiUrl(url, params))
        .then(result => {
          successLog(params, result)
          resolve(result)
        })
        .catch(error => {
          errorLog(params, error)
          reject(error.response)
        })
      break
    case HTTP_TYPE.UPLOAD_POST:
      {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        axios.post(url, params, config)
          .then(result => {
            successLog(params, result)
            resolve(result)
          })
          .catch(error => {
            errorLog(params, error)
            reject(error.response)
          })
      }
      break
    case HTTP_TYPE.UPLOAD_PUT:
      {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        axios.put(url, params, config)
          .then(result => {
            successLog(params, result)
            resolve(result)
          })
          .catch(error => {
            errorLog(params, error)
            reject(error.response)
          })
      }
      break
    }
  })
}

// GET方法拼接url参数
const spliceApiUrl = (apiUrl, params) => {
  let url = '?'
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      url += key + '=' + params[key] + '&'
    }
  }
  url = url.substring(0, url.length - 1)
  return apiUrl + url
}

// 请求成功的Log
const successLog = (params, result) => {
  if (logSwitch) {
    console.log('<----------- ↓↓↓ ----------->')
    console.log('Log-----type: ')
    console.log(result.config.method)
    console.log('Log------url: ')
    console.log(result.config.url)
    console.log('Log---params: ')
    console.log(params)
    console.log('Log---result: ')
    console.log(result)
    console.log('<----------- ↑↑↑ ----------->')
    console.log(' ')
  }
}

// 请求失败的Log
const errorLog = (params, error) => {
  if (logSwitch) {
    console.log('<----------- ↓↓↓ ----------->')
    console.log('Log-----type: ')
    if (error && error.response && error.response.config && error.response.config.method) console.log(error.response.config.method)
    console.log('Log------url: ')
    if (error && error.response && error.response.config && error.response.config.url) console.log(error.response.config.url)
    console.log('Log---params: ')
    console.log(params)
    console.log('Log---result: ')
    if (error && error.response) console.log(error.response)
    console.log('<----------- ↑↑↑ ----------->')
    console.log(' ')
  }
}

/**
 * 以下是对外暴露的属性
 */
export default {
  HTTP_TYPE,
  axiosService
}
