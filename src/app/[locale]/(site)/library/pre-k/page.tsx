'use client'

import { useCustomerInfo } from '@/app/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import { useLibraryPKFilter } from '@/client/store/library/filter/selector'
import {
  useFetchLibraryLevelPreK,
  useOnLoadLibraryLevelPreK,
} from '@/client/store/library/pre-k/hook'
import { useLibraryLevelPreK } from '@/client/store/library/pre-k/selector'
import {
  useStudentHistory,
  useStudentHistoryAction,
} from '@/client/store/student/history/selector'
import PaginationBar from '@/ui/common/PaginationBar'
import { BackLink } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import LoadingScreen from '@/ui/modules/LoadingScreen'
import { BookCover } from '@/ui/modules/library-book-cover/book-cover'
import { BookList } from '@/ui/modules/library-find-book-list/book-list'
import StudyLevelBox from '@/ui/modules/library-find-study-level-selector/StudyLevelBox'
import StudyLevelDropDown, {
  DropDownOption,
} from '@/ui/modules/library-find-study-level-selector/StudyLevelDropDown'
import LibrarySearchFilter, {
  LibraryFilterOption,
} from '@/ui/modules/library-set-fliter/LibrarySearchFilter'
import StudentHistorySelectModal from '../_cpnt/StudentHistorySelectModal'
import useExport, { useSupportExportActionSearch } from '../_fn/use-export'

const STYLE_ID = 'page_pre_k'

export default function Page() {
  const customer = useCustomerInfo()

  if (customer.useDodoAbcYn === 'Y') {
    return <div>Not Support Pre K</div>
  }
  return <ValidatePreK />
}

function ValidatePreK() {
  const { loading } = useOnLoadLibraryLevelPreK({})
  if (loading) {
    return <LoadingScreen />
  }
  return <PreKLayout />
}

function PreKLayout() {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  const { option, payload: books } = useLibraryLevelPreK()
  const { activity } = useLibraryPKFilter()

  const { fetch: updateBook } = useFetchLibraryLevelPreK()

  const preKCategory: DropDownOption[] = [
    { key: 'All', label: t('t389') },
    { key: 'Alphabet', label: t('t358') },
    { key: 'Phonics', label: t('t363') },
    { key: 'Word', label: t('t390') },
    { key: 'Story', label: t('t366') },
  ]
  let currentActivity = preKCategory[0]
  for (let i = 0; i < preKCategory.length; i++) {
    if (activity === preKCategory[i].key) {
      currentActivity = preKCategory[i]
      break
    }
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

  const onChangeFilterActivity = (activity: string) => {
    updateBook({ activity })
  }

  const currentPage = books.page.page
  const maxPage = books.page.totalPages
  const onPageClick = (page: number) => {
    updateBook({ page })
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

  return (
    <main className={style.prek}>
      <BackLink href={SITE_PATH.LIBRARY.HOME} largeFont>
        PreK
      </BackLink>
      <StudyLevelBox>
        <StudyLevelDropDown
          currentItem={currentActivity}
          items={preKCategory}
          onItemClick={(key) => {
            onChangeFilterActivity(key)
          }}
        />
        <LibrarySearchFilter
          optionList={bookFilter}
          onOptionChange={onFilterChanged}
        />
      </StudyLevelBox>
      <BookList
        count={books.page.totalRecords}
        isExportMode={isSelectMode}
        toggleExportMode={() => {
          setSelectMode(!isSelectMode)
        }}
        supportExportAction={supportExportAction}
        exportCount={selectedItemCount}
        onExportClick={onExportAction}>
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

      {currentActivity.key === 'All' && (
        <PaginationBar
          page={currentPage}
          maxPage={maxPage}
          onPageClick={onPageClick}
        />
      )}
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
