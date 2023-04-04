import { Button, Input, Select, Spin, Tooltip } from 'antd'
import React, { useMemo, useRef, useState } from 'react'
import BackBar from '../../components/BackBar/BackBar'
import CardBox from '../../components/CardBox/CardBox'
import ICON_WHAT from '../../../images/what-icon.svg'
import ICON_PLANE from '../../components/TopBox/imgs/plane.svg'
import ICON_LOOK from '../Buy/imgs/look.svg'
import { BackBarBox, RootBox } from './style'
import { useWeb3React } from '@web3-react/core'
import toast from '../../../components/Toast/Toast'
import { isAddressValid, isConnect } from '../../../helpers/utils'
import { getBalance } from '../../../web3/functions'
import { ethers } from 'ethers'
import CONFIG from '../../../config'
import Tables from './table'
import { Contract } from '../../../web3/contract'
import ICON_EDIT from '../../../images/edit-icon.svg'
import Details from './details'
import { useImmer } from 'use-immer'
type DetailType = {
  network: string
  address: string
  addressAmount: string
  Token: string
  balanceAmount: string
}
const { TextArea } = Input;
const CHAIN_ITEM = [
  { value: 'Binance Smart Chain', label: 'Binance Smart Chain' }
]
let bscProvider = new ethers.providers.JsonRpcProvider(CONFIG.REACT_APP_NETWORK_URL);

const Collection = () => {
  const [Token, setToken] = useState('')
  const [Address, setAddress] = useState('')
  const [ShowLoading, setShowLoading] = useState(false)
  const [ShowBtnLoading, setShowBtnLoading] = useState(false)
  const [ShowStartLoading, setShowStartLoading] = useState(false)

  const textAreaRef = useRef<any>('')
  const { account, isActive } = useWeb3React()
  const [ShowAddress, setShowAddress] = useState(false)
  const [ShowOrder, setShowOrder] = useState(false)
  const [WalletList, setWalletList] = useState<any>([])
  const [InputAddressList, setInputAddressList] = useState<any>([])
  const [ChainValue, setChainValue] = useState<string>('Binance Smart Chain')
  const [IsCheck, setIsCheck] = useState(false)

  const [OrderDetails, setOrderDetails] = useImmer<DetailType>({
    network: 'Binance Smart Chain Testnet',
    address: Address,
    addressAmount: WalletList.length,
    Token: Token ? Token : 'Binance Chain Native Token',
    balanceAmount: '',
  })
  useMemo(() => {
    setOrderDetails(draft => {
      draft.address = Address;
      draft.addressAmount = WalletList.length
    })

  }, [Address, WalletList])
  const handleChainChange = (value: string) => {
    setChainValue(value)
  };
  const handleClickStart = async () => {
    if (isActive) {
      if (!IsCheck) {
        return toast({ text: `请先点击检查订单`, type: 'warning' })
      }

      if (!ShowAddress) {
        return toast({ text: `$请先点击查看订单`, type: 'warning' })
      }




    } else {
      isConnect(isActive)
    }

  }
  const handleClickCheck = async () => {
    const textAreaData = textAreaRef.current.resizableTextArea.textArea.value
    if (isActive) {
      if (!textAreaData) {
        return toast({ text: `请输入正确的地址`, type: 'error' })
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

      setWalletList(dataArray)
      setShowLoading(false)
      return setShowAddress(true)

    } else {
      isConnect(isActive)
    }


  }
  const handleClickDetail = async () => {
    if (!Address) {
      return toast({ text: `请正确填写接收代币钱包`, type: 'error' })
    }
    setShowBtnLoading(true)
    if (Token) {

      await Contract.usdtContract.balanceOf(account).then((res: any) => {
        setOrderDetails(draft => {
          draft.balanceAmount = ethers.utils.formatUnits(res, 18);
        })
      }).catch((err: any) => {
        setShowBtnLoading(false)
      })
    } else {
      setOrderDetails(draft => {
        draft.balanceAmount = WalletList.reduce(function (c: any, n: any) {
          return c + Number(n.balance)
        }, 0);
      })

    }


    // await getGasCost(account as string, WalletList, '1').then((res:any) => { 
    //    setOrderDetails(draft => {
    //      draft.gas = res;

    //    })
    // }).catch(err => { 
    // setShowBtnLoading(false)
    // })
    setIsCheck(true)
    setShowBtnLoading(false)
    setShowOrder(true)
  }
  const topBox = () => {

    return <>
      <div className='title_row'>
        <div className='line' />支持的网络
      </div>
      <div className='chain_box'>
        <div className='chain_row'>Binance Smart Chain</div>
        {/* <div className='chain_row left'>Matic</div>
        <div className='chain_row left'>Huobi</div>
        <div className='chain_row left'>Mbe Chain</div> */}
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
            <Input placeholder="输入需要发送代币合约，不填默认为当前网络原生币" onChange={(e: any) => setToken(e.target.value)} />
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
            <Input placeholder="接收代币地址" onChange={(e: any) => setAddress(e.target.value)} />
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
              options={CHAIN_ITEM}
            />
          </div>
        </div>

      </div>

      <div className='text_row'>
        <div className='text_row_box'>当前批量转账的代币为：
          <span> Binance Chain Native Token</span>
        </div>
      </div>

      <div className='key_row'>
        <div className='key_row_text'>
          <p>*</p>
          <div className='key_row_red_text'>
            归并钱包私钥
          </div>
          {ShowAddress ? <div className='key_row_address_text' onClick={() => {
            setShowAddress(false)
            setShowOrder(false)
          }}>
            <img src={ICON_EDIT} alt="" />
            编辑地址</div> : null}
        </div>

        <div className='key_row_TextArea'>
          {
            ShowAddress ? <Tables data={WalletList} loading={ShowLoading} Token={Token} /> :
              <div>
                {ShowLoading ? <Spin /> : <TextArea placeholder="支持批量，一个私钥一行即可" ref={textAreaRef} defaultValue={InputAddressList} />}
              </div>
          }
        </div>
      </div>
      <div className='Detail_box'>
        {ShowOrder ? <Details data={OrderDetails} /> : null}
      </div>
      <div className='btn_row'>
        <div className='btn_row_box'>
          {
            !ShowAddress ? <Button className='button' onClick={handleClickCheck}>
              <img src={ICON_LOOK} alt="" />
              检查订单</Button> :
              <Button className='button' onClick={handleClickDetail} loading={ShowBtnLoading}>
                <img src={ICON_LOOK} alt="" />
                查看订单</Button>
          }
        </div>
        <div className='btn_row_box left'>
          <Button className='button' onClick={() => handleClickStart()} loading={ShowStartLoading}>
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