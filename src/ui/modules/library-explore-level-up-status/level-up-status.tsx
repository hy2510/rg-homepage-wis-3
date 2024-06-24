import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { ProgressBar } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'level_up_status'

// 학습메인 > 사용자의 학습레벨의 레벨업 상태
export const LevelUpStatus = ({
  studyLevel,
  progress,
  onClick,
  onClickStudyMode,
}: {
  studyLevel: string
  progress: string
  onClick?: () => void
  onClickStudyMode?: () => void
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.level_up_status}>
      <div className={style.level_up_status_container}>
        <div className={style.row_a}>
          <div className={style.current_level} onClick={onClick}>
            <div className={style.txt_h}>{t('t469')}</div>
            <div className={style.txt_d}>{studyLevel}</div>
            <span className={style.arrow_icon}></span>
          </div>
        </div>
        <div className={style.row_b}>
          <SetStudyMode onClickStudyMode={onClickStudyMode} />
        </div>
      </div>
      <ProgressBar width={progress} check="100%" toolTip="Level Master" />
    </div>
  )
}

// 학습메인 > 학습 설정
const SetStudyMode = ({
  onClickStudyMode,
}: {
  onClickStudyMode?: () => void
}) => {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.set_study_mode} onClick={onClickStudyMode}>
      <Image
        alt=""
        src="/src/images//gear-icons/gears_gray.svg"
        width={18}
        height={18}
      />
      <span>{t('t044')}</span>
    </div>
  )
}
