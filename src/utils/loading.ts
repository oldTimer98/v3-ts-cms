import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading.mjs'

// 定义⼀个请求次数的变量，⽤来记录当前页⾯总共请求的次数
let loadingRequestCount = 0
// 初始化loading
let loadingInstance: LoadingInstance
// 显⽰loading的函数并且记录请求次数 ++
const showLoading = () => {
  if (loadingRequestCount === 0) {
    // 全局实现loading效果，不⽤每个页⾯单独去v-loading
    // loading样式
    loadingInstance = ElLoading.service({
      lock: true,
      text: '加载中……',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  loadingRequestCount++
}
// 隐藏loading的函数，并且记录请求次数 --
const hideLoading = () => {
  if (loadingRequestCount <= 0) return
  loadingRequestCount--
  if (loadingRequestCount === 0) {
    loadingInstance.close()
  }
}
export { showLoading, hideLoading }
