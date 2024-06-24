import { supportLanguages } from '@/localization/localize-config'

const HOME = {
  MAIN: '/home/main',
  NOTICE: '/home/main/rg-news/notice',
  NEWS_LETTER: '/home/main/rg-news/newsletter',
  NEW_CONTENTS: '/home/main/rg-news/new-contents',
  INFOGRAPHIC: '/home/main/rg-news/infographic',
  EVENT_CHALLENGE: '/home/main/rg-news/challenge',
  EVENT_SUPERSTAR: '/home/main/rg-news/superstar',
  EVENT_READING_CAMPAIN: '/home/main/rg-news/campaign',
  NEWS_POST: '/home/main/rg-news-post',
  CUSTOMER_INTERVIEW: '/home/customer-review/interview',
  SNS_REVIEW: '/home/customer-review/sns',
  MEMBERSHIP_INTRODUCE: '/home/rg-membership/introduction',
  MEMBERSHIP_REFUND_POLICY: '/home/rg-membership/refund-policy',
  MEMBERSHIP_SERVICE_TERM: '/home/rg-membership/terms-of-service',
  MEMBERSHIP_PRIVACY_POLICY: '/home/rg-membership/privacy-policy',
}
const ACCOUNT = {
  MAIN: '/account/account-list',
  SIGN_IN: '/account/sign-in',
  SIGN_UP: '/account/sign-up',
  SIGN_UP_WELCOME: '/account/welcome',
  FORGOT_ID: '/account/forgot-id',
  FORGOT_PASSWORD: '/account/forgot-password',
  INFO: '/account/account-info',
  CHANGE_PASSWORD: '/account/change-password',
  PURCHASE_ANDROID: '/account/purchase/android',
  PURCHASE_IOS: '/account/purchase/ios',
}
const LIBRARY = {
  HOME: '/library',
  TODO: '/library/assignment/to-do',
  TRY_AGAIN: '/library/assignment/try-again',
  FAVORITE: '/library/assignment/favorite',
  DODO_ABC_STUDY: '/library/dodo-abc/study',
  DODO_ABC_SONG: '/library/dodo-abc/song-n-chant',
  DODO_ABC_GAME: '/library/dodo-abc/game',
  PRE_K: '/library/pre-k',
  E_BOOK: '/library/e-book',
  P_BOOK: '/library/p-book-quiz',
  NEW_BOOK: '/library/new-books',
  SEARCH: '/library/search',
  SERIES: '/library/series',
  THEME: '/library/theme',
  MOVIE_BOOK: '/library/movie-book',
}
const REVIEW = {
  SIMPLE: '/review',
  DETAIL: '/review/detailed-view',
}
const RANKING = {
  POINT: '/ranking/points-rank',
  CAHLLENGE: '/ranking/challenge-rank',
  LEVEL_MASTER_BOARD: '/ranking/level-master-board',
  HALL_OF_FAME: '/ranking/hall-of-fame-rank',
}

export function isValidatePath(path: string): boolean {
  let isStartWithLocale = false
  for (let i = 0; i < supportLanguages.length; i++) {
    if (path.startsWith(`/${supportLanguages[i]}`)) {
      isStartWithLocale = true
    }
  }

  const searchPath = isStartWithLocale
    ? path.substring(path.indexOf('/', 1))
    : path
  let isContainPath = false
  const entries = Object.entries(SITE_PATH)
  for (let i = 0; i < entries.length; i++) {
    const item = entries[i]
    const itemValue = item[1]
    const type = typeof itemValue
    if (type === 'object') {
      const paths = Object.values(itemValue)
      for (let j = 0; j < paths.length; j++) {
        const p = paths[j]
        isContainPath = p === searchPath
        if (isContainPath) {
          break
        }
      }
    }
    if (isContainPath) {
      break
    }
  }
  return isContainPath
}

export function getValidatePath(path: string): string {
  let isContainPath = isValidatePath(path)
  if (!isContainPath) {
    return HOME.MAIN
  }
  return path
}

const SITE_PATH = {
  HOME,
  ACCOUNT,
  LIBRARY,
  REVIEW,
  RANKING,
}
export default SITE_PATH
