import React, { useEffect, useState } from 'react'
import LinkBar from '../components/LinkBar'
import FrameIcon from '../../images/frame-icon.png'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import LoadingButton from '../../components/LoadingButton'
import Select from '../../components/Select'
import clickImg from '../../images/group-icon.png'
import { MainBox, CreateBox, SelectMain, FooterBtn } from './CreateOrderStyle'
import { getMethods } from '../../http'
import { useWeb3React } from '@web3-react/core'
import CONFIG from '../../config'
import { OpSwap_ABI, Weth_ABI, TestNFT_ABI } from '../../web3/abi'
import { BigNumberFromDays, BigNumberFrom, walletTips } from '../../helpers/utils'
import { useAppDispatch } from '../../helpers/hooks'
import {
  contractMethodOpswap,
  txPromise,
  useContract,
  contractMethodWeth,
  contractMethodMint,
} from '../../web3/functions'
import message from '../../components/Message/Message'
import toast from '../../components/Toast/Toast'
import { UpdateDefaultTokenUri } from '../../redux/reducer'
import { switchChain } from '../../web3/chain'

const CreateOrder: React.FC = () => {
  const { provider, account, chainId, connector } = useWeb3React()
  const navigate = useNavigate()
  const [type, setType] = useState<any>()
  const dispatch = useAppDispatch()
  const [inputVal, setInputVal] = useState<string>('')
  const [idInput, setIdInput] = useState<any>(type)
  const [StrikeVal, setStrikeVal] = useState('')
  const [PremiumVal, setPremiumVal] = useState('')
  const [DurationVal, setDurationVal] = useState('')
  const [leftBtnValue, setLeftBtnValue] = useState<string>('Specified')
  const [rightBtnValue, setRightBtnValue] = useState<string>('Call')
  const [NftList, setNftList] = useState<any>([])
  const OpSwapContract = useContract(CONFIG.OPSWAP_ADDRESS, OpSwap_ABI, true)
  const WethContract = useContract(CONFIG.WETH_ADDRESS, Weth_ABI, true)
  const TestNFTContract = useContract(CONFIG.TESTNFT_ADDRESS, TestNFT_ABI, true)
  const [clickNFT, setClickNFT] = useState<any>([])
  const [approve, setApprove] = useState(false)
  const [BtnLoading, setBtnLoading] = useState(false)
  const [TokenIdList, setTokenIdList] = useState<any>('')
  const onChainSelect = async () => {
    if (!account) {
      setBtnLoading(false)
      return walletTips()
    }
    if (chainId !== 80001) {
      setBtnLoading(false)
      await switchChain(connector, 80001).catch(() => {
        toast({ text: 'Something Wrong.Please try again', type: 'error' })
      })
    }
  }
  const filterFloorTokenTokenId = () => {
    if (leftBtnValue === 'Unspecified' && rightBtnValue === 'Put') return clickNFT
    if (leftBtnValue === 'Unspecified' && rightBtnValue === 'Call') return []
    if (leftBtnValue === 'Specified' && rightBtnValue === 'Call') return [idInput]
    if (leftBtnValue === 'Specified' && rightBtnValue === 'Put') return [idInput]
  }
  const filterNFTclickNumber = () => {
    if (leftBtnValue === 'Unspecified' && rightBtnValue === 'Put') return Number(idInput)
    if (leftBtnValue === 'Unspecified' && rightBtnValue === 'Call') return Number(idInput)
    if (leftBtnValue === 'Specified' && rightBtnValue === 'Call') return 1
    if (leftBtnValue === 'Specified' && rightBtnValue === 'Put') return 1
  }
  const FloorToken = [
    leftBtnValue === 'Unspecified' && rightBtnValue === 'Put'
      ? NftList[0]?.token_address
      : TokenIdList.token_address,
    filterFloorTokenTokenId(),
    filterNFTclickNumber(),
    leftBtnValue === 'Specified',
  ]

  const handleCreateOrder = async () => {
    if (!type || !StrikeVal || !PremiumVal || !DurationVal)
      return toast({ text: 'Please enter parameters', type: 'error' })
    if (Number(DurationVal) < 1)
      return toast({ text: 'Duration Time must be greater than 1 day', type: 'error' })
    onChainSelect()
    setBtnLoading(true)
    let isCall = false
    rightBtnValue === 'Call' ? (isCall = true) : (isCall = false)
    await contractMethodOpswap(OpSwapContract!, 'createOrder', [
      isCall,
      BigNumberFrom(Number(StrikeVal)),
      BigNumberFrom(Number(PremiumVal)),
      BigNumberFromDays(Number(DurationVal)),
      FloorToken,
    ])
      .then(result => {
        message({
          messagePromose: new Promise((resolve, reject) => {
            result
              .wait()
              .then(async (res: any) => {
                const { transactionHash } = res
                await txPromise(provider!, transactionHash)
                setBtnLoading(false)
                setApprove(false)
                navigate(-1)
                resolve('success')
              })
              .catch((e: any) => {
                console.log(e)
                reject(e)
              })
          }),
        })
      })
      .catch((err: { reason: any }) => {
        console.log(err)
        setBtnLoading(false)
        toast({ text: err.reason || err, type: 'error' })
      })
  }

  const handleApprove = () => {
    onChainSelect()
    setBtnLoading(true)
    contractMethodWeth(
      WethContract!,
      'approve',
      [CONFIG.OPSWAP_ADDRESS, BigNumberFrom(Number(StrikeVal) + Number(PremiumVal))],
      false,
    )
      .then(result => {
        message({
          messagePromose: new Promise((resolve, reject) => {
            result
              .wait()
              .then(async (res: any) => {
                const { transactionHash } = res
                await txPromise(provider!, transactionHash)
                setApprove(true)
                setBtnLoading(false)
                resolve('success')
              })
              .catch((e: any) => {
                console.log(e)
                reject(e)
              })
          }),
        })
      })
      .catch((err: { reason: any }) => {
        console.log(err)
        setBtnLoading(false)
        toast({ text: err.reason || err, type: 'error' })
      })
  }

  const handlePutApprove = () => {
    handleApprove()
    setBtnLoading(true)
    contractMethodMint(
      TestNFTContract!,
      rightBtnValue === 'Put' && leftBtnValue === 'Unspecified' ? 'setApprovalForAll' : 'approve',
      rightBtnValue === 'Put' && leftBtnValue === 'Unspecified'
        ? [CONFIG.OPSWAP_ADDRESS, true]
        : [CONFIG.OPSWAP_ADDRESS, idInput],
      false,
    ).then(result => {
      message({
        messagePromose: new Promise((resolve, reject) => {
          result
            .wait()
            .then(async (res: any) => {
              const { transactionHash } = res
              await txPromise(provider!, transactionHash)
              setApprove(true)
              setBtnLoading(false)
              resolve('success')
            })
            .catch((e: any) => {
              console.log(e)
              setBtnLoading(false)
              setApprove(false)
              reject(e)
            })
        }),
      }).catch((err: { reason: any }) => {
        console.log(err)
        setBtnLoading(false)
        toast({ text: err.reason || err, type: 'error' })
      })
    })
  }

  const Approve = () => {
    if (!StrikeVal || !PremiumVal || !DurationVal)
      return toast({ text: 'Please enter parameters', type: 'error' })
    if (!type) return toast({ text: 'Please Select Nfts Collection ', type: 'error' })
    if (leftBtnValue === 'Unspecified' && rightBtnValue === 'Put' && clickNFT.length === 0)
      return toast({ text: 'Please select token', type: 'error' })
    onChainSelect()
    return rightBtnValue === 'Put' ? handlePutApprove() : handleApprove()
  }
  const changeLeftSelect = (item: any) => {
    setLeftBtnValue(item === 'Unspecified' ? 'Unspecified' : 'Specified')
    setApprove(false)
    setIdInput('')
  }
  const changeRightSelect = (item: any) => {
    setRightBtnValue(item === 'Put' ? 'Put' : 'Call')
  }
  const filterClickNFT = () => {
    const arr: any = []
    const UnSpecifiedClickArr: any = []
    NftList.forEach((i: any) => {
      if (i.check === true) {
        arr.push(i.token_id)
        UnSpecifiedClickArr.push(i)
      }
    })

    setClickNFT(arr)
  }
  const changeNftSelect = (id: number) => {
    if (clickNFT.length === Number(idInput)) {
      NftList.forEach((i: any) => {
        if (i.token_id === id) {
          i.check = false
        }
      })
    } else {
      NftList.forEach((i: any) => {
        if (i.token_id === id) {
          i.check = !i.check
        }
      })
    }

    setNftList(JSON.parse(JSON.stringify(NftList)))
    filterClickNFT()
  }

  const AddCheck = (res: any) => {
    if (res) {
      const obj = res
      const check = {
        check: false,
      }
      obj.forEach((i: any) => {
        Object.assign(i, check)
      })
      setNftList(obj)
    }
  }
  const getCollection = () => {
    let urls = ''
    inputVal === ''
      ? (urls = `https://deep-index.moralis.io/api/v2/${account}/nft?chain=mumbai&format=decimal&token_addresses=${'0x8e910bd1abc20ff064cc8f889c40a5f7f591c47f'}`)
      : (urls = `https://deep-index.moralis.io/api/v2/${account}/nft?chain=mumbai&format=decimal&token_addresses=${String(
          inputVal,
        )}`)
    getMethods(urls)
      .then(res => {
        AddCheck(res.result)
        dispatch(UpdateDefaultTokenUri(String(res.result[0]?.token_uri)))
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  const getTokenId = () => {
    let url = ''
    inputVal === ''
      ? (url = `https://deep-index.moralis.io/api/v2/nft/0x8e910bd1abc20ff064cc8f889c40a5f7f591c47f/${idInput}?chain=mumbai&format=decimal`)
      : (url = `https://deep-index.moralis.io/api/v2/nft/${String(
          inputVal,
        )}/${idInput}?chain=mumbai&format=decimal`)
    if (idInput) {
      getMethods(url)
        .then(res => {
          setTokenIdList(res)
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  }
  const handleSelect = (data: string) => {
    setType(data)
  }
  const handleInput = (data: string) => {
    setInputVal(data)
  }
  useEffect(() => {
    getCollection()
  }, [inputVal])
  useEffect(() => {
    getTokenId()
  }, [idInput])
  useEffect(() => {}, [NftList, clickNFT])

  return (
    <MainBox>
      <LinkBar />
      <CreateBox>
        <div className="title">
          <span>Create Order</span>
        </div>
        <div className="Link_row" onClick={() => navigate(-1)}>
          <img src={FrameIcon} alt="" />
          <span>Back to list</span>
        </div>
      </CreateBox>
      <SelectMain>
        <div className="main_left">
          <div className="main_left_btn">
            <Button
              primary={leftBtnValue === 'Specified'}
              text="Specified"
              onClick={() => changeLeftSelect('Specified')}
            />
            <Button
              primary={leftBtnValue === 'Unspecified'}
              text="Unspecified"
              onClick={() => changeLeftSelect('Unspecified')}
            />
          </div>
          <div className="main_left_select">
            <Select
              value={type}
              setValue={handleSelect}
              placeholder="Nfts collection"
              setAddressVal={handleInput}
              AddressVal={inputVal}
            />
          </div>
          <div className="main_left_ipt">
            <input
              type="number"
              min="0"
              title=""
              autoComplete="off"
              value={idInput}
              onChange={e => setIdInput(e.target.value)}
              placeholder={leftBtnValue === 'Specified' ? 'Enter Token ID' : 'Enter amount of NFTs'}
            />
          </div>
          {idInput > 0 && type ? (
            <div className="main_left_img_Box">
              <div className="main_left_img">
                {leftBtnValue === 'Unspecified' && rightBtnValue === 'Put' ? (
                  ''
                ) : (
                  <img src={TokenIdList.token_uri} alt="" />
                )}
                {leftBtnValue === 'Unspecified' && rightBtnValue === 'Call' ? (
                  <div className="main_left_img_title">x{idInput}</div>
                ) : (
                  ''
                )}
              </div>
            </div>
          ) : (
            ''
          )}
          {leftBtnValue === 'Unspecified' && !idInput ? (
            <div className="main_left_toast">
              <span>A unspecified NFT which means you can trade options with</span>
              <span>any NFTs in the collection.</span>
            </div>
          ) : (
            ''
          )}
          {leftBtnValue === 'Unspecified' && type && rightBtnValue === 'Put' && idInput ? (
            <>
              <div className="main_left_img_list">
                {NftList?.map((item: any) => (
                  <button
                    className={item.check ? 'active_img' : 'main_left_img_box'}
                    key={item.id}
                    disabled={rightBtnValue !== 'Put'}
                    onClick={() => changeNftSelect(item.token_id)}
                  >
                    {item.check ? <img src={clickImg} alt="" className="clickImg" /> : null}

                    <img src={item.token_uri} alt="" className="Img" />
                  </button>
                ))}
              </div>
              {clickNFT?.length > 0 ? (
                <div className="main_left_img_list_nftClick">
                  {'('}
                  {clickNFT.length}
                  {'/'}
                  {idInput}
                  {')'}
                </div>
              ) : (
                ''
              )}
            </>
          ) : (
            ''
          )}
        </div>
        <div className="main_right">
          <div className="main_right_btn">
            <Button
              primary={rightBtnValue === 'Call'}
              text="Call"
              onClick={() => changeRightSelect('Call')}
            />
            <Button
              primary={rightBtnValue === 'Put'}
              text="Put"
              onClick={() => changeRightSelect('Put')}
            />
          </div>
          <div className="input_box">
            <div className="title_text">
              <span>Strike Price ( WETH )</span>
              <input
                type="number"
                min="0"
                title=""
                autoComplete="off"
                placeholder="Enter Strike Price"
                onChange={e => setStrikeVal(e.target.value)}
              />
            </div>
            <div className="title_text">
              <span>Premium Price ( WETH )</span>
              <input
                type="number"
                min="0"
                title=""
                autoComplete="off"
                placeholder="Enter Strike Price"
                onChange={e => setPremiumVal(e.target.value)}
              />
            </div>
            <div className="title_text">
              <span>Duration Time ( Days )</span>
              <input
                type="number"
                placeholder=""
                title=""
                autoComplete="off"
                min="0"
                onChange={e => setDurationVal(e.target.value)}
              />
            </div>
          </div>
        </div>
      </SelectMain>
      <FooterBtn>
        <div className="apr_btn">
          {approve ? (
            <LoadingButton
              disabled={BtnLoading}
              text="Create Order"
              onClick={() => handleCreateOrder()}
            />
          ) : (
            <LoadingButton disabled={BtnLoading} text="Approve" onClick={() => Approve()} />
          )}
        </div>
      </FooterBtn>
    </MainBox>
  )
}
export default CreateOrder
