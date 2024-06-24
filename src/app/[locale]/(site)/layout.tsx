import SiteLayoutComponent from './SiteLayoutComponent'

export const metadata = {
  title: 'Reading Gate',
  description: '온라인 영어독서관',
}

export default function Layout({ children }: { children?: React.ReactNode }) {
  return <SiteLayoutComponent>{children}</SiteLayoutComponent>
}
