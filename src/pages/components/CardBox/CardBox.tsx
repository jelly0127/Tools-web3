import React, { FC } from 'react'
import styled  from 'styled-components';
const RootBox =styled.div`
  width: 1170px;
  border-radius: 5px;
  background-color: #FFFFFF;
  padding: 20px;
  height: auto;
  overflow-y: scroll;
`
type CardBoxProps = {
  children: React.ReactElement,
  height?:number
}
const CardBox: FC<CardBoxProps> = ({children,height})=> {
  return (
    <RootBox style={{height}}>{children}</RootBox>
  )
 }
export default CardBox
