'server-only'

import { makeRequest, execute } from './utils'

const BASIC_PATH = 'history'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function studyReport(
  token: string,
  input: {
    startDate: string
    endDate: string
    status: string
  }
) {
  const request = makeRequest({
    token,
    path: getPath('study-report'),
    option: {
      method: 'get',
      queryString: {
        startDate: input.startDate,
        endDate: input.endDate,
        status: input.status,
      },
    },
  })
  return await execute(request)
}

async function studyReportSearch(
  token: string,
  input: {
    startDate?: string
    endDate?: string
    keyword: string
    status: string
  }
) {
  const request = makeRequest({
    token,
    path: getPath('study-report-search'),
    option: {
      method: 'get',
      queryString: {
        startDate: input.startDate || undefined,
        endDate: input.endDate || undefined,
        keyword: input.keyword,
        status: input.status,
      },
    },
  })
  return await execute(request)
}

async function speakReport(
  token: string,
  input: {
    startDate: string
    endDate: string
    status: string
  }
) {
  const request = makeRequest({
    token,
    path: getPath('study-report-speaking'),
    option: {
      method: 'get',
      queryString: {
        startDate: input.startDate,
        endDate: input.endDate,
        status: input.status,
      },
    },
  })
  return await execute(request)
}

async function attendCalendar(
  token: string,
  input: {
    year: number
    month: number
  }
) {
  const request = makeRequest({
    token,
    path: getPath('attend-calendar'),
    option: {
      method: 'get',
      queryString: {
        year: input.year,
        month: input.month,
      },
    },
  })

  return await execute(request)
}

async function studyCalendar(
  token: string,
  input: {
    year: number
    month: number
  }
) {
  const request = makeRequest({
    token,
    path: getPath('study-calendar'),
    option: {
      method: 'get',
      queryString: {
        year: input.year,
        month: input.month,
      },
    },
  })
  return await execute(request)
}

const History = {
  studyReport,
  studyReportSearch,
  speakReport,
  attendCalendar,
  studyCalendar,
}
export default History
