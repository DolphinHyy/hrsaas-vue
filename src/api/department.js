import request from '@/utils/request'

export const getDepartmentsAPI = () => request({ url: '/company/department' })
