import request from '@/utils/request'

export const getSimpleStaffsAPI = () => request({ url: '/sys/user/simple' })
