import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, getTokenTime } from '@/utils/auth'
import store from '@/store'
import router from '@/router'
const timeout = 2 * 3600 * 1000

const request = axios.create({
  // baseURL: 'http://ihrm-java.itheima.net/'
  // env 中存在 ENV 和 VUE_APP_BASE_API 两个环境变量，在运行 npm run dev 和 npm build 时将会分别将变量修改为 ['development','production'] 和 ['/api','/prod-api']
  // 配置.env.development和 .env.production 来修改VUE_APP_BASE_API环境变量
  baseURL: process.env.VUE_APP_BASE_API
})

// 对发送的请求进行配置
request.interceptors.request.use((config) => {
  if (getToken()) {
    // 检查token是否过期
    if (Date.now() - getTokenTime() > timeout) {
      // console.log(1)
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('TOKEN 过期'))
    }
    config.headers.Authorization = 'Bearer ' + getToken()
  }
  return config
})

// 响应拦截器：当需要对接受的数据进行处理
request.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  const { data: { success, data, message }} = response
  if (success) {
    Message.success('成功')
    return data
  }
  Message.error(message)
  return Promise.reject(new Error(message))
  // return response
}, function(error) {
  // 对响应错误做点什么
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
    Message.error('登录过期')
    return Promise.reject(error)
  }
  if (error.message === 'TOKEN 过期') {
    Message.error(error.message)
  } else {
    Message.error('系统异常')
  }
  return Promise.reject(error)
})

export default request
