import { defineStore } from 'pinia'
import { changeUser, createUser, deleteUser, getUserList } from '@/service/modules/main'
import type { formInfoType, Istate, userFormType } from '@/store/modules/main/system/type'

export const useSystemStore = defineStore('system', {
  state: (): Istate => {
    return {
      list: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      searchState: -1,
      pagelist: [],
      pagetotalCount: 0
    }
  },
  actions: {
    // 查询逻辑
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
    // 删除逻辑
    async deleteUserListDataAction(id: number) {
      const res = await deleteUser(id)
      if (res.code === -1002) {
        ElMessage.error('删除用户失败,您的权限不够')
      } else {
        ElMessage.success('删除用户成功')
      }
    },
    // 清空页码,查询
    clearPage() {
      this.currentPage = 1
      this.pageSize = 10
      this.getUserListDataAction()
    },
    // 新增逻辑
    async createUserListDataAction(formInfo: userFormType) {
      const res = await createUser(formInfo)
      if (res.code === 400) {
        ElMessage.error('创建用户失败,请检查创建信息是否完善')
      } else {
        this.clearPage()
        ElMessage({
          message: '创建用户成功',
          type: 'success'
        })
      }
    },
    // 编辑逻辑
    async editUserListAction(id: number, userInfo: userFormType) {
      const res = await changeUser(id, userInfo)
      if (res.code === -1003) {
        ElMessage.error('修改用户信息失败,您的权限不够')
      } else {
        this.clearPage()
        ElMessage({
          message: '修改用户信息成功',
          type: 'success'
        })
      }
    }
  }
})
