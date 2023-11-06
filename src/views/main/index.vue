<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '210px'">
        <MainMenu :isFold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @foldChange="handleFoldChange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts" name="main">
// 处理main-header中折叠的变化
let isFold = ref(false)
const handleFoldChange = (flag: boolean) => {
  isFold.value = flag
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.15s !important;
    -webkit-transition: width 0.15s !important;
    -moz-transition: width 0.15s !important;
    -webkit-transition: width 0.15s !important;
    -o-transition: width 0.15s !important;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-header {
    background-color: var(--el-color-success-light-7);
  }
  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
