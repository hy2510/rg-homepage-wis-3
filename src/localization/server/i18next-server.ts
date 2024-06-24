'server-only'

import i18next, { TFunction, i18n } from 'i18next'
import { supportLanguages, supportNamespaces } from '../localize-config'

const mapI18nInstances: Map<string, i18n> = new Map()

async function getI18n(lang: string): Promise<i18n> {
  const instance = mapI18nInstances.get(lang)
  if (instance) {
    return instance
  }
  /* :  i18next 리소스 구조
  {
    ko(lang): {
      home(ns): {
        key: 'value'
      }
    }
  }
  */
  const isSupportedLanguage =
    supportLanguages.filter((l) => l === lang).length > 0
  if (!isSupportedLanguage) {
    throw new Error(`[${lang}] is Not Support Language !`)
  }

  const resources: { [key: string]: { [key: string]: {} } } = {}
  resources[lang] = {}
  for (const ns of supportNamespaces) {
    const testRes = (
      await import(`@/localization/translate/${ns}.${lang}.json`)
    ).default
    resources[lang][ns] = testRes
  }
  let initOptions = {
    lng: lang,
    debug: false,
    resources,
  }
  const i18nInstance = i18next.createInstance()
  await i18nInstance.init(initOptions)

  mapI18nInstances.set(lang, i18nInstance)
  return i18nInstance
}

async function getTranslation(
  lang: string,
  ns: string | undefined = 'common',
): Promise<{ t: TFunction; i18n: i18n }> {
  const instance = await getI18n(lang)

  return {
    t: instance.getFixedT(lang, ns),
    i18n: instance,
  }
}

async function getLanguageResources(
  lang: string,
  ns: string | undefined = 'common',
): Promise<unknown> {
  const instance = await getI18n(lang)
  return {
    ...instance.getResourceBundle(lang, ns),
  }
}

export { getTranslation, getLanguageResources }
