import type { contentConfigType } from '@/types/config/content.config'

export const contentConfig: contentConfigType = {
  header: {
    title: '菜单列表',
    btnText: '新建菜单'
  },
  pageName: 'menu',
  propsList: [
    {
      type: 'index',
      label: '序号',
      align: 'center',
      width: '60px'
    },
    {
      prop: 'name',
      label: '菜单名称',
      align: 'center',
      slotName: 'name',
      width: '150px'
    },
    {
      prop: 'type',
      label: '菜单级别',
      align: 'center',
      width: '100px',
      slotName: 'type'
    },
    {
      prop: 'url',
      label: '路径',
      align: 'center',
      width: '200px',
      slotName: 'url'
    },
    {
      prop: 'icon',
      label: '图标',
      align: 'center',
      width: '150px',
      slotName: 'icon'
    },
    {
      prop: 'sort',
      label: '排序',
      align: 'center',
      width: '100px',
      slotName: 'sort'
    },
    {
      prop: 'permission',
      label: '权限',
      align: 'center',
      width: '200px',
      slotName: 'permission'
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
      fixed: 'right',
      width: '200px'
    }
  ],
  table: {
    treeProps: {
      children: 'children',
      hasChildren: 'hasChildren'
    },
    rowKey: 'id'
  }
}
