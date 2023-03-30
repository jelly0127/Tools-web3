import { Button, Input, Select, Tooltip } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import BackBar from '../../components/BackBar/BackBar'
import CardBox from '../../components/CardBox/CardBox'
import ICON_WHAT from '../../../images/what-icon.svg'
import ICON_PLANE from '../../components/TopBox/imgs/plane.svg'
import ICON_LOOK from '../Buy/imgs/look.svg'
import { BackBarBox, RootBox } from './style'
const { TextArea } = Input;
const CHAINITEM = [
  { value: 'Binance Smart Chain', label: 'Binance Smart Chain' },
  { value: 'Matic', label: 'Matic' },
  { value: 'Huobi', label: 'Huobi' },
  { value: 'Mbe Chain', label: 'Mbe Chain' },
]
const Collection = () => {
  const [ChainValue, setChainValue] = useState<string>('Binance Smart Chain')
  const handleChainChange = (value: string) => {
    console.log(`selected ${value}`);
    setChainValue(value)
  };
  const topBox = () => {

    return <>
      <div className='title_row'>
        <div className='line' />支持的网络
      </div>
      <div className='chain_box'>
        <div className='chain_row'>Binance Smart Chain</div>
        <div className='chain_row left'>Matic</div>
        <div className='chain_row left'>Huobi</div>
        <div className='chain_row left'>Mbe Chain</div>
      </div>

      <div className='address_row'>
        <div className='address_row_left'>
          <div className='address_row_text'>
            <div>归并代币</div>
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
            <div>接收代币钱包</div>
            <Tooltip title="接收代币地址">
              <img src={ICON_WHAT} alt="" />
            </Tooltip>
          </div>
          <div className='address_row_input'>
            <Input placeholder="接收代币地址" />
          </div>
        </div>
        <div className='address_row_right'>
          <div className='address_row_text'>
            <div>选择网络</div>
            <Tooltip title="选择网络">
              <img src={ICON_WHAT} alt="" />
            </Tooltip>
          </div>
          <div className='address_row_select'>
            <Select
              value={ChainValue}
              key={ChainValue}
              onChange={handleChainChange}
              options={CHAINITEM}
            />
          </div>
        </div>

      </div>

      <div className='text_row'>
        <div>当前批量转账的代币为：</div>
      </div>

      <div className='key_row'>
        <div className='key_row_text'>
          <p>*</p>
          <div className='key_row_red_text'>
            归并钱包私钥
          </div>
        </div>

        <div className='key_row_TextArea'>
          <TextArea placeholder="支持批量，一个私钥一行即可" />
        </div>
      </div>

      <div className='btn_row'>
        <div className='btn_row_box'>
          <Button className='button'>
            <img src={ICON_LOOK} alt="" />
            检查订单</Button>
        </div>
        <div className='btn_row_box left'>
          <Button className='button'>
            <img src={ICON_PLANE} alt="" />
            开始执行</Button>
        </div>
      </div>
    </>
  }
  return (
    <RootBox>
      <BackBarBox>
        <BackBar msg={'批量归集代币'} />
        <CardBox children={topBox()} />
      </BackBarBox>
    </RootBox>
  )
}
export default Collection