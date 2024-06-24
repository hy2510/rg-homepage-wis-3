import AuthorizationProvider from "@/authorization/client/AuthorizationContext"
import { getAuthorizationWithCookie } from "@/authorization/server/nextjsCookieAuthorization"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authorization = getAuthorizationWithCookie()

  return (
    <AuthorizationProvider id={authorization.token?.tag || ''}>
      <h1>ExamLayout</h1>
      {children}
    </AuthorizationProvider>
  )
}
