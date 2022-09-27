import React from 'react'
import { ToastContainer as Container } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'
import { flexCenter } from '../../style'

const StyledContainer = styled(Container)`
  align-items: center;
  font-size: ${prop => prop.theme.fontNormal};

  .Toastify__toast-body {
    flex-direction: row;
    padding: 0 !important;
    min-height: unset !important;
    min-width: 184px !important;
  }
  .Toastify__toast {
    min-height: unset !important;
    min-width: unset !important;

    flex-direction: row;
    height: 36px;
    color: ${prop => prop.theme.grey4};
    border: 1px solid ${prop => prop.theme.grey4};
    border-radius: 2px;
  }

  .Toastify__toast--success {
    flex-direction: row;
    text-align: center;
    color: ${prop => prop.theme.grey5};
    border: 1px solid ${prop => prop.theme.grey5};
  }

  .Toastify__toast--error {
    flex-direction: row;
    color: ${prop => prop.theme.grey6};
    border: 1px solid ${prop => prop.theme.grey6};
  }
`

export const MESSAGE_CONTAINER_ID = 'message'
// 按需处理 https://fkhadra.github.io/react-toastify/introduction
const MessageContainer: React.FC = () => {
  return (
    <StyledContainer
      enableMultiContainer
      containerId={MESSAGE_CONTAINER_ID}
      position="bottom-center"
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      closeButton={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}

export default MessageContainer
