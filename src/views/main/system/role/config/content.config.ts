import type { contentConfigType } from '@/types/config/content.config'

export const contentConfig: contentConfigType = {
  header: {
    title: '角色列表',
    btnText: '新建角色'
  },
  pageName: 'role',
  propsList: [
    {
      type: 'selection',
      align: 'center',
      width: '60px'
    },
    {
      type: 'index',
      label: '序号',
      align: 'center',
      width: '60px'
    },
    {
      prop: 'name',
      label: '角色名称',
      align: 'center',
      slotName: 'name',
      width: '150px'
    },
    {
      prop: 'intro',
      label: '权限介绍',
      align: 'center',
      slotName: 'intro'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      align: 'center',
      width: '200px',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      align: 'center',
      width: '200px',
      slotName: 'updateAt'
    },
    {
      type: 'operation',
      prop: 'operation',
      label: '操作',
      align: 'center',
      slotName: 'operate',
      width: '200px'
    }
  ]
}
