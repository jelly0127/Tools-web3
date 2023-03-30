import React, { FC } from 'react'
import styled from 'styled-components'
import { flexCenter } from '../../../style'
import ICON_PINKSALE from './imgs/Pinkswap.png'
import ICON_GEMPAD from './imgs/Gempad.svg'
import ICON_TELEGRAM from './imgs/telegram.svg'
import ICON_TWITTER from './imgs/twitter.svg'
import LOGO from '../../../components/Header/robotcat.png'
const RootBox = styled.div`
  margin-top: 20px;
  background-color: #FFFFFF;
  height: 100%;
  width: 100%;
  ${flexCenter}
`
const FootBox=styled.div`
  width:1170px ;
  padding: 30px 0;
  flex-direction: row;
  justify-content: space-between;
  .msg{
    margin-top: 10px;
    font-size: 14px;
    color: ${props=>props.theme.grey3};
  }
.first_box{
  width:calc(100% / 5) ;
  .img_box{
    margin-top: 20px;
    ${flexCenter}
    display: flex;
    flex-flow: row;
    width: 80px;
    height: 40px;
    border-radius: 5px;
    background-color: #FCF6F8;
    font-size: ${props=>props.theme.fontSmall};
  img{
    width: 12px;
    height: 12px;
    margin-right: 5px;
  }
 
  }
  .img_box_second{
    margin-top: 20px;
    ${flexCenter}
    display: flex;
    width: 80px;
    height: 40px;
    border-radius: 5px;
    background-color: #000;
    color: ${props=>props.theme.grey2};
    font-size: ${props=>props.theme.fontSmall};
  img{
    width: 14px;
    height: 14px;
    margin-bottom: 5px;
  }
 }
 
}
.second_box{
  width:calc(100% / 5) ;
.alink{
  margin-top: 20px;
  font-size: ${props => props.theme.fontSmall};
  color: #789DE1;
 a{
  line-height: 22px;
  :hover {text-decoration:underline;}
 }

}
}
.third_box{
  width:calc(100% / 5) ;

.icon_box{
  display: flex;
  flex-direction: row;
  margin-top: 20px;
img{
    width: 22px;
    height: 22px;
    margin-right: 10px;
}
}
.icon_logo{
  margin-top: 30px;
  img{
    width: 128px;
    height: 38px;
  }
}
}
.fourth_box{
  width:calc((100% / 5)*2) ;
 line-height: 22px;
.line{
  border: .5px solid ${props=>props.theme.grey3};
  margin-top: 10px;
}
}
`
const AlinkList = [{
  id: 0,
  src: '',
  name:'雪球社区 | Snowball'
},
{
  id: 1,
  src: '',
  name:'荒野社区 | Snowball'
  },
{
  id: 2,
  src: '',
  name:'雪球社区 | Snowball'
},{
  id: 3,
  src: '',
  name:'雪球社区 | Snowball'
},{
  id: 4,
  src: '',
  name:'雪球社区 | Snowball'
},{
  id: 5,
  src: '',
  name:'雪球社区 | Snowball'
},{
  id: 6,
  src: '',
  name:'雪球社区 | Snowball'
},{
  id: 7,
  src: '',
  name:'雪球社区 | Snowball'
}]
const firstBox = () => { 
  return (<div className='first_box'>
          <div className='title'>特别鸣谢</div>
          <div className='img_box'>
             <img src={ICON_PINKSALE} alt="" />
          <div >PinkSale</div>
         </div>
          <div className='msg'>PinkSale Launchpad</div>
        
         <div className='img_box_second'>
             <img src={ICON_GEMPAD} alt="" />
          <div >GEMPAD</div>
         </div>
          <div className='msg'>GemPad Launchpad</div>
        </div>)
}
const secondBox = () => { 
  return (
       <div className='second_box'>
          <div className='title'>合作社区</div>
      <div className='alink'>
        {
          AlinkList.map(item => { 
            return <a href={item.src} key={ item.id}>
              { item.name}
        </a>
          })
        }
 
            </div>
        </div>
  )
}
const thirdBox = () => { 
  return (
          <div className='third_box'>
          <div className='title'>联系我们</div>
      <div className='icon_box'>
        <a href="">
            <img src={ICON_TELEGRAM} alt="" />
        </a>
        <a href="">
            <img src={ICON_TWITTER} alt="" />
        </a>
          </div>
          <div className='icon_logo'>
        <a href="">
          <img src={LOGO} alt="" />
        </a>
      </div>
        </div>
  )
}
const fourthBox = () => { 
  return (
     <div className='fourth_box'>
          <div className='title'>免责声明</div>
          <div className='msg'>
            所提供的信息不得以任何方式构成您是否应投资所讨论的任何产品的建议。对于因提供或发布任何材料而采取行动或不采取行动的任何人所遭受的任何损失，我们不承担任何责任
          </div>
          <div className='line'/>
          <div className='msg'>
            Copyright 2022 FIFAPP LIMITED
            <br />
            All rights reserved
            <br />
            Version: v1.1.12
          </div>
        </div>
  )
}
const Footer:FC=()=> {
  return (
    <RootBox>
      <FootBox>
        {
          firstBox()
        }
        {
          secondBox()
        }
        {
          thirdBox()
        }
        {
          fourthBox()
        }
      </FootBox>
    </RootBox>  
  )
}
export default Footer
