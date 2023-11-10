import type { DepartmentInfo, MenuInfo, RoleInfo } from '@/types'

export interface mainStoreType {
  pageInfo: PageInfo
  dataList: any[]
  departmentList: DepartmentInfo[]
  roleList: RoleInfo[]
  menuList: MenuInfo[]
}
interface PageInfo {
  currentPage: number
  pageSize: number
  total: number
}
