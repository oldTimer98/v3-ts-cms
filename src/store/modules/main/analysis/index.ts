import { defineStore } from 'pinia'
import {
  getGoodAddressSale,
  getGoodsAmountList,
  getGoodsCategoryCount,
  getGoodsCategoryFavor,
  getGoodsCategorySale,
  getGoodsSaleTop10
} from '@/service/modules/main/analysis'
import type {
  GoodsAddressSale,
  GoodsAmountInfo,
  GoodsCategory,
  GoodsCategoryFavor,
  GoodsSaleTop10
} from '@/types/main/analysis'

interface myState {
  goodsAmountList: GoodsAmountInfo[]
  goodAddressSale: GoodsAddressSale[]
  goodsCategoryCount: GoodsCategory[]
  goodsCategorySale: GoodsCategory[]
  goodsCategoryFavor: GoodsCategoryFavor[]
  goodsSaleTop10: GoodsSaleTop10[]
}
export const useAnalysisStore = defineStore('analysis', {
  state: (): myState => {
    return {
      goodsAmountList: [],
      goodAddressSale: [],
      goodsCategoryCount: [],
      goodsCategorySale: [],
      goodsCategoryFavor: [],
      goodsSaleTop10: []
    }
  },
  actions: {
    async getGoodsAmountListAction() {
      const res = await getGoodsAmountList()
      this.goodsAmountList = res.data
    },
    async getGoodsAddressSaleAction() {
      const res = await getGoodAddressSale()
      this.goodAddressSale = res.data
    },
    async getGoodsCategoryCountAction() {
      const res = await getGoodsCategoryCount()
      this.goodsCategoryCount = res.data
    },
    async getGoodsCategorySaleAction() {
      const res = await getGoodsCategorySale()
      this.goodsCategorySale = res.data
    },
    async getGoodsCategoryFavorAction() {
      const res = await getGoodsCategoryFavor()
      this.goodsCategoryFavor = res.data
    },
    async getGoodsSaleTop10Action() {
      const res = await getGoodsSaleTop10()
      this.goodsSaleTop10 = res.data
    },
    async getDashBoardDataAction() {
      this.getGoodsAmountListAction()
      this.getGoodsAddressSaleAction()
      this.getGoodsCategoryCountAction()
      this.getGoodsCategorySaleAction()
      this.getGoodsCategoryFavorAction()
      this.getGoodsSaleTop10Action()
    }
  }
})
