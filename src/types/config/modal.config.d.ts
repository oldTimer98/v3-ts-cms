import type { FormItemProps } from 'element-plus'

interface selectOptions {
  value: string
  label: string
}

interface FormItem extends Partial<FormItemProps> {
  type?: 'input' | 'select' | 'date-picker' | 'custom'
  prop: string
  label: string
  placeholder?: string
  initialValue?: string
  options?: SelectOptions[]
}

export interface modalConfigType {
  pageName: string
  title: string
  formItems: FormItem[]
}
