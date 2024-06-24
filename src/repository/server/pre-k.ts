'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'pre-k'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function commonGet(token: string, path: string) {
  const requestPath = getPath(path)
  const request = makeRequest({
    token,
    path: requestPath,
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function commonPost(token: string, path: string, input: unknown) {
  const requestPath = getPath(path)
  const request = makeRequest({
    token,
    path: requestPath,
    option: {
      method: 'post',
      body: input,
    },
  })
  return await execute(request)
}

async function dodoQuiz(
  token: string,
  input: {
    studyId: string
    studentHistoryId: string
    step: string
    type: string
  },
) {
  const requestPath = getPath('quiz')
  const request = makeRequest({
    token,
    path: requestPath,
    option: {
      method: 'get',
      queryString: input,
    },
  })
  return await execute(request)
}

async function save(
  token: string,
  input: {
    studyId: string
    studentHistoryId: string
    step: string
    studyEndYn: string
    dvc: string
  },
) {
  const requestPath = getPath('save')
  const request = makeRequest({
    token,
    path: requestPath,
    option: {
      method: 'post',
      body: input,
    },
  })
  return await execute(request)
}

const PreK = {
  commonGet,
  commonPost,
  dodoQuiz,
  save,
}
export default PreK
