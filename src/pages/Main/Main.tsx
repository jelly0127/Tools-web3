import React from 'react'
import styled from 'styled-components'
import Card from '../components/Card/Card'
import MetamaskIcon from '../../images/wallet-metamask-icon.png'
import { flexCenter } from '../../style'
import TopBox from '../components/TopBox/TopBox'
import Content from '../components/Content/Content'
import Footer from '../components/Footer/Footer'

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 20px 0;
`
const ContentBox = styled.div`
  height: 100%;
  padding-bottom: 36px;
  min-width: 1170px;
  background-color: #FFFFFF;

`
export default function Main() {
  return (
    <MainBox>
      <ContentBox>
        <TopBox telegramSrc={''} learnSrc={''} ></TopBox>
        <Content />
      </ContentBox>
      {/* <Footer /> */}
    </MainBox>
  )
}
