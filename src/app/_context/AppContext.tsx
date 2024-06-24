'use client'

import React, { useContext } from 'react'
import StyleContextProvider from '../../ui/context/StyleContext'

export type ApplicationType = 'app' | 'private' | 'school' | 'academy'
type AppContextProps = {
  applicationType: ApplicationType
}

const AppContext = React.createContext<AppContextProps | undefined>(undefined)

export default function AppContextProvider({
  applicationType,
  children,
}: {
  applicationType: ApplicationType
  children?: React.ReactNode
}) {
  return (
    <AppContext.Provider value={{ applicationType }}>
      <StyleContextProvider>{children}</StyleContextProvider>
    </AppContext.Provider>
  )
}

export function useApplicationType(): ApplicationType {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }
  return context.applicationType
}
