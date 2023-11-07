<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="isCreate ? '新建用户' : '编辑用户'"
    width="30%"
    center
  >
    <div class="form">
      <el-form
        ref="formDataRef"
        :model="formData"
        label-width="80px"
        size="large"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="手机号码" prop="cellphone">
          <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select
            v-model="formData.roleId"
            placeholder="请选择角色"
            style="width: 100%"
          >
            <template v-for="item in entireRoles" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select
            v-model="formData.departmentId"
            placeholder="请选择部门"
            style="width: 100%"
          >
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
        <el-button type="primary" @click="enterCenterDialogVisible">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useSystemStore } from '@/store/modules/main/system/index'
import { storeToRefs } from 'pinia'
import type { userFormType } from '@/store/modules/main/system/type'
const systemStore = useSystemStore()
const { entireDepartments, entireRoles } = storeToRefs(systemStore)
// 定义初始值
const formData = reactive<userFormType>({
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
const changeCenterDialogVisible = (create: boolean, editData?: any) => {
  centerDialogVisible.value = true
  isCreate.value = create
  if (isCreate.value == false) {
    for (const key in formData) {
      formData[key] = editData[key]
    }
    InfoData.value = editData
  } else {
    // 重置表单
    formDataRef.value?.resetFields()
  }
}
// 保存逻辑
const enterCenterDialogVisible = () => {
  if (isCreate.value) {
    centerDialogVisible.value = false
    // systemStore.CreateuserlistdataAction(formData).then((res: any) => {
    //   if (res.code == 400) {
    //     ElMessage.error('创建用户失败,请检查创建信息是否完善')
    //   } else {
    //     // 发送新的请求获取新的数据
    //     systemStore.GetuserlistdataAction(searoinfo)
    //     ElMessage({
    //       message: '创建用户成功',
    //       type: 'success'
    //     })
    //   }
    // })
  } else {
    changeUserInfo(InfoData.value.id, formData)
  }
}
// 编辑逻辑
const changeUserInfo = (id: number, info: {}) => {
  // systemStore.ChangeuserlistDataAction(id, info).then((res: any) => {
  //   centerDialogVisible.value = false
  //   if (res.code == -1003) {
  //     ElMessage.error('修改用户信息失败,您的权限不够')
  //   } else {
  //     // 发送新的请求获取新的数据
  //     systemStore.GetuserlistdataAction(searinfo)
  //     ElMessage({
  //       message: '修改用户信息成功',
  //       type: 'success'
  //     })
  //   }
  // })
}
defineExpose({ changeCenterDialogVisible })
</script>
<style scoped lang="scss"></style>
