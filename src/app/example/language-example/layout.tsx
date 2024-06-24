import LanguagePackContextProvider, { LanguageResourceProvider } from "@/localization/client/LanguagePackContext"
import { getLanguageResources, getTranslation } from "@/localization/server/i18next-server"

async function getDefaultLanguage() {
    return await getTranslation('ko')
}

async function getHomeLanguage() {
    return await getTranslation('ko', 'home')
}

async function getDefaultLanguagePack() {
    return await getLanguageResources('ko')
}

async function getHomeLanguagePack() {
    return await getLanguageResources('ko', 'home')
}


export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const common = await getDefaultLanguage()
  const home = await getHomeLanguage()
  const resCommon = await getDefaultLanguagePack()
  const resHome = await getHomeLanguagePack()

  return (
    <>
      <h2 style={{color: 'red'}}>! 언어별로 라우팅하기 위해서는 Middleware를 추가 설정 해야 함</h2>
      <hr />
      <h2>서버에서 다국어 불러오기: getTranslation</h2>
      <p>기본 Namespace는 common입니다. {`common.t('sample')`}로 sample 문자열을 불러올 수 있습니다. ({common.t('sample')})</p>
      <p>common 리소스에서 home의 리소스를 접근하려면 {`common.t('home:sample')`}합니다. ({common.t('home:sample')})</p>
      <p>리소스를 불러올 때 Namespace를 지정할 수 있습니다. home을 지정하면 {`home.t('sample')`} 로 home 리소스를 출력할 수 있습니다. ({home.t('sample')})</p>
      <p>home 리소스에서 common의 리소스를 접근하려면 {`home.t('common:sample')`}합니다. ({home.t('common:sample')})</p>
      <h2>서버에서 언어팩 불러오기: getLanguageResources</h2>
      <p>클라이언트는 별도 언어팩을 갖고 있지 않습니다. 그러므로 서버에서 클라이언트에 언어팩을 전송해야 합니다.</p>
      <p>불러온 common 리소스: {JSON.stringify(resCommon)}</p>
      <p>불러온 res 리소스: {JSON.stringify(resHome)}</p>
      <h2>클라이언트 설정하기: LanguagePackContextProvider</h2>
      <p>Context API를 통해 클라이언트에 언어팩을 설정합니다.</p>
      <h2>클라이언트에 추가 리소스 전달하기: LanguageResourceProvider</h2>
      <p>Context API를 통해 언어팩을 추가적으로 전달할 수 있습니다. 반드시 LanguagePackContextProvider가 상위에 존재해야 합니다.</p>
      <hr />
      <LanguagePackContextProvider 
        language="ko"
        namespace="common"
        res={JSON.stringify(resCommon)}>
        <LanguageResourceProvider
            language="ko"
            namespace="home"
            res={JSON.stringify(resHome)}>
          {children}
        </LanguageResourceProvider>
      </LanguagePackContextProvider>
    </>
  )
}
