import styled from 'styled-components'
import { Drawer as MDrawer } from '@mui/material'
import { useContext } from 'react'
import { ThemeContext } from '../../helpers/hooks'
import CloseDark from '../../images/close-dark-icon.svg'
import CloseLight from '../../images/close-light-icon.svg'


const Wrapper = styled(MDrawer)`
  .body {
    padding: 20px;
    .icon {
      position: absolute;
      right: 24px;
      top: 24px;
      width: 40px;
      height: 40px;
      cursor:  ${prop => prop.theme.isDesktop ? 'pointer' : 'none'};
    }
  }
`
type Anchor = 'top' | 'left' | 'bottom' | 'right'
interface DrawerProps {
  anchor?: Anchor
  open: boolean
  children: React.ReactElement
  showCloseIcon?: boolean
  onClose: () => void
}
const Drawer: React.FC<DrawerProps> = ({
  anchor = 'bottom',
  open,
  children,
  showCloseIcon = true,
  onClose,
}) => {
  const { darkMode } = useContext(ThemeContext)

  return (
    <div>
      <Wrapper open={open} anchor={anchor} onClose={onClose}>
        <div className="body">
          {showCloseIcon && (
            <img className="icon" src={!darkMode ? CloseDark : CloseLight} onClick={onClose} />
          )}
          {children}
        </div>
      </Wrapper>
    </div>
  )
}

export default Drawer
