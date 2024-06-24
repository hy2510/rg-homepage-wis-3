'server-only'

import { execute, makeRequest } from './utils'

const BASIC_PATH = 'library'
const getPath = (path: string): string => {
  return `${BASIC_PATH}/${path}`
}

async function searchLevelBooks(
  token: string,
  input: {
    studyTypeCode: '001006' | '001001'
    level: string
    page?: number
    status?: string
    sort?: string
    genre?: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('search'),
    option: {
      method: 'get',
      queryString: {
        courseCode: '062001',
        studyTypeCode: input.studyTypeCode,
        level: input.level,
        page: input.page || 1,
        status: input.status || 'All',
        genre: input.genre || 'All',
        sort: input.sort || 'Round',
      },
    },
  })
  return await execute(request)
}

async function searchPreKBook(
  token: string,
  input: {
    activity: 'Alphabet' | 'Phonics' | 'Word' | 'Story' | 'Song'
    status?: 'All' | 'Before' | 'Fail'
    page?: number
  },
) {
  const request = makeRequest({
    token,
    path: getPath('search-pk'),
    option: {
      method: 'get',
      queryString: {
        activity: input.activity,
        status: input.status,
        page: input.page || 1,
      },
    },
  })
  return await execute(request)
}

async function searchDodoABCBook(
  token: string,
  input: {
    activity:
      | 'Study-Alphabet'
      | 'Study-Phonics-1'
      | 'Study-Phonics-2'
      | 'Study-Sight-Words-1'
      | 'Study-Sight-Words-2'
      | 'Song-Nursery-Rhyme'
      | 'Song-Alphabet-Chant'
      | 'Song-Phonics-Chant'
      | 'Game-Alphabet'
      | 'Game-Phonics'
      | 'Game-Sight-Words-1'
      | 'Game-Sight-Words-2'
    status?: 'All' | 'Before' | 'Fail'
  },
) {
  const request = makeRequest({
    token,
    path: getPath('search-dodoabc'),
    option: {
      method: 'get',
      queryString: {
        activity: input.activity,
        status: input.status,
      },
    },
  })
  return await execute(request)
}

async function newBooks(token: string, input: { year: number; month: number }) {
  const year = input.year
  const month = input.month
  const request = makeRequest({
    token,
    path: getPath('new-books'),
    option: {
      method: 'get',
      queryString: {
        year,
        month,
      },
    },
  })
  return await execute(request)
}

async function categorySeries(
  token: string,
  input: {
    bookType: 'EB' | 'PB'
    level?: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('category/series'),
    option: {
      method: 'get',
      queryString: {
        bookType: input.bookType,
        level: input.level,
      },
    },
  })
  return await execute(request)
}

async function categoryTheme(
  token: string,
  input: {
    bookType: 'EB' | 'PB'
    level?: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('category/theme'),
    option: {
      method: 'get',
      queryString: {
        bookType: input.bookType,
        level: input.level,
      },
    },
  })
  return await execute(request)
}

async function todos(
  token: string,
  input: {
    sortColumn: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('todo'),
    option: {
      method: 'get',
      queryString: {
        sortColumn: input.sortColumn,
      },
    },
  })
  return await execute(request)
}

async function addTodos(
  token: string,
  input: { levelRoundIds: string; studentHistoryId: string },
) {
  const request = makeRequest({
    token,
    path: getPath('todo'),
    option: {
      method: 'post',
      body: {
        levelRoundIds: input.levelRoundIds,
        studentHistoryId: input.studentHistoryId,
      },
    },
  })
  return await execute(request)
}

async function deleteTodos(token: string, input: { studyIds: string }) {
  const request = makeRequest({
    token,
    path: getPath('todo'),
    option: {
      method: 'delete',
      queryString: {
        studyIds: input.studyIds,
      },
    },
  })
  return await execute(request)
}

async function deleteAllTodos(token: string) {
  const request = makeRequest({
    token,
    path: getPath('todo-all'),
    option: {
      method: 'delete',
    },
  })
  return await execute(request)
}

async function favorites(
  token: string,
  input: {
    status: 'All' | 'Before' | 'Complete' | 'Fail'
    page: number
  },
) {
  const request = makeRequest({
    token,
    path: getPath('favorite'),
    option: {
      method: 'get',
      queryString: {
        status: input.status,
        page: input.page,
      },
    },
  })
  return await execute(request)
}

async function addFavorites(token: string, input: { levelRoundIds: string }) {
  const request = makeRequest({
    token,
    path: getPath('favorite'),
    option: {
      method: 'post',
      body: {
        levelRoundIds: input.levelRoundIds,
      },
    },
  })
  return await execute(request)
}

async function deleteFavorites(
  token: string,
  input: { levelRoundIds: string },
) {
  const request = makeRequest({
    token,
    path: getPath('favorite'),
    option: {
      method: 'delete',
      queryString: {
        levelRoundIds: input.levelRoundIds,
      },
    },
  })
  return await execute(request)
}

async function deleteAllFavorites(token: string) {
  const request = makeRequest({
    token,
    path: getPath('favorite-all'),
    option: {
      method: 'delete',
    },
  })
  return await execute(request)
}

async function bookInfo(
  token: string,
  input: {
    levelRoundId: string
    studyId?: string
    studentHistoryId?: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('book-info'),
    option: {
      method: 'get',
      queryString: {
        levelRoundId: input.levelRoundId,
        studyId: input.studyId,
        studentHistoryId: input.studentHistoryId,
      },
    },
  })
  return await execute(request)
}

async function studyModeSetting(
  token: string,
  input: {
    levelRoundId: string
    studyId: string
    studentHistoryId: string
    classId: string
    mode: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('study-mode'),
    option: {
      method: 'post',
      body: {
        levelRoundId: input.levelRoundId,
        studyId: input.studyId,
        studentHistoryId: input.studentHistoryId,
        classId: input.classId,
        mode: input.mode,
      },
    },
  })
  return await execute(request)
}

async function searchTryAgain(token: string, input?: { page?: number }) {
  const request = makeRequest({
    token,
    path: getPath('try-again'),
    option: {
      method: 'get',
      queryString: {
        page: input?.page || 1,
      },
    },
  })
  return await execute(request)
}

async function searchKeyword(
  token: string,
  input: {
    studyTypeCode: '001006' | '001001'
    searchText: string
    page?: number
  },
) {
  const request = makeRequest({
    token,
    path: getPath('search'),
    option: {
      method: 'get',
      queryString: {
        courseCode: '062001',
        studyTypeCode: input.studyTypeCode,
        searchType: 'LibrarySearchAll',
        searchText: input.searchText,
        sort: 'Round',
        page: input.page || 1,
      },
    },
  })
  return await execute(request)
}

async function searchTheme(
  token: string,
  input: {
    studyTypeCode: '001006' | '001001'
    level: string
    themeCode: string
    status?: string
    sort?: string
    genre?: string
    page?: number
  },
) {
  const request = makeRequest({
    token,
    path: getPath('search'),
    option: {
      method: 'get',
      queryString: {
        courseCode: '062001',
        studyTypeCode: input.studyTypeCode,
        // level: input.level,
        searchType: 'ThemeCode',
        themeCode: input.themeCode,
        sort: input.sort || 'Preference',
        status: input.status || 'All',
        genre: input.genre || 'All',
        page: input.page || 1,
      },
    },
  })
  return await execute(request)
}

async function searchSeries(
  token: string,
  input: {
    studyTypeCode: '001006' | '001001'
    level: string
    searchText: string
    status?: string
    sort?: string
    genre?: string
    page?: number
  },
) {
  const request = makeRequest({
    token,
    path: getPath('search'),
    option: {
      method: 'get',
      queryString: {
        courseCode: '062001',
        studyTypeCode: input.studyTypeCode,
        // level: input.level,
        searchType: 'SeriesName',
        searchText: input.searchText,
        sort: input.sort || 'Preference',
        status: input.status || 'All',
        genre: input.genre || 'All',
        page: input.page || 1,
      },
    },
  })
  return await execute(request)
}

async function searchMovie(
  token: string,
  input: {
    level: string
    status?: string
    sort?: string
    genre?: string
    page?: number
  },
) {
  const request = makeRequest({
    token,
    path: getPath('search'),
    option: {
      method: 'get',
      queryString: {
        courseCode: '062001',
        studyTypeCode: '001006',
        level: input.level,
        searchType: 'Movie',
        sort: input.sort || 'Preference',
        status: input.status || 'All',
        genre: input.genre || 'All',
        page: input.page || 1,
      },
    },
  })
  return await execute(request)
}

async function changeFilter(
  token: string,
  input: {
    type: string
    sort: string
    genre: string
    status: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('change-filter'),
    option: {
      method: 'post',
      body: {
        type: input.type,
        sort: input.sort,
        genre: input.genre,
        status: input.status,
      },
    },
  })
  return await execute(request)
}
async function changeFilterPk(
  token: string,
  input: {
    course: string
  },
) {
  const request = makeRequest({
    token,
    path: getPath('change-filter-pk'),
    option: {
      method: 'post',
      body: {
        course: input.course,
      },
    },
  })
  return await execute(request)
}

const Library = {
  newBooks,
  searchLevelBooks,
  searchPreKBook,
  searchDodoABCBook,
  searchTryAgain,
  searchKeyword,
  searchSeries,
  searchTheme,
  categorySeries,
  categoryTheme,
  searchMovie,
  todos,
  addTodos,
  deleteTodos,
  deleteAllTodos,
  favorites,
  addFavorites,
  deleteFavorites,
  deleteAllFavorites,
  bookInfo,
  studyModeSetting,
  changeFilter,
  changeFilterPk,
}
export default Library
