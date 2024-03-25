// 分类相关数据类型
import type { ResponseData } from '@/api/user/type'

export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
  data: [CategoryObj]
}

// 属性值对象
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}
export type AttrValueList = AttrValue[]

export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}

export type AttrList = Attr[]
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
