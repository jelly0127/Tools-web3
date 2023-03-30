import { createGlobalStyle, DefaultTheme } from 'styled-components'
import '@mui/styles'
import { createTheme } from '@mui/material'
import { isDesktop } from './helpers/utils'
import IBMPlexSansThai from '../src/font/IBMPlexSansThai-Regular.ttf'
import IBMPlexSansThaiMax from '../src/font/IBMPlexSansThai-Bold.ttf'
import IBMPlexSansThaiSmall from '../src/font/IBMPlexSansThai-SemiBold.ttf'
import IBMPlexSerif from '../src/font/IBMPlexSerif-Regular.ttf'
import IBMPlexSerifMax from '../src/font/IBMPlexSerif-Bold.ttf'
import IBMPlexSerifSmall from '../src/font/IBMPlexSerif-SemiBold.ttf'

export const DEFAULT_FONT_SIZE = '16px'
export const defalutFont = {
  fontLargest: '32px',
  fontLarge: '24px',
  fontNormal: DEFAULT_FONT_SIZE,
  fontSmall: '12px',
}

const defaultTheme = {
  grey1: '#000',
  grey2: '#FFFFFF',
  grey3: '#666666',
  grey4: '#0000FF',
  grey5: '#49B552',
  grey6: '#FF0806',
  primaryColor: '#0057FF',
  borderColor: '',
  isDesktop,
  ...defalutFont,
}
// init

const darkTheme = createTheme({}, {
  ...defaultTheme,
  bgColor: '#000',
} as DefaultTheme)

const lightTheme = createTheme({}, {
  ...defaultTheme,
  bgColor: '#fff',
} as DefaultTheme)

const flexCenter = `
  display: flex;
  justify-content: center;
  align-items: center;
`

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
@font-face {
    font-family: 'IBMPlexSansThai';
    src: url(${IBMPlexSansThai});
  } 
  body {
  @font-face {
    font-family: 'IBMPlexSerif';
    src: url(${IBMPlexSerif});
    ::-webkit-scrollbar {
    display: none;
}
  }
  background-color: #FAFAFA;
    min-height: 100%;
    min-width: 1280px;
    position: relative;
    overflow: scroll;
    font-size: ${prop => prop.theme.fontNormal};
    font-family: 'IBMPlexSerif';
    // fix style: WalletConnect modal
    #walletconnect-qrcode-modal {
      .walletconnect-modal__base {
        top: 24%;
        margin: ${prop => (prop.theme.isDesktop ? 'auto' : 'auto 0')};
      }
      .walletconnect-modal__mobile__toggle {
        display: ${prop => (prop.theme.isDesktop ? 'none' : 'flex')};
        flex-direction: row;
      }
    }
  }
  body, textarea, input, button {
    line-height: 1;
  }

  body, div, p {
    margin: 0;
    padding: 0;
  }

  button, a {
    padding: 0;
    margin: 0;
    border: 0;
    background: transparent;
    cursor: ${prop => (prop.theme.isDesktop ? 'pointer' : 'none')};
    &:focus {
      outline: 1px solid rgba(0, 0, 0, .1);
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    :focus {
      outline: none;
    }
  }
  ul {
    padding: 0 !important;
  }
  img {
    display: block;
  }

  strong {
    font-weight: bold;
  }

  div, a, button, li {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  // fix style: coinbase modal
  .-cbwsdk-css-reset {
    .-cbwsdk-extension-dialog-box-top-install-region {
      button {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
      }
    }
    .-cbwsdk-snackbar-instance {
      width: 100%;
    }
  } 
`
const IBMPlexSansThais = 'IBMPlexSansThai'
const IBMPlexSerifs = 'IBMPlexSerif'
const IBMPlexSansThaiMaxs = 'IBMPlexSansThaiMax'
const IBMPlexSansThaiSmalls = 'IBMPlexSansThaiSmall'
const IBMPlexSerifMaxs = 'IBMPlexSerifMax'
const IBMPlexSerifSmalls = 'IBMPlexSerifSmall'
export {
  darkTheme,
  lightTheme,
  defaultTheme,
  GlobalStyle,
  flexCenter,
  IBMPlexSansThais,
  IBMPlexSansThaiMaxs,
  IBMPlexSansThaiSmalls,
  IBMPlexSerifs,
  IBMPlexSerifMaxs,
  IBMPlexSerifSmalls,
}
