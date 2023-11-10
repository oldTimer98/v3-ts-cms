import Request from '@/service'
import type { DepartmentListData, MenuListData, RoleListData } from '@/types'
export function getUserList(info: any) {
  return Request.post({
    url: '/users/list',
    data: info
  })
}

export function deleteUser(id: any) {
  return Request.delete({
    url: `/users/${id}`
  })
}

export function createUser(userinfo: any) {
  return Request.post({
    url: '/users',
    data: userinfo
  })
}

export function changeUser(id: any, info: any) {
  return Request.patch({
    url: `/users/${id}`,
    data: info
  })
}

/** 针对页面的数据: 增删改查 */
export function getPagelist(pagename: string, queryInfo: any) {
  return Request.post({
    url: `/${pagename}/list`,
    data: queryInfo
  })
}
export function deletePagelist(pagename: string, id: any) {
  return Request.delete({
    url: `/${pagename}/${id}`
  })
}
export function createPagelist(pagename: string, queryInfo: any) {
  return Request.post({
    url: `/${pagename}`,
    data: queryInfo
  })
}
export function editPagelist(pagename: string, id: any, editInDo: any) {
  return Request.patch({
    url: `/${pagename}/${id}`,
    data: editInDo
  })
}
// role的查询逻辑
// 根据id去查询角色信息
export function getRoleForId(pagename: string, id: any) {
  return Request.get({
    url: `/${pagename}/${id}`
  })
}

export function getDepartmentList() {
  return Request.post<DepartmentListData>({
    url: '/department/list',
    data: {
      offset: 0,
      size: 1000
    }
  })
}

export function getRoleList() {
  return Request.post<RoleListData>({
    url: '/role/list',
    data: {
      offset: 0,
      size: 1000
    }
  })
}

export function getMenuList() {
  return Request.post<MenuListData>({
    url: '/menu/list'
  })
}
