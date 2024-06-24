import i18next, { TFunction, i18n } from 'i18next'

interface LanguageResourceIdentifier {
  i18n?: i18nRG
  language: string
  namespace: string
}
interface LanguageResource extends LanguageResourceIdentifier {
  res: any
}
interface i18nRG extends i18n {}
interface TFunctionRG extends TFunction {}

const resourceBuffer: LanguageResource[] = []

/**
 * i18n 객체를 생성한다.
 * 기본으로 전달되는 언어리소스를 추가하고, buffer에 담겨있는 언어리소스가 있으면 추가한다.
 *
 * @param LanguageResource: {language: 언어, namespace: 문자열 그룹 구분, res: res: 문자열 객체(JSON Stringify)}
 * @returns
 */
async function createInstance({ language, namespace, res }: LanguageResource) {
  const i18n = i18next.createInstance()
  await i18n.init({
    lng: language,
    debug: false,
    defaultNS: namespace,
  })
  addResourceWrapper(i18n, language, namespace, res)
  while (resourceBuffer.length < 0) {
    const res = resourceBuffer.shift()!
    addResourceWrapper(i18n, res.language, res.namespace, res.res)
  }
  return i18n
}

/**
 * i18n 객체에 그룹을 추가한다. 만약에 i18n 객체가 생성되기 전이라면, buffer에 담아둔다.
 *
 * @param LanguageResource: {i18n: i18n 객체, language: 언어, namespace: 문자열 그룹 구분, res: res: 문자열 객체(JSON Stringify)}
 */
function appendResources({ i18n, language, namespace, res }: LanguageResource) {
  if (!hasAvailableResource({ language, namespace })) {
    const i18nInstance = i18n
    if (i18nInstance) {
      addResourceWrapper(i18nInstance, language, namespace, res)
    } else {
      resourceBuffer.push({ language, namespace, res })
    }
  }
}

/**
 * i18n 객체에 언어리소스가 추가되어 있는지 검사한다.
 *
 * @param LanguageResourceIdentifier: {i18n: i18n 객체, language: 언어, namespace: 문자열 그룹 구분}
 * @returns
 */
function hasAvailableResource({
  i18n,
  language,
  namespace,
}: LanguageResourceIdentifier): boolean {
  const i18nInstance = i18n
  if (!i18nInstance) {
    return false
  }
  if (!i18nInstance.getResourceBundle(language, namespace)) {
    return false
  }
  return true
}

/**
 * 로컬함수로 i18next의 언어리소스 추가하는 소스코드를 wrapping해 놓은 함수이다.
 *
 * @param i18n: i18n 객체
 * @param lng: 언어
 * @param ns: 문자열 그룹 구분
 * @param res: 문자열 객체(JSON Stringify)
 * @returns  i18n 객체
 */
function addResourceWrapper(
  i18n: i18nRG,
  lng: string,
  ns: string,
  res: any,
): i18nRG {
  i18n.addResourceBundle(lng, ns, JSON.parse(res), true, true)
  return i18n
}

export { appendResources, createInstance }
export type { TFunctionRG, i18nRG }
