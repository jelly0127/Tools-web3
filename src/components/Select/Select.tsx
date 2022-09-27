import styled from 'styled-components'
import { Select as MSelect, MenuItem, SelectProps } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/Input'
import SEARCHICON from '../SearchInput/Icon/search@3x.png'
import IconButton from '@mui/material/IconButton'
import { flexCenter } from '../../style'
import PICTURES from '../../images/pictures-icon.png'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../helpers/hooks'
import { getMethods } from '../../http'
import SELECTICON from '../../images/select.svg'

const MOutlinedInput = styled(OutlinedInput)`
  &.MuiOutlinedInput-input {
    input::placeholder {
      color: ${props => props.theme.grey1};
    }
  }
`
const MSelectWrapper = styled(MSelect)`
  border: 1px solid ${props => props.theme.grey1};
  position: relative;
  .selectIcon {
    position: absolute;
    right: 16px;
    img {
      width: 16px;
      height: 16px;
    }
    :hover {
      cursor: pointer;
    }
    z-index: -1;
  }
  &.MuiOutlinedInput-root {
    width: 365px;
    height: 36px;
    /* background: #ffffff; */
    border-radius: 2px;
  }
  &.MuiInputBase-root {
    text-align: center;
    justify-content: center;
  }
  &.MuiSelect-outlined {
    border: none;
  }
  .ImgVal {
    flex-direction: row;
    align-items: center;
    margin-top: -6px;
    margin-left: 20px;
    img {
      width: 34px;
      height: 34px;
      margin-right: 12px;
    }
  }
  .renderValue {
    flex-direction: row;
    align-items: center;
    margin-top: -6px;
    margin-left: 20px;
    img {
      width: 34px;
      height: 34px;
      margin-right: 12px;
    }
  }
`

const MenuItemWrapper = styled(MenuItem)`
  flex-direction: row;
  overflow-y: scroll;
  border-bottom: 1px solid #000;
  :last-child {
    border-bottom: unset;
  }
  img {
    width: 34px;
    height: 34px;
    margin-right: 12px;
  }
  width: 365px;
  .null {
    width: 100%;
    height: 34px;
  }
`

const InputStyle = styled.div`
  ${flexCenter}
  position:relative;
  flex-direction: row;
  .input {
    width: 365px;
    overflow-x: hidden;
    justify-content: center;
    height: 37px;
    padding: 0 12px;
  }

  .icon {
    position: absolute;
    right: 8px;
    width: 20px;
    background-color: ${props => props.theme.grey2};
    height: 16px;
    z-index: 9;
  }
`

interface MSelectProp {
  setValue: (value: any) => void
  setAddressVal: (value: any) => void
  placeholder?: string
  AddressVal: string
}

const Select: React.FC<SelectProps & MSelectProp> = ({
  value,
  setValue,
  placeholder,
  AddressVal,
  setAddressVal,
}) => {
  const [NFTCollections, setNFTCollections] = useState<any>('')
  const TestNftDataUrl = useAppSelector(state => state.app.defaultTokenUri)

  const handleChange = (val: any) => {
    setValue(val)
  }
  const handleChangeIpt = (val: any) => {
    setAddressVal(val)
  }
  const ImgValue = (val: any) => {
    if (val?.token_uri) {
      if (val) {
        return (
          <div className="ImgVal">
            <img src={val?.token_uri ? val?.token_uri : ''} alt="" />
            <span>{val?.name}</span>
          </div>
        )
      } else {
        return (
          <div className="ImgVal">
            <img src={TestNftDataUrl || ''} alt="" />
            <span>{'TestNFT'}</span>
          </div>
        )
      }
    }
  }
  const getNFTCollection = async () => {
    const address = '0x8e910bd1abc20ff064cc8f889c40a5f7f591c47f'
    const url = `https://deep-index.moralis.io/api/v2/nft/${
      AddressVal === '' ? address : AddressVal
    }/0?chain=mumbai`

    await getMethods(url)
      .then(res => {
        setNFTCollections(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getNFTCollection()
  }, [AddressVal])
  return (
    <FormControl variant="outlined">
      <MSelectWrapper
        displayEmpty
        autoWidth
        IconComponent={() => (
          <div className="selectIcon">
            <img src={SELECTICON} />
          </div>
        )}
        value={ImgValue(value)}
        onChange={event => {
          handleChange(event.target.value)
        }}
        renderValue={
          !value
            ? () => (
                <div className="renderValue">
                  <img src={PICTURES} alt="" />
                  <span>{placeholder}</span>
                </div>
              )
            : () => ImgValue(value)
        }
      >
        <InputStyle>
          <MOutlinedInput
            value={AddressVal}
            onChange={(event: any) => handleChangeIpt(event.target.value)}
            className="input"
            inputProps={{
              placeholder: 'Please entry collection address',
            }}
          />
          <IconButton aria-label="toggle password visibility" className="icon" size="large">
            <img className="searchIcon" width={16} src={SEARCHICON} alt="" />
          </IconButton>
        </InputStyle>

        <MenuItemWrapper value={NFTCollections}>
          {!NFTCollections.token_uri && !NFTCollections.name ? (
            'No data!'
          ) : (
            <>
              <img src={NFTCollections.token_uri} alt="" />
              {NFTCollections.name}
            </>
          )}
        </MenuItemWrapper>
        {/* ))} */}
      </MSelectWrapper>
    </FormControl>
  )
}

export default Select
