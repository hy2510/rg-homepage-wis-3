import { RankingNavBar } from '@/ui/modules/ranking-nav-bar/ranking-nav-bar'
import { ReactNode } from 'react'

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className="container compact">
      <RankingNavBar />
      {children}
    </div>
  )
}
