import type { ResponseData } from '@/api/user/type'

export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: string | number
  tmId: number
  spuPosterList: null
  spuImageList: null
}
export type Records = SpuData[]

export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
// 所有品牌数据
export interface TradeMark {
  id: number
  tmName: string
  logoUrl: string
}
export interface AllTradeMark extends ResponseData {
  data: TradeMark[]
}
// 照片数据
export interface SpuImg {
  id: number
  createTime: string
  updateTime: string
  spuId: number
  imgName: string
  imgUrl: string
}
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}
// 属性数据
export interface SaleAttrValue {
  id?: number
  createTime: null
  updateTime: null
  spuId: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName: string
  isChecked: null
}
export type spuSaleAttrValueList = SaleAttrValue[]
export interface SaleAttr {
  id?: number
  createTime: null
  updateTime: null
  spuId: number
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: spuSaleAttrValueList
}
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}
// 返回属性
export interface HasSaleAttr {
  id: number
  name: string
}
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}
