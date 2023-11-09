import type { searchConfigType } from '@/types/config/search.config.d'

export const searchConfig: searchConfigType = {
  formItems: [
    { type: 'input', prop: 'name', label: '部门名称', placeholder: '请输入查询的部门名称' },
    { type: 'input', prop: 'leader', label: '部门领导', placeholder: '请输入查询的部门名称' },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}
