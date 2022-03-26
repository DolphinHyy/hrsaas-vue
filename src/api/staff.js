import request from '@/utils/request'

export const getSimpleStaffsAPI = () => request({ url: '/sys/user/simple' })

export const getStaffsListAPI = params => request({ url: '/sys/user', params })

export const removeStaffAPI = id => request({ url: '/sys/user/' + id, method: 'DELETE' })

export const addStaffAPI = data => request({
  url: '/sys/user',
  method: 'POST',
  data
})

export const importStaffByExcelAPI = data => request({ url: '/sys/user/batch', method: 'POST', data })

export const getStaffBassByIdAPI = id => request({ url: '/sys/user/' + id })

export const putStaffInfoAPI = data => request({ url: '/sys/user/' + data.id, method: 'PUT', data })

/**
 * 通过员工ID获取员工信息
 * @param {*} id
 * @returns
 */
export const getStaffInfoAPI = id => request({ url: `/employees/${id}/personalInfo` })

/**
 * 通过员工ID获取岗位信息
 * @param {*} id
 * @returns
 */
export const getJobInfoAPI = id => request({ url: '/employees/' + id + '/jobs' })

export const updateJobInfoAPI = data => request({
  url: `/employees/${data.id}/jobs`,
  method: 'PUT',
  data
})
