import type { modalConfigType } from '@/types/config/modal.config'

export const modalConfig: modalConfigType = {
  pageName: 'menu',
  title: '菜单',
  formItems: [
    { type: 'input', prop: 'name', label: '菜单名称', placeholder: '请输入菜单名称' },
    {
      type: 'select',
      prop: 'type',
      label: '菜单级别',
      placeholder: '请选择菜单级别',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' }
      ]
    },
    {
      type: 'input',
      prop: 'url',
      label: '菜单路径',
      placeholder: '请输入菜单路径'
    },
    {
      type: 'input',
      prop: 'sort',
      label: '排序',
      placeholder: '请输入排序'
    },
    {
      type: 'input',
      prop: 'icon',
      label: '图标',
      placeholder: '请输入图标'
    },
    {
      type: 'input',
      prop: 'permission',
      label: '权限',
      placeholder: '请输入权限'
    },
    {
      type: 'custom',
      prop: 'parentId',
      label: '上级菜单',
      placeholder: '请输入上级菜单'
    }
  ]
}
