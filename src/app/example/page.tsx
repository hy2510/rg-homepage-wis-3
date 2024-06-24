import Link from 'next/link'

export default function RootPage() {
  return (
    <main>
      <p>Root Page</p>
      <div>
        <Link href="example/auth-example">인증 샘플 페이지 이동</Link>
      </div>
      <div>
        <Link href="example/language-example">언어팩 샘플 페이지 이동</Link>
      </div>
      <div>
        <Link href="example/http-example">HTTP 샘플 페이지 이동</Link>
      </div>
    </main>
  )
}
