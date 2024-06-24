'use client'

import {
  Account,
  deleteAccountGetResult,
  getAccountList,
  updateAccount,
} from '@/app/_account/account-list'
import { useApplicationType } from '@/app/_context/AppContext'
import {
  useChangeCustomer,
  useClearCustomer,
  useCustomerInfo,
} from '@/app/_context/CustomerContext'
import LoginContextProvider, {
  useLoginAction,
} from '@/app/_context/LoginContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useFetchFindCustomer } from '@/client/store/customer/info/hook'
import { Button, CheckBox, TextField } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_account_list'

export default function Page() {
  const style = useStyle(STYLE_ID)

  //@language 'common'
  const { t } = useTranslation()

  const [redirect, setRedirect] = useState<string>('')
  const [accounts, setAccounts] = useState<Account[]>([])

  useEffect(() => {
    const accountList = [...getAccountList()]
    if (accountList.length > 0) {
      setAccounts(accountList)
    } else {
      setRedirect(SITE_PATH.ACCOUNT.SIGN_IN)
    }
  }, [])

  const onDeleteAccountCard = (account: Account) => {
    const accountList = deleteAccountGetResult(account)
    if (accountList.length > 0) {
      setAccounts(accountList)
    } else {
      setRedirect(SITE_PATH.ACCOUNT.SIGN_IN)
    }
  }
  const onRemoveAccountPassword = (account: Account) => {
    account.password = ''
    updateAccount(account, false)
    const newAccount = accounts.map((acc) => {
      if (account._id === acc._id) {
        acc.password = ''
      }
      return acc
    })
    setAccounts(newAccount)
  }

  const appType = useApplicationType()
  const clearCustomer = useClearCustomer()
  const onClickAddAccount = () => {
    if (appType === 'app') {
      clearCustomer()
    }
    setRedirect(SITE_PATH.ACCOUNT.SIGN_IN)
  }

  return (
    <main className={style.account_list}>
      <div className={style.catchphrase}>
        <div className={style.brand_name}>{t('t206')}</div>
        <div className={style.sentence}>{t('t207')}</div>
      </div>
      <div className={`${style.account_card_list} container compact`}>
        {accounts &&
          accounts.length > 0 &&
          accounts.map((account) => {
            return (
              <AccountCard
                key={`${account.loginId}#${account.customerName}#${account.studentName}`}
                account={account}
                onDeleteAccountCard={onDeleteAccountCard}
                onRemoveAccountPassword={onRemoveAccountPassword}
              />
            )
          })}
      </div>
      <div className={style.add_account}>
        <Link
          href={''}
          className={style.add_account_button}
          onClick={(e) => {
            e.preventDefault()
            onClickAddAccount()
          }}>
          <div className={style.plus_icon}>
            <Image
              alt=""
              src="/src/images/plus-icons/plus-circle-blue.svg"
              width={24}
              height={24}
            />
          </div>
          <div className={style.txt_label}>{t('t208')}</div>
        </Link>
      </div>
      {redirect && <RedirectGo to={redirect} />}
    </main>
  )
}

function RedirectGo({ to }: { to: string }) {
  const router = useRouter()
  useEffect(() => {
    if (to) {
      router.replace(to)
    }
  }, [to, router])
  return <></>
}

const MoreItem = ({
  children,
  onClick,
}: {
  children?: ReactNode
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.more_item} onClick={onClick}>
      {children}
    </div>
  )
}

const MoreButton = ({
  isSavedPassword,
  onDeleteAccountHistoryClick,
  onRemovePasswordClick,
}: {
  isSavedPassword: boolean
  onDeleteAccountHistoryClick?: () => void
  onRemovePasswordClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const [isMenuOpen, _isMenuOpen] = useState(false)

  return (
    <div
      className={style.more_button}
      onClick={() => {
        !isMenuOpen && _isMenuOpen(true)
      }}>
      {isMenuOpen ? (
        <>
          <div className={style.more_items_container}>
            <MoreItem>
              <span style={!isSavedPassword ? { color: '#b3b9c2' } : undefined}>
                <CheckButton
                  text={t('t209')}
                  isChecked={!isSavedPassword}
                  onCheckedChange={(isChecked) => {
                    if (isChecked) {
                      onRemovePasswordClick && onRemovePasswordClick()
                    }
                  }}
                />
              </span>
            </MoreItem>
            <MoreItem>
              <span
                style={{ color: '#b3b9c2' }}
                onClick={() => {
                  if (confirm(t('t210'))) {
                    onDeleteAccountHistoryClick && onDeleteAccountHistoryClick()
                    _isMenuOpen(false)
                  }
                }}>
                {t('t211')}
              </span>
            </MoreItem>
          </div>
          <div
            className={style.screen_block}
            onClick={() => {
              isMenuOpen ? _isMenuOpen(false) : _isMenuOpen(true)
            }}></div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

const CheckButton = ({
  text,
  isChecked = true,
  onCheckedChange,
}: {
  text: string
  isChecked?: boolean
  onCheckedChange?: (isChecked: boolean) => void
}) => {
  return (
    <div
      onClick={() => {
        const newChecked = !isChecked
        onCheckedChange && onCheckedChange(newChecked)
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
      }}>
      {text}
      {isChecked ? (
        <Image
          alt=""
          src={'/src/images/check-icons/check_box_on.svg'}
          width={24}
          height={24}
        />
      ) : (
        <Image
          alt=""
          src={'/src/images/check-icons/check_box_off.svg'}
          width={24}
          height={24}
        />
      )}
    </div>
  )
}

const AccountCard = ({
  account,
  onDeleteAccountCard,
  onRemoveAccountPassword,
}: {
  account: Account
  onDeleteAccountCard?: (account: Account) => void
  onRemoveAccountPassword?: (account: Account) => void
}) => {
  const style = useStyle(STYLE_ID)

  const { customerId, customerName, loginId, studentName, avatar } = account
  const appType = useApplicationType()

  const { customerId: settingCustomerId } = useCustomerInfo()
  const changeCustomer = useChangeCustomer()

  const findCustomer = useFetchFindCustomer()
  const [selectCustomer, setSelectCustomer] = useState<string | undefined>(
    undefined,
  )
  const onFindCustomer = () => {
    if (appType !== 'app') {
      setSelectCustomer(customerId)
      return
    }
    if (settingCustomerId && settingCustomerId === customerId) {
      setSelectCustomer(customerId)
    } else {
      findCustomer.fetch({
        customerId,
        callback: (data) => {
          if (data.success && data.payload) {
            changeCustomer(data.payload)
            setSelectCustomer(customerId)
          }
        },
      })
    }
  }
  const isSavedPassword = !!account.password

  return (
    <div className={style.account_card}>
      {isSavedPassword ? (
        <>
          {/* 오토 로그인 상태 표시 */}
          <div className={style.auto_login_unlock}>
            <Image
              alt=""
              src="/src/images/lock-icons/unlock.svg"
              width={18}
              height={18}
            />
          </div>
        </>
      ) : (
        <>
          {/* 비밀번호를 치고 로그인을 해야하는 상태 표시 */}
          <div className={style.auto_login_lock}>
            <Image
              alt=""
              src="/src/images/lock-icons/lock.svg"
              width={18}
              height={18}
            />
          </div>
        </>
      )}
      <MoreButton
        isSavedPassword={!!account.password}
        onDeleteAccountHistoryClick={() => {
          onDeleteAccountCard && onDeleteAccountCard(account)
        }}
        onRemovePasswordClick={() => {
          onRemoveAccountPassword && onRemoveAccountPassword(account)
        }}
      />
      <div
        className={style.user_avatar}
        onClick={() => {
          onFindCustomer()
        }}>
        <Image alt="" src={avatar} width={150} height={150} />
      </div>
      <div
        className={style.user_info}
        onClick={() => {
          onFindCustomer()
        }}>
        <div className={style.user_name}>{studentName}</div>
        <div className={style.user_id}>( {loginId} )</div>
      </div>
      <div className={style.user_info_more}>{customerName}</div>
      {selectCustomer && (
        <LoginContextProvider>
          <PasswordInput
            isAutoLogin={isSavedPassword}
            account={account}
            onDismiss={() => {
              setSelectCustomer(undefined)
            }}
            onRemoveAccountPassword={onRemoveAccountPassword}
          />
        </LoginContextProvider>
      )}
    </div>
  )
}

const PasswordInput = ({
  account,
  isAutoLogin = false,
  onDismiss,
  onRemoveAccountPassword,
}: {
  account: Account
  isAutoLogin?: boolean
  onDismiss?: () => void
  onRemoveAccountPassword?: (account: Account) => void
}) => {
  const style = useStyle(STYLE_ID)

  //@language 'common'
  const { t } = useTranslation()

  const router = useRouter()
  const {
    customerName,
    loginId,
    studentName,
    password: savedPassword,
  } = account
  const onLogin = useLoginAction()
  const requestLogin = ({
    id,
    password,
    isSavePassword = false,
  }: {
    id: string
    password: string
    isSavePassword?: boolean
  }) => {
    passwordInputRef.current?.blur()
    onLogin({
      id,
      password,
      isSavePassword,
      onError: (code, message, redirect) => {
        if (code === 3000) {
          onRemoveAccountPassword && onRemoveAccountPassword(account)
        } else if (code === 2001 && redirect) {
          router.replace(redirect)
        }
        alert(message)
        passwordInputRef.current?.focus()
      },
    })
  }
  const passwordInputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (isAutoLogin && savedPassword) {
      requestLogin({ id: loginId, password: savedPassword })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAutoLogin])

  const [password, setPassword] = useState('')
  const [isSavePassword, setSavePassword] = useState(false)

  return (
    <div className={style.password_input}>
      <div className={style.password_input_modal}>
        <div className={style.user_info_on_passowrd_input}>
          <div>
            <div className={style.user_name}>{studentName}</div>
            <div className={style.user_info_more}>{customerName}</div>
          </div>
          <div className={style.user_id}>{loginId}</div>
        </div>
        <TextField
          ref={passwordInputRef}
          password
          hint={t('t212')}
          value={password}
          onTextChange={(text) => setPassword(text)}
          onKeyDown={(e) => {
            if (password.length > 0 && e.key.toLowerCase() === 'enter') {
              requestLogin({ id: loginId, password })
            }
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
          }}>
          <CheckBox
            check={isSavePassword}
            onClick={() => setSavePassword(!isSavePassword)}
          />
          <span onClick={() => setSavePassword(!isSavePassword)}>
            {t('t213')}
          </span>
        </div>
        <Button
          shadow
          color={'red'}
          onClick={() => {
            requestLogin({ id: loginId, password, isSavePassword })
          }}>
          {t('t214')}
        </Button>
        <div className={style.row_box}>
          <Link href={SITE_PATH.ACCOUNT.FORGOT_PASSWORD}>{t('t247')}</Link>
        </div>
      </div>
      <div className={style.screen_block} onClick={onDismiss}></div>
    </div>
  )
}
