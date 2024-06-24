'use client'

import {
  useFetchLibraryLevelDodoAbc,
  useOnLoadLibraryLevelDodoAbc,
} from '@/client/store/library/dodo-abc/hook'
import { useLibraryDodoAbcLevel } from '@/client/store/library/dodo-abc/selector'
import { useStyle } from '@/ui/context/StyleContext'
import LoadingScreen from '@/ui/modules/LoadingScreen'
import { DodoABCSongBookList } from '@/ui/modules/library-find-book-list/book-list-dodo-abc-song'
import StudyLevelBox from '@/ui/modules/library-find-study-level-selector/StudyLevelBox'
import StudyLevelDropDown, {
  DropDownOption,
} from '@/ui/modules/library-find-study-level-selector/StudyLevelDropDown'
import StudentHistorySelectModal from '../../_cpnt/StudentHistorySelectModal'
import useQuickStudyStart from '../../_fn/use-quick-study-start'
import DodoABCNavBar from '../_component/DodoABCNavBar'

const STYLE_ID = 'page_dodo_abc_song_n_chant'
export default function Page() {
  const { loading } = useOnLoadLibraryLevelDodoAbc({
    activity: 'Song-Nursery-Rhyme',
  })
  if (loading) {
    return <LoadingScreen />
  }
  return <SongAndChant />
}

function SongAndChant() {
  const style = useStyle(STYLE_ID)

  const { fetch: updateBook } = useFetchLibraryLevelDodoAbc()
  const { option, payload: books } = useLibraryDodoAbcLevel()

  const preKCategory: DropDownOption[] = [
    { key: 'Song-Nursery-Rhyme', label: 'Nursery Rhyme' },
    { key: 'Song-Alphabet-Chant', label: 'Alphabet Chant' },
    { key: 'Song-Phonics-Chant', label: 'Phonics Chant' },
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

  const {
    studentHistoryId,
    studentHistoryList,
    selectLevelRoundId,
    setSelectLevelRoundId,
    startStudyIfAvail,
    startStudyImmediate,
  } = useQuickStudyStart()

  return (
    <>
      <DodoABCNavBar active={'song'} />
      <main className={style.dodo_abc_songn_chant}>
        <StudyLevelBox>
          <StudyLevelDropDown
            currentItem={currentActivity}
            items={preKCategory}
            onItemClick={(key) => onChangeFilterActivity(key)}
          />
        </StudyLevelBox>
        <DodoABCSongBookList count={books.book.length}>
          {books.book.map((a, i) => {
            return (
              <DodoAbcSongnChantCover
                key={`book-cover-${i}-${a.surfaceImagePath}`}
                bookImgSrc={a.studyImagePath}
                title={a.topicTitle}
                levelRoundId={a.levelRoundId}
                onStartStudy={startStudyIfAvail}
              />
            )
          })}
        </DodoABCSongBookList>
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

const DodoAbcSongnChantCover = ({
  bookImgSrc,
  levelRoundId,
  title,
  onStartStudy,
}: {
  bookImgSrc: string
  levelRoundId: string
  title: string
  onStartStudy?: (levelRoundId: string) => void
}) => {
  const style = useStyle(STYLE_ID)
  return (
    <div
      className={style.dodo_abc_songn_chant_cover}
      onClick={() => {
        onStartStudy && onStartStudy(levelRoundId)
      }}>
      <img alt="" src={bookImgSrc} width={'100%'} className={style.img_cover} />
      <div className={style.txt_title}>{title}</div>
      {/* <div className={style.btn_start}>Start</div> */}
    </div>
  )
}
