export default interface AuthorizeToken {
  accessToken: string
  refreshToken: string
  tag: string
}

/**
 * 사용자 토큰을 직렬화환다.
 * @param token 사용자 토큰  {
 *     accessToken: 액세스 토큰,
 *     refreshToken: 갱신 토큰
 *   }
 * @returns 직렬화된 토큰
 * @throws 토큰이 없거나 분석 불가능한 경우 발생
 */
export function serializeToken(token: AuthorizeToken): string {
  if (!token || !token.accessToken || !token.refreshToken) {
    throw new Error('Token data empty!')
  }

  const accessToken = token.accessToken.split('.')
  if (accessToken.length !== 3) {
    throw new Error('Access Token data parse error!')
  }

  const tag = token.tag || 'tag'

  return encodeURIComponent(
    `${token.refreshToken}%${accessToken[0]}%${accessToken[1]}%${accessToken[2]}%${tag}`,
  )
}

/**
 * 직렬화된 토큰을 객체화한다.
 * @param token 직렬화된 토큰
 * @returns 사용자 토큰  {
 *     accessToken: 액세스 토큰,
 *     refreshToken: 갱신 토큰
 *   }
 * @throws 직렬화된 토큰이 없거나 분석 불가능한 경우 발생
 */
export function deserializeToken(token: string): AuthorizeToken {
  if (!token) {
    throw new Error('Token data empty!')
  }

  const tokenDiv = decodeURIComponent(token).split('%')
  if (tokenDiv.length !== 5) {
    throw new Error('Token data parse error!')
  }

  return {
    accessToken: `${tokenDiv[1]}.${tokenDiv[2]}.${tokenDiv[3]}`,
    refreshToken: tokenDiv[0],
    tag: tokenDiv[4],
  }
}
