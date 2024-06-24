import AuthorizationGuard from '@/authorization/server/AuthorizationGuard'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import ClientApiButton from './ClientApiButton'
import LoginForm from './ClientLoginForm'
import { getServerExample } from '@/repository/server/api'

export const revalidate = 0

async function getDataWithLogin() {
  const authorization = getAuthorizationWithCookie()
  if (authorization.isLogin()) {
    return { message: 'Login 되어 있습니다.' }
  } else {
    return { message: 'Logout 되어 있습니다.' }
  }
}

async function getData() {
  const response = await getServerExample()
  if (response.ok) {
    return response.data
  }
  return { time: response.result.message, label: 'error' }
}

export default async function Page() {
  const authorization = getAuthorizationWithCookie()

  const dataWithLogin = await getDataWithLogin()
  const data = await getData()
  return (
    <main>
      <h4>HTTP 요청</h4>
      <h4>
        HTTP 요청 방식은 Server Component{`(또는 route)`}에서 요청방식과 Client
        Component에서 요청 방식으로 나뉜다.
      </h4>
      <h4>1. Server Component{`(RSC)`}에서 요청</h4>
      <p>
        RSC에서의 데이터 요청은 컴포넌트 함수 내부에서 데이터를 조회하는 기능을
        구현하면 된다.
      </p>
      <p>
        이 프로젝트에는 {`repository/server/api.ts`} 파일 내부에 호출할 API를
        정의하도록 되어 있다.
      </p>
      <p>해당 API함수를 조회하여 데이터를 컴포넌트에 binding하면 된다.</p>
      <h4>
        !! 주의사항: 이 프로젝트에서 RSC에는 로그인 기능 연동은 제외되었다.
      </h4>
      <p>
        RSC에서는 Cookie에 쓰기 기능을 사용할 수 없기 때문에 토큰 갱신 하더라도
        변경된 토큰을 클라이언트로 전달할 수 없기 때문이다.
        <br />
        NextJs에서 Cookie를 수정하는 방법은 route.js를 정의하거나 Server
        Action을 구현해야 한다.
        <br />
        그러므로, 일단은 로그인이 필요없는 부분에서만 사용하도록 결정하였다.
      </p>
      <h4>2. Client Component{`(RCC)`}에서 요청</h4>
      <p>
        RCC에서의 데이터 요청은 Event{`(onClick, onChange 등..)`} 또는 Hook을
        통해서 요청할 수 있다. 데이터를 조회하는 기능을 정의하고, 필요에 따라
        호출하면 된다.
      </p>
      <p>
        이 프로젝트에는 {`repository/client/api.ts`} 파일 내부에 호출할 API를
        정의하도록 되어 있다.
      </p>
      <p>해당 API함수를 조회하여 데이터를 컴포넌트에 binding하면 된다.</p>
      <p>
        사용방법은 동일하지만 RSC와의 차이가 존재한다. RSC는 실제 데이터가
        존재하는 저장소를 연결하여 데이터를 가져온다.
        <br />
        그러나 RCC는 NextJs의 route.js 파일이 있는 경로를 호출한다.
        <br />
        route.js는 RSC와 마찬가지로, {`repository/server/api.ts`} 파일에 구현된
        함수를 호출하도록 구현한다.
        <br />
        그렇게되면 실제 데이터가 존재하는 저장소를 연결하여 데이터를 가져올 수
        있다.
      </p>
      <p>
        RCC는 로그인 연동기능을 활용할 수 있다 {`repository/client/utils.ts`}의
        executeWithAuth 함수를 사용하면, 로그인이 필요한 API를 요청할 수 있다.
        <br />
        정확하게는, 요청한 결과가 401오류를 출력하면 토큰을 갱신하고, 다시
        요청하도록 구현되어 있다.
      </p>
      <h4>구성요소별 호출 흐름</h4>
      <p>NextJs의 Server구성요소와 Client의 구성요소를 정리하면 다음과 같다.</p>
      <h4>
        Server: Component{`(또는 route)`}에서 {`repository/server/api.ts`}{' '}
        파일에 구현된 API를 호출한다.
      </h4>
      <h4>
        Client: Client Event에서 {`repository/client/api.ts`} 파일에 구현된
        API를 호출한다.
        <br />
        api.ts 내부에서는 route.js경로를 호출하도록 되어 있다. route.js는 서버
        구성요소이므로 서버와 동일하게 {`repository/server/api.ts`} 파일에
        구현된 API를 호출한다.
        <br />
        결론적으로 실제 데이터가 존재하는 서버와의 연결은{' '}
        {`repository/server/api.ts`}
        파일에 정의된다.
      </h4>
      <h4>Repository 폴더 구조</h4>
      <h4>Client</h4>
      <p>
        {`repository/client/api`} : Client에서 호출하는 API 목록
        {`(Controller 개념)`}
        <br />
        {`repository/client/model/*`} : Client API가 서버로 조회하는 데이터 목록
        {`(Service 개념)`}
      </p>
      <h4>Server</h4>
      <p>
        {`repository/server/api`} : Server에서 호출하는 API 목록
        {`(Controller 개념)`}
        <br />
        {`repository/server/model/*`} : Server API가 서버로 조회하는 데이터 목록
        {`(Service 개념)`}
      </p>

      <hr />
      <p>Http Page</p>
      <div style={{ border: 'solid 1px #bbbbbb' }}>
        <p>서버 측 요청</p>
      </div>
      <div style={{ border: 'solid 1px #bbbbbb' }}>
        <AuthorizationGuard id={authorization.token?.tag || ''}>
          <p>Login 필수</p>
          <p>{dataWithLogin.message}</p>
          <div>
            <LoginForm />
          </div>
        </AuthorizationGuard>
      </div>
      <div style={{ border: 'solid 1px #bbbbbb' }}>
        <p>Login 없어도 동작</p>
        <p>
          {data?.time}:{`(${data?.label})`}
        </p>
      </div>
      <div style={{ border: 'solid 1px #bbbbbb' }}>
        <ClientApiButton />
      </div>
    </main>
  )
}
