import AuthorizeToken from './token'

export interface UserDetails {
  userid: string //Login ID
  uid: string //Student ID
  cid: string //Customer ID
  sid: string //Session ID
  group: string //Group: [private, school, academy]
  role: string //Role: [student, admin]
  permission: string //Permission: [teacher]
  exp: number
  iat: number
}

type TokenResponse = { status: number; payload: AuthorizeToken | undefined }
export type Authorization = {
  token: AuthorizeToken | undefined
  getActiveAccessToken: () => string | undefined
  getAccessToken: () => string | undefined
  isLogin: () => boolean
}

/**
 * Access Token을 조회하는 Authorization 객체를 생성한다.
 * @param token 사용자 인증 토큰
 * @returns Authorization 객체
 */
export function createAuthorization(
  token: AuthorizeToken | undefined,
): Authorization {
  const getActiveAccessToken = (token?: AuthorizeToken) => {
    if (token) {
      const userDetails = convertJWTtoUserDetails(token.accessToken)
      const isExpire = isExpireAt(userDetails)
      if (!isExpire) {
        return token.accessToken
      }
    }
    return
  }
  const getAccessToken = (token?: AuthorizeToken) => {
    if (token) {
      return token.accessToken
    }
    return
  }
  const authorization: Authorization = {
    token,
    getActiveAccessToken: () => getActiveAccessToken(token),
    getAccessToken: () => getAccessToken(token),
    isLogin: () => {
      return !!getAccessToken(token)
    },
  }
  return authorization
}

/**
 * 파라미터로 전달된 토큰의 유효성을 검사하고, 만료되었으면 갱신하여 리턴한다.
 * @param token 사용자 토큰  {
 *     accessToken: 액세스 토큰,
 *     refreshToken: 갱신 토큰
 *   }
 * @param refreshAction 토큰 갱신 함수
 * @returns 인증 결과 {
 *   status: HTTP 요청/응답 코드,
 *   payload: 응답 성공 시 데이터 반환 {
 *     accessToken: 액세스 토큰,
 *     refreshToken: 갱신 토큰
 *   }
 * }
 */
async function getTokenIfFailAndRefresh(
  token: AuthorizeToken,
  refreshAction: (token: AuthorizeToken) => Promise<TokenResponse>,
): Promise<TokenResponse> {
  const userDetails = convertJWTtoUserDetails(token.accessToken)
  const isExpire = isExpireAt(userDetails)
  if (isExpire) {
    return await refreshAction(token)
  } else {
    return {
      status: 200,
      payload: token,
    }
  }
}

/**
 * JWT Access Token에서 사용자 정보를 추출한다.
 * @param jwtAccessToken 로그인 Access Token
 * @returns 사용자 정보
 */
function convertJWTtoUserDetails(jwtAccessToken: string): UserDetails {
  const accessTokenDiv = jwtAccessToken.split('.')
  const payload: any = JSON.parse(atob(accessTokenDiv[1]))
  return {
    userid: payload.userid,
    uid: payload.uid,
    cid: payload.cid,
    sid: payload.sid,
    group: payload.group,
    role: payload.role,
    permission: payload.permission,
    exp: payload.exp,
    iat: payload.iat,
  }
}

/**
 * 토큰이 만료되었는지 검사한다.
 * @param user 사용자 정보
 * @returns true - 토큰 유효기간이 만료됨
 */
function isExpireAt(user: UserDetails) {
  const now = Date.now()
  const exp = user.exp * 1000
  return exp < now
}
