/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.rul === path) {
        return subMenu
      }
    }
  }
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
      if (subMenu.rul === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }
  return breadcrumbs
}

// 动态加载本地路由
// 遍历后台传来的路由字符串，转换为组件对象
export function filterAsyncRouter(
  asyncRouterMap: any[],
  lastRouter?: boolean,
  type?: boolean
) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      route.component = loadView(route.component)
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap: any[], lastRouter?: any) {
  let children: any[] = []
  childrenMap.forEach((el) => {
    if (lastRouter) {
      el.path = lastRouter?.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

export const loadView = (view: any) => {
  // 使用 import 实现生产环境的路由懒加载
  return () => import(`@/views/${view}`)
}

export const handleRoute = (routes: any[]) => {
  const children = []
  for (const menu of routes) {
  }
}
