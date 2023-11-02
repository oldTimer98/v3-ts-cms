<template>
  <el-form
    ref="loginForm"
    :model="form"
    :rules="rules"
    label-width="0"
    size="large"
    @keyup.enter="login"
  >
    <el-form-item prop="user">
      <el-input
        v-model="form.user"
        prefix-icon="el-icon-user"
        clearable
        :placeholder="$t('login.userPlaceholder')"
      >
        <template #append>
          <el-select v-model="form.userType" style="width: 130px">
            <el-option :label="$t('login.admin')" value="admin"></el-option>
            <el-option :label="$t('login.user')" value="user"></el-option>
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        prefix-icon="el-icon-lock"
        clearable
        show-password
        :placeholder="$t('login.PWPlaceholder')"
      ></el-input>
    </el-form-item>
    <el-form-item style="margin-bottom: 10px">
      <el-col :span="12">
        <el-checkbox
          :label="$t('login.rememberMe')"
          v-model="form.autoLogin"
        ></el-checkbox>
      </el-col>
      <el-col :span="12" class="login-forgot">
        <router-link to="/reset_password"
          >{{ $t('login.forgetPassword') }}？</router-link
        >
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        style="width: 100%"
        :loading="isLogin"
        round
        @click="login(loginForm)"
        >{{ $t('login.signIn') }}</el-button
      >
    </el-form-item>
    <div class="login-reg">
      {{ $t('login.noAccount') }}
      <router-link to="/user_register">{{
        $t('login.createAccount')
      }}</router-link>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

interface formType {
  user: string
  userType: string
  password: string
  autoLogin: boolean
}
const form = reactive<formType>({
  user: 'admin',
  userType: 'admin',
  password: 'admin',
  autoLogin: false
})
const loginForm = ref<FormInstance>()
const rules = reactive<FormRules<formType>>({
  user: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  userType: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change'
    }
  ]
})
const isLogin = ref(false)

const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped></style>
