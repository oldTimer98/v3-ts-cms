import type { FormItemProps } from 'element-plus'

interface selectOptions {
  value: string
  label: string
}

export interface appFormItem extends Partial<FormItemProps> {
  initialValue?: string
  type?: 'input' | 'select' | 'date-picker' | 'custom'
  placeholder?: string
  options?: SelectOptions[]
}
