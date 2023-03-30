import React, { FC } from 'react'
import styled from 'styled-components'
import { RightOutlined } from '@ant-design/icons';
const CardBox = styled.div`
@keyframes jelly {
  0%,
  100% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
}
:hover {
  animation: jelly 0.5s;
}
  max-width: 300px;
  width: 100%;
  height: 100px;
  border-radius: 5px;
  background-color: #F9F9F9;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
a{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}
.img_box{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
  img{
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }
 .text_box{
  .text_box_top{
    font-size: ${props=>props.theme.fontNormal};
  }
  .text_box_bottom{
    margin-top: 10px;
    color: ${props => props.theme.grey3};
    font-size: ${props=>props.theme.fontSmall};

  }
 }
}
.right_logo{
  color: ${props => props.theme.grey3};
}
`
type CardProps={ 
  icon?: string,
  title: string;
  msg: string;
  path:string
}
const Card: FC<CardProps> = ({icon,title,msg,path }) =>{
  return (
    
    <CardBox>
      <a href={path}>
      <div className='img_box'>
          {
          icon?<img src={icon} alt="" />:null
          }
        <div className='text_box'>
            <div className='text_box_top'>{title}</div>
            {msg ? <div className='text_box_bottom'>{ msg}</div>:null
            }
      </div>
      </div>
      <div className='right_logo'>
        <RightOutlined />
        </div>
        </a>
    </CardBox>
    
  )
 }
export default Card
