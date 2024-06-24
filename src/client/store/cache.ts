export type CacheOption = {
  key: string
  isReload?: boolean
  isCacheOnly?: boolean
  expire?: number
  tag?: string
}
export type CacheValue = {
  time: number
  tag?: string
}
export type CacheStore = Map<string, CacheValue>

export function isCacheHit(
  cacheStore: CacheStore,
  option?: CacheOption
): boolean {
  if (!option) {
    return false
  }
  const {
    key,
    isReload = false,
    isCacheOnly = false,
    expire = 15 * 1000,
    tag,
  } = option

  if (isReload) {
    cacheStore.delete(key)
    return false
  }
  const cacheValue = cacheStore.get(key)
  if (!cacheValue) {
    return false
  }
  if (isCacheOnly) {
    return true
  }
  const timeDelta = Date.now() - cacheValue.time
  const isTimeoutCache = timeDelta < expire

  if (isTimeoutCache && tag !== undefined) {
    return tag === cacheValue.tag
  }
  return isTimeoutCache
}

export function writeCache(cacheStore: CacheStore, option?: CacheOption) {
  if (!option) {
    return
  }
  cacheStore.set(option.key, {
    time: Date.now(),
    tag: option.tag,
  })
}
