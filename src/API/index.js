import axios from 'axios'
// import store from '../store'
// import router from '../router'


// 创建实例时设置配置的默认值
// var instance = axios.create({
//   baseURL: 'https://5b5e71c98e9f160014b88cc9.mockapi.io'
// });
// 在实例已创建后修改默认值
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// 请求列表
const requestList = []
// 取消列表
const CancelToken = axios.CancelToken
let sources = {}

// axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.defaults.baseURL = process.env.BASE_URL

axios.interceptors.request.use((config) => {
  const request = JSON.stringify(config.url) + JSON.stringify(config.data)
  config.cancelToken = new CancelToken((cancel) => {
    sources[request] = cancel
  })

  if(requestList.includes(request)){
    sources[request]('取消重复请求')
  }else{
    requestList.push(request)
   // store.dispatch('changeGlobalState', {loading: true})
  }

  //const token = store.getters.userInfo.token
  // if (token) {
  //   config.headers.token = token
  // }

  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  const request = JSON.stringify(response.config.url) + JSON.stringify(response.config.data)
  requestList.splice(requestList.findIndex(item => item === request), 1)
  // if (requestList.length === 0) {
  //   store.dispatch('changeGlobalState', {loading: false})
  // }
  // if (response.data.code === 900401) {
  // console.log("认证失效，请重新登录！'")
  //window.ELEMENT.Message.error('认证失效，请重新登录！', 1000)
  //router.push('/login')
  // }
  return response
}, function (error) {
  if (axios.isCancel(error)) {
    requestList.length = 0
   // store.dispatch('changeGlobalState', {loading: false})
    throw new axios.Cancel('cancel request')
  } else {
    //window.ELEMENT.Message.error('网络请求失败', 1000)
    console.log("网络请求失败")
  }
  return Promise.reject(error)
})

const request = function (url, params, config, method) {
  return new Promise((resolve, reject) => {
    axios[method](url, params, Object.assign({}, config)).then(response => {
      resolve(response.data)
    }, err => {
      if (err.Cancel) {
        console.log(err)
      } else {
        reject(err)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

const post = (url, params, config = {}) => {
  return request(url, params, config, 'post')
}

const get = (url, params, config = {}) => {
  return request(url, params, config, 'get')
}

export {sources, post, get}
