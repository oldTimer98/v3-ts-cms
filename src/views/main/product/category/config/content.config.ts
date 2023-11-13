import type { contentConfigType } from '@/types/config/content.config'

export const tableConfig: contentConfigType = {
  header: {
    title: '商品列表',
    btnText: '新建商品'
  },
  pageName: 'category',
  propsList: [
    { type: 'index', label: '序号', align: 'center', width: '60px' },
    { prop: 'name', label: '商品名称', align: 'center', slotName: 'name' },
    { prop: 'createAt', label: '创建时间', align: 'center', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', align: 'center', slotName: 'updateAt' },
    {
      type: 'operation',
      prop: 'operation',
      label: '操作',
      align: 'center',
      slotName: 'operation'
    }
  ]
}
