import request from '@/utils/request'

export const getCompanyInfoByIdAPI = (id) => request({ url: '/company/' + id })

