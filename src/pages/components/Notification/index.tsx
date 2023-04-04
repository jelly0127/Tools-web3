import React, { FC, useEffect } from 'react'
import { Button, notification, Space } from 'antd';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
type PropsType = {
  type:NotificationType
}
const Notification: FC<PropsType> = ({type='info'}) =>{
   const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  useEffect(() => { 
    console.log('openNotificationWithIcon',1);
    
  openNotificationWithIcon(type)
    
  },[])
  return (
    <div>{contextHolder}</div>
  )
}
export default Notification
