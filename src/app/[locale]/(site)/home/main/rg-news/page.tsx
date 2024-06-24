'use client'

import SITE_PATH from '@/app/site-path'
import Link from 'next/link'

export default function Page() {
  return (
    <main>
      <Link href={SITE_PATH.HOME.NOTICE}>rg-news/notice</Link>
    </main>
  )
}
