'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ClientLogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onClickLogout = () => {
    setLoading(true)
    function doLogout() {
      fetch('http://localhost:3000/api/logout', {
        method: 'delete',
      }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          router.refresh()
        }
        setLoading(false)
      })
    }
    doLogout()
  }

  return (
    <div>
      <button
        onClick={() => {
          if (!loading) {
            onClickLogout()
          }
        }}>
        Logout
      </button>
    </div>
  )
}
