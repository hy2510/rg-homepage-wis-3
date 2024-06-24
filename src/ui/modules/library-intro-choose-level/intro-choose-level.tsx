'use client'

import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'intro_choose_level'

// 단계선택 콘테이너
export function IntroChooseLevel({
  onChooseLevel,
}: {
  onChooseLevel?: (level: string) => void
}) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const [selectedLevel, setSelectedLevel] = useState<
    'PK' | 'KA' | '1A' | '2A' | undefined
  >(undefined)

  const onToggleCard = (level: 'PK' | 'KA' | '1A' | '2A') => {
    if (selectedLevel !== level) {
      setSelectedLevel(level)
    } else {
      setSelectedLevel(undefined)
    }
  }

  return (
    <div className={style.intro_choose_level}>
      <div
        className={`container compact ${style.intro_choose_level_container}`}>
        <div className={style.header}>
          <div className={style.txt_h}>{t('t517')}</div>
          <div className={style.txt_p}>{t('t518')}</div>
        </div>
        <div className={style.body}>
          <IntroChooseItem
            bgColor="#704ea6"
            label="PreK"
            title={t('t482')}
            detail={t('t519')}
            symbolImgSrc="/src/images/@intro-choose-level/prek_prev@2x.png"
            onCardClick={() => {
              onToggleCard('PK')
            }}
            onStartClick={() => {
              onChooseLevel && onChooseLevel('PK')
            }}
            active={selectedLevel === 'PK'}
          />
          <IntroChooseItem
            bgColor="#f6993b"
            label="Level K"
            title={t('t520')}
            detail={t('t521')}
            symbolImgSrc="/src/images/@intro-choose-level/ka_prev@2x.png"
            onCardClick={() => {
              onToggleCard('KA')
            }}
            onStartClick={() => {
              onChooseLevel && onChooseLevel('KA')
            }}
            active={selectedLevel === 'KA'}
          />
          <IntroChooseItem
            bgColor="#e35f33"
            label="Level 1"
            title={t('t522')}
            detail={t('t523')}
            symbolImgSrc="/src/images/@intro-choose-level/1a_prev@2x.png"
            onCardClick={() => {
              onToggleCard('1A')
            }}
            onStartClick={() => {
              onChooseLevel && onChooseLevel('1A')
            }}
            active={selectedLevel === '1A'}
          />
          <IntroChooseItem
            bgColor="#4eba60"
            label="Level 2"
            title={t('t524')}
            detail={t('t525')}
            symbolImgSrc="/src/images/@intro-choose-level/2a_prev@2x.png"
            onCardClick={() => {
              onToggleCard('2A')
            }}
            onStartClick={() => {
              onChooseLevel && onChooseLevel('2A')
            }}
            active={selectedLevel === '2A'}
          />
        </div>
      </div>
    </div>
  )
}

// 단계선택 아이템
export function IntroChooseItem({
  bgColor,
  label,
  title,
  detail,
  symbolImgSrc,
  active,
  onCardClick,
  onStartClick,
}: {
  bgColor?: string
  label?: string
  title?: string
  detail?: string
  symbolImgSrc: string
  active?: boolean
  onCardClick?: () => void
  onStartClick?: () => void
}) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div>
      <div
        style={{ backgroundColor: bgColor }}
        className={`${style.intro_choose_item}`}
        onClick={onCardClick}>
        <div className={style.exp}>
          <div className={style.txt_l}>{label}</div>
          <div className={style.txt_h}>{title}</div>
          <div className={style.txt_p}>{detail}</div>
        </div>
        <div className={style.choose_box}>
          <Image
            alt={''}
            src={symbolImgSrc}
            width={300}
            height={200}
            style={{ width: '100%', height: '100%' }}
          />
          <Button color={'red'} shadow onClick={onStartClick}>
            {t('t339')}
          </Button>
        </div>
      </div>
    </div>
  )
}
