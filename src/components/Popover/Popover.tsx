import { Popover as MPopover } from '@mui/material'
import styled from 'styled-components'

const MPopoverWrapper = styled(MPopover)`
  .MuiPopover-paper {
    border-radius: 16px;
  }
`
type Vertical = 'top' | 'center' | 'bottom'
type Horizontal = 'left' | 'center' | 'right'

interface PopoverProps {
  id: string
  open: boolean
  children: React.ReactElement
  anchorEl: Element | null // 弹出框基于锚点定位
  anchorOrigin?: {
    // 锚点位置
    vertical: Vertical
    horizontal: Horizontal
  }
  transformOrigin?: {
    // 弹出框位置
    vertical: Vertical
    horizontal: Horizontal
  }
  onClose: () => void
}

const Popover: React.FC<PopoverProps> = ({
  id,
  open,
  anchorEl,
  children,
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
  },
  transformOrigin = {
    vertical: 'top',
    horizontal: 'center',
  },
  onClose,
}) => {
  return (
    <MPopoverWrapper
      id={id}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      onClose={onClose}
    >
      {children}
    </MPopoverWrapper>
  )
}

export default Popover
