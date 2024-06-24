import useTranslation from '@/localization/client/useTranslations'
import { useMemo, useState } from 'react'
import TabNavBar from '@/ui/common/TabNavBar'
import { AlertBar, Modal } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'level_selector'

export default function LevelSelector({
  _viewLevelSelector,
  bookType: propBookType,
  isChangeBookType: isSelectableBookType = false,
  level,
  ebLevelList = [],
  pbLevelList = [],
  onLevelClick,
}: {
  _viewLevelSelector?: (isView: boolean) => void
  bookType: 'EB' | 'PB'
  level: string
  isChangeBookType?: boolean
  ebLevelList?: {
    totalBooks: number
    completedBooks: number
    levelName: string
  }[]
  pbLevelList?: {
    totalBooks: number
    completedBooks: number
    levelName: string
  }[]
  onLevelClick?: (params: { bookType: string; level: string }) => void
}) {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const [bookType, setBookType] = useState<'EB' | 'PB'>(propBookType)
  const levelList = bookType === 'EB' ? ebLevelList : pbLevelList
  const [levelGroup1, levelGroup2, levelGroup3, levelGroup4] = useMemo(() => {
    const levelGroup1: {
      totalBooks: number
      completedBooks: number
      levelName: string
    }[] = []
    const levelGroup2: {
      totalBooks: number
      completedBooks: number
      levelName: string
    }[] = []
    const levelGroup3: {
      totalBooks: number
      completedBooks: number
      levelName: string
    }[] = []
    const levelGroup4: {
      totalBooks: number
      completedBooks: number
      levelName: string
    }[] = []

    levelList.forEach((level) => {
      const levelGroupId = level.levelName.substring(0, 1)
      if (levelGroupId === 'P') {
      } else if (levelGroupId === 'K') {
        levelGroup1.push(level)
      } else if (levelGroupId === '1') {
        levelGroup2.push(level)
      } else if (levelGroupId === '2' || levelGroupId === '3') {
        levelGroup3.push(level)
      } else {
        levelGroup4.push(level)
      }
    })

    return [
      { title: '초등학교 저학년 권장레벨', list: levelGroup1 },
      { title: '초등학교 고학년 권장레벨', list: levelGroup2 },
      { title: '중학교 권장레벨', list: levelGroup3 },
      { title: '고등학교 권장레벨', list: levelGroup4 },
    ]
  }, [levelList])

  return (
    <>
      <Modal
        compact
        header
        // title={`레벨별 탐색 - ${bookType === 'EB' ? 'eBook' : 'pBookQuiz'}`}
        title={t('t504')}
        onClickDelete={() => {
          _viewLevelSelector && _viewLevelSelector(false)
        }}
        onClickLightbox={() => {
          _viewLevelSelector && _viewLevelSelector(false)
        }}>
        <div className={style.current_study_level_container}>
          {isSelectableBookType && (
            <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
              <TabNavBar
                items={['eBook', 'pBook Quiz'].map((name) => {
                  let active = false
                  if (bookType === 'EB') {
                    active = name === 'eBook'
                  } else {
                    active = name === 'pBook Quiz'
                  }
                  return {
                    label: name,
                    active: active,
                  }
                })}
                onItemClick={(_, label) => {
                  if (label === 'eBook') {
                    setBookType('EB')
                  } else {
                    setBookType('PB')
                  }
                }}
              />
            </div>
          )}
          <AlertBar>{t('t505')}</AlertBar>
          <div className={style.level_items}>
            {levelGroup1 && levelGroup1.list && levelGroup1.list.length > 0 && (
              <>
                <div className={style.label}>{t('t500')}</div>
                {levelGroup1.list.map((lv) => {
                  return (
                    <LeveledStudyStatusItem
                      key={`level-select-${lv.levelName}`}
                      studentLevel={level === lv.levelName}
                      levelName={lv.levelName}
                      studyCompleted={lv.completedBooks}
                      totalCount={lv.totalBooks}
                      onClick={() => {
                        onLevelClick &&
                          onLevelClick({ bookType, level: lv.levelName })
                      }}
                    />
                  )
                })}
              </>
            )}
            {levelGroup2 && levelGroup2.list && levelGroup2.list.length > 0 && (
              <>
                <div className={style.label}>{t('t501')}</div>
                {levelGroup2.list.map((lv) => {
                  return (
                    <LeveledStudyStatusItem
                      key={`level-select-${lv.levelName}`}
                      studentLevel={level === lv.levelName}
                      levelName={lv.levelName}
                      studyCompleted={lv.completedBooks}
                      totalCount={lv.totalBooks}
                      onClick={() => {
                        onLevelClick &&
                          onLevelClick({ bookType, level: lv.levelName })
                      }}
                    />
                  )
                })}
              </>
            )}
            {levelGroup3 && levelGroup3.list && levelGroup3.list.length > 0 && (
              <>
                <div className={style.label}>{t('t502')}</div>
                {levelGroup3.list.map((lv) => {
                  return (
                    <LeveledStudyStatusItem
                      key={`level-select-${lv.levelName}`}
                      studentLevel={level === lv.levelName}
                      levelName={lv.levelName}
                      studyCompleted={lv.completedBooks}
                      totalCount={lv.totalBooks}
                      onClick={() => {
                        onLevelClick &&
                          onLevelClick({ bookType, level: lv.levelName })
                      }}
                    />
                  )
                })}
              </>
            )}
            {levelGroup4 && levelGroup4.list && levelGroup4.list.length > 0 && (
              <>
                <div className={style.label}>{t('t503')}</div>
                {levelGroup4.list.map((lv) => {
                  return (
                    <LeveledStudyStatusItem
                      key={`level-select-${lv.levelName}`}
                      studentLevel={level === lv.levelName}
                      levelName={lv.levelName}
                      studyCompleted={lv.completedBooks}
                      totalCount={lv.totalBooks}
                      onClick={() => {
                        onLevelClick &&
                          onLevelClick({ bookType, level: lv.levelName })
                      }}
                    />
                  )
                })}
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

const LeveledStudyStatusItem = ({
  studentLevel,
  levelName,
  studyCompleted,
  totalCount,
  onClick,
}: {
  studentLevel?: boolean
  levelName: string
  studyCompleted: number
  totalCount: number
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  const percent = Math.min(100, Math.floor((studyCompleted / totalCount) * 100))
  const graphIndex = Math.ceil(percent / 10) * 10
  const progressImage = `/src/images/@my-study-level/leveled_study_progres_${graphIndex}.svg`

  return (
    <div
      className={style.leveled_study_status_item}
      style={{ width: '33%' }}
      onClick={onClick}>
      <div
        className={`${style.level_name} ${
          studentLevel && style.student_level
        }`}>
        {levelName}
      </div>
      <div
        className={style.level_name_bg}
        style={{
          backgroundImage: `url('${progressImage}')`,
        }}></div>
      <div className={style.leveled_study_status}>
        <b>{studyCompleted}</b> / {totalCount}
      </div>
    </div>
  )
}
