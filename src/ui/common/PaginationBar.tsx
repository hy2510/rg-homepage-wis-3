import Image from 'next/image'
import { Pagination, PaginationItem } from './common-components'

export default function PaginationBar({
  page,
  maxPage,
  size = 5,
  onPageClick,
}: {
  page: number
  maxPage: number
  size?: number
  onPageClick?: (page: number) => void
}) {
  const pageOffset = Math.floor((page - 1) / size) * size
  const pageList: number[] = []
  for (let i = 0; i < size; i++) {
    const pNum = i + 1 + pageOffset
    if (pNum > maxPage) {
      break
    }
    pageList.push(pNum)
  }

  return (
    <Pagination>
      <PagenationNavButton
        type="prev"
        isHidden={page === 1}
        onPageNavClick={() => {
          if (page !== 1) {
            onPageClick && onPageClick(page - 1)
          }
        }}
      />
      {pageList.map((i) => {
        return (
          <PaginationItem
            active={i === page}
            isHidden={i > maxPage}
            key={`pagination_${i}`}
            onClick={() => {
              if (page !== i) {
                onPageClick && onPageClick(i)
              }
            }}>
            {i}
          </PaginationItem>
        )
      })}

      <PagenationNavButton
        type="next"
        isHidden={page >= maxPage}
        onPageNavClick={() => {
          if (page !== maxPage) {
            onPageClick && onPageClick(page + 1)
          }
        }}
      />
    </Pagination>
  )
}

function PagenationNavButton({
  type,
  isHidden,
  onPageNavClick,
}: {
  type: 'prev' | 'next'
  isHidden?: boolean
  onPageNavClick?: () => void
}) {
  const imgName = type === 'prev' ? 'chv_left.svg' : 'chv_right.svg'
  const alt = type === 'prev' ? 'Previous' : 'Next'

  return (
    <PaginationItem
      isHidden={isHidden}
      onClick={() => {
        onPageNavClick && onPageNavClick()
      }}>
      <Image
        alt={alt}
        src={`/src/images/arrow-icons/${imgName}`}
        width={20}
        height={20}
        style={{display: 'block'}}
      />
    </PaginationItem>
  )
}
