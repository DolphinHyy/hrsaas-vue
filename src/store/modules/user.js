import { loginAPI, getUserInfoAPI, getUserDetailAPI } from '@/api/user.js'
import { getToken, setToken, removeToken, setTokenTime } from '@/utils/auth'

const state = {
  // token: JSON.parse(localStorage.getItem('HRSAAS_TOKEN')) || null
  token: getToken(),
  userInfo: {}
}
const mutations = {
  // 设置token
  setToken(state, payload) {
    state.token = payload
  },
  // 设置用户信息
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  clearToken(state) {
    state.token = null
    removeToken()
  }
}
const actions = {
  async login(context, payload) {
    // console.log(payload)
    const res = await loginAPI(payload)
    // console.log('login-action:', res)
    context.commit('setToken', res)
    // 将把token存入Cookies的时间戳也存入Cookies用于判断token是否过期
    setTokenTime()
    // 将token存入cookies 此setToken非musstations中的setToken，而是引自utils/auth.js的setToken
    setToken(res)
  },
  async getUserInfo(context, payload) {
    const res = await getUserInfoAPI()
    const userDetail = await getUserDetailAPI(res.userId)
    // console.log(res)
    // console.log(userDetail)
    context.commit('setUserInfo', { ...res, ...userDetail })
  },
  logout(context, payload) {
    context.commit('clearToken')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

