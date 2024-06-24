'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'export'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function vocabulary(
  token: string,
  input: {
    levelRoundIds: string
    studentHistoryId: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('vocabulary'),
    option: {
      method: 'get',
      queryString: {
        levelRoundIds: input.levelRoundIds,
        studentHistoryId: input.studentHistoryId,
      },
    },
  })
  return await execute(request)
}

async function bookListExcel(
  token: string,
  input: {
    levelRoundIds: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('excel/book-list'),
    option: {
      method: 'get',
      queryString: {
        levelRoundIds: input.levelRoundIds,
      },
    },
  })
  return await execute(request)
}

async function searchExcel(
  token: string,
  input: {
    studyTypeCode?: '001006' | '001001'
    searchType?: string
    searchText?: string
    level?: string
    status?: string
    sort?: string
    genre?: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('excel/search'),
    option: {
      method: 'get',
      queryString: {
        courseCode: '062001',
        studyTypeCode: input.studyTypeCode,
        searchType: input.searchType,
        searchText: input.searchText,
        level: input.level,
        status: input.status || 'All',
        genre: input.genre || 'All',
        sort: input.sort || 'Round',
      },
    },
  })
  return await execute(request)
}

async function todoExcel(
  token: string,
  input: {
    sortColumn: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('excel/todo'),
    option: {
      method: 'get',
      queryString: {
        sortColumn: input.sortColumn,
      },
    },
  })
  return await execute(request)
}

async function favoriteExcel(
  token: string,
  input: {
    status: 'All' | 'Before' | 'Complete' | 'Fail'
  },
) {
  const request = makeRequest({
    token,
    path: getPath('excel/favorite'),
    option: {
      method: 'get',
      queryString: {
        status: input.status,
      },
    },
  })
  return await execute(request)
}

async function reportExcel(
  token: string,
  input: {
    startDate?: string
    endDate?: string
    keyword: string
    status: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('excel/report'),
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

async function performance(
  token: string,
  input: {
    startDate: string
    endDate: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('performance'),
    option: {
      method: 'get',
      queryString: {
        startDate: input.startDate,
        endDate: input.endDate,
      },
    },
  })
  return await execute(request)
}

async function studentReport(
  token: string,
  input: {
    studyIds: string
    studentHistoryIds: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('student-report'),
    option: {
      method: 'get',
      queryString: {
        studyIds: input.studyIds,
        studentHistoryIds: input.studentHistoryIds,
      },
    },
  })
  return await execute(request)
}

const Export = {
  vocabulary,
  bookListExcel,
  searchExcel,
  todoExcel,
  favoriteExcel,
  reportExcel,
  performance,
  studentReport,
}
export default Export
