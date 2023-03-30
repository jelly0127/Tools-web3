import React, { FC } from 'react'
import styled from 'styled-components';
import Card from '../Card/Card';
import { flexCenter } from '../../../style';
import { CardList } from './server';
const ContentBox = styled.div`
    width: 1170px;
    margin-top: 100px;
  .root_box{ 
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .top_box{
display: flex;
align-items: center;
.top_box_title{
  font-size: ${props => props.theme.fontLarge};
}
.top_box_msg{
  margin-top: 15px;
  color:${props => props.theme.grey3};
}
  }
  .content_box{
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  .content_boxs{
    ${flexCenter}
  width: 33.3%;
  margin-top: 50px;
}

  }
  .bottom_box{
    margin-top: 20px;
    color:${props => props.theme.grey3 };
    font-size: 14px;
  }
`

const ContentCard = () => {
  return <div className='content_box'>
    {
      CardList.map((item,index) => { 
        return  <div className='content_boxs' key={index}>
          <Card title={item.title} msg={item.msg} icon={ item.icon} path={item.path}/>
          </div>
      })
    }
      </div>
}
const Content:FC=() =>{
  return (
    <ContentBox>
      <div className='root_box'>
      <div className='top_box'>
        <div className='top_box_title'>
          热门工具
        </div>
        <div className='top_box_msg'>
          好东西，当然要和朋友一起分享啦！
        </div>
      </div>
        {
        ContentCard()
        }
      <div className='bottom_box'>
        敬请期待更多功能...
        </div>
      </div>
    </ContentBox>
  )
}
export default Content