import styled from 'styled-components';
import { flexCenter } from '../../../style';

const RootBox = styled.div`
position: relative;
 width: 100%;
  height: 100%;
  align-items: center;
  color: ${props => props.theme.grey3};
  .tabs_box{
    margin-top: 30px;
  }
   @keyframes jelly {
  0%,
  100% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
}

`
const BackBarBox = styled.div`
  width:1170px; 
  .title_row{
    flex-direction: row;
    .line{
      border: 1px solid #F95997;
      margin-right: 10px;
    }
  }
  .chain_box{
    flex-direction: row;
  }
  .chain_row{
    color: #F95997;
    background-color: #FDEAF1;
    padding: 10px 15px;
    width: auto;
    text-align: center;
    margin-top: 15px;
    border-radius: 5px;
    font-size: ${props => props.theme.fontSmall};
  }

  .address_row{
    flex-direction: row;
  }
  .address_row_text{
    margin-top: 20px;
    flex-direction: row;
    font-size: 14px;
    p{
      color: #F95997;
      margin-right: 5px;
    }
    img{
      margin-left: 5px;
      width: 14px;
      height: 14px;
    }
  }
  .address_row_input{
    width: 300px;
    margin-top: 10px;
  }
  .address_row_select{
    width: 200px;
    margin-top: 10px;
     div{
      flex-direction: row;
      color: ${props => props.theme.grey3} !important;
    }
    width: 200px;
  }
  .address_row_right{
    margin-left: 15px;
  }
  .text_row{
    color: #ababab;
    color: ${props => props.theme.grey3};
    margin-top: 15px;
    font-size: 14px;
    line-height: 14px;
    div{
      margin-top: 8px;
    }
    .text_row_box{
      flex-direction: row;
    }
    span{
      color:#5495DD;
    }
  }
  .key_row{
    margin-top: 20px;
    font-size: 14px;
   .key_row_text{
    flex-direction: row;
    .key_row_red_text{
      flex-direction: row;
    }
     .key_row_address_text{
      flex-direction: row;
      color: #F95997;
      img{
      width: 14px;
      height: 14px;
      margin-left: 10px;
      margin-right: 5px;
      }
      :hover{
        cursor: pointer;
      }
    }
   }
    
p{
  color: #F95997;
  margin-right: 5px;
}
.key_row_TextArea{
  max-width: 840px;
  textarea{
    min-height: 280px;
  }
}
  }
  .Detail_box{
    width: 820px;
    margin-top: 30px;
  }
  .left{
    margin-left: 10px;
  }
  .btn_row{
    margin-top: 30px;
      flex-direction: row;
font-size: 14px;
    .btn_row_box{
      flex-direction: row;
  .button{
    display: flex;
    flex-direction: row;
    ${flexCenter}
    border: unset;
    padding: 10px 15px;
    background-color: #FDEAF1;
    color:#F95997 !important;
    width: auto;
    border-radius: 5px;
    :hover {
  animation: jelly 0.5s;
}
  }

      img{
        height: 14px;
        width: 14px;
        margin-right: 10px;
      }
    }
  }
`
export {RootBox,BackBarBox }