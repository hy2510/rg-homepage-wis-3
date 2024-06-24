'use client'
// @deprecated
export default function ClientApiButton() {
  const fetchAction = () => {
    const run = async () => {
      // const response = await API.getFreeExample()
      // if (response.ok) {
      //   alert(response.data?.time)
      // } else {
      //   alert('error ... ' + response.result.message)
      // }
    }
    run()
  }
  const fetchActionRequireLogin = () => {
    const run = async () => {
      const isAutoRefresh = true
      // const response = await API.getCheckExampleWithAuth(isAutoRefresh ? 2 : 1)
      // if (response.ok) {
      //   alert(response.data?.pp)
      // } else {
      //   alert(response.result.message)
      // }
    }
    run()
  }

  return (
    <div>
      <p>클라이언트 측 요청</p>
      <p>
        <button onClick={() => fetchAction()}>
          1. 로그인 유무와 상관 없이 응답
        </button>
      </p>
      <p>
        <button onClick={() => fetchActionRequireLogin()}>
          2. 로그인 된 사용자만 응답
        </button>
      </p>
    </div>
  )
}
