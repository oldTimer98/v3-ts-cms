<template>
  <div class="userCountWrapper">
    <div class="top">
      <h1 class="title">用户列表</h1>
      <el-button type="primary" @click="handleUserClick">新建用户</el-button>
    </div>
    <div class="serarcount">
      <el-table :data="list" border>
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />

        <el-table-column
          align="center"
          label="用户名"
          prop="name"
          width="150px"
        />
        <el-table-column
          align="center"
          label="真实姓名"
          prop="realname"
          width="150px"
        />
        <el-table-column
          align="center"
          label="手机号码"
          prop="cellphone"
          width="150px"
        />
        <el-table-column
          align="center"
          label="状态"
          prop="enable"
          width="100px"
        >
          <template #default="scope">
            <el-tag :type="scope.row.enable ? 'success' : 'danger'" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          prop="createAt"
          min-width="200px"
        >
          <template #default="scope">
            {{ formatUtcString(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="更新时间"
          prop="updateAt"
          min-width="200px"
        >
          <template #default="scope">
            {{ formatUtcString(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" min-width="200px">
          <template #default="scope">
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="EditUserData(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              @click="deleteClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSystemStore } from '@/store/modules/main/system/index'
import { formatUtcString } from '@/utils'

//定义emits方法
const emit = defineEmits(['createUser', 'editUser'])
const currentPage = ref(1)
const systemStore = useSystemStore()
const { list, totalCount, pageSize } = storeToRefs(systemStore)
// 查询逻辑
systemStore.getUserListDataAction()
// 删除逻辑
const deleteClick = async (id: number) => {
  await systemStore.deleteUserListDataAction(id)
  await systemStore.getUserListDataAction()
}
// 切换页码逻辑
const handleSizeChange = async (pageSize: number) => {
  systemStore.pageSize = pageSize
  await systemStore.getUserListDataAction()
}
const handleCurrentChange = async (currentPage: number) => {
  systemStore.currentPage = currentPage
  await systemStore.getUserListDataAction()
}
// 新增用户
const handleUserClick = () => {
  emit('createUser')
}
// 修改用户
const EditUserData = (editData: any) => {
  emit('editUser', editData)
}
</script>
<style scoped lang="scss">
.userCountWrapper {
  padding: 20px;
  .top {
    .title {
      font-weight: 800;
      font-size: 22px;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 13px;
  }
  .serarcount {
    margin-top: 20px;
  }
  .footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
