import Request from '@/service'
import type { IAccount } from '@/service/modules/login/type'

export function accountLoginRequest(account: IAccount) {
  return Request.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return Request.get({
    url: `/users/${id}`
  })
}

export function getUserMenusByRoleId(id: number) {
  return Request.get({
    url: `/role/${id}/menu`
  })
}
