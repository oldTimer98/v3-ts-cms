<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="isCreate ? '新建用户' : '编辑用户'"
    width="30%"
    center
  >
    <div class="form">
      <el-form ref="formDataRef" :model="formData" label-width="80px" size="large">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="手机号码" prop="cellphone">
          <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
            <template v-for="item in entireRoles" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
            <template v-for="item in entireDepartments" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="enterCenterDialogVisible"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSystemStore } from '@/store/modules/main/system/index'
import type { userFormType } from '@/store/modules/main/system/type'
const systemStore = useSystemStore()
const { entireDepartments, entireRoles } = storeToRefs(systemStore)
// 定义初始值
let formData = ref<userFormType>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: undefined,
  departmentId: undefined
})
const InfoData = ref()
const formDataRef = ref()
const isCreate = ref<boolean>(false) // 是否编辑还是新增
// 打开页面逻辑
const centerDialogVisible = ref<boolean>(false)
const changeCenterDialogVisible = (create: boolean, editList?: any) => {
  // 打开弹层
  centerDialogVisible.value = true
  // 是否新增还是修改
  isCreate.value = create
  if (isCreate.value === false) {
    const editData: any = {}
    for (const key in formData.value) {
      editData[key] = editList[key]
    }
    formData.value = editData
    InfoData.value = editList
  } else {
    // 重置表单
    formData.value = {
      name: '',
      realname: '',
      password: '',
      cellphone: '',
      roleId: undefined,
      departmentId: undefined
    }
    formDataRef.value?.resetFields()
  }
}
// 保存逻辑
const enterCenterDialogVisible = () => {
  if (isCreate.value) {
    systemStore.createUserListDataAction(formData.value)
  } else {
    systemStore.editUserListAction(InfoData.value.id, formData.value)
  }
  centerDialogVisible.value = false
}
defineExpose({ changeCenterDialogVisible })
</script>
<style scoped lang="scss"></style>
