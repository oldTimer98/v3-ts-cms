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
          >{{ $t('login.smsGet')
          }}<span v-if="disabled"> ({{ time }})</span></el-button
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
  phone: number | undefined
  yzm: string
}
const form = reactive<formType>({
  phone: undefined,
  yzm: ''
})
const loginForm = ref<FormInstance>()
const rules = reactive<FormRules<formType>>({
  phone: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  yzm: [
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
