import React, { useState } from 'react'
import MintIcon from '../../images/mint-icon.png'
import styled from 'styled-components'
import { flexCenter, IBMPlexSansThaiMaxs, IBMPlexSansThais, IBMPlexSerifs } from '../../style'
import MunbaiIcon from '../../images/mubi-icon.png'
import { useNavigate } from 'react-router-dom'
import { TestNFT_ABI, Weth_ABI } from '../../web3/abi'
import {
  contractMethodMint,
  txPromise,
  useContract,
  contractMethodWeth,
} from '../../web3/functions'

import CONFIG from '../../config'
import message from '../../components/Message'
import toast from '../../components/Toast/Toast'
import { useWeb3React } from '@web3-react/core'
import { filterAddress, BigNumberFrom, walletTips } from '../../helpers/utils'
import LoadingButton from '../../components/LoadingButton'
import Button from '../../components/Button/Button'
import { switchChain } from '../../web3/chain'

const MintBox = styled.div`
  ${flexCenter}
  margin-top: 88px;
  .title {
    font-family: ${IBMPlexSansThaiMaxs};
    font-weight: 700;
    font-size: ${props => props.theme.fontLargest};
    line-height: 40px;
  }
  .icon {
    margin-top: 45px;
    width: 108px;
    height: 130px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .toast {
    margin-top: 22px;
    font-weight: 400;
    font-size: ${props => props.theme.fontNormal};
    line-height: 24px;
    font-family: ${IBMPlexSansThais};
  }
  .BtnBox {
    margin-top: 55px;
    width: 322px;
    height: 40px;
    flex-direction: row;
    align-items: center;
    ${flexCenter}
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid ${props => props.theme.grey1};
    position: relative;
    .BtnBox_border {
      position: absolute;
      top: 1px;
      right: -3px;
      width: 322px;
      height: 40px;
      flex-direction: row;
      align-items: center;
      ${flexCenter}
      border: 2px solid ${props => props.theme.grey1};
      border-top: unset;
      border-left: unset;
    }
    img {
      width: 32px;
      height: 32px;
      margin-right: 18px;
    }
    .BtnBox_btn {
      ${flexCenter}
      font-weight: 400;
      font-size: ${props => props.theme.fontNormal};
      line-height: 24px;
      font-family: ${IBMPlexSansThais};
      box-sizing: border-box;
    }
  }
  .BtnRow {
    margin-top: 106px;
    flex-direction: row;
    width: 440px;
    ${flexCenter}
    justify-content: space-between;
    button {
      min-width: 202px;
      height: 36px;
      font-family: ${IBMPlexSerifs};
      font-weight: 600;
    }
  }
  .Btn_Row_Box {
    margin-top: 39px;
    width: 100%;
    ${flexCenter}
  }

  .successBtn {
    margin-top: 32px;
    width: 323px;
    height: 183px;
    padding: 0px 0 20px 16px;
    border: 1px solid ${props => props.theme.grey1};
    font-weight: 400;
    font-size: ${props => props.theme.fontSmall};
    line-height: 20px;
    .successBtn_row {
      font-family: ${IBMPlexSansThais};
      margin-top: 14px;
      span:last-child {
        text-decoration: underline;
      }
    }
    a {
      line-height: 20px;
      :hover {
        text-decoration: underline;
      }
    }
  }
  .successBtn_img {
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
  }
  .successBtn_img_row {
    flex-direction: row;
    align-items: center;
    span {
      font-size: ${props => props.theme.fontNormal};
      line-height: 26px;
      font-weight: 400;
      font-family: ${IBMPlexSansThais};
    }
    img {
      margin-left: 20px;
      margin-right: 12px;
      width: 32px;
      height: 32px;
    }
  }
`
export default function Mint() {
  const { provider, account, connector, chainId } = useWeb3React()

  const navigate = useNavigate()
  const [showDetail, setShowDetail] = useState(false)
  const [TransactionHash, setTransactionHash] = useState('')
  const MintNFTContract = useContract(CONFIG.TESTNFT_ADDRESS, TestNFT_ABI, true)
  const MintWETHContract = useContract(CONFIG.WETH_ADDRESS, Weth_ABI, true)
  const [BtnLoading, setBtnLoading] = useState(false)
  const [ChanId, setChanId] = useState(80001)
  const onChainSelect = () => {
    if (!account) {
      setBtnLoading(false)
      return walletTips()
    }
    if (chainId !== ChanId) {
      return switchChain(connector, ChanId)
        .then(() => {
          setChanId(ChanId)
          setBtnLoading(false)
        })
        .catch(() => {
          setBtnLoading(false)
          toast({ text: 'Something Wrong.Please try again', type: 'error' })
        })
    }
  }
  const handleMint = () => {
    onChainSelect()
    if (account && chainId === 80001) {
      setBtnLoading(true)
      contractMethodMint(MintNFTContract!, 'mint', null)
        .then(result => {
          message({
            messagePromose: new Promise((resolve, reject) => {
              result
                .wait()
                .then(async (res: any) => {
                  const { transactionHash } = res
                  await txPromise(provider!, transactionHash)
                  setShowDetail(true)
                  setTransactionHash(transactionHash)
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
        .finally(() => {
          contractMethodWeth(MintWETHContract!, 'mint', [account, BigNumberFrom(10000)], false)
            .then(res => {
              res
                .wait()
                .then((txRes: { transactionHash: any }) => {
                  const { transactionHash } = txRes
                  setShowDetail(true)
                  setTransactionHash(transactionHash)
                  message({ messagePromose: txPromise(provider!, transactionHash) })
                })
                .catch((err: { message: any }) => toast({ text: err.message, type: 'error' }))
            })
            .catch((err: { reason: any }) => {
              console.log(err)
              setBtnLoading(false)
              toast({ text: err.reason || err, type: 'error' })
            })
        })
    }
  }
  const exploer = (address: string) => {
    return `https://mumbai.polygonscan.com/address/${address}`
  }
  const Transactionexploer = (address: string) => {
    return `https://mumbai.polygonscan.com/tx/${address}`
  }
  return (
    <MintBox>
      <div className="title">
        <span>Mint Test Funds</span>
      </div>
      <div className="icon">
        <img src={MintIcon} alt="" />
      </div>
      <div className="toast">
        <span>You will receive WETH and NFTs at once</span>
      </div>

      {showDetail ? (
        <div className="successBtn">
          <div className="successBtn_row">
            <span>Transaction ID</span>
            <a target="_blank" href={Transactionexploer(TransactionHash)} rel="noreferrer">
              {filterAddress(TransactionHash!, 15, 17)}
            </a>
            {/* <span>{filterAddress(TransactionHash!, 15, 17)}</span> */}
          </div>
          <div className="successBtn_row">
            <span>Address</span>
            <a target="_blank" href={exploer(account!)} rel="noreferrer">
              {filterAddress(account!, 15, 17)}
            </a>
            {/* <span>{filterAddress(account!, 15, 17)}</span> */}
          </div>
          <div className="successBtn_img">
            <span>On</span>
            <div className="successBtn_img_row">
              <img src={MunbaiIcon} alt="" />
              <span>Ethereum Mumbai Testnet </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="BtnBox">
          <div className="BtnBox_border">
            <img src={MunbaiIcon} alt="" />
            <span className="BtnBox_btn">Polygon Mumbai Testnet </span>
          </div>
        </div>
      )}

      <div className={showDetail ? 'Btn_Row_Box' : 'BtnRow'}>
        <Button
          text="Back to Listing Page"
          onClick={() => {
            navigate(-1)
          }}
        />

        {!showDetail ? (
          <LoadingButton disabled={BtnLoading} text="Mint" onClick={() => handleMint()} />
        ) : null}
      </div>
    </MintBox>
  )
}
