import { useRootCreateStore } from '../../store'

export const useStudentAvatarAction = () => {
  return useRootCreateStore((state) => state.student.avatar.action)
}

export const useStudentAvatar = () => {
  return useRootCreateStore((state) => state.student.avatar)
}
