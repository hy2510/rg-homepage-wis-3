import { AuthorizationLoginUpdate } from '../client/AuthorizationContext-b'

export default function AuthorizationGuard({
  children,
  id,
}: {
  children: React.ReactNode
  id: string
  redirectPath?: string
}) {
  return (
    <AuthorizationLoginUpdate loginTag={id}>
      {children}
    </AuthorizationLoginUpdate>
  )
}
