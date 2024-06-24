'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'readingking'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function eventList(token: { accessToken?: string; customer?: string }) {
  let accessToken: string | undefined = undefined
  let customerToken: string | undefined = undefined
  if (token.accessToken) {
    accessToken = token.accessToken
  }
  if (!accessToken) {
    customerToken = token.customer
  }
  const request = makeRequest({
    token: accessToken,
    customer: customerToken,
    path: getPath('event'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function prizeList(
  token: { accessToken?: string; customer?: string },
  input: { eventId: string },
) {
  let accessToken: string | undefined = undefined
  let customerToken: string | undefined = undefined
  if (token.accessToken) {
    accessToken = token.accessToken
  }
  if (!accessToken) {
    customerToken = token.customer
  }
  const request = makeRequest({
    token: accessToken,
    customer: customerToken,
    path: getPath(`event/prize/${input.eventId}`),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function setPrize(
  token: string,
  input: { eventId: string; prizeId: string },
) {
  const request = makeRequest({
    token,
    path: getPath('event/prize'),
    option: {
      method: 'post',
      body: {
        eventId: input.eventId,
        eventPrizeId: input.prizeId,
      },
    },
  })
  return await execute(request)
}

async function eventDetail(token: string, input: { eventId: string }) {
  const request = makeRequest({
    token,
    path: getPath(`event/${input.eventId}`),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

const ReadingKing = {
  eventList,
  prizeList,
  setPrize,
  eventDetail,
}
export default ReadingKing
