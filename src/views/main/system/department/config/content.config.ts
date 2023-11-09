import type { contentConfigType } from '@/types/config/content.config'

export const contentConfig: contentConfigType = {
  header: {
    title: '部门列表',
    btnText: '新建部门'
  },
  pageName: 'department',
  propsList: [
    { type: 'selection', align: 'center', width: '50px' },
    {
      type: 'index',
      label: '序号',
      align: 'center',
      width: '60px'
    },
    {
      prop: 'name',
      label: '部门名称',
      align: 'center',
      slotName: 'name'
    },
    {
      prop: 'leader',
      label: '部门领导',
      align: 'center',
      width: '100px',
      slotName: 'leader'
    },
    {
      prop: 'parentId',
      label: '上级部门',
      align: 'center',
      width: '120px',
      slotName: 'parentId'
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
      width: '220px'
    }
  ]
}
