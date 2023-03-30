
import React, { useState } from 'react'
import BackBar from '../../components/BackBar/BackBar'
import CardBox from '../../components/CardBox/CardBox';
import { Input, Select, Tooltip, Button } from 'antd';
import ICON_WHAT from '../../../images/what-icon.svg'
import ICON_LOCK from '../Buy/imgs/lock.svg'
import ICON_LIST from '../Buy/imgs/list.svg'
import ICON_SELL from '../Buy/imgs/sell.svg'
import { BackBarBox, RootBox } from './styled';
import Tables from '../../components/Table/Table';
const { TextArea } = Input;

const CHAINITEM = [
  { value: 'BNB', label: 'BNB' },
  { value: 'USDT', label: 'USDT' },
  { value: 'BUSD', label: 'BUSD' },
]
const Sell = () => {
  const [ChainValue, setChainValue] = useState('BNB')
  const handleChainChange = (value: string) => {
    console.log(`selected ${value}`);
    setChainValue(value)
  };

  const topBox = () => {
    return <>
      <div className='title_row'>
        <div className='line' />支持的网络
      </div>
      <div className='chain_row'>Binance Smart Chain</div>
      <div className='address_row'>
        <div className='address_row_left'>
          <div className='address_row_text'>
            <p>*</p>
            <div>
              合约地址
            </div>
          </div>
          <div className='address_row_input'>
            <Input placeholder="请输入合约地址" />
          </div>
        </div>
        <div className='address_row_right'>
          <div className='address_row_text'>
            <div>选择池子类型</div>
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
        <div>代币简称：-</div>
        <div>池子大小：-</div>
        <div>当前价格：-</div>
      </div>

      <div className='key_row'>
        <div className='key_row_text'>
          <p>*</p>
          <div className='key_row_red_text'>
            私钥
            <span>（请用小钱包进行使用，使用完及时转移至常用钱包，系统不会上传任何私钥信息）</span>
          </div>
        </div>

        <div className='key_row_TextArea'>
          <TextArea placeholder="支持批量，一个私钥一行即可" />
        </div>
      </div>

      <div className='gas_row'>
        <div className='gas_price'>
          <div className='gas_price_text'>
            Gas Price
            <span>(最大消耗0.0105 BNB)</span>
            <Tooltip title='Gas越高，交易越靠前'>
              <img src={ICON_WHAT} alt="" />
            </Tooltip>
          </div>
          <div className='gas_price_input'>
            <Input placeholder='Gas越高，交易越靠前' value={7} />
          </div>
        </div>
        <div className='gas_price left'>
          <div className='gas_price_text'>
            Gas Limit
            <Tooltip title='默认值，一般情况下不用更改'>
              <img src={ICON_WHAT} alt="" />
            </Tooltip>
          </div>
          <div className='gas_price_input'>
            <Input placeholder='默认值，一般情况下不用更改' value={1500000} />
          </div>
        </div>
        <div className='gas_price left'>
          <div className='gas_price_text'>
            卖出数量
            <Tooltip title='所卖出的数量'>
              <img src={ICON_WHAT} alt="" />
            </Tooltip>
          </div>
          <div className='gas_price_input'>
            <Input placeholder='所卖出的数量' />
          </div>
        </div>
      </div>

      <div className='btn_row'>
        <div className='btn_row_box'>
          <Button className='button'>
            <img src={ICON_LIST} alt="" />
            批量查看余额</Button>
        </div>
        <div className='btn_row_box left'>
          <Button className='button'>
            <img src={ICON_LOCK} alt="" />
            批量授权</Button>
        </div>
        <div className='btn_row_box left'>
          <Button className='button'>
            <img src={ICON_SELL} alt="" />
            批量卖出</Button>
        </div>
      </div>
    </>
  }
  return (
    <RootBox>
      <BackBarBox>
        <BackBar msg={'批量卖出'} />
        <CardBox children={topBox()} />
        <div className='tabs_box'>
          <CardBox children={<Tables />} />
        </div>
      </BackBarBox>
    </RootBox>
  )
}
export default Sell
