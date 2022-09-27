import React, { useState } from 'react'
import Button from '../../../components/Button/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { flexCenter } from '../../../style'
import Folder from '../../../images/folder-icon.png'

const CreateBox = styled.div`
  width: 1024px;
  padding: 0 20px;
`
const ButtonBox = styled.div`
  ${flexCenter}
  margin-top: 46px;
`
const HeaderBtnRow = styled.div`
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  margin-top: -18px;
  .showIcon {
    flex-direction: row;
    img {
      width: 19px;
      height: 23px;
    }
    span {
      margin-left: 10px;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      :hover {
        text-decoration-line: underline;
        cursor: pointer;
      }
    }
  }
`
interface CreateBtnProps {
  setShowAll?: (value?: boolean) => void
  showAll?: boolean
}
const CreateButton: React.FC<CreateBtnProps> = ({ setShowAll, showAll }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <CreateBox>
      <ButtonBox>
        <Button
          text="Creater Order"
          primary
          onClick={() => {
            navigate(`/createOrder`)
          }}
        />
        <HeaderBtnRow>
          {pathname === '/myPositions' ? (
            <div
              className="showIcon"
              onClick={() => {
                setShowAll!(!showAll)
              }}
            >
              <img src={Folder} alt="" />
              {showAll ? (
                <span>{`Show My 'Placed Offer' Positions`}</span>
              ) : (
                <span>Show All Positions</span>
              )}
            </div>
          ) : null}
          {pathname === '/myOrder' ? (
            <div
              className="showIcon"
              onClick={() => {
                setShowAll!(!showAll)
              }}
            >
              <img src={Folder} alt="" />
              {!showAll ? <span> Show All Option</span> : <span>Only Show Open Option</span>}
            </div>
          ) : null}
        </HeaderBtnRow>
      </ButtonBox>
    </CreateBox>
  )
}

export default CreateButton
