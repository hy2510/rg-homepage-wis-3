'use client'

import { useIsLogin } from '@/authorization/client/AuthorizationContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// @deprecated
export default function LoginForm() {
  const router = useRouter()

  const [id, setId] = useState('as12')
  const [pw, setPw] = useState('qwe123')

  const isLogin = useIsLogin()

  return (
    <div>
      {isLogin ? (
        <div>
          <button
            onClick={() => {
              const run = async () => {
                // await deleteLogout()
                router.refresh()
              }
              run()
            }}>
            Logout
          </button>
        </div>
      ) : (
        <>
          <div>
            <input
              maxLength={18}
              onChange={(e) => setId(e.target.value)}
              value={id}
            />
          </div>
          <div>
            <input
              type="password"
              maxLength={18}
              onChange={(e) => setPw(e.target.value)}
              value={pw}
            />
          </div>
          <button
            onClick={() => {
              const run = async () => {
                // await postLogin({ username: id, password: pw })
                router.refresh()
              }
              run()
            }}>
            Login
          </button>
        </>
      )}
    </div>
  )
}
