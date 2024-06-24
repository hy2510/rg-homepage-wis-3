import IFrameWrapper from '@/app/_app/IFrameWrapper'

export default function Page({ params }: { params: { id: string } }) {
  const url = `/src/html/news-letter/${params.id}.html`
  return <IFrameWrapper pcUrl={url} mobileUrl={url} />
}
