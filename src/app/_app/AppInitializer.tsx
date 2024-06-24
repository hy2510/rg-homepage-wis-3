'use client'

import AppContextProvider, { ApplicationType } from '@/app/_context/AppContext'
import CustomerContextProvider from '@/app/_context/CustomerContext'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { useStudentInfo } from '@/client/store/student/info/selector'
import ChatbotContextProvider from '../_context/ChatbotContext'
import SITE_PATH, { isValidatePath } from '../site-path'
import ClientTo from './ClientTo'
import LoginForward from './LoginForward'

export default function AppInitializer({
  children,
  applicationType,
  customerJson,
  isLogin,
}: {
  applicationType: string
  customerJson?: string
  isLogin?: boolean
  children?: ReactNode
}) {
  const path = usePathname()
  const loginStatus = useStudentInfo().login
  const isLoginForwardValidatePath = isValidatePath(path)

  let appType: ApplicationType = 'app'
  if (applicationType === 'private') {
    appType = 'private'
  } else if (applicationType === 'school') {
    appType = 'school'
  } else if (applicationType === 'academy') {
    appType = 'academy'
  }

  return (
    <AppContextProvider applicationType={appType}>
      <CustomerContextProvider customerJson={customerJson}>
        <ChatbotContextProvider>
          {children}
          {isLogin &&
            loginStatus === 'unknown' &&
            isLoginForwardValidatePath && <LoginForward to={path} />}
          {appType === 'app' && !isLogin && (
            <ClientTo to={SITE_PATH.ACCOUNT.MAIN} isReplace={true} />
          )}
        </ChatbotContextProvider>
      </CustomerContextProvider>
    </AppContextProvider>
  )
}
