import React from 'react'
import Button from '../../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { flexCenter, IBMPlexSerifs } from '../../../style'

const ButtonBox = styled.div`
  font-family: ${IBMPlexSerifs};
  ${flexCenter}
  margin-top: 46px;
`
export default function CreateButton() {
  const navigate = useNavigate()
  return (
    <ButtonBox>
      <Button
        text="Creater Order"
        primary
        onClick={() => {
          navigate('/createOrder')
        }}
      />
    </ButtonBox>
  )
}
