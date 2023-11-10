import type { RouteRecordRaw } from 'vue-router'

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  let currentMenu = null
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        currentMenu = subMenu
      }
    }
  }
  return currentMenu
}

// 面包屑返回数据
export interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumbs[] = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }
  return breadcrumbs
}

// 动态加载本地路由
// 遍历后台传来的路由字符串，转换为组件对象
export const handleRoute = (routes: any[]) => {
  const children: any[] = []
  const modules = import.meta.glob('../views/main/**/*.vue')
  for (const menu of routes) {
    if (menu.children && menu.children.length) {
      const existingMenu = children.find((item) => item.path === menu.path)
      if (existingMenu) {
        existingMenu.children.push(
          ...menu.children.map((item: any) => {
            return {
              path: item.url.split('/')[3],
              name: item.url.split('/')[3],
              component: modules[`../views${item.url}/index.vue`]
            }
          })
        )
      } else {
        children.push({
          path: menu.url.split('/')[2],
          name: menu.url.split('/')[2],
          children: menu.children.map((item: any) => {
            return {
              path: item.url.split('/')[3],
              name: item.url.split('/')[3],
              component: modules[`../views${item.url}/index.vue`]
            }
          })
        })
      }
    }
  }
  return children
}

function loadLocalRoutes() {
  // 1.动态获取所有的路由对象, 放到数组中
  // * 路由对象都在独立的文件中
  // * 从文件中将所有路由对象先读取数组中
  const localRoutes: RouteRecordRaw[] = []

  // 1.1.读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  // 1.2.将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()

  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 1.给route的顶层菜单增加重定向功能(但是只需要添加一次即可)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }

        // 2.将二级菜单对应的路径
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) {
        firstMenu = submenu
      }
    }
  }
  return routes
}

// 根据用户的权限列表获取用户的权限

export function mapUserMenuToPermission(userMenus: any[]) {
  const permission: any[] = []
  const mapPermission = (menus: any[]) => {
    for (const item of menus) {
      if (item.children) {
        mapPermission(item.children)
      } else {
        if (item.permission) {
          permission.push(item.permission)
        }
      }
    }
  }
  mapPermission(userMenus)
  return permission
}

export function mapMenuInfoToTree(menuInfo: any) {
  function recursionMenuInfo(items: any[]) {
    for (const item of items) {
      if (item.children) {
        item.value = item.id
        item.label = item.name
        recursionMenuInfo(item.children ?? [])
      } else {
        item.value = item.id
        item.label = item.name
      }
    }
  }
  recursionMenuInfo(menuInfo)
  return menuInfo
}

export function mapMenuChecked(menuList: any[]) {
  const checkedId: number[] = []

  function recursionMenuList(items: any[]) {
    for (const item of items) {
      if (item.children) {
        recursionMenuList(item.children ?? [])
      } else {
        checkedId.push(item.id)
      }
    }
  }
  recursionMenuList(menuList)
  return checkedId
}
