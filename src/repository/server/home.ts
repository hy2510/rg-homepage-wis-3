'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'common'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function noticeMainList(customer: string) {
  const request = makeRequest({
    customer,
    path: getPath('board/notice-main'),
  })
  return await execute(request)
}

async function noticeList(
  customer: string,
  input: {
    page: string
  },
) {
  const request = makeRequest({
    customer,
    path: getPath('board/notice'),
    option: {
      queryString: {
        page: input.page,
      },
    },
  })
  return await execute(request)
}

async function slidingBanner(customer: string) {
  const request = makeRequest({
    customer,
    path: getPath('sliding-banner'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function noticeDetail(customer: string, input: { id: string }) {
  const request = makeRequest({
    customer,
    path: getPath('board/notice' + `/${input.id}`),
  })
  return await execute(request)
}

async function statisticRead() {
  const request = makeRequest({
    path: getPath('statistic-read'),
    option: {
      method: 'get',
    },
  })
  return await execute(request, { next: { revalidate: 3600 } })
}

const Home = {
  statisticRead,
  noticeMainList,
  slidingBanner,
  noticeList,
  noticeDetail,
}
export default Home
