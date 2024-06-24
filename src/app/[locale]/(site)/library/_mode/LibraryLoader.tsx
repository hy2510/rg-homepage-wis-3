import { useCustomerInfo } from '@/app/_context/CustomerContext'
import { useLibraryEbPbFilter } from '@/client/store/library/filter/selector'
import { useOnLoadLibraryHome } from '@/client/store/library/home/hook'
import {
  useLibraryHome,
  useLibraryHomeAction,
} from '@/client/store/library/home/selector'
import { useSelectStudyLevel } from '@/client/store/student/daily-learning/selector'
import { useStudentInfo } from '@/client/store/student/info/selector'
import LoadingScreen from '@/ui/modules/LoadingScreen'
import { getUserConfig } from '../../_header/_fn/user-config'
import BookReadingMode from './BookReadingMode'
import DodoABCMode from './DodoABCMode'
import LevelSelectMode from './LevelSelectMode'
import PreKMode from './PreKMode'

export function LibraryLoader() {
  const libraryHome = useLibraryHome()
  const mode = libraryHome.mode
  const { updateMode } = useLibraryHomeAction()
  const customer = useCustomerInfo()
  const customerId = customer.customerId
  const studentId = useStudentInfo().payload.studentId

  const ebOption = useLibraryEbPbFilter('EB')
  const pbOption = useLibraryEbPbFilter('PB')

  const level = useSelectStudyLevel() || ''
  const bookType = 'EB'

  if (!mode && studentId && customerId) {
    const config = getUserConfig(
      {
        studentId,
        customerId,
      },
      true,
    )
    updateMode(config?.mode ? config.mode : 'level')
    return <div></div>
  }

  const pkType =
    customer.useDodoAbcYn === 'CA' || customer.useDodoAbcYn === 'Y'
      ? 'Dodo'
      : 'PK'

  if (level === '') {
    return <LevelSelectMode />
  }

  const sort = bookType === 'EB' ? ebOption.sort : pbOption.sort
  const genre = bookType === 'EB' ? ebOption.genre : pbOption.genre
  const status = bookType === 'EB' ? ebOption.status : pbOption.status

  const libraryOption = {
    level,
    bookType,
    pkType: pkType as 'PK' | 'Dodo',
    sort,
    genre,
    status,
  }

  if (level === 'PK') {
    return <PreKLoading option={libraryOption} />
  } else {
    return <BookReadingLoading option={libraryOption} />
  }
}

function PreKLoading({
  option,
}: {
  option: {
    level: string
    bookType: string
    pkType: 'PK' | 'Dodo'
    sort: string
    genre: string
    status: string
  }
}) {
  const { loading, error } = useOnLoadLibraryHome(option)
  if (loading) {
    return <LoadingScreen />
  }
  if (error) {
    return <div>Error . . . .</div>
  }
  if (option.pkType === 'Dodo') {
    return <DodoABCMode />
  } else {
    return <PreKMode />
  }
}

function BookReadingLoading({
  option,
}: {
  option: {
    level: string
    bookType: string
    pkType: 'PK' | 'Dodo'
    sort: string
    genre: string
    status: string
  }
}) {
  const newOption = { ...option }
  if (option.bookType === 'EB') {
    if (option.level === '6C') {
      newOption.level = '6B'
    }
  } else if (option.bookType === 'PB') {
    if (option.level === 'KA' || option.level === 'KB') {
      newOption.level = 'KC'
    }
  }
  const { loading, error } = useOnLoadLibraryHome(newOption)

  if (loading) {
    return <LoadingScreen />
  }
  if (error) {
    return <div>Error . . . .</div>
  }

  return <BookReadingMode />
}
