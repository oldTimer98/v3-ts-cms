import Request from '@/service'

export function accountLoginRequest(account: any) {
  return Request.post({
    url: '/login',
    data: account
  })
}
