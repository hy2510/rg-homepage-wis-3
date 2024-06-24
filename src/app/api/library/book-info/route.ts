import {
  RouteResponse,
  executeRequestAction,
  getParameters,
} from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Library from '@/repository/server/library'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(
    request,
    'levelRoundId',
    'studyId',
    'studentHistoryId',
  )
  const levelRoundId = parameter.getString('levelRoundId')
  const studyId = parameter.getString('studyId') || undefined
  const studentHistoryId = parameter.getString('studentHistoryId') || undefined

  const action = Library.bookInfo(token, {
    levelRoundId,
    studyId,
    studentHistoryId,
  })
  const [payload, status, error] = await executeRequestAction(action)
  if (error) {
    return RouteResponse.commonError()
  }
  if (status.status >= 300) {
    return RouteResponse.response(payload, status)
  }

  let SecondRgPoint = Number((payload.RgPoint * 0.5).toFixed(2))
  let UserRgPoint = 0
  let InfoType = 'book'
  let StudyTypeFullEasyYn =
    payload.FullEasyYn &&
    Number(payload.BookLevel.substring(0, 1)) >= 2 &&
    payload.PassCount <= 2
  if (payload.StudyId) {
    if (payload.StudyStatus === 'Completed') {
      InfoType = 'review'
    } else {
      InfoType = 'todo'
    }
  }
  let StudyMode = 'add'
  if (InfoType === 'todo') {
    if (StudyTypeFullEasyYn) {
      if (!payload.FullEasyCode) {
        if (payload.RecentlyFullEasyCode === '093006') {
          StudyMode = 'select:full'
          UserRgPoint = payload.RgPoint
        } else if (payload.RecentlyFullEasyCode) {
          StudyMode = 'select:easy'
          UserRgPoint = SecondRgPoint
        } else {
          StudyMode = 'select:full/easy'
        }
      } else {
        if (payload.FullEasyCode === '093006') {
          StudyMode = 'easy'
          UserRgPoint = SecondRgPoint
        } else {
          StudyMode = 'full'
          UserRgPoint = payload.RgPoint
        }
      }
    } else {
      if (payload.PassCount === 0) {
        StudyMode = '1st'
        UserRgPoint = payload.RgPoint
      } else if (payload.PassCount === 1) {
        StudyMode = '2nd'
        UserRgPoint = SecondRgPoint
      } else {
        StudyMode = '3rd'
      }
    }
  } else if (InfoType === 'review') {
    if (payload.RevisionStatusCode === '028010') {
      StudyMode = 'rewrite'
    } else {
      StudyMode = 'review'
    }
    UserRgPoint = payload.GetRgPoint
  } else {
    if (StudyTypeFullEasyYn) {
      if (payload.RecentlyFullEasyCode === '093006') {
        StudyMode = 'add:full'
        UserRgPoint = payload.RgPoint
      } else if (payload.RecentlyFullEasyCode) {
        StudyMode = 'add:easy'
        UserRgPoint = SecondRgPoint
      } else {
        StudyMode = 'add:full/easy'
      }
    }
  }
  const SpeakContentYn =
    (payload.BookCode.substring(0, 4) === 'EB-K' ||
      payload.BookCode.substring(0, 4) === 'EB-1') &&
    payload.HighlightDataYn

  const newPayload = {
    ...payload,
    InfoType,
    StudyMode,
    StudyTypeFullEasyYn,
    SecondRgPoint,
    UserRgPoint,
    SpeakContentYn,
    LevelRoundId: levelRoundId,
  }

  return RouteResponse.response(newPayload, status)
}
