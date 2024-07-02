'use client'

import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  useFetchLibrarySearchKeyword,
  useFetchLibrarySearchKeywordFirst,
  useOnClearLibrarySearchKeyword,
} from '@/client/store/library/search/hook'
import { useLibrarySearch } from '@/client/store/library/search/selector'
import {
  useStudentHistory,
  useStudentHistoryAction,
} from '@/client/store/student/history/selector'
import {
  BackLink,
  EmptyMessage,
  Nav,
  NavItem,
} from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import { BookCover } from '@/ui/modules/library-book-cover/book-cover'

const STYLE_ID = 'page_search'

export default function Page() {
  const params = useSearchParams()

  const keyword = params.get('keyword') || ''

  useOnClearLibrarySearchKeyword(keyword)

  return <SearchLayout keyword={keyword} />
}

function SearchLayout({ keyword }: { keyword: string }) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { EB: ebook, PB: pbook } = useLibrarySearch()

  const { fetch: fetchChangeKeyword, loading: firstSearchLoading } =
    useFetchLibrarySearchKeywordFirst()
  const { fetch: fetchMoreBook } = useFetchLibrarySearchKeyword()
  useEffect(() => {
    fetchChangeKeyword(keyword)
  }, [keyword])

  const onMoreBook = (bookType: string) => {
    const page =
      bookType === 'EB' ? ebook.payload.page.page : pbook.payload.page.page
    fetchMoreBook({ bookType, keyword, page: page + 1 })
  }

  const eBookCount = ebook.payload.page.totalRecords
  const pBookCount = pbook.payload.page.totalRecords

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
  const [tab, setTab] = useState<'ebook' | 'pbook'>('ebook')
  const t391 = t('t391')

  return (
    <main className={style.search_result}>
      <BackLink href={SITE_PATH.LIBRARY.HOME} largeFont>
        {`${keyword} ${t('t265')}`}
      </BackLink>
      {!firstSearchLoading && eBookCount <= 0 && pBookCount <= 0 ? (
        <EmptyMessage><div dangerouslySetInnerHTML={{__html: t391}}></div></EmptyMessage>
      ) : (
        <Nav>
          {eBookCount > 0 && (
            <NavItem
              active={tab === 'ebook'}
              onClick={() =>
                setTab('ebook')
              }>{`eBook(${ebook.payload.page.totalRecords})`}</NavItem>
          )}
          {pBookCount > 0 && (
            <NavItem
              active={tab === 'pbook'}
              onClick={() =>
                setTab('pbook')
              }>{`pBook Quiz(${pbook.payload.page.totalRecords})`}</NavItem>
          )}
        </Nav>
      )}
      {eBookCount > 0 && tab === 'ebook' && (
        <div className={style.row_a}>
          <div className={style.book_list}>
            {/* BookCover */}
            {ebook.payload.book.map((book, i) => {
              const earnPoint = book.getableRgPoint
              const bookCode = book.levelName
              return (
                <BookCover
                  key={`book-cover-eb-${i}-${book.surfaceImagePath}`}
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
                />
              )
            })}
          </div>
          {ebook.payload.page.page < ebook.payload.page.totalPages && (
            <p className={style.more}>
              <button onClick={() => onMoreBook('EB')}>MORE</button>
            </p>
          )}
        </div>
      )}
      {pBookCount > 0 && tab === 'pbook' && (
        <div className={style.row_b}>
          <div className={style.book_list}>
            {/* BookCover */}
            {pbook.payload.book.map((book, i) => {
              const earnPoint = book.getableRgPoint
              const bookCode = book.levelName
              return (
                <BookCover
                  key={`book-cover-pb-${i}-${book.surfaceImagePath}`}
                  id={book.levelRoundId}
                  target={`library`}
                  bookImgSrc={book.surfaceImagePath}
                  bookCode={bookCode}
                  earnPoint={earnPoint}
                  title={book.topicTitle}
                  author={book.author}
                  isBookInfo={bookInfo === book.levelRoundId}
                  onClickBookDetail={() => {
                    setBookInfo(bookInfo ? undefined : book.levelRoundId)
                  }}
                  passedCount={book.rgPointCount}
                  isMovieBook={!!book.animationPath}
                  isAssignedTodo={!book.addYn}
                  levelRoundId={book.levelRoundId}
                  studentHistoryId={studentHistoryId}
                  studentHistoryList={studentHistoryList}
                  onSelectStudentHistoryId={onSelectStudentHistoryId}
                />
              )
            })}
          </div>
          {pbook.payload.page.page < pbook.payload.page.totalPages && (
            <p className={style.more}>
              <button onClick={() => onMoreBook('PB')}>MORE</button>
            </p>
          )}
        </div>
      )}
    </main>
  )
}
