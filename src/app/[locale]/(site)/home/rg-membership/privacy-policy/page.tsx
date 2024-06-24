import IFrameWrapper from '../../../../../_app/IFrameWrapper'

export default function Page() {
  const pcUrl =
    '/src/html/page-contents/pc/rg-membership/membership_05_privacy_policy.html'
  const mobileUrl =
    '/src/html/page-contents/mobile/rg-membership/membership_05_privacy_policy.html'
  return <IFrameWrapper pcUrl={pcUrl} mobileUrl={mobileUrl} />
}
