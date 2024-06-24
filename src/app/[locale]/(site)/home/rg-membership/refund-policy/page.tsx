import IFrameWrapper from '../../../../../_app/IFrameWrapper'

export default function Page() {
  const pcUrl =
    '/src/html/page-contents/pc/rg-membership/membership_03_refund_policy.html'
  const mobileUrl =
    '/src/html/page-contents/mobile/rg-membership/membership_03_refund_policy.html'
  return <IFrameWrapper pcUrl={pcUrl} mobileUrl={mobileUrl} />
}
