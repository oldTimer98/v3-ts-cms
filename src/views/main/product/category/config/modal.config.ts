import type { modalConfigType } from '@/types/config/modal.config'

export const modalConfig: modalConfigType = {
  pageName: 'category',
  title: '新建商品',
  formItems: [
    {
      type: 'input',
      label: '商品名称',
      prop: 'name',
      placeholder: '请输入商品名称'
    }
  ]
}
