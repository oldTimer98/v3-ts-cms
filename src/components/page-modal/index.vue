import type { ITEM_RENDER_EVT } from 'element-plus/es/components/virtual-list/src/defaults.mjs';
<template>
  <div class="modal">
    <el-dialog v-model="dialogFormVisible" :title="modalConfig.title">
      <el-form :model="dialogForm" size="large" label-width="100px" class="pr-2">
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <template v-if="item.type === 'input'">
            <el-form-item :prop="item.prop" :label="item.label">
              <el-input v-model="dialogForm[item.prop]" :placeholder="item.placeholder" />
            </el-form-item>
          </template>
          <template v-if="item.type === 'select'">
            <el-form-item :prop="item.prop" :label="item.label">
              <el-select
                v-model="dialogForm[item.prop]"
                :placeholder="item.placeholder"
                class="w-full"
              >
                <el-option
                  v-for="i in item.options"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value"
                />
              </el-select>
            </el-form-item>
          </template>
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"> 保存 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { modalConfigType } from '@/types/config/modal.config'
interface Prop {
  modalConfig: modalConfigType
}
const props = defineProps<Prop>()
const dialogFormVisible = ref<boolean>(false)

// 初始化form
const initialFormData: any = {}
for (const item of props.modalConfig.formItems) {
  initialFormData[item.prop] = item.initialValue ?? undefined
}
const dialogForm: any = reactive(initialFormData)
const setDialogFormVisible = () => {
  dialogFormVisible.value = !dialogFormVisible.value
}
defineExpose({
  setDialogFormVisible
})
</script>

<style lang="scss" scoped></style>
