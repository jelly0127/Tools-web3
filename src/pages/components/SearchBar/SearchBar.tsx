import React, { useState } from 'react'
import styled from 'styled-components'
import { flexCenter } from '../../../style'
import SearchItem from './SearchItem'
// import SelectItem from './SelectItem'

const SearchBox = styled.div`
  width: 100%;
  height: 24px;
  margin-top: 25px;
  ${flexCenter}
  flex-direction: row;
  justify-content: space-between;
  font-weight: 400;
  line-height: 24px;
  font-size: ${props => props.theme.fontNormal};
`
export default function Search() {
  const [DurationMinValue, setDurationMinValue] = useState<any>('')
  const [StrikeMinValue, setStrikeMinValue] = useState<any>('')
  const [PremiumMinValue, setPremiumMinValue] = useState<any>('')
  const [DurationMaxValue, setDurationMaxValue] = useState<any>('')
  const [StrikeMaxValue, setStrikeMaxValue] = useState<any>('')
  const [PremiumMaxValue, setPremiumMaxValue] = useState<any>('')

  return (
    <SearchBox>
      <SearchItem
        title={'Duration Time'}
        placeholder={['Enter Strike Price', 'Enter Strike Price']}
        setMinValue={setDurationMinValue}
        setMaxValue={setDurationMaxValue}
        minValue={DurationMinValue}
        maxValue={DurationMaxValue}
      />
      <SearchItem
        title={'Strike'}
        placeholder={['Max', 'Min']}
        setMinValue={setStrikeMinValue}
        setMaxValue={setStrikeMaxValue}
        minValue={StrikeMinValue}
        maxValue={StrikeMaxValue}
      />
      <SearchItem
        title={'Premium'}
        placeholder={['Max', 'Min']}
        setMinValue={setPremiumMinValue}
        setMaxValue={setPremiumMaxValue}
        minValue={PremiumMinValue}
        maxValue={PremiumMaxValue}
      />
      {/* <SelectItem /> */}
    </SearchBox>
  )
}
