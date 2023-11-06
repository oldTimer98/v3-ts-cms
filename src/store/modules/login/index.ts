import type { IAccount } from '@/service/modules/login/type'
import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/modules/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

export const useLoginStore = defineStore('login', {
  state: (): ILoginState => {
    return {
      token: localCache.getCache('token') ?? '',
      userInfo: localCache.getCache('userInfo') ?? {},
      userMenus: localCache.getCache('userMenus') ?? []
    }
  },
  actions: {
    async loginAction(account: IAccount) {
      // 登录账号
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache('token', this.token)

      // 2.获取登录用户的详细信息(role信息)
      const userAccount = await getUserInfoById(id)
      this.userInfo = userAccount.data

      // 3.根据角色请求用户的权限(菜单menus)

      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMenusResult.data

      // 4.进行本地缓存
      localCache.setCache('userInfo', this.userInfo)
      localCache.setCache('userMenus', this.userMenus)

      // 重要: 动态的添加路由
      const routes = mapMenusToRoutes(this.userMenus)
      console.log(routes)
      routes.forEach((route) => router.addRoute('main', route))
      // 保存路由消息
      // 5.页面跳转(main页面)
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 2.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
