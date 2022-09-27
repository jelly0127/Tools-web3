import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    grey1: string
    grey2: string
    grey3: string
    grey4: string
    grey5: string
    grey6: string
    fontLargest: string
    fontLarge: string
    fontNormal: string
    fontSmall: string
    primaryColor: string
    borderColor: string
    isDesktop: boolean
    bgColor: string
  }
}
