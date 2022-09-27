import { StyledEngineProvider, useMediaQuery } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { DefaultTheme, ThemeProvider as MyThemeProvider } from 'styled-components'
import { ThemeContext, useAppDispatch, useAppSelector } from './helpers/hooks'
import { updateDesktop } from './redux/reducer'
import { darkTheme, defalutFont, GlobalStyle, lightTheme } from './style'
import '@mui/styles'
import { DESKTOP_WIDTH } from './helpers/utils'

const darkMap = new Map()
const desktopMap = new Map()
desktopMap.set(true, defalutFont)
darkMap.set(true, darkTheme)
darkMap.set(false, lightTheme)

export const ThemeProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)
  const dispatch = useAppDispatch()
  const matchesDesktop = useMediaQuery(`(min-width: ${DESKTOP_WIDTH}px)`)
  const isDesktop = useAppSelector(state => state.app.isDesktop)

  useEffect(() => {
    dispatch(updateDesktop({ desktopValue: matchesDesktop }))
  }, [matchesDesktop, dispatch])

  const getTheme = useCallback((): DefaultTheme => {
    return { ...darkMap.get(darkMode), ...desktopMap.get(isDesktop), isDesktop }
  }, [darkMode, isDesktop])

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StyledEngineProvider injectFirst>
        <MyThemeProvider theme={getTheme()}>
          <GlobalStyle />
          {children}
        </MyThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  )
}
