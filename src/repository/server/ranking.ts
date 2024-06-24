'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'ranking'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function pointMonthly(token?: string, customer?: string) {
  const request = makeRequest({
    token,
    customer,
    path: getPath('point/monthly'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function pointTotal(token?: string, customer?: string) {
  const request = makeRequest({
    token,
    customer,
    path: getPath('point/total'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function readingking(
  token?: string,
  customer?: string,
  input?: {
    eventId: string
  },
) {
  const request = makeRequest({
    token,
    customer,
    path: getPath('readingking'),
    option: {
      method: 'get',
      queryString: {
        eventId: input?.eventId,
      },
    },
  })
  return await execute(request)
}

async function levelMaster(customer: string, input?: {}) {
  const request = makeRequest({
    customer,
    path: getPath('level-master'),
    option: {
      method: 'get',
      queryString: {},
    },
  })
  return await execute(request)
}

async function hallOfFame(
  token: { accessToken?: string; customer?: string },
  input?: {},
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
    path: getPath('hall-of-fame'),
    option: {
      method: 'get',
      queryString: {},
    },
  })
  return await execute(request)
}

const Ranking = {
  pointMonthly,
  pointTotal,
  readingking,
  levelMaster,
  hallOfFame,
}
export default Ranking
