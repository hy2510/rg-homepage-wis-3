'use client'

import { useApplicationType } from '@/app/_context/AppContext'
import LoginContextProvider from '@/app/_context/LoginContext'
import LoginForm from './LoginForm'
import LoginFormAcademy from './LoginFormAcademy'
import LoginFormIntegrated from './LoginFormIntegrated'
import LoginFormPrivate from './LoginFormPrivate'
import LoginFormSchool from './LoginFormSchool'

export default function Login() {
  const appType = useApplicationType()

  return (
    <LoginContextProvider>
      <LoginForm>
        {appType === 'private' && <LoginFormPrivate />}
        {appType === 'school' && <LoginFormSchool />}
        {appType === 'academy' && <LoginFormAcademy />}
        {appType === 'app' && <LoginFormIntegrated />}
      </LoginForm>
    </LoginContextProvider>
  )
}
