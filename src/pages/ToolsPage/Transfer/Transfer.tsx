import { Button, Input, Tooltip } from 'antd'
import React, { useEffect, useRef } from 'react'
import BackBar from '../../components/BackBar/BackBar'
import CardBox from '../../components/CardBox/CardBox'
import ICON_WHAT from '../../../images/what-icon.svg'
import ICON_PLANE from '../../components/TopBox/imgs/plane.svg'
import ICON_LOOK from '../Buy/imgs/look.svg'
import { BackBarBox, RootBox } from './style'
const { TextArea } = Input;

const Transfer = () => {
  const inputRef = useRef<any>('')
    function handleClick() {
     const s=inputRef.current.resizableTextArea.textArea.value

    console.log(s.split("\n"));
  }
  useEffect(() => { 
    
  },[])
  const topBox = () => {
    return <>
      <div className='title_row'>
        <div className='line' />支持的网络
      </div>
      <div className='chain_box'>
        <div className='chain_row'>Binance Smart Chain</div>
        <div className='chain_row left'>Mbe Chain</div>
      </div>
      <div className='chain_msg'>
        请切换到对应网络使用钱包进行操作
      </div>

      <div className='address_row'>
        <div className='address_row_left'>
          <div className='address_row_text'>
            <div>发送代币</div>
            <Tooltip title="输入需要发送代币合约，不填默认为当前网络原生币">
              <img src={ICON_WHAT} alt="" />
            </Tooltip>
          </div>
          <div className='address_row_input'>
            <Input placeholder="输入需要发送代币合约，不填默认为当前网络原生币" />
          </div>
        </div>
        <div className='address_row_right'>
          <div className='address_row_text'>
            <div>单个地址发送量</div>
            <Tooltip title="单个接收钱包的接收数量">
              <img src={ICON_WHAT} alt="" />
            </Tooltip>
          </div>
          <div className='address_row_input'>
            <Input placeholder="单个接收钱包的接收数量" />
          </div>
        </div>
      </div>

      <div className='text_row'>
        <div>当前批量转账的代币为：</div>
        <div>当前单个地址转账的代币数量为：</div>
      </div>

      <div className='key_row'>
        <div className='key_row_text'>
          <p>*</p>
          <div className='key_row_red_text'>
            接收代币地址
          </div>
        </div>

        <div className='key_row_TextArea'>
          <TextArea placeholder="多个地址请换行"  ref={inputRef} />
        </div>
      </div>

      <div className='btn_row'>
        <div className='btn_row_box'>
          <Button className='button'>
            <img src={ICON_LOOK} alt="" />
            检查订单</Button>
        </div>
        <div className='btn_row_box left'>
          <Button className='button' onClick={handleClick}>
            <img src={ICON_PLANE} alt="" />
            开始执行</Button>
        </div>
      </div>
    </>
  }
  return (
    <RootBox>
      <BackBarBox>
        <BackBar msg={'批量发送代币'} />
        <CardBox children={topBox()} />
      </BackBarBox>
    </RootBox>
  )
}
export default Transfer