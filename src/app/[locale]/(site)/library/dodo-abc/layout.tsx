import SITE_PATH from '@/app/site-path'
import React from 'react'
import { BackLink, Margin } from '@/ui/common/common-components'

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div className="pd-top-m"></div>
      <BackLink href={SITE_PATH.LIBRARY.HOME} largeFont>
        DODO ABC
      </BackLink>
      <Margin height={5} />
      {children}
    </>
  )
}
