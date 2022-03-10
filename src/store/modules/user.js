import { loginAPI } from '@/api/user.js'

const state = {
  token: JSON.parse(localStorage.getItem('HRSAAS_TOKEN')) || null
}
const mutations = {
  setToken(state, payload) {
    state.token = payload
    if (payload) {
      localStorage.setItem('HRSAAS_TOKEN', JSON.stringify(payload))
    }
  }
}
const actions = {
  async login(context, payload) {
    // console.log(payload)
    const res = await loginAPI(payload)
    // console.log('login-action:', res)
    context.commit('setToken', res)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

