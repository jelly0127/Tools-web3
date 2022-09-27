import React, { useEffect, useState } from 'react'
import LinkBar from '../components/LinkBar'
import { DetailsBox, TitleBox, MainBox, LinkBox, ModalWindows, FooterTabBox } from './DetailsStyle'
import frame from '../../images/frame-icon.png'
import clickImg from '../../images/group-icon.png'
import Button from '../../components/Button'
import LoadingButton from '../../components/LoadingButton'
import Tabs from './Tabs'
import { useNavigate, useParams } from 'react-router-dom'
import Modal from '../../components/Modal'
import { useAppDispatch, useAppSelector } from '../../helpers/hooks'
import {
  filterAddress,
  BalanceToValue,
  filterDurationDays,
  BigNumberFrom,
  BigNumberFromDays,
  walletTips,
} from '../../helpers/utils'
import {
  contractMethodOpswap,
  contractMethodMint,
  contractMethodWeth,
  txPromise,
  useContract,
} from '../../web3/functions'
import { OpSwap_ABI, TestNFT_ABI, Weth_ABI } from '../../web3/abi'
import message from '../../components/Message/Message'
import toast from '../../components/Toast/Toast'
import moment from 'moment'
import { useWeb3React } from '@web3-react/core'
import CONFIG from '../../config'
import { getMethods, PostMethod } from '../../http'
import { ITabProp } from '../../service'
import { showSwitchChain, updateDetail } from '../../redux/reducer'
import { ALL_SUPPORTED_CHAIN_IDS, switchChain } from '../../web3/chain'

export default function Details() {
  const navigate = useNavigate()
  const { status: initStatus } = useParams()
  const [status, setStatus] = useState(initStatus)
  const [showModal, setShowModal] = useState(false)
  const { provider, account, chainId, connector } = useWeb3React()
  const [IsCreator, setIsCreator] = useState(false)
  const detailData: any = useAppSelector(state => state.app.detailData)
  const defaultTokenUri: any = useAppSelector(state => state.app.defaultTokenUri)
  const OpSwapContract = useContract(CONFIG.OPSWAP_ADDRESS, OpSwap_ABI, true)
  const WethContract = useContract(CONFIG.WETH_ADDRESS, Weth_ABI, true)
  const TestNFTContract = useContract(detailData?.tokenAddress, TestNFT_ABI, true)
  const [isApprove, setIsApprove] = useState(false)
  const [BtnLoading, setBtnLoading] = useState(false)
  const [TokenIdList, setTokenIdList] = useState<any>()
  const [NftList, setNftList] = useState<any>([])
  const [ClickNFTList, setClickNFTList] = useState<any>([])
  const [PremiumVal, setPremiumVal] = useState<any>('')
  const [DurationVal, setDurationVal] = useState<any>('')
  const [StrikeVal, setStrikeVal] = useState<any>('')
  const [IsShowApproveModel, setIsShowApproveModel] = useState(false)
  const [IsExercise, setIsExercise] = useState(false)
  const [unSpecifiedApprove, setUnSpecifiedApprove] = useState(false)
  const [IsPlaceApprove, setIsPlaceApprove] = useState(false)
  const [PlaceBtnLoading, setPlaceBtnLoading] = useState(false)
  const dispatch = useAppDispatch()

  const onChainSelect = async () => {
    if (!account) {
      setBtnLoading(false)
      setPlaceBtnLoading(false)
      return walletTips()
    }
    if (chainId !== 80001) {
      setBtnLoading(false)
      setPlaceBtnLoading(false)
      await switchChain(connector, 80001).catch(() => {
        toast({ text: 'Something Wrong.Please try again', type: 'error' })
      })
    }
  }
  const filterTokenId = (data: any) => {
    if (data) {
      const arr = []
      for (const i of data) {
        arr.push(i.tokenId)
      }
      setTokenIdList(arr)
    }
  }
  const handlePlaceOffer = async () => {
    if (!StrikeVal || !PremiumVal || !DurationVal)
      return toast({ text: 'Please enter parameters', type: 'error' })
    if (Number(DurationVal) < 1)
      return toast({ text: 'Duration Time must be greater than 1 day', type: 'error' })
    onChainSelect()
    setBtnLoading(true)
    await contractMethodOpswap(
      OpSwapContract!,
      'placeOffer',
      [
        BigNumberFrom(StrikeVal),
        BigNumberFrom(PremiumVal),
        BigNumberFromDays(DurationVal),
        detailData?.maker,
        detailData?.id,
      ],
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
                setIsShowApproveModel(false)
                setBtnLoading(false)
                setShowModal(false)
                resolve('success')
              })
              .catch((e: any) => {
                console.log(e)
                setBtnLoading(false)
                setShowModal(false)
                reject(e)
              })
          }),
        })
      })
      .catch((err: { reason: any }) => {
        setBtnLoading(false)
        setShowModal(false)
        toast({ text: err.reason || err, type: 'error' })
      })
  }
  // doubles 721
  const handleCallApprove = async () => {
    onChainSelect()
    if (detailData?.isCall && !detailData?.flag) {
      if (ClickNFTList.length === 0) {
        setBtnLoading(false)
        return toast({ text: 'Please select token', type: 'error' })
      }
    }
    setBtnLoading(true)
    setPlaceBtnLoading(true)
    await contractMethodMint(
      TestNFTContract!,
      'setApprovalForAll',
      [CONFIG.OPSWAP_ADDRESS, true],
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
                if (!showModal) {
                  setIsApprove(true)
                }
                if (detailData?.isCall && !detailData?.flag) {
                  setIsShowApproveModel(true)
                  setUnSpecifiedApprove(true)
                }
                setPlaceBtnLoading(false)
                setBtnLoading(false)

                resolve('success')
              })
              .catch((e: any) => {
                console.log(e)
                setBtnLoading(false)
                setPlaceBtnLoading(false)
                reject(e)
              })
          }),
        })
      })
      .catch((err: { reason: any }) => {
        console.log(err)
        setBtnLoading(false)
        setPlaceBtnLoading(false)
        toast({ text: err.reason || err, type: 'error' })
      })
  }
  const handlePlaceApprove = async () => {
    onChainSelect()
    if (!StrikeVal || !PremiumVal || !DurationVal)
      return toast({ text: 'Please enter parameters', type: 'error' })
    if (Number(DurationVal) < 1)
      return toast({ text: 'Duration Time must be greater than 1 day', type: 'error' })
    // if (ClickNFTList.length === 0) {
    //   setBtnLoading(false)
    //   return toast({ text: 'Please select token', type: 'error' })
    // }
    setPlaceBtnLoading(true)
    await contractMethodMint(
      TestNFTContract!,
      'setApprovalForAll',
      [CONFIG.OPSWAP_ADDRESS, true],
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
                setIsPlaceApprove(true)
                setPlaceBtnLoading(false)

                resolve('success')
                setBtnLoading(false)
              })
              .catch((e: any) => {
                console.log(e)
                setPlaceBtnLoading(false)

                reject(e)
              })
          }),
        })
      })
      .catch((err: { reason: any }) => {
        console.log(err)
        setBtnLoading(false)
        setPlaceBtnLoading(false)

        toast({ text: err.reason || err, type: 'error' })
      })
  }
  // single 721
  const handleCallApproveSingle = async () => {
    onChainSelect()
    setBtnLoading(true)
    await contractMethodMint(
      TestNFTContract!,
      'approve',
      [CONFIG.OPSWAP_ADDRESS, TokenIdList[0]],
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
                if (!showModal) {
                  setIsApprove(true)
                }
                setBtnLoading(false)
                resolve('success')
              })
              .catch((e: any) => {
                console.log(e)
                setPlaceBtnLoading(false)
                reject(e)
              })
          }),
        })
      })
      .catch((err: { reason: any }) => {
        setBtnLoading(false)
        toast({ text: err.reason || err, type: 'error' })
      })
  }
  // put c20
  const handlePutApprove = async () => {
    onChainSelect()
    setBtnLoading(true)
    await contractMethodWeth(
      WethContract!,
      'approve',
      [CONFIG.OPSWAP_ADDRESS, BigNumberFrom(detailData?.strike)],
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
                if (!showModal) {
                  setIsApprove(true)
                }
                setBtnLoading(false)
                resolve('success')
              })
              .catch((e: any) => {
                console.log(e)
                setPlaceBtnLoading(false)
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
  const handleCancelOrder = async () => {
    onChainSelect()
    setBtnLoading(true)
    await contractMethodOpswap(OpSwapContract!, 'cancelOrder', [detailData?.id], false)
      .then(result => {
        message({
          messagePromose: new Promise((resolve, reject) => {
            result
              .wait()
              .then(async (res: any) => {
                const { transactionHash } = res
                await txPromise(provider!, transactionHash)
                if (!showModal) {
                  setIsApprove(true)
                }
                setBtnLoading(false)
                dispatch(updateDetail({ ...detailData, status: 5 }))
                resolve('success')
              })
              .catch((e: any) => {
                console.log(e)
                setBtnLoading(false)

                reject(e)
              })
          }),
        })
      })
      .catch((err: { reason: any }) => {
        setBtnLoading(false)
        toast({ text: err.reason || err, type: 'error' })
      })
  }
  const filterFille = (): string[] => {
    if (detailData.isCall && detailData.flag) {
      return [detailData.tokenId[0]?.tokenId]
    } else {
      return detailData?.isCall ? ClickNFTList : []
    }
  }
  const handleFilleOrder = async () => {
    onChainSelect()
    setBtnLoading(true)
    await contractMethodOpswap(
      OpSwapContract!,
      'fillOrder',
      [detailData?.maker, detailData?.id, filterFille()],
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
                setBtnLoading(false)
                setClickNFTList([])
                setIsShowApproveModel(false)
                setStatus('3')
                dispatch(updateDetail({ ...detailData, status: 2 }))
                resolve('success')
              })
              .catch((e: any) => {
                setBtnLoading(false)
                reject(e)
              })
          }),
        })
      })
      .catch((err: { reason: any }) => {
        setBtnLoading(false)
        toast({ text: err.reason || err, type: 'error' })
      })
  }
  const handleExerciseOrder = async () => {
    // if put tokenId =[]
    onChainSelect()
    setBtnLoading(true)
    await contractMethodOpswap(OpSwapContract!, 'exercise', [detailData?.id], false)
      .then(result => {
        message({
          messagePromose: new Promise((resolve, reject) => {
            result
              .wait()
              .then(async (res: any) => {
                const { transactionHash } = res
                await txPromise(provider!, transactionHash)
                setBtnLoading(false)
                setIsExercise(true)
                dispatch(updateDetail({ ...detailData, status: 3 }))

                resolve('success')
              })
              .catch((e: any) => {
                setBtnLoading(false)
                reject(e)
              })
          }),
        })
      })
      .catch((err: { reason: any }) => {
        setBtnLoading(false)
        toast({ text: err.reason || err, type: 'error' })
      })
  }
  const handleWithdrawOrder = async () => {
    // if put tokenId =[]
    onChainSelect()
    setBtnLoading(true)
    await contractMethodOpswap(OpSwapContract!, 'withdraw', [detailData?.id], false)
      .then(result => {
        message({
          messagePromose: new Promise((resolve, reject) => {
            result
              .wait()
              .then(async (res: any) => {
                const { transactionHash } = res
                await txPromise(provider!, transactionHash)
                setBtnLoading(false)
                setIsExercise(true)
                resolve('success')
              })
              .catch((e: any) => {
                setBtnLoading(false)
                reject(e)
              })
          }),
        })
      })
      .catch((err: { reason: any }) => {
        setBtnLoading(false)
        toast({ text: err.reason || err, type: 'error' })
      })
  }
  const filterImg = (data: any) => {
    if (data.tokenId && data.tokenId !== '' && !undefined) {
      return (
        <img
          src={data.tokenId[0]?.tokenUri ? data.tokenId[0]?.tokenUri : defaultTokenUri}
          alt=""
          className="icon"
        />
      )
    } else {
      return (
        <img
          src={
            data.orderId.tokenId[0]?.tokenUri ? data.orderId.tokenId[0]?.tokenUri : defaultTokenUri
          }
          alt=""
          className="icon"
        />
      )
    }
  }
  const handleApprove = () => {
    onChainSelect()
    if (!detailData.flag && detailData?.isCall) {
      return setIsShowApproveModel(true)
    }
    if (chainId && !ALL_SUPPORTED_CHAIN_IDS.includes(chainId)) {
      dispatch(showSwitchChain(true))
      return
    }
    // if (detailData?.isCall && !detailData.flag) return handleCallApprove() // 721
    if (detailData?.isCall && detailData.flag) return handleCallApproveSingle() // 721
    if (!detailData.isCall) return handlePutApprove()
  }
  const filterStatus = (row: ITabProp) => {
    const array = [
      {
        status: 0,
        components: (
          <div className="UnFilledStatusBox">
            <div className="statusTxt">
              <span>Option Status:</span>
            </div>
            <div className="statusUnFilledBox">UnFilled</div>
          </div>
        ),
      },
      {
        status: 2,
        components: (
          <div className="ActiveStatusBox">
            <div className="statusTxt">
              <span>Option Status:</span>
            </div>
            <div className="statusActiveBox">Active</div>
          </div>
        ),
      },
      {
        status: 3,
        components: (
          <div className="ExercisedStatusBox">
            <div className="statusTxt">
              <span>Option Status:</span>
            </div>
            <div className="statusExercisedBox">Exercised</div>
          </div>
        ),
      },
      {
        status: 1,
        components: (
          <div className="UnFilledStatusBox">
            <div className="statusTxt">
              <span>Option Status:</span>
            </div>
            <div className="statusUnFilledBox">Cancelled</div>
          </div>
        ),
      },
      {
        status: 4,
        components: (
          <div className="UnFilledStatusBox">
            <div className="statusTxt">
              <span>Option Status:</span>
            </div>
            <div className="statusUnFilledBox">UnFilled</div>
          </div>
        ),
      },
      {
        status: 5,
        components: (
          <div className="UnFilledStatusBox">
            <div className="statusTxt">
              <span>Option Status:</span>
            </div>
            <div className="statusUnFilledBox">Cancelled</div>
          </div>
        ),
      },
    ]
    for (const item of array) {
      if (item.status === Number(row.status)) {
        return item.components
      }
    }
  }
  const filterClickNFT = () => {
    const arr: any = []
    NftList.forEach((i: any) => {
      if (i.check === true) {
        arr.push(i.token_id)
      }
    })
    setClickNFTList(arr)
  }
  const changeNftSelect = (id: number) => {
    if (ClickNFTList.length === Number(detailData.num)) {
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
    filterTokenId(detailData.tokenId)
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
  const getCollection = async () => {
    const urls = `https://deep-index.moralis.io/api/v2/${account}/nft?chain=mumbai&format=decimal&token_addresses=${
      detailData?.tokenAddress ? detailData?.tokenAddress : detailData?.orderId?.tokenAddress
    }`
    if (detailData?.tokenAddress || detailData?.orderId?.tokenAddress) {
      await getMethods(urls)
        .then(res => {
          AddCheck(res.result)
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  }
  const cancelClickNft = () => {
    NftList.forEach((i: any) => {
      i.check = false
    })
    setNftList(JSON.parse(JSON.stringify(NftList)))
  }
  const handleCloseApproveWindons = () => {
    setIsShowApproveModel(false)
    setBtnLoading(false)
    // cancelClickNft()
    // setClickNFTList([])
  }
  const handleCloseWindonws = () => {
    setShowModal(false)
    // cancelClickNft()
    // setClickNFTList([])
  }
  const exploer = (address: string) => {
    return `https://mumbai.polygonscan.com/address/${address}`
  }
  const filterToken = () => {
    if (!detailData.placeId) {
      if (detailData?.flag)
        return (
          <div className="tokenId_box">
            Specified Token :<div className="tokenId_box_id">{detailData?.tokenName}</div>
            {detailData.tokenId?.map((item: any) => (
              <div className="tokenId_box_id" key={item.tokenId}>
                #{item.tokenId}
              </div>
            ))}
          </div>
        )
      if (!detailData?.flag) {
        return (
          <div className="tokenId_box">
            Unspecified Token: {detailData?.tokenName}x{detailData.num}
          </div>
        )
      }
    } else {
      if (detailData?.orderId?.flag)
        return (
          <div className="tokenId_box">
            Specified Token :
            <div className="tokenId_box_id">{detailData.orderId.tokenId[0]?.tokenName}</div>
            <div className="tokenId_box_id">#{detailData.orderId.tokenId[0]?.tokenId}</div>
          </div>
        )
      if (!detailData?.orderId?.flag) {
        return (
          <div className="tokenId_box">
            Unspecified Token: {detailData?.orderId.num}x{detailData.orderId.tokenName}
          </div>
        )
      }
    }
  }
  useEffect(() => {
    detailData?.maker?.toUpperCase() === String(account)?.toUpperCase()
      ? setIsCreator(true)
      : setIsCreator(false)
    filterTokenId(detailData.tokenId)
    // console.log('detailData', detailData)
  }, [detailData, IsCreator, account])
  useEffect(() => {
    getCollection()
  }, [])

  return (
    <div>
      <LinkBar />
      <DetailsBox>
        <TitleBox>
          <span>Order Details</span>
        </TitleBox>
        <LinkBox>
          <img src={frame} alt="" />
          <span onClick={() => navigate(-1)}> Back to list</span>
        </LinkBox>
        <MainBox>
          <div className="left">
            <>{filterImg(detailData)}</>
            <div className="date">
              <span className="date_title">Creation date:</span>
              <span className="date_number">
                {String(
                  moment
                    .utc((detailData.orderId?.createTime || detailData.createTime) * 1000)
                    .toDate(),
                ).slice(0, 28)}
              </span>
            </div>
            <div className="date">
              <span className="date_title">Creator: </span>
              <span className="date_number_adr">
                <a
                  target="_blank"
                  href={exploer(detailData?.maker || detailData?.orderId?.maker)}
                  rel="noreferrer"
                >
                  {filterAddress(detailData?.maker || detailData?.orderId?.maker, 13, 8)}
                </a>
              </span>
            </div>
          </div>
          <div className="right">
            <div className="date">
              <span className="date_title">
                {detailData?.isCall ? 'Call Option' : 'Put Option'}
              </span>
              {filterToken()}
              <span className="date_number">
                Expired date:
                {String(
                  moment
                    .utc(
                      (detailData.placeId ? detailData.orderId.duration : detailData.duration) *
                        1000,
                    )
                    .toDate(),
                ).slice(0, 28)}
              </span>
            </div>
            <div className="right_box_all">
              <div className="right_box">
                <div className="right_box_item">
                  <span className="right_box_item_title">Strike price</span>
                  <span>
                    {BalanceToValue(detailData.orderId?.strike || detailData.strike)} WETH
                  </span>
                </div>
                <div className="right_box_item">
                  <span className="right_box_item_title">Premium price</span>
                  <span>
                    {BalanceToValue(detailData.orderId?.premium || detailData.premium)} WETH
                  </span>
                </div>
                <div className="right_box_item">
                  <span className="right_box_item_title">Duration Time</span>
                  <span>
                    {Math.ceil(
                      (Number(detailData.orderId?.duration || detailData.duration) -
                        Number(detailData.orderId?.createTime || detailData.createTime)) /
                        86400,
                    )}
                    {'  '}days
                  </span>
                </div>
              </div>
              {Number(detailData.orderId?.status || detailData.status) !== 0 &&
                ![0, 2].includes(Number(status)) && (
                  <div className="right_box_item_owner">
                    <div className="Owner">
                      Position Owner:{' '}
                      {Number(detailData.orderId?.status || detailData.status) === 3 ? (
                        <a
                          target="_blank"
                          href={exploer(
                            detailData?.user ? detailData?.user : detailData?.orderId?.maker,
                          )}
                          rel="noreferrer"
                        >
                          {filterAddress(detailData?.user, 13, 8)}
                        </a>
                      ) : (
                        <a
                          target="_blank"
                          href={exploer(
                            detailData?.orderId?.maker
                              ? detailData?.orderId?.maker
                              : detailData?.user,
                          )}
                          rel="noreferrer"
                        >
                          {filterAddress(
                            detailData?.orderId?.maker
                              ? detailData?.orderId?.maker
                              : detailData?.user,
                            13,
                            8,
                          )}
                        </a>
                      )}
                    </div>
                  </div>
                )}
            </div>
            {Number(status) !== 0 ? (
              <div>
                {Math.round(Date.now() / 1000) >
                Number(detailData.placeId ? detailData.orderId.duration : detailData?.duration) ? (
                  <div className="ExpiredStatusBox">
                    <div className="statusTxt">
                      <span>Option Status:</span>
                    </div>
                    <div className="statusExpiredBox">Expired</div>
                  </div>
                ) : (
                  filterStatus(detailData.placeId ? detailData?.orderId : detailData)
                )}
              </div>
            ) : (
              ''
            )}
            {!IsCreator && Number(status) === 0 ? (
              <div className="right_button">
                {isApprove && !unSpecifiedApprove ? (
                  <div className="right_button_width" onClick={handleFilleOrder}>
                    <LoadingButton disabled={BtnLoading} text="Fill Order" />
                  </div>
                ) : (
                  <div className="right_button_width">
                    <LoadingButton disabled={BtnLoading} text="Approve" onClick={handleApprove} />
                  </div>
                )}
                <div className="right_button_width" onClick={() => setShowModal(true)}>
                  <Button text="Place Offer" />
                </div>
              </div>
            ) : (
              ''
            )}
            <>
              {IsCreator &&
              Number(detailData.placeId ? detailData.orderId.status : detailData.status) === 0 ? (
                <div className="right_button">
                  <div className="right_button_width" onClick={handleCancelOrder}>
                    <LoadingButton variant="outlined" disabled={BtnLoading} text="Cancel Order" />
                  </div>
                </div>
              ) : (
                ''
              )}
              {Number(detailData.placeId ? detailData.orderId.status : detailData.status) === 2 &&
              IsCreator &&
              !IsExercise &&
              Math.round(Date.now() / 1000) <
                Number(detailData.placeId ? detailData.orderId.duration : detailData?.duration) ? (
                <div className="right_button">
                  <div className="right_button_width" onClick={handleExerciseOrder}>
                    <LoadingButton disabled={BtnLoading} text="Exercise" />
                  </div>
                </div>
              ) : (
                ''
              )}
              {(!detailData.isCall ||
                (detailData.isCall &&
                  detailData?.user?.toLowerCase() === account?.toLowerCase())) &&
                Math.round(Date.now() / 1000) >
                  Number(detailData.placeId ? detailData.orderId.duration : detailData?.duration) &&
                Number(detailData.placeId ? detailData.orderId.status : detailData.status) ===
                  2 && (
                  <div className="right_button">
                    <div className="right_button_width" onClick={handleWithdrawOrder}>
                      <LoadingButton disabled={BtnLoading} text="Withdraw" />
                    </div>
                  </div>
                )}
              {(detailData.placeId ? detailData.orderId.status : detailData.status) === '4' &&
              Math.round(Date.now() / 1000) <
                Number(detailData.placeId ? detailData.orderId.duration : detailData?.duration) &&
              IsCreator ? (
                <div className="right_button">
                  <div className="right_button_width" onClick={handlePlaceOffer}>
                    <Button text="Place Offer" />
                  </div>
                </div>
              ) : (
                ''
              )}
              {(detailData.placeId ? detailData.orderId.status : detailData.status) === '5' &&
              IsCreator ? (
                <div className="right_button">
                  <div className="right_button_width" onClick={handleCancelOrder}>
                    <Button text="Cancel" />
                  </div>
                </div>
              ) : (
                ''
              )}
            </>
            {Number(status) === 0 && !IsCreator ? (
              <div className="right_toastBox">
                <span>
                  You need to send NFTs as collateral for {filterDurationDays(detailData.duration)}{' '}
                  days and receive
                </span>
                <span>a {BalanceToValue(detailData.premium)} WETH premium.</span>
              </div>
            ) : (
              ''
            )}
          </div>
        </MainBox>
        <Modal
          title={''}
          open={IsShowApproveModel}
          onClose={handleCloseApproveWindons}
          width={420}
          height={540}
        >
          <ModalWindows>
            <div className="approve_box">
              <div className="approve_box_title">
                <div>Plase Select NFTs</div>
              </div>
              <div className="main_left_img_list">
                {NftList.length > 0 ? (
                  <>
                    {NftList?.map((item: any) => (
                      <div
                        className={item.check ? 'active_img' : 'main_left_img_box'}
                        key={item.token_id}
                        onClick={() => changeNftSelect(item.token_id)}
                      >
                        {item.check ? <img src={clickImg} alt="" className="clickImg" /> : null}
                        <img src={item.token_uri} alt="" className="Img" />
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="main_left_img_box">No Data!</div>
                )}
              </div>
              <div className="item_title">{`(${ClickNFTList.length}/ ${detailData?.num})`}</div>
              {unSpecifiedApprove ? (
                <div className="approve_Btn">
                  <LoadingButton
                    text="Fill Order"
                    disabled={BtnLoading}
                    onClick={handleFilleOrder}
                  />
                </div>
              ) : (
                <div className="approve_Btn">
                  <LoadingButton text="Approve" disabled={BtnLoading} onClick={handleCallApprove} />
                </div>
              )}
            </div>
          </ModalWindows>
        </Modal>

        <Modal title={''} open={showModal} onClose={handleCloseWindonws} width={420} height={540}>
          <ModalWindows>
            <div className="item_box">
              <span>Strike Price ( WETH )</span>
              <input
                type="number"
                min={0}
                title=""
                autoComplete="off"
                value={StrikeVal}
                onChange={e => {
                  setStrikeVal(e.target.value)
                }}
              />
            </div>
            <div className="item_box">
              <span>Premium Price ( WETH )</span>
              <input
                type="number"
                min={0}
                title=""
                autoComplete="off"
                value={PremiumVal}
                onChange={e => {
                  setPremiumVal(e.target.value)
                }}
              />
            </div>
            <div className="item_box">
              <span>Duration Time ( Days ) </span>
              <input
                type="number"
                min={0}
                title=""
                autoComplete="off"
                value={DurationVal}
                onChange={e => {
                  setDurationVal(e.target.value)
                }}
              />
            </div>
            {detailData?.isCall && !detailData?.flag && (
              <div className="item_ImgList_box">
                <div className="item_title">
                  <div>Plase Select NFTs</div>
                </div>
                <div className="main_left_img_list">
                  {NftList.length > 0 ? (
                    <>
                      {NftList?.map((item: any) => (
                        <div
                          className={item.check ? 'active_img' : 'main_left_img_box'}
                          key={item.token_id}
                          onClick={() => changeNftSelect(item.token_id)}
                        >
                          {item.check ? <img src={clickImg} alt="" className="clickImg" /> : null}

                          <img src={item.token_uri} alt="" className="Img" />
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="main_left_img_box">No Data!</div>
                  )}
                </div>
                <div className="item_title">{`(${ClickNFTList.length}/ ${detailData?.num})`}</div>
              </div>
            )}

            <div className="Btn_box">
              <div className="Btn_box_item">
                <Button text="Cancel" onClick={() => setShowModal(false)} />
              </div>
              {IsPlaceApprove ? (
                <div className="Btn_box_item">
                  <LoadingButton
                    text="Place Offer"
                    disabled={BtnLoading}
                    onClick={handlePlaceOffer}
                  />
                </div>
              ) : (
                <div className="Btn_box_item">
                  <LoadingButton
                    text="Approve"
                    disabled={PlaceBtnLoading}
                    onClick={handlePlaceApprove}
                  />
                </div>
              )}
            </div>
          </ModalWindows>
        </Modal>
        {Number(detailData.status) === 4 && ![1].includes(Number(status)) && (
          <FooterTabBox>
            <span className="footer_title">Offer Listing</span>
            <Tabs
              rows={detailData?.placeOffer}
              OrderId={detailData?.id}
              Creator={IsCreator}
              placeOfferData={detailData}
            />
          </FooterTabBox>
        )}
      </DetailsBox>
    </div>
  )
}
