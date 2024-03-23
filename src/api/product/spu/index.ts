import request from '@/utils/request'
import type {HasSpuResponseData, AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData} from './type'

enum API {
    HASSPU_URL = '/admin/product/',
    ALLTRADEMARK_URL = '/admin/product/baseSaleAttrList',
    // 获取照片数据
    IMAGE_URL = '/admin/product/getSpuInfo/',
    SPUHASSALEATTR_URL =  '/admin/product/spuSaleAttrList/',
    ALLSALEATTR_URL = '/admin/product/baseSaleAttrList'
}

export const reqHasSpu = (page:number, limit:number, category3Id:number|string) => request.get<any,HasSpuResponseData>(API.HASSPU_URL+`${page}/${limit}?category3Id=${category3Id}`)
export const reqAllTradeMark = () => request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)
export const reqSpuImageList = (spuId: number) => request.get<any, SpuHasImg>(API.ALLTRADEMARK_URL+spuId)
export const reqSpuHasSaleAttr = (spuId: number) => request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL+spuId)
export const reqAllSaleAttr = () => request.get<any,HasSaleAttrResponseData>(API.ALLSALEATTR_URL)