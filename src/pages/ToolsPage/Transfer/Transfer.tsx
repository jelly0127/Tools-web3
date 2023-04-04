import { Button, Input, Tooltip, Spin } from 'antd'
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import BackBar from '../../components/BackBar/BackBar'
import CardBox from '../../components/CardBox/CardBox'
import ICON_WHAT from '../../../images/what-icon.svg'
import ICON_EDIT from '../../../images/edit-icon.svg'
import ICON_PLANE from '../../components/TopBox/imgs/plane.svg'
import ICON_LOOK from '../Buy/imgs/look.svg'
import { BackBarBox, RootBox } from './style'
import { isAddressValid, isConnect } from '../../../helpers/utils'
import toast from '../../../components/Toast/Toast'
import Tables from './table'
import { getBalance, getGasCost } from '../../../web3/functions'
import { Contract } from '../../../web3/contract'
import Details from './details'
import { DetailType } from './serve'
import { useImmer } from "use-immer";
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import CONFIG from '../../../config'
const { TextArea } = Input;
let bscProvider = new ethers.providers.JsonRpcProvider(CONFIG.REACT_APP_NETWORK_URL);

import usdtAbi from '../../../web3/abi/ERC20Abi.json'
import testAbi from '../../../web3/abi/test.json'


const Transfer: FC = () => {
  const { account, isActive, provider } = useWeb3React()
  const textAreaRef = useRef<any>('')
  const [Token, setToken] = useState('')
  const [TokenName, setTokenName] = useState('Binance Chain Native Token')
  const [Key, setKey] = useState('')
  const [Amount, setAmount] = useState('')
  const [ShowAddress, setShowAddress] = useState(false)
  const [WalletList, setWalletList] = useState<any>([])
  const [InputAddressList, setInputAddressList] = useState<any>([])
  const [ShowLoading, setShowLoading] = useState(false)
  const [ShowBtnLoading, setShowBtnLoading] = useState(false)
  const [ShowStartLoading, setShowStartLoading] = useState(false)
  const [ShowOrder, setShowOrder] = useState(false)
  const [IsCheck, setIsCheck] = useState(false)
  const [OrderDetails, setOrderDetails] = useImmer<DetailType>({
    network: 'Binance Smart Chain Testnet',
    addressAmount: Amount,
    token: TokenName,
    transferAmount: (WalletList.length * (Amount ? Number(Amount) : 0)).toString(),
    balanceAmount: '',
    gas: '',
  })

  useMemo(async () => {
    setOrderDetails(draft => {
      draft.addressAmount = Amount;
      draft.transferAmount = (WalletList.length * (Amount ? Number(Amount) : 0)).toString();
    })
    if (await ethers.utils.isAddress(Token)) {
      setToken(Token)
      setTokenName(await Contract.usdtContract.name())
    }
  }, [Amount, WalletList, Token])

  const transferBnb = async (balance: string) => {
    setShowStartLoading(true)
    let privateKey = Key //转出地址的私钥
    let wallet = new ethers.Wallet(privateKey, bscProvider)
    for (let i = 0; i < WalletList.length; i++) {
      await wallet.sendTransaction({
        to: WalletList[i].wallet,
        value: ethers.utils.parseEther(balance.toString()),
      }).then(result => {
        toast({ text: 'Transaction successful', type: 'success' })

      }).catch(err => {
        toast({ text: `Transaction failed!`, type: 'error' })
      }).finally(() => {
        setShowStartLoading(false)
      })
    }
  }

  const transferUsdt = async (balance: string) => {
    setShowStartLoading(true)
    let privateKey = Key //转出地址的私钥
    let wallet = new ethers.Wallet(privateKey, bscProvider)
    let usdtContract = new ethers.Contract(Token, usdtAbi, wallet)
    let num = 0
    for (const i of WalletList) {
      const tx = await usdtContract.transfer(i.wallet, ethers.utils.parseEther(balance))
      tx.wait().then((res: any) => {
        num++
        if (num === WalletList.length) {
          setShowStartLoading(false)
          toast({ text: 'Transaction successful', type: 'success' })

        }

      }).catch((err: any) => {
        setShowStartLoading(false)
        return toast({ text: `Transaction failed!`, type: 'error' })
      })

    }

    // const usdtBalance = await Contract.usdtContract.balanceOf('0x53205a406a79ee3d6c8af13b64a0c586e01f5abf');
    // console.log('usdtBalance--', ethers.utils.formatUnits(usdtBalance.toString(), 18));
    // console.log('TESTContract',Contract.TESTContract);

    // const tx = await Contract.TESTContract.transfer(['0x53205a406a79ee3d6c8af13b64a0c586e01f5abf'],
    //   '1', CONFIG.USDT)
    // console.log( '!!!',tx.wait());

  }
  const handleClickStart = async (balance: string) => {
    if (isActive) {
      if (!Key || WalletList.length == 0 || !balance) {
        return toast({ text: `请正确填写参数`, type: 'error' })
      }
      if (!IsCheck) {
        return toast({ text: `请先点击查看订单`, type: 'warning' })
      }

      if (!ShowAddress) {
        return toast({ text: `$请先点击检查订单`, type: 'warning' })
      }

      Token ? transferUsdt(balance) : transferBnb(balance)


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
        if (await !isAddressValid(item)) {
          toast({ text: `${item} \n is invalid`, type: 'error' })
        } else {
          if (Token) {
            dataArray.push({
              'key': item, 'wallet': item,
              'balance': Math.floor(Number((await getBalance(item))) * 100) / 100,
              'othersBalance': Math.floor(Number((ethers.utils.formatUnits(await Contract.usdtContract.balanceOf(item), 18))) * 100) / 100
            })

          } else {
            dataArray.push({ 'key': item, 'wallet': item, 'balance': Math.floor(Number((await getBalance(item))) * 100) / 100 })
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
    if (!Amount || Number(Amount) <= 0) {
      return toast({ text: `请正确填写单个地址发送量`, type: 'error' })
    }
    setShowBtnLoading(true)
    let wallet = new ethers.Wallet(Key, bscProvider)

    if (Token) {
      await Contract.usdtContract.balanceOf(account).then((res: any) => {
        setOrderDetails(draft => {
          draft.balanceAmount = ethers.utils.formatUnits(res, 18);
        })
      }).catch((err: any) => {
        setShowBtnLoading(false)
      })
    } else {
      await getBalance(wallet.address).then((res) => {
        setOrderDetails(draft => {
          draft.balanceAmount = res;
        })
      }).catch(err => {
        setShowBtnLoading(false)
      })
    }


    await getGasCost(account as string, WalletList, '1').then((res: any) => {
      setOrderDetails(draft => {
        draft.gas = res;

      })
    }).catch(err => {
      setShowBtnLoading(false)
    })
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
        {/* <div className='chain_row left'>Mbe Chain</div> */}
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
            <Input placeholder="输入需要发送代币合约，不填默认为当前网络原生币" onChange={(e: any) => { setToken(e.target.value) }} />
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
            <Input placeholder="单个接收钱包的接收数量" onChange={(e: any) => { setAmount(e.target.value) }} />
          </div>
        </div>
      </div>
      <div className='address_row_left'>
        <div className='address_row_text'>
          <div>转出账号的私钥</div>
          <Tooltip title="当前转出账号的私钥">
            <img src={ICON_WHAT} alt="" />
          </Tooltip>
        </div>
        <div className='address_row_input'>
          <Input placeholder="当前转出账号的私钥" onChange={(e: any) => { setKey(e.target.value) }} />
        </div>
      </div>

      <div className='text_row'>
        <div className='text_row_box'>当前批量转账的代币为：
          <span className='text_row_token'>{TokenName}</span>
        </div>
        <div className='text_row_box'>当前单个地址转账的代币数量为：
          <span className='text_row_token'>{Amount}</span>
        </div>
      </div>

      <div className='key_row'>
        <div className='key_row_text'>
          <p>*</p>
          <div className='key_row_red_text'>
            接收代币地址
          </div>
          {ShowAddress ? <div className='key_row_address_text' onClick={() => {
            setShowAddress(false)
            setShowOrder(false)
          }}>
            <img src={ICON_EDIT} alt="" />
            编辑地址</div> : null}
        </div>

        <div className='key_row_TextArea'>{

          ShowAddress ? <Tables data={WalletList} loading={ShowLoading} Token={Token} /> :
            <div>{
              ShowLoading ? <Spin /> : <TextArea placeholder="多个地址请换行" ref={textAreaRef} defaultValue={InputAddressList} />
            }

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
          <Button className='button' onClick={() => handleClickStart(Amount)} loading={ShowStartLoading}>
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