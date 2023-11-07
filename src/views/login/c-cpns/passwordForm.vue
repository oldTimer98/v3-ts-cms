<template>
  <el-form
    ref="loginForm"
    :model="form"
    :rules="rules"
    label-width="0"
    size="large"
    @keyup.enter="login"
  >
    <el-form-item prop="name">
      <el-input
        v-model="form.name"
        prefix-icon="el-icon-user"
        clearable
        :placeholder="$t('login.userPlaceholder')"
      >
        <template #append>
          <el-select v-model="form.userType" style="width: 130px">
            <el-option :label="$t('login.admin')" value="admin"></el-option>
            <el-option :label="$t('login.user')" value="name"></el-option>
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
import type { ElForm, FormInstance, FormRules } from 'element-plus'
import { useI18n } from 'vue-i18n'
import useLocale from '@/hooks/useLocale'
import { useLoginStore } from '@/store/modules/login'
import { localCache } from '@/utils'
interface formType {
  name: string
  userType: string
  password: string
  autoLogin: boolean
}
const form = reactive<formType>({
  name: localCache.getCache('name') ?? '',
  userType: localCache.getCache('userType') ?? '',
  password: localCache.getCache('password') ?? '',
  autoLogin: localCache.getCache('isRememberPassword') ?? false
})
const loginForm = ref<InstanceType<typeof ElForm>>()
const { t } = useI18n()
const rules = ref<FormRules<formType>>()
// 监听语言的变化
const { currentLocale } = useLocale()
watch(
  () => currentLocale.value,
  () => {
    rules.value = {
      name: [
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
// 记住密码的逻辑
watch(
  () => form.autoLogin,
  (newValue: boolean) => {
    localCache.removeCache('isRememberPassword')
    localCache.setCache('isRememberPassword', newValue)
  }
)
const isLogin = ref(false)
// 登录逻辑
const loginStore = useLoginStore()
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      loginStore
        .loginAction({ name: form.name, password: form.password })
        .then(() => {
          ElMessage({
            message: '登录成功',
            type: 'success'
          })
          if (form.autoLogin) {
            localCache.setCache('name', form.name)
            localCache.setCache('userType', form.userType)
            localCache.setCache('password', form.password)
          } else {
            localCache.removeCache('name')
            localCache.removeCache('password')
          }
        })
        .catch(() => {
          ElMessage.error('账号或者密码不对')
        })
    } else {
      ElMessage.error('账号或者密码不对')
    }
  })
}
</script>

<style lang="scss" scoped></style>
