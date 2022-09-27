import styled from 'styled-components'
import { defaultTheme, flexCenter } from '../../style'

const WalletWrapper = styled.div`
  font-weight: 700;
  font-size: ${props => props.theme.fontNormal};
  line-height: 24px;
  ${flexCenter};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 300px;
  padding: 8px;
  border-radius: 2px;
  color: ${defaultTheme.grey1};
  line-height: 19px;
  border: 1px solid ${prop => prop.theme.grey1};
  cursor: pointer;
  background-color: ${prop => prop.theme.grey2};
  .logo {
    width: 16px;
    height: 16px;
  }
  .avatar {
    ${flexCenter};
    margin-right: 10px;
    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
  }
`

const WalletModal = styled.div`
  width: 420px;
  justify-content: center;
  align-items: center;
  margin-top: -18px;
  font-size: ${props => props.theme.fontNormal};
  color: ${props => props.theme.grey1};
  .label {
    align-items: center;
    flex-direction: row;
    padding: 16px 24px;
    margin-top: 18px;
    border: 1px solid #000;
    width: 355.01px;
    height: 47.11px;
    cursor: ${prop => (prop.theme.isDesktop ? 'pointer' : 'none')};
    font-weight: 400;
    :hover {
      background-color: ${defaultTheme.primaryColor};
      color: #fcfcfd;
    }
    .icon {
      width: 36px;
      height: 36px;
      margin-right: 16px;
    }
  }
  .current {
    background-color: ${defaultTheme.primaryColor};
    color: #fcfcfd;
  }
  .content_box {
  }
  .btn_box {
    margin-top: 10px;
    button {
      width: 187px;
    }
  }
  .content {
    padding: 20px 0;
    text-align: center;
    span {
      margin-top: 8px;
      font-size: 14px;
    }
  }
  .img_box {
    margin-top: 16px;
  }
  .img {
    width: 64px;
    height: 64px;
    margin: 0 auto;
  }
`

const AccountModal = styled.div`
  width: 420px;
  ${flexCenter}
  .content {
    position: relative;
    .row {
      font-size: ${defaultTheme.fontNormal};
      color: #101010;
      margin-bottom: 12px;
      .address {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        line-height: 24px;
        margin-bottom: 29px;
        text-decoration: underline;
      }
      .avatar {
        ${flexCenter}
        margin-top: -30px;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
      .copy-icon {
        width: 20px;
        height: 20px;
        margin-left: 12px;
        cursor: ${prop => (prop.theme.isDesktop ? 'pointer' : 'none')};
      }
    }
    .desc {
      color: #999999;
      line-height: 15px;
      margin-bottom: 20px;
    }
  }
  .btnRow {
    button {
      width: 154px;
      border-radius: 2px;
      :first-child {
        margin-right: 20px;
      }
    }
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .label {
    ${flexCenter};
    flex-direction: row;
    justify-content: center;
    border-radius: 8px;
    padding: 16px 0;
    margin-top: 8px;
    cursor: ${prop => (prop.theme.isDesktop ? 'pointer' : 'none')};
    font-weight: 500;
    background: #f4f5f6;
    :hover {
      color: #fcfcfd;
      background-color: ${defaultTheme.primaryColor};
    }
  }
`

const AccountDrawer = styled(AccountModal)`
  padding: 40px 0;
  width: 100%;
  .content {
    align-items: center;
  }
`

export { WalletWrapper, WalletModal, AccountModal, AccountDrawer }
