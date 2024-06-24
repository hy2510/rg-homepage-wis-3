'use client'

import React, { useCallback, useContext, useState } from 'react'
import { Customer, makeCustomer } from '@/repository/client/object/customer'

type CustomerContext = {
  isReset?: boolean
  token: string
  customer: Customer
}
type CustomerContextProps = CustomerContext & {
  changeCustomer: (customerJson: string) => void
  clearCustomer: () => void
}

const CustomerContext = React.createContext<CustomerContextProps | undefined>(
  undefined,
)

function setupCustomer(customerJson: string): CustomerContext | undefined {
  let result: CustomerContext | undefined = undefined
  try {
    const parsed = JSON.parse(customerJson)
    const parsedCustomer = makeCustomer(parsed.Customer)
    const customerToken = parsed.Token
    if (customerToken) {
      if (window) {
        window.sessionStorage.setItem('CustomerToken', customerToken)
      }
      result = { token: customerToken, customer: parsedCustomer }
    }
  } catch (error) {}
  return result
}

function removeCustomer() {
  if (window) {
    window.sessionStorage.removeItem('CustomerToken')
  }
}

export default function CustomerContextProvider({
  customerJson,
  children,
}: {
  customerJson?: string
  children?: React.ReactNode
}) {
  const [customer, setCustomer] = useState<CustomerContext>({
    token: '',
    customer: makeCustomer(),
  })
  const changeCustomer = useCallback((customerJson: string) => {
    const props = setupCustomer(customerJson)
    if (props) {
      setCustomer(props)
    }
  }, [])
  const clearCustomer = useCallback(() => {
    removeCustomer()
    setCustomer({
      token: '',
      isReset: true,
      customer: makeCustomer(),
    })
  }, [])

  if (!customer.isReset && !customer.token && customerJson) {
    changeCustomer(customerJson)
  }

  return (
    <CustomerContext.Provider
      value={{ ...customer, changeCustomer, clearCustomer }}>
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomerInfo = (): Customer => {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('CustomerContextComponent is not binded.')
  }
  return context.customer
}

export const useChangeCustomer = () => {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('CustomerContextComponent is not binded.')
  }
  return context.changeCustomer
}

export const useClearCustomer = () => {
  const context = useContext(CustomerContext)
  if (!context) {
    throw new Error('CustomerContextComponent is not binded.')
  }
  return context.clearCustomer
}
