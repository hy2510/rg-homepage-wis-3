'use client'

import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import {
  useFetchLibraryLevelDodoAbc,
  useOnLoadLibraryLevelDodoAbc,
} from '@/client/store/library/dodo-abc/hook'
import { useLibraryDodoAbcLevel } from '@/client/store/library/dodo-abc/selector'
import { useStudentStudyable } from '@/client/store/student/info/selector'
import { useStyle } from '@/ui/context/StyleContext'
import LoadingScreen from '@/ui/modules/LoadingScreen'
import { DodoABCStudyBookList } from '@/ui/modules/library-find-book-list/book-list-dodo-abc-study'
import StudyLevelBox from '@/ui/modules/library-find-study-level-selector/StudyLevelBox'
import StudyLevelDropDown, {
  DropDownOption,
} from '@/ui/modules/library-find-study-level-selector/StudyLevelDropDown'
import LibrarySearchFilter, {
  LibraryFilterOption,
} from '@/ui/modules/library-set-fliter/LibrarySearchFilter'
import StudentHistorySelectModal from '../../_cpnt/StudentHistorySelectModal'
import useQuickStudyStart from '../../_fn/use-quick-study-start'
import DodoABCNavBar from '../_component/DodoABCNavBar'

/* MEMO: Dodo ABC 바로 시작하는 기능 제거하고 Pre K와 동일한 UI요청하여 Page 컴포넌트 새로 작성 */
const STYLE_ID = 'page_dodo_abc_study'
export default function Page() {
  const { loading } = useOnLoadLibraryLevelDodoAbc({})
  if (loading) {
    return <LoadingScreen />
  }
  return <DodoABCStudy />
}

function DodoABCStudy() {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const { fetch: updateBook } = useFetchLibraryLevelDodoAbc()
  const { option, payload: books } = useLibraryDodoAbcLevel()

  const preKCategory: DropDownOption[] = [
    { key: 'Study-Alphabet', label: t('t358') },
    { key: 'Study-Phonics-1', label: t('t359') },
    { key: 'Study-Phonics-2', label: t('t360') },
    { key: 'Study-Sight-Words-1', label: t('t361') },
    { key: 'Study-Sight-Words-2', label: t('t362') },
  ]
  let currentActivity = preKCategory[0]
  for (let i = 0; i < preKCategory.length; i++) {
    if (option.activity === preKCategory[i].key) {
      currentActivity = preKCategory[i]
      break
    }
  }

  const onChangeFilterActivity = (activity: string) => {
    updateBook({ activity })
  }

  const bookFilter = [
    {
      group: 'status',
      title: t('t344'),
      option: [
        { id: 'All', label: t('t345'), enabled: option.status === 'All' },
        {
          id: 'Before',
          label: t('t346'),
          enabled: option.status === 'Before',
        },
        {
          id: 'Complete',
          label: t('t347'),
          enabled: option.status === 'Complete',
        },
      ],
    },
  ]

  const onFilterChanged = (filterOption: LibraryFilterOption[]) => {
    const findOptionId = (group: LibraryFilterOption) => {
      let value: string | undefined = undefined
      const option = group.option.filter((opt) => opt.enabled)
      if (option.length > 0) {
        value = option[0].id
      }
      return value
    }
    let status: string | undefined = undefined
    filterOption.forEach((group) => {
      if (group.group === 'status') {
        status = findOptionId(group)
      }
    })
    updateBook({ status })
  }

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
      <DodoABCNavBar active={'study'} />
      <main className={style.dodo_abc}>
        <StudyLevelBox>
          <StudyLevelDropDown
            currentItem={currentActivity}
            items={preKCategory}
            onItemClick={(key) => onChangeFilterActivity(key)}
          />
          <LibrarySearchFilter
            optionList={bookFilter}
            onOptionChange={onFilterChanged}
          />
        </StudyLevelBox>
        <DodoABCStudyBookList count={books.book.length}>
          {books.book.map((a, i) => {
            return (
              <DodoAbcBookCover
                key={`book-cover-${i}`}
                bookImgSrc={a.surfaceImagePath}
                levelRoundId={a.levelRoundId}
                isAssignedTodo={!a.addYn}
                passedCount={a.rgPointCount}
                onStartStudy={(levelRoundId) => {
                  if (!isStudyEnd) {
                    startStudyIfAvail(levelRoundId)
                  } else {
                    alert(studyEndMessage)
                  }
                }}
                onVocabulary={() => {
                  if (!isStudyEnd) {
                    if (a.vocabularyPath) {
                      window.open(
                        a.vocabularyPath,
                        '_blank',
                        'noopener, noreferrer',
                      )
                    }
                  } else {
                    alert(studyEndMessage)
                  }
                }}
              />
            )
          })}
        </DodoABCStudyBookList>
        {selectLevelRoundId && (
          <StudentHistorySelectModal
            studentHistoryList={studentHistoryList}
            defaultStudentHistoryId={studentHistoryId}
            onCloseModal={() => setSelectLevelRoundId(undefined)}
            onSelectStudentHistoryId={startStudyImmediate}
          />
        )}
      </main>
    </>
  )
}

const DodoAbcBookCover = ({
  bookImgSrc,
  levelRoundId,
  isAssignedTodo = false,
  passedCount = 0,
  onStartStudy,
  onVocabulary,
}: {
  bookImgSrc: string
  levelRoundId: string
  isAssignedTodo?: boolean
  passedCount?: number
  onStartStudy?: (levelRoundId: string) => void
  onVocabulary?: (levelRoundId: string) => void
}) => {
  const style = useStyle(STYLE_ID)

  let passedIcon = ''
  let passedClassName = ''
  if (passedCount >= 2) {
    passedIcon = '/src/images/@book-cover/passed_all.svg'
    passedClassName = style.passed_all
  } else if (passedCount === 1) {
    passedIcon = '/src/images/@book-cover/passed_1.svg'
    passedClassName = style.passed_1
  }

  return (
    <div className={style.dodo_abc_book_cover}>
      <div className={style.study_status}>
        {isAssignedTodo && (
          <div className={style.assigned_todo}>
            <Image
              alt=""
              src="/src/images/@book-cover/assigned_todo.svg"
              width={34}
              height={34}
            />
          </div>
        )}
        {passedIcon && (
          <div className={passedClassName}>
            <Image alt="" src={passedIcon} width={34} height={34} />
          </div>
        )}
      </div>
      <div
        className={style.group1}
        onClick={() => {
          onStartStudy && onStartStudy(levelRoundId)
        }}>
        <Image
          alt=""
          src={bookImgSrc}
          layout="intrinsic"
          width={200}
          height={290}
        />
      </div>
      <div className={style.group2}>
        <div
          className={style.btn_download}
          onClick={() => onVocabulary && onVocabulary(levelRoundId)}></div>
        {/* <div className={style.btn_start}>Start</div> */}
      </div>
    </div>
  )
}
