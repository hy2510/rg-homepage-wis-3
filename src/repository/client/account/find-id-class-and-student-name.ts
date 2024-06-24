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
  password: string
}

type Output = ForgotIdWithClassAndStudentName

async function action(input: Input): Promise<ApiResponse<Output>> {
  const request = makeRequestWithCustomer(
    'api/account/find/id-class-and-student-name',
    {
      method: 'post',
      body: {
        classId: input.classId,
        studentName: input.studentName,
        password: input.password,
      },
    },
  )
  return await execute(request, (json): Output => {
    return makeForgotIdWithClassAndStudentName(json)
  })
}

export { action as postFindIdClassAndStudentName }
export type { Output as FindIdWithClassAndStudentNameResponse }

function newInstance(): Output {
  return makeForgotIdWithClassAndStudentName()
}
export { newInstance as newFindIdClassAndStudentName }
