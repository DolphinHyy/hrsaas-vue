import request from '@/utils/request'

export const loginAPI = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

// 获取用户信息
export const getUserInfoAPI = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

// 获取用户详情
export const getUserDetailAPI = (id) => {
  return request({
    url: '/sys/user/' + id,
    method: 'GET'
  })
}
