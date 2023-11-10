import type { modalConfigType } from '@/types/config/modal.config'

export const modalConfig: modalConfigType = {
  pageName: 'role',
  title: '角色',
  formItems: [
    { type: 'input', prop: 'name', label: '角色名称', placeholder: '请输入角色名称' },
    {
      type: 'input',
      prop: 'intro',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    },
    {
      type: 'custom',
      prop: 'menuList',
      label: '菜单列表'
    }
  ]
}
