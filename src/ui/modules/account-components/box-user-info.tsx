import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'box_user_info'

export default function BoxUserInfo({
  datas,
}: {
  datas: { label: string; value: string }[]
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.box_user_info}>
      {datas.map(({ label, value }) => (
        <BoxUserInfoItem
          key={`${label}-${value}`}
          label={label}
          value={value}
        />
      ))}
    </div>
  )
}

function BoxUserInfoItem({ label, value }: { label: string; value: string }) {
  return (
    <>
      <div>{label}</div>
      <div>{value}</div>
    </>
  )
}
