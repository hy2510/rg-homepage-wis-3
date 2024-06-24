const CONFIG_STORAGE_KEY = 'user_conf'

export type UserConfig = {
  _id: string
  mode: string
}

export function getUserConfigs(): UserConfig[] {
  const configs: UserConfig[] = []
  if (window) {
    const configJson = window.localStorage.getItem(CONFIG_STORAGE_KEY)
    if (configJson) {
      const objConfig = JSON.parse(configJson) as UserConfig[]
      configs.push(...objConfig)
    }
  }
  return configs
}

export function getUserConfig(
  info: {
    customerId: string
    studentId: string
  },
  isEmptyCreate?: boolean,
): UserConfig | undefined {
  const configId = getConfigId(info)
  const configs = getUserConfigs().filter((config) => {
    return config._id === configId
  })
  if (configs.length === 1) {
    return configs[0]
  }
  if (isEmptyCreate) {
    return {
      _id: configId,
      mode: '',
    }
  }
  return undefined
}

export function updateUserConfig(update: {
  customerId: string
  studentId: string
  mode: string
}) {
  const configId = getConfigId(update)
  const allConfigs = getUserConfigs()
  const myConfig = getUserConfig(update)

  const configs: UserConfig[] = []
  if (myConfig) {
    configs.push(
      ...allConfigs.map((config) => {
        if (config._id === configId) {
          const newConfig: UserConfig = {
            ...config,
            mode: update.mode,
          }
          return newConfig
        } else {
          return config
        }
      }),
    )
  } else {
    const newConfig: UserConfig = {
      _id: configId,
      mode: update.mode,
    }
    configs.push(...allConfigs, newConfig)
  }
  if (window) {
    window.localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(configs))
  }
}

function getConfigId({
  customerId,
  studentId,
}: {
  customerId: string
  studentId: string
}) {
  return `${customerId}#${studentId}`
}
