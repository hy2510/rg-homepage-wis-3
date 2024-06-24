'use client'
// @deprecated
export default function ClientRefreshTokenButton() {
  return (
    <div>
      <button
        onClick={() => {
          fetch('http://localhost:3000/api/check-example', {
            method: 'get',
            cache: 'no-cache',
          }).then((res) => {
            if (res.status >= 200 && res.status <= 299) {
              alert('success')
            } else {
              alert('login failed!')
            }
          })
        }}>
        API 요청 (Refresh 하지 않음)
      </button>
      <button
        onClick={() => {
          // TODO - Api Refresh.
        }}>
        API 요청 (401 리턴 시 Refresh 함)
      </button>
    </div>
  )
}
