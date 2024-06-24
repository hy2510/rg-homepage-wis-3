import Link from 'next/link'

const currentPath = `./combine`

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
      <p>
        이 예제는 Local Storage와 router.refresh를 모두 사용하는 방식입니다.
      </p>
      <p>File: AuthorizationContext.tsx, AuthorizationGuard.tsx 파일 구현</p>
      <p>
        두 방식 모두를 사용하여 구현한 이유는 최대한 실시간으로 로그인이
        연동되기를 바라기 때문입니다.
        <br />
        router.refresh를 통해 기본적으로 캐시를 매번 초기화 합니다.
        <br />그 다음은 Local Storage를 사용하여 Local Storage만 사용했을 때
        tag가 누락되는 현상을 대비합니다.
      </p>
    </main>
  )
}
