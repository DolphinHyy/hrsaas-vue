import request from '@/utils/request'

export const getDepartmentsAPI = () => request({ url: '/company/department' })

/**
 * 添加部门
 * @data {pid,name,code,manager,introduce}
 */
export const addDepartmentsAPI = data => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

export const delDepartmentsAPI = id => {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
}

/**
 * 获取部门详情
 * @param {*} id
 * @returns
 */
export const getDeptsDetailAPI = id => request({ url: '/company/department/' + id })

export const updateDeptsAPI = data => request({
  url: '/company/department/' + data.id,
  method: 'PUT',
  data
})
