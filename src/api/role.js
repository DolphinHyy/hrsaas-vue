import request from '@/utils/request'

/**
 * 获取用户列表数据
 * @param {*} params
 * @returns
 */
export function getRolesListAPI(params) {
  return request({
    url: '/sys/role', params
  })
}

/**
 * 删除角色
 * @param {*} id
 * @returns
 */
export function removeRolesAPI(id) {
  return request({
    url: '/sys/role/' + id,
    method: 'DELETE'
  })
}

/**
 * 修改角色信息
 * @param {*} data
 * @returns
 */
export function updateRoleAPI(data) {
  return request({
    url: '/sys/role/' + data.id,
    method: 'PUT',
    data
  })
}

/**
 *
 * @param {*} data name,region
 * @returns
 */
export function addRoleAPI(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
