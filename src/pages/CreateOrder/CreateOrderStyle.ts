import styled from 'styled-components'
import { flexCenter, IBMPlexSansThais } from '../../style'

const MainBox = styled.div`
  ${flexCenter}
`
const CreateBox = styled.div`
  margin-top: 32px;
  width: 1024px;
  position: relative;
  .title {
    font-weight: 700;
    font-size: ${props => props.theme.fontLargest};
    line-height: 40px;
    margin: 0 auto;
  }
  .Link_row {
    position: absolute;
    left: 13px;
    top: 57px;
    width: 124px;
    flex-direction: row;
    ${flexCenter}
    font-weight: 500;
    font-size: ${props => props.theme.fontNormal};
    span {
      font-weight: 500;
      line-height: 24px;
      font-size: 16px;
    }
    img {
      margin-right: 12.8px;
      width: 13.8px;
      height: 14.4px;
    }
    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`
const SelectMain = styled.div`
  margin-top: 87px;
  width: 804px;
  flex-direction: row;
  justify-content: space-between;
  input {
    padding-left: 16px;
    border: 1px solid ${props => props.theme.grey1};
    ::placeholder {
      color: ${props => props.theme.grey1};
    }
  }
  .main_left_btn {
    flex-direction: row;
    button {
      height: 36px;
      width: 182px;
      font-weight: 700;
      font-size: ${props => props.theme.fontNormal};
      line-height: 24px;
    }
  }
  .main_left_select {
    height: 36px;
    width: 364px;
    margin-top: 16px;
  }
  .main_left_ipt {
    height: 36px;
    width: 344px;
    margin-top: 16px;
    input {
      width: 100%;
      height: 100%;
      font-weight: 400;
      font-size: ${props => props.theme.fontSmall};
      line-height: 24px;
    }
  }
  .main_left_toast {
    font-family: ${IBMPlexSansThais};
    width: 366px;
    height: 56px;
    margin-top: 30px;
    padding: 9px 14px;
    color: ${props => props.theme.grey3};
    border: 1px solid ${props => props.theme.grey1};
    font-weight: 400;
    font-size: ${props => props.theme.fontSmall};
    span {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #666666;
    }
  }
  .main_left_img_list_nftClick {
    width: 100%;
    ${flexCenter}
    margin-top: 10px;
    font-weight: 700;
    font-size: ${props => props.theme.fontNormal};
    line-height: 24px;
  }
  .main_left_img {
    width: 100%;
    margin-top: 30px;
    ${flexCenter}
    flex-direction: row;
    .main_left_img_title {
      height: 100%;
      justify-content: flex-end;
      margin-left: 10px;
      font-weight: 400;
      font-size: ${props => props.theme.fontLargest};
      line-height: 20px;
    }
    img {
      height: 157px;
      width: 157px;
    }
  }
  .main_left_img_list {
    width: 364px;
    max-height: 186px;
    overflow-y: scroll;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .main_left_img_box {
      margin-top: 13px;
      .Img {
        width: 80px;
        height: 80px;
      }
      :hover {
        .Img {
          width: 78px;
          height: 78px;
        }
        cursor: pointer;
        border: 1px solid #4c5af1;
      }
      :last-child:nth-child(4n - 2) {
        margin-right: 190px;
      }
      :last-child:nth-child(4n - 1) {
        margin-right: 95px;
      }
    }
    .active_img {
      margin-top: 13px;
      position: relative;
      .Img {
        width: 78px;
        height: 78px;
      }
      .clickImg {
        position: absolute;
        right: 0;
        width: 15px;
        height: 9px;
      }
      :hover {
        cursor: pointer;
      }
      :last-child:nth-child(4n - 2) {
        margin-right: 190px;
      }
      :last-child:nth-child(4n - 1) {
        margin-right: 95px;
      }
      border: 1px solid ${props => props.theme.grey1};
    }
  }

  .main_right {
    .main_right_btn {
      flex-direction: row;
      button {
        height: 36px;
        width: 182px;
        font-weight: 700;
        font-size: ${props => props.theme.fontNormal};
        line-height: 24px;
      }
    }
    .input_box {
      margin-top: 10px;
      .title_text {
        font-weight: 600;
        font-size: ${props => props.theme.fontNormal};
        line-height: 24px;
        margin-top: 25px;
        input {
          margin-top: 8px;
          height: 32px;
          width: 344px;
          font-weight: 400;
          font-size: ${props => props.theme.fontSmall};
          line-height: 24px;
        }
      }
    }
  }
`
const FooterBtn = styled.div`
  ${flexCenter}
  .apr_btn {
    margin-top: 94px;
    button {
      width: 202px;
      height: 36px;
      font-weight: 700;
      font-size: ${props => props.theme.fontNormal};
      line-height: 24px;
    }
  }
`
export { MainBox, CreateBox, SelectMain, FooterBtn }
