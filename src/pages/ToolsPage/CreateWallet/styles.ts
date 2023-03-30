import styled from 'styled-components';
import { flexCenter } from '../../../style';

const RootBox = styled.div`
position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
`
const BackBarBox = styled.div`
  width:1170px; 
  .bottom_box{
  margin-top: 20px;
 }
 .wallet_box{
  margin-top: 20px;
  padding: 20px;
  background-color: #F6FAFC;
  color: #1E83BC;
  font-size: 14px;
  img{
    margin-left: 10px;
    height: 16px;
    width: 16px;
    :hover{
      cursor: pointer;
    }
  }
  .wallet_box_address{
    flex-direction: row;
  }
  .wallet_box_key{
    margin-top: 30px;
    flex-direction: row;
  }
 }
`
const TopCardBox = styled.div`
  .text{
    color:${props => props.theme.grey3 };
    font-size: ${props => props.theme.fontSmall};
    margin-top: 16px;
  }
  .inputRow{
    margin-top: 16px;
    flex-direction: row;

    input{
      width: 180px;
    }
  }
  .btn_box{
    flex-direction: row;
    margin-left: 10px;
 button{
    width: 86px;
    height: 32px;
    border-radius: 5px;
    background-color: #FDEAF1;
    font-weight: 500;
    font-size: ${props=>props.theme.fontSmall};
    color:#F95997 !important;
    ${flexCenter}
   }
   .btn_box_right{
    margin-left: 10px;

   }
  }
 
`

export  {
  RootBox,BackBarBox,TopCardBox
}