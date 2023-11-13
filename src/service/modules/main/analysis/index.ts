import Request from '@/service'
import type {
  GoodsAddressSaleData,
  GoodsAmountListData,
  GoodsCategoryData,
  GoodsCategoryFavorData,
  GoodsSaleTop10Data
} from '@/types/main/analysis'
export function getGoodsAmountList() {
  return Request.get<GoodsAmountListData>({
    url: '/goods/amount/list'
  })
}

export function getGoodAddressSale() {
  return Request.get<GoodsAddressSaleData>({
    url: '/goods/address/sale'
  })
}

export function getGoodsCategoryCount() {
  return Request.get<GoodsCategoryData>({
    url: '/goods/category/count'
  })
}

export function getGoodsCategorySale() {
  return Request.get<GoodsCategoryData>({
    url: '/goods/category/sale'
  })
}

export function getGoodsCategoryFavor() {
  return Request.get<GoodsCategoryFavorData>({
    url: '/goods/category/favor'
  })
}

export function getGoodsSaleTop10() {
  return Request.get<GoodsSaleTop10Data>({
    url: '/goods/sale/top10'
  })
}
