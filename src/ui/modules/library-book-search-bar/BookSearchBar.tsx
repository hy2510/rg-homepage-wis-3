import { useCustomerInfo } from '@/app/_context/CustomerContext'
import { CATEGORY_ID, BookSearchBar as SearchBar } from './book-search-bar'

export default function BookSearchBar({
  isMobile,
  onCloseBookSearchPopup,
}: {
  isMobile?: boolean
  onCloseBookSearchPopup?: () => void
}) {
  const supportCategory: CATEGORY_ID[] = []
  const customer = useCustomerInfo()

  if (customer.useDodoAbcYn === 'A' || customer.useDodoAbcYn === 'Y') {
    supportCategory.push('DODO')
  }
  if (customer.useDodoAbcYn === 'A' || customer.useDodoAbcYn === 'N') {
    supportCategory.push('PK')
  }
  if (customer.studyEBUseYn) {
    supportCategory.push('EB')
  }
  if (customer.studyPBUseYn) {
    supportCategory.push('PB')
  }
  if (customer.studyLCUseYn) {
    supportCategory.push('LC')
  }
  if (customer.studyMSUseYn) {
    supportCategory.push('MS')
  }
  if (customer.studyEBUseYn) {
    supportCategory.push('MOVIE')
  }
  if (customer.studyEBUseYn || customer.studyPBUseYn) {
    supportCategory.push('NEWBOOK')
  }

  return (
    <SearchBar
      openCategorys={supportCategory}
      isMobile={isMobile}
      onCloseBookSearchPopup={onCloseBookSearchPopup}
    />
  )
}
