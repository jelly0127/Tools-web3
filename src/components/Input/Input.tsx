import React, { useState } from 'react'
import { OutlinedInput } from '@mui/material'
import styled from 'styled-components'

interface InputProps {
  type?: string
  name?: string
  placeholder?: string
  value?: string
  setValue?: (value: any) => void
}
const InputStyle = styled.div`
  width: 100%;
  .input {
    /* width: ${prop => (prop.theme.isDesktop ? '365px' : '3.65rem')}; */
    font-size: ${props => props.theme.fontSmall};
    justify-content: center;
    height: 37px;
    padding-left: 5px;
  }
`
const Input: React.FC<InputProps> = ({ type, name, placeholder, value, setValue }) => {
  return (
    <>
      <InputStyle>
        <OutlinedInput
          value={value}
          onChange={(event: any) => setValue!(event.target.value)}
          className={name}
          type={type}
          inputProps={{
            placeholder,
          }}
        />
      </InputStyle>
    </>
  )
}
export default Input
