import { toast as RToast } from 'react-toastify'
import ErrorIcon from './error.svg'
import SuccessIcon from './success.svg'
import { TOAST_CONTAINER_ID } from './ToastContainer'

type ToastType = 'info' | 'success' | 'warning' | 'error'
interface ToastProps {
  text: string
  type?: ToastType
}
const typeIcon: { [key in ToastType]: any } = {
  info: ErrorIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  warning: ErrorIcon,
}

const toast = ({ text = '', type = 'success' }: ToastProps) => {
  return RToast(text, {
    type,
    icon: () => <img src={typeIcon[type]} />,
    containerId: TOAST_CONTAINER_ID,
  })
}
export default toast
