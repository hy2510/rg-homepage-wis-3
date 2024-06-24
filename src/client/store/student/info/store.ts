import {
  StudentResponse,
  newStudent,
} from '@/repository/client/student/student'
import { SliceStoreCreator } from '../../store'

type LoginStatus = 'unknown' | 'on' | 'off'

type State = {
  payload: StudentResponse
  login: LoginStatus
}

type Action = {
  setInfo: (payload?: StudentResponse) => void
  clear: () => void
  updateStudentName: (name: string) => void
  updateSmsAgree: (isAgree: boolean) => void
  updateStudySetting: (
    type:
      | 'EBKListenRepeat'
      | 'EB1ListenRepeat'
      | 'ViewStep3Hint'
      | 'ViewStep2Skip',
    value: boolean,
  ) => void
}

export type InfoState = {
  info: State & {
    action: Action
  }
}

export const createSliceInfoState: SliceStoreCreator<InfoState> = (set) => ({
  info: {
    payload: newStudent(),
    login: 'unknown',
    action: {
      setInfo: (payload) =>
        set((state) => {
          if (payload) {
            state.student.info.payload = payload
            state.student.info.login = 'on'
          }
        }),
      clear: () =>
        set((state) => {
          state.student.info.payload = newStudent()
          state.student.info.login = 'off'
        }),
      updateStudentName: (name: string) =>
        set((state) => {
          state.student.info.payload.name = name
        }),
      updateSmsAgree: (isAgree: boolean) =>
        set((state) => {
          state.student.info.payload.smsReceiveYN = isAgree
          state.student.info.payload.smsEventInfomationYn = isAgree
          state.student.info.payload.smsStudyReportYn = isAgree
        }),
      updateStudySetting: (type, value) =>
        set((state) => {
          if (type === 'EBKListenRepeat') {
            state.student.info.payload.eBKListenRepeat = value
          } else if (type === 'EB1ListenRepeat') {
            state.student.info.payload.eB1ListenRepeat = value
          } else if (type === 'ViewStep2Skip') {
            state.student.info.payload.viewStep2Skip = value
          } else if (type === 'ViewStep3Hint') {
            state.student.info.payload.viewStep3Hint = value
          }
        }),
    },
  },
})
