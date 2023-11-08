<template>
  <div class="UserSearchWrapper">
    <h1 class="title">查询用户</h1>
    <el-form :model="formInfo" ref="form">
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="ID" prop="id" label-width="68px ">
            <el-input
              placeholder="请输入用户ID"
              v-model="formInfo.id"
              clearable
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="用户名" prop="name" label-width="68px ">
            <el-input
              placeholder="请输入用户名"
              v-model="formInfo.name"
              clearable
            /> </el-form-item
        ></el-col>

        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              placeholder="请输入用户真实姓名"
              v-model="formInfo.realname"
              clearable
            /> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="cellphone">
            <el-input
              placeholder="请输入用户电话号码"
              v-model="formInfo.cellphone"
              clearable
            /> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="用户状态" prop="enable">
            <el-select
              placeholder="请选择用户状态 "
              style="width: 100%"
              v-model="formInfo.enable"
              clearable
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="formInfo.createAt"
              type="daterange"
              range-separator="——"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              clearable
            /> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <div class="button">
      <el-button :icon="RefreshRight" @click="resetClick">重置</el-button>
      <el-button type="primary" :icon="Search" @click="searchCLick"
        >搜索</el-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSystemStore } from '@/store/modules/main/system'
import type { formInfoType } from '@/store/modules/main/system/type'
import { Search, RefreshRight } from '@element-plus/icons-vue'
import type { ElForm } from 'element-plus'
// 定义初始数据

const form = ref<InstanceType<typeof ElForm>>()
const formInfo = reactive<formInfoType>({
  id: '',
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})
// 重置表单
const resetClick = () => {
  form.value?.resetFields()
}
// 搜索操作
const systemStore = useSystemStore()
const searchCLick = () => {
  systemStore.getUserListDataAction(formInfo)
}
</script>
<style scoped lang="scss">
.UserSearchWrapper {
  .title {
    text-align: center;
    font-size: 30px;
    font-weight: 800;
    color: red;
  }
  padding: 20px;
  .el-form {
    padding: 20px;
    .el-row {
      padding: 20px;
    }
  }
  .button {
    text-align: right;
    margin-right: 40px;
  }
}
</style>
