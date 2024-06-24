import { useRootCreateStore } from '../../store'

export const useStudentInfoAction = () => {
  return useRootCreateStore((state) => state.student.info.action)
}

export const useStudentInfo = () => {
  return useRootCreateStore((state) => state.student.info)
}

export const useStudentIsLogin = () => {
  return !!useRootCreateStore((state) => state.student.info).payload.studentId
}

export const useStudentStudyable = () => {
  const student = useRootCreateStore((state) => state.student.info).payload
  return {
    isStudyEnd: student.studyEndDay <= 0,
    studyEndMessage: '학습 기간이 종료되었습니다.',
  }
}
