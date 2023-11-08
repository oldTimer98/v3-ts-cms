<template>
  <el-form
    ref="loginForm"
    :model="form"
    :rules="rules"
    label-width="0"
    size="large"
    @keyup.enter="login"
  >
    <el-form-item prop="phone">
      <el-input
        v-model="form.phone"
        prefix-icon="el-icon-iphone"
        clearable
        :maxLength="11"
        :placeholder="$t('login.mobilePlaceholder')"
      >
        <template #prepend>+86</template>
      </el-input>
    </el-form-item>
    <el-form-item prop="yzm" style="margin-bottom: 35px">
      <div class="login-msg-yzm">
        <el-input
          v-model="form.yzm"
          prefix-icon="el-icon-unlock"
          clearable
          :placeholder="$t('login.smsPlaceholder')"
        ></el-input>
        <el-button @click="getYzm" :disabled="disabled"
          >{{ $t('login.smsGet') }}<span v-if="disabled"> ({{ time }})</span></el-button
        >
      </div>
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
import { useI18n } from 'vue-i18n'
import type { FormInstance, FormRules } from 'element-plus'
import useLocale from '@/hooks/useLocale'
interface formType {
  phone: number | undefined
  yzm: string
}
const form = reactive<formType>({
  phone: undefined,
  yzm: ''
})
const loginForm = ref<FormInstance>()
const { t } = useI18n()
let rules = ref<FormRules<formType>>({})
// 监听语言的变化
const { currentLocale } = useLocale()
watch(
  () => currentLocale.value,
  () => {
    rules.value = {
      phone: [
        { required: true, message: t('login.mobileError') },
        { pattern: /^1[3456789]\d{9}$/, message: t('root.phoneRule') }
      ],
      yzm: [
        {
          required: true,
          message: t('login.smsError'),
          trigger: 'change'
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
      console.log('error submit!', fields)
    }
  })
}
// 获取验证码
const disabled = ref(false)
const time = ref(0)
const getYzm = async () => {
  const valiDate = await loginForm.value?.validateField('phone').catch(() => {})
  console.log(valiDate)
  if (!valiDate) return false
  // 弹层

  disabled.value = true
  time.value = 60
  let t = setInterval(() => {
    time.value -= 1
    if (time.value < 1) {
      clearInterval(t)
      disabled.value = false
      time.value = 0
    }
  }, 1000)
}
</script>
