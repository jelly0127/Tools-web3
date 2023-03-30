import React, { FC } from 'react'
import styled from 'styled-components'
import { flexCenter } from '../../../style'
import ICON_PLANE from './imgs/plane.svg'
import ICON_LIST from './imgs/list.svg' 
import ICON_CAT from './imgs/cat.gif'
const RootBox=styled.div`
  height: 520px;
  width: 100%;
 ${flexCenter}
 .content_box{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
 }
 .text_box {
  height: 100px;
  width: auto;
  display: flex;
  justify-content: center;
  .text_box_title{
    font-weight: 700;
  font-size: ${props=>props.theme.fontLargest};
  }
  .btn_box{
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    .btn_box_left{
      
    }
    .btn_box_right{
      margin-left: 20px;
    }
    .btn_box_left_icon{
      height: 12px;
      width: 12px;
      margin-right: 5px;
    }
    .btn_box_right_icon{
      height: 12px;
      width: 12px;
      margin-right: 5px;

    }
   button{
    width: 86px;
    height: 32px;
    border-radius: 5px;
    background-color: #FDEAF1;
    font-weight: 500;
    font-size: ${props=>props.theme.fontSmall};
    color:#F95997 !important;
   ${flexCenter}
   flex-direction: row;
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
   }

  }
 }
 .img_box{
  width: 500px;
 }
`
type TopBoxProps = {
  telegramSrc: '',
  learnSrc:''
}
const TopBox: FC<TopBoxProps> = ({ 
  telegramSrc,learnSrc
})=> {
  return (
    <RootBox>
      <div className='content_box'>

      <div className='text_box'>
        <div className='text_box_title'>更智能的区块链科技</div>
       
          {/* <div className='btn_box'>
            <a href={telegramSrc}>
              <button className='btn_box_left'>
              <img src={ICON_PLANE} alt="" className='btn_box_left_icon'/>
              加入电报</button>
            </a>
            <a href={learnSrc}>
              <button className='btn_box_right'>
              <img src={ICON_LIST} alt="" className='btn_box_right_icon'/>
              新手教程</button>
        </a>
          
          </div> */}

        </div>
        
      {/* <div className='img_box'>
          <img src={ICON_CAT} alt="" />
      </div> */}
      </div>
    
    </RootBox>
  )
}
export default TopBox
