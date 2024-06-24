import NoticeBoardList from '../../_cpnt/NoticeBoardList'

export default function Page({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const page = searchParams.page ? Number(searchParams.page) : 1
  return <NoticeBoardList page={page} />
}
