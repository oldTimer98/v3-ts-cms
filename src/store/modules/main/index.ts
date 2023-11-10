import { defineStore } from 'pinia'
import {
  createPagelist,
  deletePagelist,
  editPagelist,
  getDepartmentList,
  getMenuList,
  getPagelist,
  getRoleList
} from '@/service/modules/main'
import type { mainStoreType } from '@/store/modules/main/type'
// 所有页面的公共操作
export const useMainStore = defineStore('main', {
  state: (): mainStoreType => {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      dataList: [],
      departmentList: [],
      roleList: [],
      menuList: []
    }
  },
  actions: {
    // 查询数据
    async queryDataList(pageName: string, data?: any) {
      const res = await getPagelist(pageName, {
        offset: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize,
        ...data
      })
      this.dataList = res.data.list
      this.pageInfo.total = res.data?.totalCount ?? res.data.list.length
    },
    // 重置pagination
    resetPagination() {
      this.pageInfo = {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    },
    // 删除方法
    async deleteDataList(pageName: string, id: number) {
      const res = await deletePagelist(pageName, id)
      this.showMessage(res)
      this.queryDataList(pageName)
    },
    // 展示提示信息
    showMessage(res: any) {
      if (res.code === 0) {
        ElMessage.success(res.data)
      } else {
        ElMessage.error(res.data)
      }
    },
    // 获取角色列表、菜单列表等数据
    async getRoleAndDepartmentList() {
      const roleListRes = await getRoleList()
      const departmentListRes = await getDepartmentList()
      const menuListRes = await getMenuList()
      this.roleList = roleListRes.data?.list
      this.departmentList = departmentListRes.data?.list
      this.menuList = menuListRes.data?.list
    },
    // 根据页面名称判断是否重新请求部门和角色列表
    judgeQueryRoleAndDepartmentList(pageName: string) {
      if (pageName === 'department' || pageName === 'role') {
        this.getRoleAndDepartmentList()
      }
    },
    // 创建新的数据
    async createDataList(pageName: string, data?: any) {
      const res = await createPagelist(pageName, data)
      this.showMessage(res)
      this.resetPagination()
      this.queryDataList(pageName)
      this.judgeQueryRoleAndDepartmentList(pageName)
    },
    // 编辑数据
    async editDataList(pageName: string, id: number, data?: any) {
      const res = await editPagelist(pageName, id, data)
      this.showMessage(res)
      this.queryDataList(pageName)
      this.judgeQueryRoleAndDepartmentList(pageName)
    }
  }
})
