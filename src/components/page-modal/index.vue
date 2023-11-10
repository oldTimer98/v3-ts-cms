<template>
  <div class="modal">
    <el-dialog
      v-model="dialogFormVisible"
      :title="(isCreateFlag ? '新建' : '编辑') + modalConfig.title"
    >
      <el-form
        :model="dialogForm"
        size="large"
        label-width="100px"
        class="pr-2"
        ref="dialogFormRef"
      >
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <template v-if="item.type === 'input'">
            <el-form-item :prop="item.prop" :label="item.label">
              <el-input v-model="dialogForm[item.prop]" :placeholder="item.placeholder" clearable />
            </el-form-item>
          </template>
          <template v-if="item.type === 'select'">
            <el-form-item :prop="item.prop" :label="item.label">
              <el-select
                v-model="dialogForm[item.prop]"
                :placeholder="item.placeholder"
                class="w-full"
                filterable
                clearable
              >
                <template v-for="i in item.options" :key="i.value">
                  <el-option v-bind="i" />
                </template>
              </el-select>
            </el-form-item>
          </template>
          <template v-if="item.type === 'custom'">
            <el-form-item :prop="item.prop" :label="item.label">
              <slot :name="item.prop" v-bind="item"> </slot>
            </el-form-item>
          </template>
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm"> 保存 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="pageModal">
import type { FormInstance } from 'element-plus'
import { useMainStore } from '@/store/modules/main'
import type { modalConfigType } from '@/types/config/modal.config'
interface Prop {
  modalConfig: modalConfigType
  otherInfo?: object
}
const props = defineProps<Prop>()
const dialogFormVisible = ref<boolean>(false)
const mainStore = useMainStore()
let isCreateFlag = ref<boolean>(false)
const dialogFormRef = ref<FormInstance>()
let editId = ref()
// 初始化form
const initialFormData: any = {}
for (const item of props.modalConfig.formItems) {
  initialFormData[item.prop] = item.initialValue ?? undefined
}
let dialogForm: any = reactive(initialFormData)
// 设置弹窗的打开和关闭

const setDialogFormVisible = (isCreate = true, formInfo?: any) => {
  isCreateFlag.value = isCreate
  const newForm: any = {}
  if (!isCreate && formInfo) {
    // 编辑
    editId.value = formInfo.id
    for (const key in dialogForm) {
      newForm[key] = formInfo[key]
    }
  } else {
    //创建之前先清空数据
    for (const key in dialogForm) {
      newForm[key] = ''
    }
    dialogFormRef.value?.resetFields()
  }
  dialogForm = newForm
  dialogFormVisible.value = true
}
// 保存逻辑
const handleConfirm = async () => {
  if (isCreateFlag.value) {
    await mainStore.createDataList(props.modalConfig.pageName, {
      ...dialogForm,
      ...props.otherInfo
    })
    dialogFormVisible.value = false
  } else {
    await mainStore.editDataList(props.modalConfig.pageName, editId.value, {
      ...dialogForm,
      ...props.otherInfo
    })
    dialogFormVisible.value = false
  }
}
defineExpose({
  setDialogFormVisible
})
</script>

<style lang="scss" scoped></style>
