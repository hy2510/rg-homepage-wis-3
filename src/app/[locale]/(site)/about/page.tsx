'use client'

import { useScreenMode, useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_about'

export default function Page() {
  const style = useStyle(STYLE_ID)
  const isMobile = useScreenMode() === 'mobile'

  return (
    <main style={{ padding: 0 }}>
      <iframe
        title="External Content"
        width="100%"
        height="100%"
        src={
          isMobile
            ? '/src/html/page-contents/mobile/about/index.html'
            : '/src/html/page-contents/pc/about/index.html'
        }
        frameBorder="0"
        className={style.iframe}
      />
      {/* <iframe
    title="External Content"
    width="100%"
    ref={iframeRef}
    src="/src/html/page-contents/about/index.html"
    frameBorder="0"
    className={style.iframe}
  /> */}
      {/* <AbooutContents /> */}
      {/* <Section01 />
  <Section02 />
  <Section03 />
  <Section04 />
  <Section05 />
  <Section06 />
  <Section07 />
  <Section08 />
  <Section09 /> */}
    </main>
  )
}
