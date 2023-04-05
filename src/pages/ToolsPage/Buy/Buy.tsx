
import React, { useEffect, useRef, useState } from 'react'
import BackBar from '../../components/BackBar/BackBar'
import CardBox from '../../components/CardBox/CardBox';
import { Input, Select, Tooltip, Button, Spin } from 'antd';
import ICON_WHAT from '../../../images/what-icon.svg'
import ICON_LOCK from './imgs/lock.svg'
import ICON_LIST from './imgs/list.svg'
import ICON_SELL from './imgs/sell.svg'
import ICON_EDIT from '../../../images/edit-icon.svg'

import { BackBarBox, RootBox } from './styled';
import Tables from '../../components/Table/Table';
import { ethers } from 'ethers';
import { isAddressValid, isConnect } from '../../../helpers/utils';
import toast from '../../../components/Toast/Toast';
import { useWeb3React } from '@web3-react/core';
import { getBalance } from '../../../web3/functions';
import { Contract } from '../../../web3/contract';
import CONFIG from '../../../config';
const { TextArea } = Input;
let bscProvider = new ethers.providers.JsonRpcProvider(CONFIG.REACT_APP_NETWORK_URL);

const CHAINITEM = [
  { value: 'BNB', label: 'BNB' },
  { value: 'USDT', label: 'USDT' },
  { value: 'BUSD', label: 'BUSD' },
]
const Buy = () => {
  const { account, isActive, provider } = useWeb3React()
  const textAreaRef = useRef<any>('')
  const [Token, setToken] = useState('')
  const [GasPrice, setGasPrice] = useState('')
  const [GasLimit, setGasLimit] = useState('')
  const [BuyAmount, setBuyAmount] = useState('')
  const [ChainValue, setChainValue] = useState('BNB')
  const [ShowAddress, setShowAddress] = useState(false)
  const [ShowLoading, setShowLoading] = useState(false)
  const [WalletList, setWalletList] = useState<any>([])
  const [InputAddressList, setInputAddressList] = useState<any>([])
  const handleChainChange = (value: string) => {
    console.log(`selected ${value}`);
    setChainValue(value)
  };
  // useEffect(() => {
  //   const textAreaData = textAreaRef.current.resizableTextArea.textArea.value
  //   console.log('textAreaData', textAreaData);
  // }, [])
  const handleClickCheck = async () => {
    const textAreaData = textAreaRef.current.resizableTextArea.textArea.value

    if (isActive) {
      if (!textAreaData) {
        return
      }
      setShowLoading(true)
      const set = new Set(textAreaData.split("\n").filter((i: string) => { return i }))
      const addressList = Array.from(set) as [string]
      const dataArray: any = []
      setInputAddressList(textAreaData)
      for (const item of addressList) {
        let wallet = new ethers.Wallet(item, bscProvider)
        if (await !isAddressValid(wallet.address)) {
          return toast({ text: `${wallet.address} \n is invalid`, type: 'error' })
        } else {
          if (Token) {
            dataArray.push({
              'key': item, 'wallet': item,
              'balance': Math.floor(Number((await getBalance(wallet.address))) * 100) / 100,
              'othersBalance': Math.floor(Number((ethers.utils.formatUnits(await Contract.usdtContract.balanceOf(wallet.address), 18))) * 100) / 100
            })
          } else {
            dataArray.push({ 'key': item, 'wallet': wallet.address, 'balance': Math.floor(Number((await getBalance(wallet.address))) * 100) / 100 })
          }
        }
      }
      console.log('dataArray', dataArray);

      setWalletList(dataArray)
      setShowLoading(false)
      return setShowAddress(true)

    } else {
      isConnect(isActive)
    }


  }
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
            <Input placeholder="请输入合约地址" onChange={(e: any) => setToken(e.target.value)} />
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
            {
              ShowAddress ?
                <div className='key_row_red_img' onClick={() => setShowAddress(false)}>
                  <img src={ICON_EDIT} alt="" />
                  编辑私钥
                </div> : <span>（请用小钱包进行使用，使用完及时转移至常用钱包，系统不会上传任何私钥信息）</span>
            }


          </div>
        </div>

        <div >
          {
            ShowAddress ?
              <>
                {WalletList.map((item: any, index: number) => {
                  return (
                    <div className='key_row_walletBox' key={item.key}>
                      <span className='key_row_walletBox_wallet'>钱包{index + 1}：</span>
                      <span className='key_row_walletBox_address'>{item.wallet}</span>
                      <span className='key_row_walletBox_balance'>余额：</span>
                      <span className='key_row_walletBox_value'>{item.balance}</span>
                      <span className='key_row_walletBox_coin'> BNB</span>
                    </div>
                  )
                })

                }
              </>
              :
              <div>{
                ShowLoading ? <Spin /> : <TextArea placeholder="支持批量，一个私钥一行即可" className='key_row_TextArea'
                  defaultValue={InputAddressList}
                  ref={textAreaRef} onBlur={handleClickCheck} />

              }


              </div>
            // <div className='key_row_walletBox'>
            //   <span className='key_row_walletBox_wallet'>钱包1：</span>
            //   <span className='key_row_walletBox_address'>0x3D6f05b597fFB6344FCb8e66130CD0BA92157883</span>
            //   <span className='key_row_walletBox_balance'>余额：</span>
            //   <span className='key_row_walletBox_value'>0.00</span>
            //   <span className='key_row_walletBox_coin'> BNB</span>
            // </div>
          }
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
            <Input placeholder='Gas越高，交易越靠前' defaultValue={7} onChange={(e: any) => setGasPrice(e)} />
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
            <Input placeholder='默认值，一般情况下不用更改' defaultValue={1500000} onChange={(e: any) => setGasLimit(e)} />
          </div>
        </div>
        <div className='gas_price left'>
          <div className='gas_price_text'>
            买入数量
            <Tooltip title='所买入的数量'>
              <img src={ICON_WHAT} alt="" />
            </Tooltip>
          </div>
          <div className='gas_price_input'>
            <Input placeholder='所买入的数量' onChange={(e: any) => setBuyAmount(e)} />
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
            批量买入</Button>
        </div>
      </div>
    </>
  }
  return (
    <RootBox>
      <BackBarBox>
        <BackBar msg={'批量买入'} />
        <CardBox children={topBox()} />
        <div className='tabs_box'>
          <CardBox children={<Tables />} />
        </div>
      </BackBarBox>
    </RootBox>
  )
}
export default Buy
