import { ApiResponse } from '@/http/common/response'
import { execute } from '@/http/common/utils'
import {
  ForgotIdWithClassAndStudentName,
  makeForgotIdWithClassAndStudentName,
} from '../object/forgot-id-class-and-student-name'
import { makeRequestWithCustomer } from '../utils'

type Input = {
  classId: string
  studentName: string
}

type Output = ForgotIdWithClassAndStudentName

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer(
    'api/account/forgot/id-class-and-student-name',
    {
      method: 'post',
      body: {
        classId: input.classId,
        studentName: input.studentName,
      },
    },
  )
  return await execute(request, (json): Output => {
    return makeForgotIdWithClassAndStudentName(json)
  })
}

export { action as postForgotIdClassAndStudentName }
export type { Output as ForgotIdWithClassAndStudentNameResponse }

function newInstance(): Output {
  return makeForgotIdWithClassAndStudentName()
}
export { newInstance as newForgotIdClassAndStudentName }
