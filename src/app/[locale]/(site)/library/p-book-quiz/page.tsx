'use client'

import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import { useAchieveLevelBooks } from '@/client/store/achieve/level-books/selector'
import { useLibraryEbPbFilter } from '@/client/store/library/filter/selector'
import { useLibraryHome } from '@/client/store/library/home/selector'
import {
  useFetchLibraryLevel,
  useOnLoadLibraryLevel,
} from '@/client/store/library/level/hook'
import { useLibraryLevel } from '@/client/store/library/level/selector'
import { useSelectStudyLevel } from '@/client/store/student/daily-learning/selector'
import {
  useStudentHistory,
  useStudentHistoryAction,
} from '@/client/store/student/history/selector'
import PaginationBar from '@/ui/common/PaginationBar'
import { BackLink } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import LoadingScreen from '@/ui/modules/LoadingScreen'
import { BookCover } from '@/ui/modules/library-book-cover/book-cover'
import LevelSelector from '@/ui/modules/library-explore-level-selector/level-selector'
import { BookList } from '@/ui/modules/library-find-book-list/book-list'
import StudyLevelBox from '@/ui/modules/library-find-study-level-selector/StudyLevelBox'
import StudyLevelTitle from '@/ui/modules/library-find-study-level-selector/StudyLevelTitle'
import LibrarySearchFilter, {
  LibraryFilterOption,
} from '@/ui/modules/library-set-fliter/LibrarySearchFilter'
import StudentHistorySelectModal from '../_cpnt/StudentHistorySelectModal'
import useExport, { useSupportExportActionSearch } from '../_fn/use-export'

const STYLE_ID = 'page_p_book_quiz'

export default function Page() {
  const home = useLibraryHome()
  const settingLevel = useSelectStudyLevel()

  let levelFinder = undefined
  if (
    home.level &&
    home.level !== 'PK' &&
    home.level !== 'KA' &&
    home.level !== 'KB'
  ) {
    levelFinder = home.level
  }
  if (!levelFinder && settingLevel) {
    if (
      settingLevel !== 'PK' &&
      settingLevel !== 'KA' &&
      settingLevel !== 'KB'
    ) {
      levelFinder = settingLevel
    }
  }

  const level = levelFinder || 'KC'
  const bookType = 'PB'
  const { sort, status, genre } = useLibraryEbPbFilter('PB')

  const { loading } = useOnLoadLibraryLevel({
    level,
    bookType,
    sort,
    genre,
    status,
  })
  if (loading) {
    return <LoadingScreen />
  }
  return <PBookLayout />
}

function PBookLayout() {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const [viewLevelSelector, _viewLevelSelector] = useState(false)

  const levelBooks = useAchieveLevelBooks().payload.PB

  const { option, payload: books } = useLibraryLevel()
  const filter = useLibraryEbPbFilter('PB')
  const studyLevel = option.level
  const levelList = levelBooks.map((lv) => {
    return lv.levelName
  })

  const { fetch: updateBook } = useFetchLibraryLevel()

  const bookFilter = [
    {
      group: 'status',
      title: t('t344'),
      option: [
        { id: 'All', label: t('t345'), enabled: filter.status === 'All' },
        {
          id: 'Before',
          label: t('t346'),
          enabled: filter.status === 'Before',
        },
        {
          id: 'Complete',
          label: t('t347'),
          enabled: filter.status === 'Complete',
        },
      ],
    },
    // {
    //   group: 'd2',
    //   title: t('t528'),
    //   option: [
    //     { id: '11', label: t('t529'), enabled: false },
    //     { id: '21', label: t('t530'), enabled: false },
    //     { id: '31', label: t('t531'), enabled: false },
    //   ],
    // },
    {
      group: 'sort',
      title: t('t348'),
      option: [
        { id: 'Round', label: t('t356'), enabled: filter.sort === 'Round' },
        {
          id: 'Preference',
          label: t('t349'),
          enabled: filter.sort === 'Preference',
        },
        {
          id: 'ReadCount',
          label: t('t350'),
          enabled: filter.sort === 'ReadCount',
        },
        {
          id: 'RegistDate',
          label: t('t351'),
          enabled: filter.sort === 'RegistDate',
        },
        {
          id: 'RgPoint',
          label: t('t352'),
          enabled: filter.sort === 'RgPoint',
        },
      ],
    },
    {
      group: 'genre',
      title: t('t353'),
      option: [
        { id: 'All', label: t('t354'), enabled: filter.genre === 'All' },
        {
          id: 'Fiction',
          label: 'Fiction',
          enabled: filter.genre === 'Fiction',
        },
        {
          id: 'Nonfiction',
          label: 'Non-Fiction',
          enabled: filter.genre === 'Nonfiction',
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
    let sort: string | undefined = undefined
    let genre: string | undefined = undefined
    let status: string | undefined = undefined
    filterOption.forEach((group) => {
      if (group.group === 'status') {
        status = findOptionId(group)
      } else if (group.group === 'genre') {
        genre = findOptionId(group)
      } else if (group.group === 'sort') {
        sort = findOptionId(group)
      }
    })
    setSelectMode(false)
    updateBook({ page: 1, sort, genre, status })
  }

  const onChangeLevel = (level: string) => {
    setSelectMode(false)
    updateBook({ level })
  }

  const currentPage = books.page.page
  const maxPage = books.page.totalPages
  const totalCount = books.page.totalRecords
  const onPageClick = (page: number) => {
    updateBook({ page: page })
  }

  const studentHistoryAction = useStudentHistoryAction()
  const studentHistoryList = useStudentHistory().payload.map((history) => ({
    studentHistoryId: history.studentHistoryId,
    classId: history.classId,
    className: history.className,
  }))
  const studentHistoryId = useStudentHistory().defaultHistoryId
  const onSelectStudentHistoryId = (studentHistoryId: string) => {
    studentHistoryAction.setDefaultHistoryId(studentHistoryId)
  }

  const [bookInfo, setBookInfo] = useState<string | undefined>(undefined)

  const {
    isSelectMode,
    setSelectMode,
    selectedItemCount,
    isSelectedItem,
    setItemSelectedChange,
    onExportAction,
    isSelectStudentHistory,
    onSelectStudentHistory,
    onExportCancel,
  } = useExport({
    studentHistoryId:
      studentHistoryList.length === 1 ? studentHistoryId : undefined,
  })

  const supportExportAction = useSupportExportActionSearch()

  const downloadExcelUrl = totalCount > 0 ? books.download : undefined
  const onBookListExcelDownload = () => {
    if (downloadExcelUrl) {
      window.open(downloadExcelUrl)
    }
  }

  return (
    <main className={style.pbook_quiz}>
      <BackLink href={SITE_PATH.LIBRARY.HOME} largeFont>
        pBook Quiz
      </BackLink>
      <StudyLevelBox>
        <StudyLevelTitle
          level={studyLevel}
          onClick={() => {
            _viewLevelSelector(true)
          }}
        />
        <LibrarySearchFilter
          optionList={bookFilter}
          onOptionChange={onFilterChanged}
        />
        {viewLevelSelector && (
          <LevelSelector
            _viewLevelSelector={_viewLevelSelector}
            bookType={'PB'}
            level={studyLevel}
            pbLevelList={levelBooks}
            onLevelClick={({ level }) => {
              onChangeLevel(level)
              _viewLevelSelector(false)
            }}
          />
        )}
      </StudyLevelBox>
      <BookList
        count={totalCount}
        isExportMode={isSelectMode}
        toggleExportMode={() => {
          setSelectMode(!isSelectMode)
        }}
        supportExportAction={supportExportAction}
        exportCount={selectedItemCount}
        onExportClick={onExportAction}
        onDownloadClick={
          downloadExcelUrl ? onBookListExcelDownload : undefined
        }>
        {books.book.map((book, i) => {
          const earnPoint = book.getableRgPoint
          const bookCode = book.levelName

          const isExportChecked = isSelectedItem(book.levelRoundId)

          return (
            <BookCover
              key={`book-cover-${i}-${book.surfaceImagePath}`}
              id={book.levelRoundId}
              target={`library`}
              bookImgSrc={book.surfaceImagePath}
              bookCode={bookCode}
              earnPoint={earnPoint}
              title={book.topicTitle}
              author={book.author}
              isBookInfo={bookInfo === book.levelRoundId}
              passedCount={book.rgPointCount}
              isMovieBook={!!book.animationPath}
              isAssignedTodo={!book.addYn}
              onClickBookDetail={() => {
                setBookInfo(bookInfo ? undefined : book.levelRoundId)
              }}
              levelRoundId={book.levelRoundId}
              studentHistoryId={studentHistoryId}
              studentHistoryList={studentHistoryList}
              onSelectStudentHistoryId={onSelectStudentHistoryId}
              isExportMode={isSelectMode}
              isExportChecked={isExportChecked}
              onExportCheckedChange={setItemSelectedChange}
            />
          )
        })}
      </BookList>
      <PaginationBar
        page={currentPage}
        maxPage={maxPage}
        onPageClick={onPageClick}
      />
      {isSelectStudentHistory && (
        <StudentHistorySelectModal
          studentHistoryList={studentHistoryList}
          defaultStudentHistoryId={studentHistoryId}
          onCloseModal={onExportCancel}
          onSelectStudentHistoryId={onSelectStudentHistory}
        />
      )}
    </main>
  )
}
