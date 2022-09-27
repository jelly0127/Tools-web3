import { Modal as MModal } from '@mui/material'
import Fade from '@mui/material/Fade'
import { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from '../../../helpers/hooks'
import CloseLight from '../../../images/closure-icon.svg'
import { flexCenter, IBMPlexSerifMaxs } from '../../../style'

const ModalBody = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  background: #fff;
  outline: 0;
`
const ModalHeader = styled.div`
  position: relative;
  padding: 42px 32px;
  height: 68px;
  .title {
    height: 24px;
    font-weight: 700;
    font-size: 24px;
    ${flexCenter}
    font-family: ${IBMPlexSerifMaxs};
  }
  .icon {
    position: absolute;
    right: 16px;
    top: 16px;
    width: 24px;
    height: 24px;
    img {
      width: 100%;
      height: 100%;
    }
    cursor: ${prop => (prop.theme.isDesktop ? 'pointer' : 'none')};
  }
`

interface ModalProps {
  children: React.ReactElement
  title: string
  open: boolean
  showCloseIcon?: boolean
  width?: number // px
  height?: number
  titleWidth?: number
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({
  children,
  title,
  showCloseIcon = true,
  open,
  titleWidth = 0,
  width = 0,
  height = 0,
  onClose,
}) => {
  const { darkMode } = useContext(ThemeContext)
  return (
    <MModal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Fade in={open}>
        <ModalBody
          style={{
            width: (width ?? 0) > 0 ? `${width}px` : 'auto',
            height: (height ?? 0) > 0 ? `${height}px` : 'auto',
          }}
        >
          <ModalHeader>
            <div
              className="title"
              style={{
                width: (titleWidth ?? 0) > 0 ? `${titleWidth}px` : 'auto',
              }}
            >
              {title}
            </div>
            {showCloseIcon && <img className="icon" src={CloseLight} onClick={onClose} />}
          </ModalHeader>
          {children}
        </ModalBody>
      </Fade>
    </MModal>
  )
}

export default Modal
