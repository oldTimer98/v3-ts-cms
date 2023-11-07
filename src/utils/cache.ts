enum CacheType {
  LOCAL,
  SESSION
}
class Cache {
  storage: Storage
  constructor(type: CacheType) {
    this.storage = type === CacheType.LOCAL ? localStorage : sessionStorage
  }
  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = this.storage.getItem(key)
    return value && JSON.parse(value)
  }
  // 移除单个
  removeCache(key: string) {
    this.storage.removeItem(key)
  }
  // 全部清空
  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.LOCAL)
const sessionCache = new Cache(CacheType.SESSION)

export { localCache, sessionCache }
