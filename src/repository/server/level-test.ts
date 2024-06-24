'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'level-test'
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

async function levelTestInfo(token: string, input: { level: string }) {
  const request = makeRequest({
    token,
    path: getPath('level-test-info'),
    option: {
      method: 'get',
      queryString: {
        level: input.level,
      },
    },
  })
  return await execute(request)
}

async function resetTest(token: string, input: { levelTestId: string }) {
  const request = makeRequest({
    token,
    path: getPath('reset'),
    option: {
      method: 'delete',
      queryString: {
        levelTestId: input.levelTestId,
      },
    },
  })
  return await execute(request)
}

async function quiz(token: string, input: { levelTestDetailId: string }) {
  const request = makeRequest({
    token,
    path: getPath('quiz'),
    option: {
      method: 'get',
      queryString: {
        levelTestDetailId: input.levelTestDetailId,
      },
    },
  })
  return await execute(request)
}

async function save(
  token: string,
  input: {
    levelTestDetailId: string
    quizId: string
    quizNo: number
    currentQuizNo: number
    ox: '1' | '2'
    correct: string
    studentAnswer: string
    answerCount: number
    lastQuizYn: 'Y' | 'N'
  },
) {
  const request = makeRequest({
    token,
    path: getPath('save'),
    option: {
      method: 'post',
      body: {
        levelTestDetailId: input.levelTestDetailId,
        quizId: input.quizId,
        quizNo: input.quizNo,
        currentQuizNo: input.currentQuizNo,
        ox: input.ox,
        correct: input.correct,
        studentAnswer: input.studentAnswer,
        answerCount: input.answerCount,
        lastQuizYn: input.lastQuizYn,
      },
    },
  })
  return await execute(request)
}

async function result(token: string, input: { levelTestDetailId: string }) {
  const request = makeRequest({
    token,
    path: getPath('result'),
    option: {
      method: 'get',
      queryString: {
        levelTestDetailId: input.levelTestDetailId,
      },
    },
  })
  return await execute(request)
}

const LevelTest = {
  commonGet,
  levelTestInfo,
  resetTest,
  quiz,
  save,
  result,
}
export default LevelTest
