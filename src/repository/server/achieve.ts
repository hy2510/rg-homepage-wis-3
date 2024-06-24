'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'achieve'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function levelBooks(token: string) {
  const request = makeRequest({
    token,
    path: getPath('level/books'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function levelPoint(token: string) {
  const request = makeRequest({
    token,
    path: getPath('level/point'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function levelMaster(token: string) {
  const request = makeRequest({
    token,
    path: getPath('level/master'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function levelTest(token: string) {
  const request = makeRequest({
    token,
    path: getPath('level/test'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function successiveStudy(token: string) {
  const request = makeRequest({
    token,
    path: getPath('successive-study'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function successiveDailyGoals(token: string) {
  const request = makeRequest({
    token,
    path: getPath('successive-daily-goals'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function readingkingTrophy(token: string) {
  const request = makeRequest({
    token,
    path: getPath('readingking-trophy'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}
const Achieve = {
  levelBooks,
  levelPoint,
  levelMaster,
  levelTest,
  successiveStudy,
  successiveDailyGoals,
  readingkingTrophy,
}
export default Achieve
