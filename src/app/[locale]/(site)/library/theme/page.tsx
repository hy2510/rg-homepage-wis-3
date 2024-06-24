'use client'

import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import {
  useFetchLibraryTheme,
  useOnLoadLibraryTheme,
} from '@/client/store/library/theme/hook'
import { useLibraryTheme } from '@/client/store/library/theme/selector'
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
import { LibraryFindTop } from '@/ui/modules/library-find-top/library-find-top'
import StudentHistorySelectModal from '../_cpnt/StudentHistorySelectModal'
import useExport, { useSupportExportActionSearch } from '../_fn/use-export'

const STYLE_ID = 'page_theme'

export default function Page() {
  const { option } = useLibraryTheme()
  const { loading, error } = useOnLoadLibraryTheme()

  if (!option || !option.keyword) {
    return <div>Not found theme.</div>
  }
  if (loading) {
    return <LoadingScreen />
  }
  return <ThemeLayout />
}

function ThemeLayout() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { option, payload: books } = useLibraryTheme()

  const { fetch } = useFetchLibraryTheme()

  const currentPage = books.page.page
  const maxPage = books.page.totalPages
  const recordSize = books.page.totalRecords
  const onPageClick = (page: number) => {
    fetch({ page: page })
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

  const downloadExcelUrl = recordSize > 0 ? books.download : undefined
  const onBookListExcelDownload = () => {
    if (downloadExcelUrl) {
      window.open(downloadExcelUrl)
    }
  }

  return (
    <main className={style.theme}>
      <BackLink href={SITE_PATH.LIBRARY.HOME} largeFont>
        {t('t393')}
      </BackLink>
      <LibraryFindTop title={option.title} />
      <BookList
        count={recordSize}
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
