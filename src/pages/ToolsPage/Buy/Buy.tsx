
import React, { useEffect, useMemo, useRef, useState } from 'react'
import BackBar from '../../components/BackBar/BackBar'
import CardBox from '../../components/CardBox/CardBox';
import { Input, Select, Tooltip, Button, Spin } from 'antd';
import ICON_WHAT from '../../../images/what-icon.svg'
import ICON_LOCK from './imgs/lock.svg'
import ICON_LIST from './imgs/list.svg'
import ICON_SELL from './imgs/sell.svg'
import ICON_EDIT from '../../../images/edit-icon.svg'
import { Contract } from '../../../web3/contract'
import { BackBarBox, RootBox } from './styled';
import Tables from '../../components/Table/Table';
import { BigNumber, ethers } from 'ethers';
import { isAddressValid, isConnect } from '../../../helpers/utils';
import toast from '../../../components/Toast/Toast';
import { useWeb3React } from '@web3-react/core';
import { getBalance } from '../../../web3/functions';
import CONFIG from '../../../config';
import usdtAbi from '../../../web3/abi/ERC20Abi.json'
const { TextArea } = Input;
let bscProvider = new ethers.providers.JsonRpcProvider(CONFIG.REACT_APP_NETWORK_URL);

const CHAINITEM = [
  { value: 'BNB', label: 'BNB' },
  { value: 'USDT', label: 'USDT' },
  { value: 'BUSD', label: 'BUSD' },
  { value: 'UBSD', label: 'UBSD' },
]
const OPTION = '买入'
const Buy = () => {
  const { account, isActive, provider } = useWeb3React()
  const textAreaRef = useRef<any>('')
  const [Token, setToken] = useState('')
  const [GasPrice, setGasPrice] = useState('')
  const [GasLimit, setGasLimit] = useState('')
  const [BuyAmount, setBuyAmount] = useState('')
  const [ChainValue, setChainValue] = useState('BNB')
  const [TokenName, setTokenName] = useState('BNB')
  const [ShowAddress, setShowAddress] = useState(false)
  const [ShowLoading, setShowLoading] = useState(false)
  const [ShowApproveLoading, setShowApproveLoading] = useState(false)
  const [ShowBuyLoading, setShowBuyLoading] = useState(false)
  const [IsApprove, setIsApprove] = useState(false)
  const [WalletList, setWalletList] = useState<any>([])
  const [InputAddressList, setInputAddressList] = useState<any>([])
  const [TableDetails, setTableDetails] = useState()
  //买路由
  const buyPathU = [Token, CONFIG.TOKEN] //交易路由
  const buyPathB = [CONFIG.WETH, CONFIG.TOKEN]
  const buyPathBU = [CONFIG.WETH, Token, CONFIG.TOKEN]
  const buyPathUB = [Token, CONFIG.WETH, CONFIG.TOKEN]
  //路由过滤
  const filterPath = (path: string) => {
    let nameList = [
      { name: 'BNB', value: buyPathB },
      { name: 'USDT', value: buyPathU },
      { name: 'BUSDT', value: buyPathBU },
      { name: 'UBSDT', value: buyPathUB },
    ]
    for (const i of nameList) {
      if (path == i.name) return i.value
    }
  }
  //合并表单数据
  const mergeData = () => {
    let arr: any = []
    for (let i = 0; i < WalletList.length; i++) {
      arr.push(Object.assign({}, WalletList[i], { 'coinType': TokenName, 'approveAmount': Number(BuyAmount), 'option': OPTION, }));
    }
    return setTableDetails(arr)
  }
  useMemo(async () => {
    if (await ethers.utils.isAddress(Token)) {
      const coinContract = new ethers.Contract(Token, usdtAbi, bscProvider)
      setTokenName(await coinContract.name())
    }
    setIsApprove(false)
  }, [Token, WalletList])
  const handleChainChange = (value: string) => {
    setChainValue(value)
  }

  const handleClickCheck = async () => {
    await setShowAddress(false)
    const textAreaData = textAreaRef?.current?.resizableTextArea?.textArea?.value
    if (isActive) {
      if (!textAreaData) {
        return toast({ text: `请输入私钥`, type: 'error' })
      }
      setShowLoading(true)
      const set = new Set(textAreaData.split("\n").filter((i: string) => { return i }))
      const addressList = Array.from(set) as [string]
      const dataArray: any = []
      setInputAddressList(textAreaData)
      try {
        for (const item of addressList) {
          let wallet = new ethers.Wallet(item, bscProvider)
          const Contracts = new ethers.Contract(Token, usdtAbi, bscProvider)

          if (await !isAddressValid(wallet.address)) {
            return toast({ text: `${wallet.address} \n is invalid`, type: 'error' })
          }
          dataArray.push({
            'key': item, 'wallet': wallet.address,
            'balance': Math.floor(Number(((await ethers.utils.isAddress(Token)) ? (ethers.utils.formatUnits(await Contracts.balanceOf(wallet.address), 18)) : await getBalance(wallet.address))) * 100) / 100,
          })
        }
      } catch (error) {
        console.log(error);
        toast({ text: `${textAreaData} \n is invalid`, type: 'error' })
      }

      console.log('dataArray', dataArray);

      setWalletList(dataArray)
      setShowLoading(false)
      return setShowAddress(true)

    } else {
      isConnect(isActive)
    }


  }
  // useMemo(async () => {
  //   await handleClickCheck()
  // }, [Token])
  const Approve = async (privateKey: string, path: Array<string>, amountIn: string) => {
    let wallet = new ethers.Wallet(privateKey, bscProvider);
    let contract = new ethers.Contract(path[0], usdtAbi, bscProvider)
    let ErcSigner = contract.connect(wallet)
    let amo = ethers.utils.parseEther(amountIn)
    return await ErcSigner.approve(CONFIG.PANCAKE_ADDRESS, amo)

  }

  // 授权
  const handleApproveClick = (path: string) => {
    if (WalletList.length === 0) {
      return toast({ text: `请输入私钥`, type: 'error' })
    }
    if (!BuyAmount) {
      return toast({ text: `请输入数量`, type: 'error' })
    }

    let num = 0
    setShowApproveLoading(true)
    for (const i of WalletList) {
      Approve(i.key, filterPath(path) as string[], BuyAmount).then(res => {
        num++
        console.log('ApproveUSDT', res);
        if (num === WalletList.length) {
          setShowApproveLoading(false)
          setIsApprove(true)
          toast({ text: 'Approve successful', type: 'success' })


        }
      }).catch(err => {
        setShowApproveLoading(false)

        return toast({ text: `Approve failed! /n ${err}`, type: 'error' })

      })

    }

  }
  // 卖
  const handleBuyClick = (path: string) => {
    if (WalletList.length === 0) {
      return toast({ text: `请输入私钥`, type: 'error' })
    }
    if (!BuyAmount) {
      return toast({ text: `请输入数量`, type: 'error' })
    }
    if (!IsApprove) {
      return toast({ text: `请先授权`, type: 'error' })

    }
    let num = 0
    setShowBuyLoading(true)
    for (const i of WalletList) {
      if (ChainValue == 'UDST') {
        return swapU(i.key, filterPath(path) as string[], BuyAmount).then(res => {
          num++
          console.log('BuyUSDT', res);
          if (num === WalletList.length) {
            setShowBuyLoading(false)
            toast({ text: 'Transaction successful', type: 'success' })
            mergeData()

          }
        }).catch(err => {
          setShowBuyLoading(false)
          console.log(err);
          return toast({ text: `Transaction failed! /n ${err}`, type: 'error' })

        })
      }
      if (ChainValue == 'BNB') {
        return swapB(i.key, filterPath(path) as string[], BuyAmount).then(res => {
          num++
          console.log('BuyBNB', res);
          if (num === WalletList.length) {
            setShowBuyLoading(false)
            toast({ text: 'Transaction successful', type: 'success' })
            mergeData()

          }
        }).catch(err => {
          setShowBuyLoading(false)
          console.log('BNB', err);
          return toast({ text: `Transaction failed! /n ${err}`, type: 'error' })

        })
      }
      if (ChainValue == 'UBSD') {
        return swapUB(i.key, filterPath(path) as string[], BuyAmount).then(res => {
          num++
          console.log('UBSD', res);
          if (num === WalletList.length) {
            setShowBuyLoading(false)
            toast({ text: 'Transaction successful', type: 'success' })
            mergeData()

          }
        }).catch(err => {
          setShowBuyLoading(false)
          console.log('UBSD', err);
          return toast({ text: `Transaction failed! /n ${err}`, type: 'error' })

        })
      }
      if (ChainValue == 'BUSD') {
        return swapBU(i.key, filterPath(path) as string[], BuyAmount).then(res => {
          num++
          console.log('BUSD', res);
          if (num === WalletList.length) {
            setShowBuyLoading(false)
            toast({ text: 'Transaction successful', type: 'success' })
            mergeData()

          }
        }).catch(err => {
          setShowBuyLoading(false)
          console.log('BUSD', err);
          return toast({ text: `Transaction failed! /n ${err}`, type: 'error' })

        })
      }

    }
  }

  // usdt 批量买
  async function swapU(privateKey: string, path: Array<string>, amountIn: string) {
    let wallet = new ethers.Wallet(privateKey, bscProvider);
    let signer = Contract.pancakeContract.connect(wallet);
    // let contract = new ethers.Contract(path[0], usdtAbi, bscProvider)
    // let ErcSigner = contract.connect(wallet)
    let date = parseInt((new Date().getTime() / 1000).toString()) + 600
    let amo = ethers.utils.parseEther(amountIn)

    let override = {
      gasPrice: ethers.utils.parseEther("0.000000010"),
      gasLimit: 500000,
    }

    const tx = await signer.swapExactTokensForTokens(amo, "0", path, wallet.address, date, override)
    return tx.wait()

  }
  // ub 批量买
  async function swapUB(privateKey: string, path: Array<string>, amountIn: string) {
    let wallet = new ethers.Wallet(privateKey, bscProvider);
    let signer = Contract.pancakeContract.connect(wallet);
    // let contract = new ethers.Contract(path[0], usdtAbi, bscProvider)
    // let ErcSigner = contract.connect(wallet)
    let date = parseInt((new Date().getTime() / 1000).toString()) + 600
    let amo = ethers.utils.parseEther(amountIn)

    let override = {
      gasPrice: ethers.utils.parseEther("0.000000010"),
      gasLimit: 500000,
    }

    const tx = await signer.swapExactTokensForTokens(amo, "0", path, wallet.address, date, override)
    return tx.wait()

  }
  // bu 批量买
  async function swapBU(privateKey: string, path: Array<string>, amountIn: string) {
    let wallet = new ethers.Wallet(privateKey, bscProvider);
    let signer = Contract.pancakeContract.connect(wallet);
    // let contract = new ethers.Contract(path[0], usdtAbi, bscProvider)
    // let ErcSigner = contract.connect(wallet)
    let date = parseInt((new Date().getTime() / 1000).toString()) + 600
    let amo = ethers.utils.parseEther(amountIn)

    let override = {
      gasPrice: ethers.utils.parseEther("0.000000010"),
      gasLimit: 500000,
    }

    const tx = await signer.swapExactTokensForTokens(amo, "0", path, wallet.address, date, override)
    return tx.wait()

  }
  //bnb 批量买
  async function swapB(privateKey: string, path: Array<string>, amountIn: string) {
    let wallet = new ethers.Wallet(privateKey, bscProvider);
    let signer = Contract.pancakeContract.connect(wallet);
    let date = parseInt((new Date().getTime() / 1000).toString()) + 600
    let contract = new ethers.Contract(path[0], usdtAbi, bscProvider)
    let ErcSigner = contract.connect(wallet)
    let amo = ethers.utils.parseEther(amountIn.toString())
    if (Number(amountIn) === 0) {
      amo = await ErcSigner.balanceOf(wallet.address)
    }

    let amount = await Contract.pancakeContract.getAmountsOut(amo, path)
    let gap = BigNumber.from('49')
    let percent = BigNumber.from('100')
    let temp = amount[path.length - 1].mul(gap).div(percent)
    let amountStr = temp.toString()
    // bnb买
    {
      let override = {
        value: ethers.utils.parseEther(amountIn.toString()),
        gasPrice: ethers.utils.parseEther("0.000000006"),
        gasLimit: 300000,
      }

      return await signer.swapExactETHForTokens(amountStr, path, wallet.address, date, override)
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
                      <span className='key_row_walletBox_coin'> {TokenName ? TokenName : ChainValue}</span>
                    </div>
                  )
                })
                }
              </>
              :
              <div>{
                ShowLoading ? <Spin /> : <TextArea placeholder="支持批量，一个私钥一行即可" className='key_row_TextArea'
                  defaultValue={InputAddressList}
                  ref={textAreaRef}
                  onBlur={handleClickCheck}
                />
              }
              </div>
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
            <Input placeholder='Gas越高，交易越靠前' defaultValue={7} onChange={(e: any) => setGasPrice(e.target.value)} />
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
            <Input placeholder='默认值，一般情况下不用更改' defaultValue={1500000} onChange={(e: any) => setGasLimit(e.target.value)} />
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
            <Input placeholder='所买入的数量' onChange={(e: any) => setBuyAmount(e.target.value)} />
          </div>
        </div>
      </div>

      <div className='btn_row'>
        <div className='btn_row_box'>
          <Button className='button' onClick={handleClickCheck} loading={ShowLoading}>
            <img src={ICON_LIST} alt="" />
            批量查看余额</Button>
        </div>
        <div className='btn_row_box left'>
          <Button className='button' onClick={() => handleApproveClick(ChainValue)} loading={ShowApproveLoading}>
            <img src={ICON_LOCK} alt="" />
            批量授权</Button>
        </div>
        <div className='btn_row_box left'>
          <Button className='button' onClick={() => handleBuyClick(ChainValue)} loading={ShowBuyLoading}>
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
          <CardBox children={<Tables data={TableDetails} loading={false} />} />
        </div>
      </BackBarBox>
    </RootBox>
  )
}
export default Buy
