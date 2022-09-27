import Table from '@mui/material/Table/Table'
import styled from 'styled-components'
import { flexCenter, IBMPlexSerifs } from '../../../style'

const Wrapper = styled.div`
  width: 1024px;
  height: 500px;
  position: fixed;
  z-index: 10001;
  margin-top: -60px;
  .mask {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    /* background-color: #00000020; */
  }
`
const NoMore = styled.div`
  border: 1px solid #000;
`
const Tabs = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  .HeaderBtnRow {
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    font-weight: 400;
    font-size: ${props => props.theme.fontNormal};
  }
  .showIcon {
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    img {
      height: 20px;
      width: 24px;
    }
    span {
      font-size: ${props => props.theme.fontSmall};
      color: ${props => props.theme.grey3};
    }
    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`
const MTable = styled(Table)`
  width: 100%;
  .NoUrl {
    width: 44px;
    height: 44px;
  }
  .empty {
    width: 100%;
    ${flexCenter}
  }
  &.MuiTable-root {
    width: 100%;
    min-width: 1024px;
    overflow: scroll;
    /* border-bottom: 1px solid #000; */
  }
  &.MuiTableBody-root {
    border: 1px solid #000;
    font-family: ${IBMPlexSerifs};
  }
  .nftBox {
    ${flexCenter}
    flex-direction: row;
    justify-content: space-evenly;
    .nftImg {
      width: 44px;
      height: 44px;
    }
  }

  .statusBox {
    ${flexCenter}
    height: 22px;
    width: 79px;
  }
  .statusExercisedBox {
    ${flexCenter}
    height: 22px;
    width: 79px;
    border: 1px solid ${props => props.theme.grey4};
    color: ${props => props.theme.grey4};
    text-align: center;
    line-height: 20px;
    border-radius: 2px;
    font-size: ${props => props.theme.fontSmall};
  }
  .statusUnFilledBox {
    ${flexCenter}
    height: 22px;
    width: 79px;
    border: 1px solid ${props => props.theme.grey1};
    color: ${props => props.theme.grey1};
    text-align: center;
    line-height: 20px;
    border-radius: 2px;
    font-size: ${props => props.theme.fontSmall};
  }
  .statusActiveBox {
    ${flexCenter}
    height: 22px;
    width: 79px;
    border: 1px solid ${props => props.theme.grey5};
    color: ${props => props.theme.grey5};
    text-align: center;
    line-height: 20px;
    border-radius: 2px;
    font-size: ${props => props.theme.fontSmall};
  }
  .statusExpiredBox {
    ${flexCenter}
    height: 22px;
    width: 79px;
    border: 1px solid ${props => props.theme.grey6};
    color: ${props => props.theme.grey6};
    text-align: center;
    line-height: 20px;
    border-radius: 2px;
    font-size: ${props => props.theme.fontSmall};
  }
  .statusBox_right {
    width: 100%;
    justify-content: end;
    flex-direction: row;
  }
  .typeBox {
    width: 100%;
    ${flexCenter}
  }
  .typeBoxNormal {
    ${flexCenter}
    width: 71px;
    height: 26px;
    text-align: center;
    line-height: 20px;
    border: 1px solid ${props => props.theme.grey1};
    color: ${props => props.theme.grey1};
    font-size: ${props => props.theme.fontSmall};
  }
  .typeBoxBlack {
    ${flexCenter}
    width: 71px;
    height: 26px;
    text-align: center;
    line-height: 20px;
    border: 1px solid ${props => props.theme.grey1};
    color: ${props => props.theme.grey2};
    font-size: ${props => props.theme.fontSmall};
    background: ${props => props.theme.grey1};
  }
  .tabNameText {
    font-size: ${props => props.theme.fontNormal};
    color: ${props => props.theme.grey1};
    font-weight: 600;
    line-height: 24px;
  }
  .typeBoxRight {
    &.MuiTableCell-root {
      ${flexCenter}
    }
  }
  .detailBox {
    width: 116px;
    height: 24px;
    ${flexCenter}
    flex-direction: row;
    border: 1px solid ${props => props.theme.grey1};
    font-size: ${props => props.theme.fontSmall};
    .detailBoxIcon {
      height: 10px;
      width: 10px;
      margin-left: 5px;
      transform: rotateY(-180deg);
    }
    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .offersBox {
    ${flexCenter}
    margin-top: 5px;
    height: 22px;
    width: 79px;
    text-align: center;
    border: 1px solid ${props => props.theme.grey1};
    font-size: ${props => props.theme.fontSmall};
  }
`
const TabPagination = styled.div`
  width: 100%;
  display: flex;
  align-content: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 57px;
  margin-top: 167px;
  .PageItemBox {
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: row;
    span {
      width: 100%;
      height: 100%;
      ${flexCenter}
    }
    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
    img {
      width: 16px;
      height: 16px;
    }
    .prevIcon {
      margin-right: 14px;
    }
    .nextIcon {
      transform: rotateY(-180deg);
      margin-left: 14px;
    }
  }
`
export { Tabs, MTable, TabPagination, NoMore, Wrapper }
