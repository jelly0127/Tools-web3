import React, { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import styled from 'styled-components'
import { flexCenter } from '../../style'

interface SelectBtnProps {
  text: string[]
}
const ButtonGroup = styled(ToggleButtonGroup)`
  ${flexCenter}
  flex-direction: row;
  width: 100%;
  &.MuiToggleButtonGroup-root .Mui-selected {
    color: ${props => props.theme.grey2};
    background-color: ${props => props.theme.grey1};
  }
`

const SelectButton: React.FC<SelectBtnProps> = ({ text }) => {
  const [alignment, setAlignment] = useState(text[0])

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
  }

  return (
    <ButtonGroup value={alignment} exclusive onChange={handleChange} aria-label="Platform">
      <ToggleButton value={text[0]}>{text[0]}</ToggleButton>
      <ToggleButton value={text[1]}>{text[1]}</ToggleButton>
    </ButtonGroup>
  )
}
export default SelectButton
