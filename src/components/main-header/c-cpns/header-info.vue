<template>
  <div class="flex items-center">
    <!-- 1.操作小图标 -->
    <el-icon size="20px" class="cursor-pointer hover:animate-bounce-alt !animate-iteration-1"
      ><Message
    /></el-icon>
    <el-badge is-dot>
      <el-icon size="20px" class="ml-4"><ChatDotRound /></el-icon>
    </el-badge>
    <el-icon size="20px" class="cursor-pointer ml-4 hover:animate-bounce-alt !animate-iteration-1"
      ><Search
    /></el-icon>
    <!-- 2.个人信息 -->
    <el-dropdown>
      <div class="flex items-center">
        <el-avatar
          :size="30"
          class="ml-4 mb-1"
          hover="animate-bounce-alt !animate-iteration-1 cursor-pointer"
          src="https://lolicode.gitee.io/scui-doc/demo/img/logo.png"
        ></el-avatar>
        <span class="ml-1 text-blue-4">oldTimer</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">
            <el-icon><CircleClose /></el-icon>
            <span>退出系统</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon><InfoFilled /></el-icon>
            <span>个人信息</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><Unlock /></el-icon>
            <span>修改密码</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils'

const router = useRouter()
const handleExitClick = () => {
  localCache.removeCache('token')
  router.push('/login')
}
</script>

<style lang="scss" scoped></style>
