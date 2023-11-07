export interface Istate {
  list: IList[]
  totalCount: number
  pageSize: number
  currentPage: number
  searchState: any
  pagelist: []
  pagetotalCount: number
  entireRoles: any[]
  entireDepartments: any[]
  entireAllMenulist: any[]
}
interface IList {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}
export interface formInfoType {
  id: string
  name: string
  realname: string
  cellphone: string
  enable: number
  createAt: string
}
export interface userFormType {
  name: string
  realname: string
  password: string
  cellphone: string
  roleId: number | undefined
  departmentId: number | undefined
}
