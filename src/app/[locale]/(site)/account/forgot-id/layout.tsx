import useLoginBarrierRedirect from '@/app/_function/login-barrier'
import { ReactNode } from 'react'

export default function Layout({ children }: { children?: ReactNode }) {
  useLoginBarrierRedirect({ isLogoffOnly: true })

  return <>{children}</>
}
