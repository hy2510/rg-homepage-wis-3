import {
  StudentAvatarListResponse,
  newStudentAvatarList,
} from '@/repository/client/student/student-avatar-list'
import { SliceStoreCreator } from '../../store'

type State = {
  payload: StudentAvatarListResponse
}

type Action = {
  changeAvatar: (avatarId: string) => void
  setAvatar: (avatarId?: string, payload?: StudentAvatarListResponse) => void
}

export type AvatarState = {
  avatar: State & {
    action: Action
  }
}

export const createSliceAvatarState: SliceStoreCreator<AvatarState> = (
  set
) => ({
  avatar: {
    payload: newStudentAvatarList(),
    action: {
      changeAvatar: (avatarId: string) =>
        set((state) => {
          state.student.avatar.payload.avatarId = avatarId
        }),
      setAvatar: (avatarId, payload) =>
        set((state) => {
          if (avatarId) {
            state.student.avatar.payload.avatarId = avatarId
          }
          if (payload) {
            state.student.avatar.payload.avatars = payload.avatars
          }
        }),
    },
  },
})
