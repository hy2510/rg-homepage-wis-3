import { ReviewNavBar } from '@/ui/modules/review-nav-bar/review-nav-bar'

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="container compact">
      <ReviewNavBar />
      {children}
    </div>
  )
}
