import React from 'react'
import { ToastContainer as Container } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  font-size: ${prop => prop.theme.fontNormal};
  align-items: center;
  .Toastify__toast {
    flex-direction: row;
    padding: 0;
    border-radius: 8px;
    min-height: auto;
    width: fit-content;
    .Toastify__toast-body {
      flex-direction: row;
      margin: 0;
    }
  }
  .Toastify--animate-icon {
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }
`
export const TOAST_CONTAINER_ID = 'toast'
// 按需处理 https://fkhadra.github.io/react-toastify/introduction
const ToastContainer: React.FC = () => {
  return (
    <StyledContainer
      enableMultiContainer
      containerId={TOAST_CONTAINER_ID}
      position="top-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      closeButton={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}

export default ToastContainer
