import type { TableColumnCtx } from 'element-plus'

interface appTableColumn<T> extends Partial<TableColumnCtx<T>> {
  slotName?: string
}

export interface contentConfigType<T = any> {
  header: {
    title: string
    btnText: string
  }
  pageName: string
  propsList: appTableColumn<T>[]
  table?: {
    treeProps?: {
      children?: string
      hasChildren?: string
    }
    rowKey?: id
  }
}
