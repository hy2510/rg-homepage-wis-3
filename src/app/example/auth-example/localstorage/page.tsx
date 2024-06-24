import Link from 'next/link'

const currentPath = `./localstorage`

export default function Page() {
  return (
    <main>
      <div>
        <Link href={`${currentPath}/login`}>
          인증 샘플 - 로그인 페이지 이동
        </Link>
      </div>
      <div>
        <Link href={`${currentPath}/home`}>인증 샘플 - 홈 페이지 이동</Link>
      </div>
      <div>
        <Link href={`${currentPath}/about`}>
          인증 샘플 - 어바웃 페이지 이동
        </Link>
      </div>

      <hr />
      <p>이 예제는 Local Storage를 사용하는 방식입니다.</p>
      <p>
        File: AuthorizationContext-b.tsx, AuthorizationGuard-b.tsx 파일 구현
      </p>
      <p>
        액세스 토큰이 생성될 때, 해당 토큰을 구분할 수 있는 tag가 생성됩니다. 이
        tag를 Local Storage에 추가합니다.
      </p>
      <p>
        이 tag는 AuthorizationGuard 컴포넌트의 id 프롭스로 전달됩니다. <br />
        (AuthorizationGuard는 Context Provider 인 AuthorizationLoginUpdate의
        Wrapper 컴포넌트입니다.)
        <br />
        로그인 구분이 필요한 page.tsx 파일의 최상위 DOM으로 추가하면 됩니다.
      </p>
      <p>
        AuthorizationLoginUpdate 컴포넌트는 id 프롭스를 받아서
        AuthorizationContext로 전달합니다. <br />
        AuthorizationContext 에서는 id가 입력되면 router.refresh를 동작시킵니다.{' '}
        <br />
        이렇게되면 서버가 다시 쿠키를 로드하여 캐시를 초기화할 수 있습니다.
      </p>
      <p>
        router.refresh를 사용한 방식과의 차이점은, tag입력이 발생되지 않으면
        쿠키를 초기화 하지 않는다는 점입니다. <br />
        그런점에서 refresh를 호출하는 빈도를 조금 줄일 수 있습니다. <br />{' '}
        그러나 tag 입력이 누락되는 경우, 로그인 연동도 누락됩니다. 이렇게되면
        실시간으로 되어야하는 로그인연동이 어긋날 수 있습니다.
      </p>
    </main>
  )
}
