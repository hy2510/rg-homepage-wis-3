'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ClientLoginFormPage({}: {
  children?: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const onClickLogin = () => {
    if (!id || !pw) return

    function requestLogin(id: string, pw: string) {
      fetch('http://localhost:3000/api/login', {
        method: 'post',
        body: JSON.stringify({ username: id, password: pw }),
        cache: 'no-cache',
      }).then((res) => {
        if (res.status <= 200 && res.status <= 299) {
          router.refresh()
        } else {
          alert('login failed!')
        }
        setLoading(false)
      })
    }
    setLoading(true)
    requestLogin(id, pw)
  }

  return (
    <>
      <main>
        <div>
          <h3>Login ( loading.. {loading.toString()} )</h3>
          <p>
            <span>ID</span>
            <br />
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </p>
          <p>
            <span>Password</span>
            <br />
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </p>
          <button
            onClick={() => {
              if (!loading) {
                onClickLogin()
              }
            }}>
            Login
          </button>
        </div>
      </main>
    </>
  )
}
