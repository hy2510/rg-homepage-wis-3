import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { headers } from 'next/headers'
import { ReactNode } from 'react'
import { makeCustomer } from '@/repository/client/object/customer'
import Common from '@/repository/server/common'
import AppInitializer from './AppInitializer'

type CustomerPayload = {
  applicationType: string
  customerData?: string
}
const getData = async (
  url: string,
  token?: string,
): Promise<CustomerPayload> => {
  let homepageUrl = url
  if (!url.startsWith('https') && !url.startsWith('http')) {
    homepageUrl = 'https://' + url
  }

  let payload: CustomerPayload | undefined = undefined
  const urlResponse = await Common.findCustomer({ homepageUrl })
  if (urlResponse.ok && urlResponse.data) {
    const customer = makeCustomer(urlResponse.data.Customer)
    const applicationType = customer.customerUse.toLowerCase()
    if (
      applicationType === 'private' ||
      applicationType === 'school' ||
      applicationType === 'academy'
    ) {
      payload = {
        applicationType,
        customerData: JSON.stringify(urlResponse.data),
      }
    }
  }
  if (!payload) {
    if (token) {
      const meResponse = await Common.selfCustomer(token)
      if (meResponse.ok && meResponse.data) {
        payload = {
          applicationType: 'app',
          customerData: JSON.stringify(meResponse.data),
        }
      } else {
        payload = {
          applicationType: 'app',
          customerData: undefined,
        }
      }
    } else {
      payload = {
        applicationType: 'app',
        customerData: undefined,
      }
    }
  }

  if (!payload) {
    throw Error('Customer Not Found')
  }
  return payload
}

export default async function AppLoader({
  children,
}: {
  children?: ReactNode
}) {
  const findHost = headers().get('host') || ''
  const token = getAuthorizationWithCookie().getAccessToken()
  const data = await getData(findHost, token)

  if (data) {
    return (
      <AppInitializer
        customerJson={data.customerData}
        applicationType={data.applicationType}
        isLogin={!!token}>
        {children}
      </AppInitializer>
    )
  } else {
    return <div>Not Found Customer</div>
  }
}
