import { getAuthorizationWithCookie } from "@/authorization/server/nextjsCookieAuthorization"
import ClientRefreshTokenButton from "../ClientRefreshTokenButton"
import ClientLoginFormPage from "../ClientLoginFormPage"

export default async function Page() {
  const authorization = getAuthorizationWithCookie()
  const isLogin = authorization?.token ? true : false
  
  return (
    <main>
      {isLogin?
      <>
        {'로그인 되어 있습니다.'}
      </>
      :
      <>
        <ClientLoginFormPage />
      </>
      }
      <ClientRefreshTokenButton />
    </main>
  )
}
