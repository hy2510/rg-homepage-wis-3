'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import findStyle from './css-index'

type ThemeType = 'dark' | 'light'
type ScreenType = 'pc' | 'mobile'
interface StyleContextAttribute {
  themeType?: ThemeType
  screenType?: ScreenType
}
interface StyleContextProps extends StyleContextAttribute {
  updateStyle: (style: StyleContextAttribute) => void
}

const StyleContext = React.createContext<StyleContextProps | undefined>(
  undefined,
)

const THEME_APPLICATION_DARK = '#0c0541'
const THEME_APPLICATION_LIGHT = '#00a0fd'

export default function StyleContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [baseStyles, setBaseStyle] = useState<StyleContextAttribute>({
    themeType: undefined,
    screenType: undefined,
  })
  const baseThemeType: ThemeType | undefined = baseStyles.themeType
  const baseScreenType: ScreenType | undefined = baseStyles.screenType

  const updateStyle = useCallback(
    (style: StyleContextAttribute) => {
      setBaseStyle({
        themeType: style.themeType || baseThemeType,
        screenType: style.screenType || baseScreenType,
      })
    },
    [baseThemeType, baseScreenType],
  )

  useEffect(() => {
    const agent = window?.navigator?.userAgent
    if (agent) {
      const isMobile = isMobileDetect(agent)
      setBaseStyle({
        screenType: isMobile ? 'mobile' : 'pc',
        themeType: baseThemeType,
      })
    } else {
      setBaseStyle({ screenType: 'pc', themeType: baseThemeType })
    }
  }, [baseThemeType])

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const thmeMode = darkModeQuery.matches ? 'dark' : 'light'
    setBaseStyle({ screenType: baseScreenType, themeType: thmeMode })

    const handleDarkModeChange = (e: any) => {
      const thmeMode = e.matches ? 'dark' : 'light'
      setBaseStyle({ screenType: baseScreenType, themeType: thmeMode })
    }
    darkModeQuery.addEventListener('change', handleDarkModeChange)
    return () => {
      darkModeQuery.removeEventListener('change', handleDarkModeChange)
    }
  }, [baseScreenType])

  return (
    <StyleContext.Provider value={{ ...baseStyles, updateStyle }}>
      {children}
    </StyleContext.Provider>
  )
}

export function useScreenMode(): ScreenType {
  return useContext(StyleContext)?.screenType || 'pc'
}

export function useThemeMode(): ThemeType {
  return useContext(StyleContext)?.themeType || 'light'
}

export function useThemeColor(): string {
  const themeColor =
    useThemeMode() === 'dark' ? THEME_APPLICATION_DARK : THEME_APPLICATION_LIGHT
  return themeColor
}

export function useUpdateStyle() {
  const context = useContext(StyleContext)
  if (!context) {
    throw new Error('ContextComponent is not binded.')
  }
  return context.updateStyle
}

export function useStyle(id: string) {
  const css = findStyle(id)
  const screenMode = useScreenMode()
  if (screenMode === 'mobile' && css.mobile) {
    return css.mobile
  } else {
    return css.pc
  }
}

function isMobileDetect(userAgent: string) {
  const isMobileDevice =
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  const screenWidth = screen.width < 1024
  return isMobileDevice && screenWidth
}
