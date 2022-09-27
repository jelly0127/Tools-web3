import styled from 'styled-components'
import {
  flexCenter,
  IBMPlexSansThaiMaxs,
  IBMPlexSansThais,
  IBMPlexSansThaiSmalls,
  IBMPlexSerifMaxs,
} from '../../style'

const DetailsBox = styled.div`
  width: 1024px;
  padding: 0 20px;
  margin-top: 32px;
  margin: auto;
`
const TitleBox = styled.div`
  ${flexCenter}
  font-size: ${props => props.theme.fontLargest};
  line-height: 40px;
  font-weight: 700;
  margin-top: 17px;
  width: 100%;
`
const LinkBox = styled.div`
  flex-direction: row;
  width: 100%;

  img {
    width: 14.4px;
    height: 13.8px;
    margin-right: 12.8px;
  }
  span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`
const MainBox = styled.div`
  width: 100%;
  margin-top: 24px;
  flex-direction: row;
  padding: 0 100px 0 22px;
  .left {
    .icon {
      width: 230px;
      height: 230px;
    }
    .date {
      margin-top: 14px;

      span:last-child {
        margin-top: 4px;
      }
      .date_title {
        font-family: ${IBMPlexSansThaiMaxs};
        font-weight: 700;
        line-height: 24px;
        font-size: ${props => props.theme.fontNormal};
      }
      .date_number {
        font-family: ${IBMPlexSansThais};

        font-weight: 400;
        font-size: ${props => props.theme.fontNormal};
        line-height: 24px;
        width: 240px;
      }
      .date_number_adr {
        font-family: ${IBMPlexSansThais};

        font-weight: 400;
        font-size: ${props => props.theme.fontNormal};
        line-height: 24px;
        a {
          :hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .right {
    margin-left: 75px;
    .tokenId_box {
      margin-top: 10px;
      flex-direction: row;
      font-weight: 400;
      font-family: ${IBMPlexSansThaiSmalls};
      .tokenId_box_id {
        margin-left: 10px;
      }
    }
    .date {
      span:last-child {
        margin-top: 4px;
      }
      .date_title {
        font-family: ${IBMPlexSansThaiMaxs};
        margin-top: 10px;
        font-weight: 700;
        line-height: 24px;
        font-size: ${props => props.theme.fontNormal};
      }
      .date_number {
        font-family: ${IBMPlexSansThais};
        margin-top: 10px;
        font-weight: 400;
        font-size: ${props => props.theme.fontNormal};
        line-height: 24px;
      }
    }
    .right_box_all {
      width: 554px;
      height: 110px;
      margin-top: 21px;
      justify-content: space-around;
      border: 1px solid ${props => props.theme.grey1};
      .right_box_item_owner {
        margin-bottom: 4px;
      }
      .Owner {
        font-family: ${IBMPlexSansThais};
        margin-left: 34px;
        font-weight: 400;
        font-size: ${props => props.theme.fontSmall};
        line-height: 20px;
        flex-direction: row;
        a {
          :hover {
            text-decoration: underline;
          }
        }
      }
    }
    .right_box {
      ${flexCenter}
      width: 100%;
      height: 110px;
      margin-top: 21px;
      flex-direction: row;
      justify-content: space-around;

      .right_box_item {
        margin-top: -20px;
        .right_box_item_title {
          font-family: ${IBMPlexSerifMaxs};
          font-weight: 700;
          font-size: ${props => props.theme.fontNormal};
          line-height: 24px;
          .right_box_item_title_txt {
          }
          span {
            font-weight: 500;
            line-height: 24px;
            font-size: ${props => props.theme.fontNormal};
          }
        }
        span:last-child {
          margin-top: 12px;
          font-weight: 500;
          font-size: ${props => props.theme.fontNormal};
          line-height: 24px;
        }
      }
    }
    .right_button {
      flex-direction: row;
      margin-top: 32px;
      width: 338px;
      justify-content: space-between;
    }

    .right_button_width {
      button {
        /* margin-top: 90px; */
        width: 158px;
        height: 36px;
      }
    }
    .right_toastBox {
      width: 338px;
      height: 52px;
      padding: 0 10px;
      margin-top: 27px;
      justify-content: center;
      /* text-align: center; */
      flex-wrap: wrap;
      align-content: flex-start;
      border: 1px solid ${props => props.theme.grey1};
      font-weight: 400;
      font-size: ${props => props.theme.fontSmall};
      line-height: 20px;
      font-family: ${IBMPlexSansThais};
    }
    .ExercisedStatusBox {
      width: 100%;
      line-height: 24px;
      flex-direction: row;
      margin-top: 32px;
      color: ${props => props.theme.grey4};

      .statusTxt {
        font-family: ${IBMPlexSansThais};
        ${flexCenter}
        margin-right: 24px;
      }
      .statusExercisedBox {
        ${flexCenter}
        width: 154px;
        height: 36px;
        border: 1px solid ${props => props.theme.grey4};
        color: ${props => props.theme.grey4};
        text-align: center;
        font-weight: 600;
        line-height: 24px;
        border-radius: 2px;
        font-size: ${props => props.theme.fontNormal};
      }
    }

    .UnFilledStatusBox {
      width: 100%;
      line-height: 24px;
      flex-direction: row;
      margin-top: 32px;
      color: ${props => props.theme.grey1};

      .statusTxt {
        ${flexCenter}
        margin-right: 24px;
      }
      .statusUnFilledBox {
        ${flexCenter}
        width: 154px;
        height: 36px;
        border: 1px solid ${props => props.theme.grey1};
        text-align: center;
        font-weight: 600;
        line-height: 24px;
        border-radius: 2px;
        font-size: ${props => props.theme.fontNormal};
      }
    }

    .ActiveStatusBox {
      width: 100%;
      line-height: 24px;
      flex-direction: row;
      margin-top: 32px;
      color: ${props => props.theme.grey5};

      .statusTxt {
        ${flexCenter}
        margin-right: 24px;
      }
      .statusActiveBox {
        ${flexCenter}
        width: 154px;
        height: 36px;
        border: 1px solid ${props => props.theme.grey5};
        text-align: center;
        font-weight: 600;
        line-height: 24px;
        border-radius: 2px;
        font-size: ${props => props.theme.fontNormal};
      }
    }

    .ExpiredStatusBox {
      width: 100%;
      line-height: 24px;
      flex-direction: row;
      margin-top: 32px;
      color: ${props => props.theme.grey6};

      .statusTxt {
        ${flexCenter}
        margin-right: 24px;
      }
      .statusExpiredBox {
        ${flexCenter}
        width: 154px;
        height: 36px;
        border: 1px solid ${props => props.theme.grey6};
        color: ${props => props.theme.grey6};
        text-align: center;
        font-weight: 600;
        line-height: 24px;
        border-radius: 2px;
        font-size: ${props => props.theme.fontNormal};
      }
    }
  }
`
const ModalWindows = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  margin-top: -37px;
  justify-content: space-between;
  padding: 0 32px 53px 32px;
  .item_box {
    margin-top: 26px;

    span {
      font-weight: 600;
      font-size: ${props => props.theme.fontNormal};
      line-height: 24px;
      color: ${props => props.theme.grey1};
    }
    input {
      margin-top: 16px;
      height: 42px;
    }
  }
  .Btn_box {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 18px;
    padding: 0 10px;
    .Btn_box_item {
      width: 154px;
      height: 36px;
      button {
        width: 100%;
        height: 100%;
      }
    }
  }
  .item_title {
    margin-top: 10px;
    width: 100%;
    font-weight: 600;
    font-size: ${props => props.theme.fontNormal};
    color: ${props => props.theme.grey1};
    line-height: 24px;
    ${flexCenter}
  }
  .approve_box {
    height: 100%;
    margin-top: 26px;
    .approve_box_title {
      width: 100%;
      font-weight: 600;
      margin-bottom: 72px;
      font-size: ${props => props.theme.fontNormal};
      color: ${props => props.theme.grey1};
      line-height: 24px;
      ${flexCenter}
    }
    .approve_Btn {
      width: 100%;
      margin-top: 57px;
      ${flexCenter}
      button {
        width: 154px;
        height: 36px;
      }
    }
    .Img {
      width: 80px;
      height: 80px;
      :hover {
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
  .main_left_img_list {
    width: 364px;
    max-height: 186px;
    flex-direction: row;
    overflow: auto;
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
`
const FooterTabBox = styled.div`
  width: 100%;
  margin-top: 46px;
  .footer_title {
    font-family: ${IBMPlexSerifMaxs};
    margin-left: 12px;
    font-weight: 700;
    line-height: 24px;
    font-size: ${props => props.theme.fontNormal};
  }
`
export { DetailsBox, TitleBox, MainBox, LinkBox, ModalWindows, FooterTabBox }
