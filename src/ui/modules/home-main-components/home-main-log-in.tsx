import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { Button } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import FlyChild from '../FlyChild'

const STYLE_ID = 'home_main_log_in'

export default function LogIn({
  isLogin,
  onClick,
}: {
  isLogin: boolean
  onClick?: () => void
}) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.log_in}>
      <div className={style.row_1}>
        <div className={style.group_1}>
          <div className={style.txt_1}>{t('t455')}</div>
          <div className={style.txt_1}>{t('t456')}</div>
        </div>
        <div className={style.txt_2}>{t('t206')}</div>
      </div>
      <div className={style.row_2}>
        <div className={style.group_1}>
          <Link href={''}>
            <Button
              color={'red'}
              shadow
              onClick={(e) => {
                e?.preventDefault()
                onClick && onClick()
              }}>
              {!isLogin ? t('t214') : t('t457')}
            </Button>
          </Link>
        </div>

        <div className={style.position_img_1}>
          <FlyChild />
          {/* <Image
            alt=""
            src="/src/images/@home/img_edmond.svg"
            width={100}
            height={100}
          /> */}
        </div>
      </div>
    </div>
  )
}
