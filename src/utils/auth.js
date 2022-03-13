import Cookies from 'js-cookie'

const TokenKey = 'HRSAAS_TOKEN'
const TokenTime = 'HRSAAS_TOKEN_TIME'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  // 将Cookies中的token存入时间同时删除
  Cookies.remove(TokenTime)
  return Cookies.remove(TokenKey)
}

/**
 * 用于记录存token时的时间，以便计算token过期时间
 * @returns
 */
export const setTokenTime = () => Cookies.set(TokenTime, Date.now())

export const getTokenTime = () => Cookies.get(TokenTime)

