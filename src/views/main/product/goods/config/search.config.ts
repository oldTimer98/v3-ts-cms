import type { searchConfigType } from '@/types/config/search.config'
export const searchConfig: searchConfigType = {
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '商品名称',
      placeholder: '请输入查询的商品名称'
    },
    {
      type: 'input',
      prop: 'address',
      label: '商品地址',
      placeholder: '请输入查询的商品地址'
    },
    {
      type: 'select',
      prop: 'status',
      label: '状态',
      options: [
        { value: '1', label: '可用' },
        { value: '0', label: '下架' }
      ]
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}
