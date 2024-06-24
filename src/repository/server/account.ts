'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'account'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function signupEmailCertification(
  customer: string,
  input: {
    email: string
    password: string
    studentName: string
  },
) {
  const request = makeRequest({
    customer,
    path: getPath('signup-email-certification'),
    option: {
      method: 'post',
      body: {
        email: input.email,
        password: input.password,
        studentName: input.studentName,
      },
    },
  })
  return await execute(request)
}

async function signupEmailConfirm(
  customer: string,
  input: {
    email: string
    authCode: string
  },
) {
  const request = makeRequest({
    customer,
    path: getPath('signup-email-confirm'),
    option: {
      method: 'post',
      body: {
        email: input.email,
        authCode: input.authCode,
      },
    },
  })
  return await execute(request)
}

async function signupEmailConfirm_VN(
  customer: string,
  input: {
    email: string
    authCode: string
  },
) {
  const request = makeRequest({
    customer,
    path: getPath('signup-email-confirm-vn'),
    option: {
      method: 'post',
      body: {
        email: input.email,
        authCode: input.authCode,
      },
    },
  })
  return await execute(request)
}

async function signupSmsCertification_VN(
  customer: string,
  input: { phone: string },
) {
  const request = makeRequest({
    customer,
    path: getPath('signup-sms-certification-vn'),
    option: {
      method: 'post',
      body: {
        phone: input.phone,
      },
    },
  })
  return await execute(request)
}

async function signupSmsConfirm_VN(
  customer: string,
  input: {
    phone: string
    authCode: string
  },
) {
  const request = makeRequest({
    customer,
    path: getPath('signup-sms-confirm-vn'),
    option: {
      method: 'post',
      body: {
        phone: input.phone,
        authCode: input.authCode,
      },
    },
  })
  return await execute(request)
}

async function signup_VN(
  customer: string,
  input: { phone: string; email: string },
) {
  const request = makeRequest({
    customer,
    path: getPath('signup-vn'),
    option: {
      method: 'post',
      body: {
        phone: input.phone,
        email: input.email,
      },
    },
  })
  return await execute(request)
}

async function forgotId(
  customer: string,
  input: { type: 'Email' | 'Phone'; keyword: string },
) {
  const request = makeRequest({
    customer,
    path: getPath('forgot-id'),
    option: {
      method: 'get',
      queryString: {
        type: input.type,
        keyword: input.keyword,
      },
    },
  })
  return await execute(request)
}

async function forgotPassword(
  customer: string,
  input: { type: 'Id' | 'Email'; keyword: string },
) {
  const request = makeRequest({
    customer,
    path: getPath('forgot-password'),
    option: {
      method: 'get',
      queryString: {
        type: input.type,
        keyword: input.keyword,
      },
    },
  })
  return await execute(request)
}

async function forgotPasswordConfirm(
  customer: string,
  input: { keyword: string; authCode: string },
) {
  const request = makeRequest({
    customer,
    path: getPath('forgot-password-confirm'),
    option: {
      method: 'post',
      body: {
        keyword: input.keyword,
        authCode: input.authCode,
      },
    },
  })
  return await execute(request)
}

async function classGroup(customer: string) {
  const request = makeRequest({
    customer,
    path: getPath('class-group'),
    option: {
      method: 'get',
    },
  })
  return await execute(request)
}

async function classList(customer: string, input: { classGroupId: string }) {
  const request = makeRequest({
    customer,
    path: getPath('class'),
    option: {
      method: 'get',
      queryString: {
        classGroupId: input.classGroupId,
      },
    },
  })
  return await execute(request)
}

async function forgotIdWithClassAndStudentName(
  customer: string,
  input: { classId: string; studentName: string },
) {
  const request = makeRequest({
    customer,
    path: getPath('forgot-id-class-and-student-name'),
    option: {
      method: 'post',
      body: {
        classId: input.classId,
        studentName: input.studentName,
      },
    },
  })
  return await execute(request)
}

async function findIdWithClassAndStudentName(
  customer: string,
  input: { classId: string; studentName: string; password: string },
) {
  const request = makeRequest({
    customer,
    path: getPath('find-id-class-and-student-name'),
    option: {
      method: 'post',
      body: {
        classId: input.classId,
        studentName: input.studentName,
        password: input.password,
      },
    },
  })
  return await execute(request)
}

async function signin(
  customer: string,
  input: { id: string; password: string; deviceType: string },
) {
  const request = makeRequest({
    customer,
    path: getPath('signin'),
    option: {
      method: 'post',
      body: {
        id: input.id,
        password: input.password,
        deviceType: input.deviceType,
      },
    },
  })
  return await execute(request)
}

const Account = {
  signupEmailCertification,
  signupEmailConfirm,
  signupEmailConfirm_VN,
  signupSmsCertification_VN,
  signupSmsConfirm_VN,
  signup_VN,
  forgotId,
  forgotPassword,
  forgotPasswordConfirm,
  classGroup,
  classList,
  forgotIdWithClassAndStudentName,
  findIdWithClassAndStudentName,
  signin,
}
export default Account
