'use client'

import {
  useChangeCustomer,
  useClearCustomer,
  useCustomerInfo,
} from '@/app/_context/CustomerContext'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { useState } from 'react'
import { useFetchFindCustomer } from '@/client/store/customer/info/hook'
import {
  useFetchSearchCustomer,
  useOnLoadSearchPrivateCustomer,
} from '@/client/store/customer/search/hook'
import { SearchCustomerResponse } from '@/repository/client/customer/search-customer'
import {
  BackLink,
  Button,
  Nav,
  NavItem,
  TextField,
} from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import LoginFormAcademy from './LoginFormAcademy'
import LoginFormPrivate from './LoginFormPrivate'
import LoginFormSchool from './LoginFormSchool'

const STYLE_ID = 'page_sign_in'

const PRIVATE_SUPPORT_NATION = ['KR', 'ID', 'VN']
function getNationLabel(countryCode: string) {
  if (countryCode === 'KR') {
    return '대한민국'
  } else if (countryCode === 'ID') {
    return 'Indonesia'
  } else if (countryCode === 'VN') {
    return 'Việt Nam'
  }
  return ''
}

export default function LoginFormIntegrated({}: {}) {
  // @language 'common'
  const { t } = useTranslation()

  const customer = useCustomerInfo()

  const { payload: privateCustomer, loading: isCustomerLoading } =
    useOnLoadSearchPrivateCustomer()
  const groupSearch = useFetchSearchCustomer()
  const findCustomer = useFetchFindCustomer()

  const [navTab, setNavTab] = useState<'P' | 'G'>(
    customer.customerUse === 'Private' || !customer.customerUse ? 'P' : 'G',
  )

  const [isGroupSearchEmpty, setGroupSearchEmpty] = useState(false)
  const [groupKeyword, setGroupKeyword] = useState('')
  const [groupSearchCustomers, setGroupSearchCustomers] =
    useState<SearchCustomerResponse>([])

  const changeCustomer = useChangeCustomer()
  const clearCustomer = useClearCustomer()
  const setupCustomer = (customerId: string) => {
    findCustomer.fetch({
      customerId,
      callback: (data) => {
        if (data.payload) {
          changeCustomer(data.payload)
        }
      },
    })
  }

  const loginTitle =
    customer.customerUse === 'Private'
      ? getNationLabel(customer.countryCode)
      : customer.name
  const onLoginBackClick = () => {
    clearCustomer()
  }
  return (
    <>
      {customer.customerId && (
        <LoginFormWrapper
          title={loginTitle}
          customerUse={customer.customerUse}
          onBack={onLoginBackClick}
        />
      )}
      {!customer.customerId && (
        <>
          <div style={{ overflow: 'auto' }}>
            <Nav>
              <NavItem active={navTab === 'P'} onClick={() => setNavTab('P')}>
                {t('t258')}
              </NavItem>
              <NavItem active={navTab === 'G'} onClick={() => setNavTab('G')}>
                {t('t259')}
                <span style={{ fontSize: '0.8em', fontWeight: 500 }}>
                  {t('t260')}
                </span>
              </NavItem>
            </Nav>
          </div>
          {navTab === 'P' && (
            <>
              {isCustomerLoading ? (
                <div />
              ) : (
                <NationSelect
                  nations={privateCustomer.filter((customer) =>
                    PRIVATE_SUPPORT_NATION.includes(customer.countryCode),
                  )}
                  onSelectNation={(nation, customerId) => {
                    setupCustomer(customerId)
                  }}
                />
              )}
            </>
          )}
          {navTab === 'G' && (
            <CustomerSearch
              isShowEmpty={isGroupSearchEmpty}
              searchKeyword={groupKeyword}
              customers={groupSearchCustomers}
              onSearchCustomer={(keyword) => {
                setGroupSearchEmpty(false)
                groupSearch.fetch({
                  keyword,
                  callback: (data) => {
                    if (data.success) {
                      if (data.payload && data.payload.length > 0) {
                        setGroupSearchCustomers(data.payload)
                      } else {
                        setGroupSearchEmpty(true)
                      }
                      setGroupKeyword(keyword)
                    }
                  },
                })
              }}
              onSelectCustomer={(customer) => {
                setupCustomer(customer.customerId)
              }}
            />
          )}
        </>
      )}
    </>
  )
}

function LoginFormWrapper({
  customerUse,
  title,
  onBack,
}: {
  customerUse: string
  title: string
  onBack?: () => void
}) {
  const header = <BackLink onClick={() => onBack && onBack()}>{title}</BackLink>
  return (
    <>
      {customerUse === 'Private' && <LoginFormPrivate customHeader={header} />}
      {customerUse === 'School' && <LoginFormSchool customHeader={header} />}
      {customerUse === 'Academy' && <LoginFormAcademy customHeader={header} />}
    </>
  )
}

function NationSelect({
  nations,
  onSelectNation,
}: {
  nations: SearchCustomerResponse
  onSelectNation?: (nation: string, customerId: string) => void
}) {
  const style = useStyle(STYLE_ID)
  // @language 'common'
  const { t } = useTranslation()

  const onSelectNationListener = (nation: string, customerId: string) => {
    onSelectNation && onSelectNation(nation, customerId)
  }

  const t261 = t('t261');

  return (
    <div className={style.country_selection}>
      {/* <div className={style.txt_sentence}>{t('t261')}</div> */}
      <div className={style.txt_sentence} dangerouslySetInnerHTML={{ __html: t261 }} ></div>
      {nations.map((nation) => {
        return (
          <div
            key={nation.customerId}
            className={style.item_country}
            onClick={() => {
              onSelectNationListener(nation.countryCode, nation.customerId)
            }}>
            {getNationLabel(nation.countryCode)}
          </div>
        )
      })}
    </div>
  )
}

function CustomerSearch({
  isShowEmpty,
  searchKeyword,
  customers,
  onSearchCustomer,
  onSelectCustomer,
}: {
  isShowEmpty: boolean
  searchKeyword: string
  customers: SearchCustomerResponse
  onSearchCustomer?: (keyword: string) => void
  onSelectCustomer?: (customer: { customerId: string }) => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  const [keyword, setKeyword] = useState(searchKeyword)
  return (
    <>
      <div className={style.group_member}>
        <TextField
          id={'customer-name'}
          hint={t('t262')}
          value={keyword}
          onTextChange={(text) => setKeyword(text)}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() === 'enter' && keyword) {
              onSearchCustomer && onSearchCustomer(keyword)
            }
          }}
        />
        <Button
          color={'red'}
          shadow
          onClick={() => {
            onSearchCustomer && onSearchCustomer(keyword)
          }}>
          {t('t263')}
        </Button>
        {isShowEmpty && <div style={{ color: 'gray' }}>{t('t264')}</div>}

        {!isShowEmpty && customers.length > 0 && (
          <div className={style.search_result_data}>
            <div className={style.txt_title}>{t('t265')}</div>
            {customers.map((customer) => {
              return (
                <Link
                  href={''}
                  key={customer.customerId}
                  onClick={() =>
                    onSelectCustomer && onSelectCustomer(customer)
                  }>
                  <div className={style.school_card_item}>
                    {`• ${customer.name}`}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
