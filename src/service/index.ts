import config from '@/service/request/config'
import YzzRequest from '@/service/request/request'
import { localCache } from '@/utils/cache'
import { showLoading, hideLoading } from '@/utils/loading'

const Request = new YzzRequest({
  baseURL: config.BASE_URL,
  timeout: config.TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache('token')
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      showLoading()
      console.log('触发单个请求拦截器', config)
      return config
    },
    responseSuccessFn: (res) => {
      setTimeout(() => {
        hideLoading()
      }, 200)
      return res
    },
    responseFailureFn(err) {
      setTimeout(() => {
        hideLoading()
      }, 200)
      return err
    },
    requestFailureFn(err) {
      setTimeout(() => {
        hideLoading()
      }, 200)
      return err
    }
  }
})
export default Request
