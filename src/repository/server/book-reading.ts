'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'study'
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

const BookReading = {
  commonGet,
  commonPost,
}
export default BookReading
