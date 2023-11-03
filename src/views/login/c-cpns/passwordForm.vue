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
    <!-- <div class="login-reg">
      {{ $t('login.noAccount') }}
      <router-link to="/user_register">{{
        $t('login.createAccount')
      }}</router-link>
    </div> -->
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { useI18n } from 'vue-i18n'
import useLocale from '@/hooks/useLocale'
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
const { t } = useI18n()
const rules = ref<FormRules<formType>>()
// 监听语言的变化
const { currentLocale } = useLocale()
watch(
  () => currentLocale.value,
  () => {
    rules.value = {
      user: [
        { required: true, message: t('login.userError'), trigger: 'blur' }
      ],
      password: [
        {
          required: true,
          message: t('login.PWError'),
          trigger: 'blur'
        }
      ]
    }
    loginForm.value?.resetFields()
  },
  { immediate: true }
)

const isLogin = ref(false)

const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      ElMessage.error('请输入正确的格式后再登录')
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped></style>
