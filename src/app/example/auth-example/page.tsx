import Link from 'next/link'

export default function Page() {
  return (
    <main>
      <p>Auth Page</p>
      <div>
        <Link href="/auth-example/combine">
          인증 샘플 - LocalStorage + router.refresh 모두 사용
        </Link>
      </div>
      <div>
        <Link href="/auth-example/localstorage">
          인증 샘플 - Local Storage 사용
        </Link>
      </div>
      <div>
        <Link href="/auth-example/refresh">
          인증 샘플 - router.refresh 사용
        </Link>
      </div>
      <div>
        <Link href="/auth-example/token">
          토큰 테스트하기 
        </Link>
      </div>
      <hr />
      <p>이 예제의 인증방식은 쿠키를 통한 인증입니다.</p>
      <p>
        NextJS 13 with App Directory 환경에서 브라우저 내에서 인증을 유지하기
        위한 방식으로 Local Storage를 이용하는 방식과 router.refresh를 이용하는
        방식이 있습니다.
        <br />
        (NextJS 13에서 서버 컴포넌트가 캐시되는 현상으로 인해 페이지가
        캐시되었다면, 변경된 쿠키가 클라이언트에 즉시 업데이트 되지 않습니다.{' '}
        <br />
        그래서 즉시 반영하기 위해서는 캐시를 초기화해야 합니다. <br />
        캐시를 초기화하기 위해서는 클라이언트 컴포넌트에서 useRouter {'> '}
        refresh() 를 호출하여 캐시를 초기화합니다.)
      </p>
      <p>위의 기능은 AuthorizationContext.tsx 파일에 구현되어 있습니다.</p>
      <p>
        초기설정은 루트 레이아웃에서 {'<AuthorizationProvider>'}로 감싸야
        합니다.
        <br />그 다음 로그인이 필요한 페이지에서 {'<AuthorizationGuard>'} 로
        감싸주면, 로그인 유무에 따른 처리를 구현할 수 있습니다.
        <br />- 파라미터로 id를 보내게 되어 있습니다. id가 공백이면 로그오프
        상태입니다. id 값은 토큰의 tag를 전송해야 합니다.
      </p>
      <p>
        로그인을 체크하는 방법은 간단합니다. <br />
        {'getAuthorizationWithCookie()'} 함수는 쿠키를 조회해서 객체화하는
        함수입니다. isLogin() 함수를 호출하면 true / false를 반환합니다(토큰이 만료되었어도 true를 반환합니다).
      </p>
      <p>
        로그인된 상태로 변경하는 방법은 {'setTokenWithCookie(response, token)'}{' '}
        함수를 호출하면 변경됩니다. 쿠키에 로큰정보를 직렬화하여 저장하게
        됩니다.
      </p>
      <p>
        API요청을 위한 토큰을 조회하기 위해서는{' '}
        {'getAuthorizationWithCookie().token'} 으로 접근하면 됩니다. 현재 쿠키에
        저장된 token을 조회할 수 있습니다. <br />
        그러나 쿠키의 시간에 따라서 access token이 만료되었을 수도 있습니다.
        <br />
        그럴 때에는 refresh token을 이용해서 access token을 갱신할 수 있습니다.
        <br />
        이 예제에서는 쿠키를 사용하고 있습니다. 
        <br />
        그래서 별도로 refresh token을 전송하지 않고, 쿠키에 저장되어 있는 refresh token을 이용하여 갱신을 시도합니다.
        <br />
        만약 refresh token이 만료되어 갱신하지 못하는 경우, 400번 상태를 리턴합니다. 갱신이 성공되면 쿠키가 변경되고 200번대의 상태를 리턴합니다.
      </p>
      <div>
        <br />
        로그인이 필요한 데이터의 요청 흐름은 다음과 같습니다.
        <div>
          <br />인증 성공 Case
          <br /> 1. http request (fetch 사용)
          <br /> 2. Authorization 성공 - fetch 결과 반환 - 종료
        </div>

        <div>
          <br />인증 실패 후 재갱신 Case
          <br /> 1. http request (fetch 사용)
          <br /> 2. Authorization 실패
          <br /> 3. refresh token 요청
          <br /> 4. 200번대 응답 
          <br /> 5. 1번의 http request 다시요청 
          <br /> 6. Authorization 성공 - fetch 결과 반환 - 종료
        </div>
      </div>
    </main>
  )
}
