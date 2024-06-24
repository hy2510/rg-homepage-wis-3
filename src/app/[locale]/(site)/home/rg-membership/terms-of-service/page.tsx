import IFrameWrapper from '../../../../../_app/IFrameWrapper'

export default function Page() {
  const pcUrl =
    '/src/html/page-contents/pc/rg-membership/membership_04_terms_of_use.html'
  const mobileUrl =
    '/src/html/page-contents/mobile/rg-membership/membership_04_terms_of_use.html'
  return <IFrameWrapper pcUrl={pcUrl} mobileUrl={mobileUrl} />
}
