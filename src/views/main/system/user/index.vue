<template>
  <div class="user">
    <userSearch @search-c-lick="handleSearchClick"></userSearch>
  </div>
  <div class="count">
    <userContent
      ref="userContentRef"
      @createUser="createUserClick"
      @edit-user="editUserClick"
    ></userContent>
  </div>
  <userDialog ref="userDialogRef"></userDialog>
</template>

<script setup lang="ts" name="user">
import userContent from './c-cpns/user-content.vue'
import userDialog from './c-cpns/user-dialog.vue'
import userSearch from './c-cpns/user-search.vue'
const userDialogRef = ref()
const userContentRef = ref()

const handleSearchClick = (fromInfo: any) => {
  userContentRef.value
    ?.fetchUserlistData(fromInfo)
    .then(() => {
      ElMessage({
        message: '查询成功',
        type: 'success'
      })
    })
    .catch(() => {
      ElMessage.error('查询失败')
    })
}

// 新建用户的逻辑
const createUserClick = () => {
  userDialogRef.value.changeCenterDialogVisible(true)
}

//编辑的逻辑
const editUserClick = (editData: any) => {
  userDialogRef.value.changeCenterDialogVisible(false, editData)
}
</script>

<style scoped lang="scss">
.user {
  background-color: #fff;
  border-radius: 20px;
}
.count {
  overflow: hidden;
  margin-top: 30px;
  background-color: #fff;
  border-radius: 20px;
}
</style>
