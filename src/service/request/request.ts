import config, { type configType } from '@/service/request/config'
import axios, { type AxiosInstance } from 'axios'
class YzzRequest {
  instance: AxiosInstance
  constructor(config: configType) {
    this.instance = axios.create({
      baseURL: config.BASE_URL,
      timeout: config.TIME_OUT
    })
  }
  request(config) {
    return this.instance.request(config)
  }
  get(config) {
    return this.instance.request({ ...config, method: 'GET' })
  }
  post(config) {
    return this.instance.request({ ...config, method: 'POST' })
  }
}

export default new YzzRequest(config)
