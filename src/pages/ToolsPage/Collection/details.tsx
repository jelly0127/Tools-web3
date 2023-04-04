import { Tooltip } from 'antd'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import ICON_WHAT from '../../../images/what-icon.svg'
import { getBalance } from '../../../web3/functions'

const RootBox = styled.div`
background-color: #FAFAFA;
padding: 20px 10px;
.top_box{
  flex-direction: row;

  .top_box_line{
    border: .5px solid #F95997;
    margin:0 10px;
  }
}
.bottom_box{
  font-size: 14px;
  padding: 10px;
  line-height: 14px;
  
}
.bottom_item_box{
  flex-direction: row;
  margin-top: 10px;
}
.bottom_item_box_msg{
  color:#5495DD;
}
.red{
  color: #F95997;
}
.bottom_item_box_gas{
  display: flex;
  flex-direction: row;
  img{
    width: 14px;
    height: 14px;
    margin: 0 5px;
  }
}
`

const Details = (props: any) => { 
  const { network, addressAmount, address,Token,balanceAmount } = props.data
  return (
    <RootBox>
      <div className='top_box'>
        <div className='top_box_line'/>
        订单详情
      </div>
      <div className='bottom_box'>
        <div className='bottom_item_box'>
          <span>当前网络：</span>
          <span className='bottom_item_box_msg'>{ network}</span>
        </div>
        <div className='bottom_item_box'>
          <span>当前接收钱包：</span>
          <span className='bottom_item_box_msg'>{ address}</span>
        </div>
        <div className='bottom_item_box'>
          <span>当前批量归集的有效地址数量：</span>
          <span className='bottom_item_box_msg'>{ addressAmount}</span>
        </div>
        <div className='bottom_item_box'>
          <span>当前批量归集的代币：</span>
          <span className='bottom_item_box_msg'>{ Token}</span>
        </div>
        <div className='bottom_item_box'>
          <span>当前批量归集的代币总数量：</span>
          <span className='bottom_item_box_msg'> {balanceAmount}</span>
         
        </div>
        {/* <div className='bottom_item_box'>
          <span className='bottom_item_box_gas'>预计消耗GAS(含手续费)
                <Tooltip title="实际GAS费用由网络矿工费决定">
              <img src={ICON_WHAT} alt="" />
            </Tooltip>
            ：</span>
          <span className='bottom_item_box_msg'>{ gas}</span>
        </div> */}
      </div>
    </RootBox>
  )
 }
export default Details
