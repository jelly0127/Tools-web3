import React, { PropsWithChildren, useState } from 'react'
import { Tooltip as MTooltip, TooltipProps } from '@mui/material'
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles'

import ClickAwayListener from '@mui/material/ClickAwayListener'
import { useAppSelector } from '../../helpers/hooks'

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '12px',
          color: '#666666',
          backgroundColor: '#FFFFF',
          boxShadow: '0px 2px 8px 0px rgba(153,153,153,1)',
        },
      },
    },
  },
})

interface Iprop {
  text: string
  children: React.ReactElement
  placement?: TooltipProps['placement']
}

const Tooltip: React.FC<PropsWithChildren<Iprop>> = ({ children, text, placement = 'top' }) => {
  const [open, setOpen] = useState(false)
  const isDesktop = useAppSelector(state => state.app.isDesktop)

  const handleTooltipClose = () => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(true)
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {isDesktop && (
          <MTooltip title={text} placement={placement}>
            {children}
          </MTooltip>
        )}
        {!isDesktop && (
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <MTooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={text}
              >
                <div onClick={handleTooltipOpen}>{children}</div>
              </MTooltip>
            </div>
          </ClickAwayListener>
        )}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default Tooltip
