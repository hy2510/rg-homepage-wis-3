import NoticeBoardDetail from '../../_cpnt/NoticeBoardDetail'

export default function Page({ params }: { params: { id: string } }) {
  return <NoticeBoardDetail id={params.id} />
}
