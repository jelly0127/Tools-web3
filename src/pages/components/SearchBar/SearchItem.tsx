import React from 'react'
import styled from 'styled-components'
import Input from '../../../components/Input'
import { flexCenter } from '../../../style'

const SearchBox = styled.div`
  ${flexCenter}
  flex-direction: row;
  .title {
    margin-right: 9px;
  }
  .ItemRow {
    ${flexCenter}
    flex-direction: row;
  }
  .input {
    width: 64px;
    height: 20px;
    border-radius: 2px;
  }
`
interface SearchItemProps {
  title: string
  placeholder: string[]
  setMinValue: (value: any) => void
  setMaxValue: (value: any) => void
  minValue: any
  maxValue: any
}
const SearchItem: React.FC<SearchItemProps> = ({
  placeholder,
  title,
  setMinValue,
  setMaxValue,
  minValue,
  maxValue,
}) => {
  return (
    <>
      <SearchBox>
        <div className="title">{title}</div>
        <div className="ItemRow">
          <Input
            name="input"
            placeholder={placeholder[1]}
            value={minValue}
            setValue={setMinValue}
          />{' '}
          {'\u00A0'}
          <div>-</div> {'\u00A0'}
          <Input
            name="input"
            placeholder={placeholder[0]}
            value={maxValue}
            setValue={setMaxValue}
          />
        </div>
      </SearchBox>
    </>
  )
}
export default SearchItem
