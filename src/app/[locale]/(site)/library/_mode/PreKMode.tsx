import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import { useAchieveLevelPoint } from '@/client/store/achieve/level-point/selector'
import { useFetchLibraryHomePreK } from '@/client/store/library/home/hook'
import { useLibraryHome } from '@/client/store/library/home/selector'
import { useStudentStudyable } from '@/client/store/student/info/selector'
import { AlertBar, Nav, NavItem } from '@/ui/common/common-components'
import {
  CourseItem,
  CoursePreKList,
} from '@/ui/modules/library-explore-course-list/CoursePreKList'
import { LevelUpStatusPK } from '@/ui/modules/library-explore-level-up-status/level-up-status-pk'
import StudyLevelDropDown, {
  DropDownOption,
} from '@/ui/modules/library-find-study-level-selector/StudyLevelDropDown'
import { SetStudyModeModal } from '../../_header/SetStudyMode'
import StudentHistorySelectModal from '../_cpnt/StudentHistorySelectModal'
import useQuickStudyStart from '../_fn/use-quick-study-start'

type Activity = 'Alphabet' | 'Phonics' | 'Word' | 'Story' | 'Song'
const PreKMode = () => {
  // @Language 'common'
  const { t } = useTranslation()

  const prek = useLibraryHome().PK
  const { fetch } = useFetchLibraryHomePreK()

  const [isShowStudyModal, setShowStudyModal] = useState(false)

  const activity = prek.option.activity as Activity
  const activityType = activity.split('-')[0]

  const pkBooks = prek.payload.book
  const levelPoint = useAchieveLevelPoint().payload

  const level = 'PK'

  const preKCategory: DropDownOption[] = [
    { key: 'Alphabet', label: 'Pre K' },
    // FIXME : Song Land 미구현
    // { key: 'Song', label: 'Song' },
  ]
  let currentActivity =
    activityType === 'Song' ? preKCategory[1] : preKCategory[0]

  const onActivityChanged = (activity: Activity) => {
    fetch({ activity })
  }

  let pointProgress = 0
  const currentLevelPoint = levelPoint.filter(
    (item) => item.levelName === level,
  )
  if (currentLevelPoint && currentLevelPoint.length === 1) {
    const point = currentLevelPoint[0]
    if (point.remainingRgPoint > 0) {
      pointProgress = Number(
        ((point.myRgPoint / point.requiredRgPoint) * 100).toFixed(2),
      )
    } else {
      pointProgress = 100
    }
  }

  const maxContents = pkBooks.length
  let passedContents = 0
  pkBooks.forEach((item) => {
    if (item.rgPointCount > 0) {
      passedContents++
    }
  })

  const {
    studentHistoryId,
    studentHistoryList,
    selectLevelRoundId,
    setSelectLevelRoundId,
    startStudyIfAvail,
    startStudyImmediate,
  } = useQuickStudyStart()

  const { isStudyEnd, studyEndMessage } = useStudentStudyable()

  return (
    <>
      <LevelUpStatusPK
        progress={`${pointProgress}%`}
        onClickStudyMode={() => setShowStudyModal(true)}>
        <StudyLevelDropDown
          currentItem={currentActivity}
          items={preKCategory}
          onItemClick={(key) => {
            const activity = key as Activity
            onActivityChanged(activity)
          }}
        />
      </LevelUpStatusPK>
      {activityType !== 'Song' && (
        <Nav>
          <NavItem
            active={activity === 'Alphabet'}
            onClick={() => {
              onActivityChanged('Alphabet')
            }}>
            {t('t358')}
          </NavItem>
          <NavItem
            active={activity === 'Phonics'}
            onClick={() => {
              onActivityChanged('Phonics')
            }}>
            {t('t363')}
          </NavItem>
          <NavItem
            active={activity === 'Word'}
            onClick={() => {
              onActivityChanged('Word')
            }}>
            {t('t365')}
          </NavItem>
          <NavItem
            active={activity === 'Story'}
            onClick={() => {
              onActivityChanged('Story')
            }}>
            {t('t366')}
          </NavItem>
        </Nav>
      )}
      {activityType === 'Song' && (
        <Nav>
          <NavItem
            active={activity === 'Song'}
            onClick={() => {
              onActivityChanged('Song')
            }}>
            Song
          </NavItem>
        </Nav>
      )}
      <AlertBar>{t('t367')}</AlertBar>
      {/* 코스 아이템 */}
      <CoursePreKList passedNum={passedContents} totalNum={maxContents}>
        {pkBooks.map((item, i) => {
          return (
            <CourseItem
              key={item.levelRoundId}
              imgSrc={item.surfaceImagePath}
              passCount={item.rgPointCount}
              title={item.topicTitle}
              levelRoundId={item.levelRoundId}
              bookCode={item.levelName}
              previousItemPass={i === 0 || pkBooks[i - 1].rgPointCount > 0}
              onStartClick={(levelRoundId) => {
                if (!isStudyEnd) {
                  startStudyIfAvail(levelRoundId)
                } else {
                  alert(studyEndMessage)
                }
              }}
            />
          )
        })}
      </CoursePreKList>
      {selectLevelRoundId && (
        <StudentHistorySelectModal
          studentHistoryList={studentHistoryList}
          defaultStudentHistoryId={studentHistoryId}
          onCloseModal={() => setSelectLevelRoundId(undefined)}
          onSelectStudentHistoryId={startStudyImmediate}
        />
      )}
      {isShowStudyModal && (
        <SetStudyModeModal onCloseClick={() => setShowStudyModal(false)} />
      )}
    </>
  )
}
export default PreKMode
