import axios from 'axios'
import { Message } from 'element-ui'

const request = axios.create({
  // baseURL: 'http://ihrm-java.itheima.net/'
  // env 中存在 ENV 和 VUE_APP_BASE_API 两个环境变量，在运行 npm run dev 和 npm build 时将会分别将变量修改为 ['development','production'] 和 ['/api','/prod-api']
  // 配置.env.development和 .env.production 来修改VUE_APP_BASE_API环境变量
  baseURL: process.env.VUE_APP_BASE_API
})

request.interceptors.request.use()

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
  Message.error('系统异常')
  return Promise.reject(error)
})

export default request
