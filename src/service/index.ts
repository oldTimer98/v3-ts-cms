import config from '@/service/request/config'
import YzzRequest from '@/service/request/request'

const Request = new YzzRequest({
  baseURL: config.BASE_URL,
  timeout: config.TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      console.log('触发单个请求拦截器', config)
      return config
    }
  }
})
export default Request
