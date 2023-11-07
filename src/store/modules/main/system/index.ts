import {
  getUserList,
  deleteUser,
  getDepartmentList,
  getRoleList,
  getMenuList
} from '@/service/modules/main'
import type { Istate, formInfoType } from '@/store/modules/main/system/type'
import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', {
  state: (): Istate => {
    return {
      list: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      searchState: -1,
      pagelist: [],
      pagetotalCount: 0,
      entireRoles: [],
      entireDepartments: [],
      entireAllMenulist: []
    }
  },
  actions: {
    //针对用户管理页面的请求
    async getUserListDataAction(formInfo?: formInfoType) {
      const size = this.pageSize
      const offset = (this.currentPage - 1) * size
      const params = {
        size,
        offset,
        ...formInfo
      }
      const res = await getUserList(params)
      this.list = res.data.list
      this.totalCount = res.data.totalCount
    },
    async deleteUserListDataAction(id: number) {
      const res = await deleteUser(id)
      if (res.code === -1002) {
        ElMessage.error('删除用户失败,您的权限不够')
      } else {
        ElMessage.success('删除用户成功')
      }
    },
    async getRoleData() {
      const departmentList = await getDepartmentList()
      const roleList = await getRoleList()
      this.entireDepartments = departmentList.data.list
      this.entireRoles = roleList.data.list
    },
    async getAllMenusList() {
      const res = await getMenuList()
      this.entireAllMenulist = res?.data?.list
    }
  }
})
