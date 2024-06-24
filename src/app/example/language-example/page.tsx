"use client"
import useTranslation from '@/localization/client/useTranslations'

export default function Page() {
  const { t } = useTranslation()
  const { t: t2 } = useTranslation('home')
    
  return (
    <main>
      <p>Example Page(클라이언트)</p>
      <h2>언어팩 불러오기: useTranslation</h2>
      <p>기본 Namespace는 LanguagePackContextProvider에서 설정한 Namespace(Common) 입니다.</p>
      <p> {`t('sample')`}로 문자열을 출력할 수 있습니다. ({t('sample')})</p>
      <h2>추가 언어팩 불러오기: useTranslation</h2>
      <p>추가 언어팩은 LanguageResourceProvider에서 전달됩니다. </p>
      <p>추가 언어팩도 useTranslation Hook을 통해 불러옵니다. </p>
      <p>추가 언어팩은 파라미터로 LanguageResourceProvider에서 지정한 Namespace를 지정해야 합니다.</p>
      <p> {`t2('sample')`}로 문자열을 출력할 수 있습니다. ({t2('sample')})</p>
      <h2>다른 Namespace 언어 출력하기</h2>
      <p>Common Namespace에서는 {`t('home:sample')`}로 다른 리소스를 불러올 수 있습니다. ({t('home:sample')})</p>
      <p>Home Namespace에서는 {`t2('common:sample')`}로 다른 리소스를 불러올 수 있습니다. ({t2('common:sample')})</p>
    </main>
  )
}
