import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETE_URL = '/admin/product/baseTrademark/remove/',
}

// 获取信息
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`,
  )
// 添加和修改已有品牌
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
// 删除品牌
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + `${id}`)
