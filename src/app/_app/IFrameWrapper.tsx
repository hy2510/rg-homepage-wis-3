'use client'

import { RefObject, useRef, useState } from 'react'
import { useScreenMode } from '@/ui/context/StyleContext'

export default function IFrameWrapper({
  pcUrl,
  mobileUrl,
}: {
  pcUrl: string
  mobileUrl: string
}) {
  const isMobile = useScreenMode() === 'mobile'

  const { iframeRef, onIframeLoad, height } = useRefIframeHeight()

  return (
    <div>
      <iframe
        width={'100%'}
        frameBorder="0"
        scrolling="no"
        ref={iframeRef}
        onLoad={onIframeLoad}
        src={isMobile ? mobileUrl : pcUrl}
        style={{
          backgroundColor: 'transparent',
          height: `${height + 20}px`,
        }}
      />
    </div>
  )
}

export function useRefIframeHeight(): {
  iframeRef: RefObject<HTMLIFrameElement>
  onIframeLoad: () => void
  height: number
} {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const [isIframeOnLoaded, setIframeOnLoaded] = useState(false)
  const [iframeHeight, setIframHeight] = useState(0)
  const adjustIframeHeight = () => {
    const iframe = iframeRef.current
    if (iframe && iframe.contentWindow) {
      const height = iframe.contentWindow.document.body.scrollHeight
      setIframHeight(height)
    }
    setIframeOnLoaded(true)
  }
  const scrollHeight = isIframeOnLoaded
    ? iframeHeight
    : iframeRef.current?.contentWindow?.document.body.scrollHeight || 0

  return {
    iframeRef,
    onIframeLoad: adjustIframeHeight,
    height: scrollHeight,
  }
}
