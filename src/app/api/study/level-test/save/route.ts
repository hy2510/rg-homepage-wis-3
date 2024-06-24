import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
} from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import LevelTest from '@/repository/server/level-test'

export async function POST(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(
    request,
    'levelTestDetailId',
    'quizId',
    'quizNo',
    'currentQuizNo',
    'ox',
    'correct',
    'studentAnswer',
    'answerCount',
    'lastQuizYn',
  )
  const levelTestDetailId = parameter.getString('levelTestDetailId')
  const quizId = parameter.getString('quizId')
  const quizNo = parameter.getNumber('quizNo')
  const currentQuizNo = parameter.getNumber('currentQuizNo')
  const ox = parameter.getString('ox') === '1' ? '1' : '2'
  const correct = parameter.getString('correct')
  const studentAnswer = parameter.getString('studentAnswer')
  const answerCount = parameter.getNumber('answerCount')
  const lastQuizYn = parameter.getString('lastQuizYn') === 'Y' ? 'Y' : 'N'

  const [payload, status, error] = await executeRequestAction(
    LevelTest.save(token, {
      levelTestDetailId,
      quizId,
      quizNo,
      currentQuizNo,
      ox,
      correct,
      studentAnswer,
      answerCount,
      lastQuizYn,
    }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}
