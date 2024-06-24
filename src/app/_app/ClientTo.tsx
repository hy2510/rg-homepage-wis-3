'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ClientTo({
  to,
  isReplace,
}: {
  to: string
  isReplace?: boolean
}) {
  const router = useRouter()

  useEffect(() => {
    if (isReplace) {
      router.replace(to)
    } else {
      router.push(to)
    }
  }, [to, isReplace, router])

  return <></>
}
