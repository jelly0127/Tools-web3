import styled from 'styled-components'

const SearchInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  font-size: ${prop => prop.theme.fontNormal};
  color: ${prop => prop.theme.grey3};
  caret-color: #3d8de2;
  :focus-visible {
    outline: none;
  }
`

export default SearchInput
