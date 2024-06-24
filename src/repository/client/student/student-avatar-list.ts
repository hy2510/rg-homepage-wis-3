import { ApiResponse } from '@/http/common/response'
import { Avatar, makeAvatar } from '../object/avatar'
import { executeWithAuth, makeRequest } from '../utils'

type Input = {}

type Output = {
  avatarId: string
  avatars: Avatar[]
}

async function action(): Promise<ApiResponse<Output>> {
  const request = makeRequest('api/student/avatar', {
    method: 'get',
  })
  return await executeWithAuth(request, (json): Output => {
    return {
      avatarId: json.StudentAvatarId,
      avatars: json.StudentAvatar.map((item: any) => makeAvatar(item)),
    }
  })
}

export { action as getStudentAvatarList }
export type { Output as StudentAvatarListResponse }
function newInstance(): Output {
  return {
    avatarId: '',
    avatars: [],
  }
}
export { newInstance as newStudentAvatarList }
