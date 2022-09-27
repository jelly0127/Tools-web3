import { toast as RMessage } from 'react-toastify'
import { MESSAGE_CONTAINER_ID } from './MessageContainer'
// 主要用于交易行为的交互状态

interface Message {
  messagePromose: Promise<any> | (() => Promise<any>)
  promiseText?: {
    pending: string
    success: string
    error: string
  }
}
const message = ({
  messagePromose,
  promiseText = {
    pending: 'Transaction Processing',
    success: 'Success',
    error: 'Transaction Failed',
  },
}: Message) => {
  return RMessage.promise(
    messagePromose,
    {
      ...promiseText,
    },
    {
      containerId: MESSAGE_CONTAINER_ID,
    },
  )
}

export default message
