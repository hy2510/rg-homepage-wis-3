import Link from 'next/link'

const currentPath = `./refresh`

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
      <p>이 예제는 useRouter의 refresh()를 사용하는 방식입니다.</p>
      <p>
        File: AuthorizationContext-a.tsx, AuthorizationGuard-a.tsx 파일 구현
      </p>
      <p>
        서버 컴포넌트는 처음 rendering 된 이후 캐시됩니다. (NextJs 자체적인
        규칙이 있으나, 캐시는 약 1분~5분정도 시간을 갖는것으로 추정됩니다.)
        <br />
        캐시된 서버 컴포넌트는 서버로 요청을 보내지 않고, 클라이언트에서
        재사용합니다.
        <br />이 때에 쿠키에 저장된 로그인 토큰이 실시간으로 반영되지 않는
        문제가 있습니다.
        <br />
        useRouter의 refresh()를 사용하면, 캐시를 초기화하고 서버로 다시 요청하게
        됩니다.
      </p>
      <p>
        AuthorizationGuard 컴포넌트는 생성되면 router.refresh()를 실행합니다.
        (useEffect 사용)
        <br />
        이렇게되면 서버가 다시 쿠키를 로드하여 캐시를 초기화할 수 있습니다.
        <br />
        로그인 구분이 필요한 page.tsx 파일의 최상위 DOM으로 추가하면 됩니다.
      </p>
      <p>
        이 방식은 로그인 확인이 필요한 페이지는 캐시가 있다면 항상 두 번
        렌더링해야하는 문제가 있습니다. 또한, 서버측 요청이 빈번하게 발생하는
        문제점도 있습니다.
      </p>
      <p>
        그러나, 현재의 NextJS 13 with App Directory를 사용하는 경우에는
        refresh를 통해 캐시를 초기화하는 방법 이외에는 대안이 없습니다.
      </p>
    </main>
  )
}
