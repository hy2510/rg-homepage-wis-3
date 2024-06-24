import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'home_main_rg_post'

export const RgPostContainer = ({ children }: { children?: ReactNode }) => {
  const style = useStyle(STYLE_ID)
  return (
    <div className={style.rg_post_container}>
      <div className={style.row_1}>
        <div className={style.txt_1}>RG 포스트</div>
      </div>
      <div className={style.row_2}>{children}</div>
    </div>
  )
}

export const RgPostItem = ({
  imgSrc = '',
  href,
  target,
}: {
  imgSrc?: string
  href?: string
  target?: string
}) => {
  const style = useStyle(STYLE_ID)
  return (
    <Link href={href ? href : ''} target={target ? target : '_blank'}>
      <div className={style.rg_post_item}>
        <Image alt="" src={imgSrc} width={200} height={100} loading="lazy" />
      </div>
    </Link>
  )
}
