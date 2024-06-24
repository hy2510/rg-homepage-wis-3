const ACCOUNT_STORAGE_KEY = 'accounts'

export type Account = {
  _id: string
  order: number
  customerId: string
  customerName: string
  studentId: string
  studentName: string
  loginId: string
  avatar: string
  password?: string
}

export function getAccountList(): Account[] {
  const accounts: Account[] = []
  if (window) {
    const accountsJson = window.localStorage.getItem(ACCOUNT_STORAGE_KEY)
    if (accountsJson) {
      const objAccount = JSON.parse(accountsJson) as Account[]
      accounts.push(...objAccount.filter((account) => account.studentId))
    }
  }
  return accounts
}

export function updateAccount(
  update: {
    customerId: string
    loginId: string
    customerName: string
    studentId: string
    studentName: string
    avatar: string
  },
  isSort = true,
) {
  const accountId = getAccountId(update)
  const accounts = getAllAccountList()
    .map((account) => {
      if (account._id === accountId) {
        const newAccount = {
          ...account,
          ...update,
          order: 0,
        }
        return newAccount
      } else {
        return account
      }
    })
    .sort((a, b) => {
      if (isSort) {
        return a.order - b.order
      }
      return 0
    })
    .map((account, i) => {
      account.order = i + 1
      return account
    })
  if (window) {
    window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accounts))
  }
}

export function deleteAccountGetResult(account: {
  customerId: string
  loginId: string
}): Account[] {
  const accountId = getAccountId(account)
  const accounts = getAccountList().filter(
    (account) => account._id !== accountId,
  )
  if (window) {
    window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(accounts))
  }
  return accounts
}

export function setTempolaryAccount(tmp: {
  customerId: string
  loginId: string
  password?: string
}) {
  const accounts = getAccountList()
  const tmpId = getAccountId(tmp)

  const findAccount = accounts.find((account) => account._id === tmpId)
  if (!findAccount) {
    const tmpAccount: Account = {
      _id: tmpId,
      order: 0,
      customerId: tmp.customerId,
      customerName: '',
      studentId: '',
      studentName: '',
      loginId: tmp.loginId,
      password: tmp.password || '',
      avatar: '',
    }
    const newAccounts: Account[] = [...accounts, tmpAccount]

    if (window) {
      window.localStorage.setItem(
        ACCOUNT_STORAGE_KEY,
        JSON.stringify(newAccounts),
      )
    }
  } else if (tmp.password && findAccount.password !== tmp.password) {
    const newAccounts = accounts.map((account) => {
      if (account._id === tmpId) {
        account.password = tmp.password
      }
      return account
    })
    if (window) {
      window.localStorage.setItem(
        ACCOUNT_STORAGE_KEY,
        JSON.stringify(newAccounts),
      )
    }
  }
}

function getAllAccountList(): Account[] {
  const accounts: Account[] = []
  if (window) {
    const accountsJson = window.localStorage.getItem(ACCOUNT_STORAGE_KEY)
    if (accountsJson) {
      const objAccount = JSON.parse(accountsJson) as Account[]
      accounts.push(...objAccount)
    }
  }
  return accounts
}

function getAccountId({
  customerId,
  loginId,
}: {
  customerId: string
  loginId: string
}) {
  return `${customerId}#${loginId}`
}
