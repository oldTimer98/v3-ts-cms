import type { modalConfigType } from '@/types/config/modal.config'

export const modalConfig: modalConfigType = {
  pageName: 'department',
  title: '部门',
  formItems: [
    { type: 'input', prop: 'name', label: '部门名称', placeholder: '请输入部门名称' },
    {
      type: 'select',
      prop: 'parentId',
      label: '上级部门',
      placeholder: '请输入上级部门',
      options: []
    },
    {
      type: 'input',
      prop: 'leader',
      label: '领导名称',
      placeholder: '请输入领导名称'
    }
  ]
}
