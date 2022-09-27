import styled from 'styled-components'
import { Select as MSelect, MenuItem, SelectProps } from '@mui/material'
import FormControl from '@mui/material/FormControl'

const MSelectWrapper = styled(MSelect)`
  font-size: ${props => props.theme.fontSmall};
  &.MuiOutlinedInput-root {
    width: 100%;
    height: 24px;
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid #f1f1f1;
  }
  &.MuiInputBase-root {
    width: 100%;
    height: 24px;
    text-align: center;
    justify-content: center;
  }
  &.MuiSelect-outlined {
    border: none;
    height: 24px;
  }
  & .MuiSelect-select {
    height: 24px;
  }
`

const MenuItemWrapper = styled(MenuItem)`
  &.MuiMenuItem-root {
    border-bottom: 1px solid ${props => props.theme.grey1};
    text-align: center;
    justify-content: center;
    :last-child {
      border-bottom: unset;
    }
    min-width: 124px;
    width: 100%;
    height: 24px;
  }
`
interface MSelectProp {
  setValue: (value: any) => void
  options: Array<{
    id: any
    tokenName: any
    tokenSymbol: any
  }>
}

const SearchSelect: React.FC<SelectProps & MSelectProp> = ({ value, options, setValue }) => {
  const handleChange = (val: any) => {
    setValue(val)
  }

  return (
    <FormControl variant="outlined">
      <MSelectWrapper
        displayEmpty
        autoWidth
        value={value}
        onChange={event => {
          handleChange(event.target.value)
        }}
      >
        {options.map(item => (
          <MenuItemWrapper key={item.id} value={item.tokenName}>
            {item.tokenSymbol}
          </MenuItemWrapper>
        ))}
      </MSelectWrapper>
    </FormControl>
  )
}

export default SearchSelect
