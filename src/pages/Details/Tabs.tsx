import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import styled from 'styled-components'
import { BalanceToValue, filterAddress } from '../../helpers/utils'
import { contractMethodOpswap, txPromise, useContract } from '../../web3/functions'
import CONFIG from '../../config'
import { OpSwap_ABI } from '../../web3/abi'
import message from '../../components/Message'
import toast from '../../components/Toast/Toast'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import LoadingButton from '../../components/LoadingButton/LoadingButton'
import { IBMPlexSerifMaxs } from '../../style'

const MTable = styled(Table)`
  font-weight: 600;
  font-size: ${props => props.theme.fontNormal};
  line-height: 24px;
  &.MuiTable-root {
    width: 100%;
    margin-top: 22px;
    overflow-x: scroll;
  }
  &.MuiTableBody-root {
    border: 1px solid #000;
    font-weight: 400;
  }
  .from {
    text-decoration: underline;
  }
  .btn {
    height: 22px;
    button {
      font-size: ${props => props.theme.fontSmall};
    }
  }
  span {
    font-weight: 600;
    font-size: ${props => props.theme.fontNormal};
    line-height: 24px;
  }
`
const MTableCell = styled(TableCell)`
  &.MuiTableCell-root {
    border-bottom: 1px solid #000;
  }
  &.MuiTableCell-head {
    font-family: ${IBMPlexSerifMaxs} !important;
  }
`
interface DetailsData {
  strike: string
  premium: string
  duration: string
  id: string
}
interface DetailsProps {
  rows?: any
  OrderId?: string
  Creator?: boolean
  placeOfferData?: any
}

const Tabs: React.FC<DetailsProps> = ({ rows, OrderId, Creator, placeOfferData }) => {
  const { provider, account } = useWeb3React()
  const OpSwapContract = useContract(CONFIG.OPSWAP_ADDRESS, OpSwap_ABI, true)
  const [BtnLoading, setBtnLoading] = useState(false)
  const [IsOwner, setIsOwner] = useState(false)
  const handleCancelPlace = (PlaceId: string) => {
    setBtnLoading(true)
    contractMethodOpswap(OpSwapContract!, 'cancelPlace', [OrderId, PlaceId], false)
      .then(result => {
        message({
          messagePromose: new Promise((resolve, reject) => {
            result
              .wait()
              .then(async (res: any) => {
                const { transactionHash } = res
                await txPromise(provider!, transactionHash)
                setBtnLoading(false)
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
  const handleAcceptOffer = (PlaceId: string, User: string) => {
    setBtnLoading(true)
    contractMethodOpswap(OpSwapContract!, 'acceptOffer', [User, OrderId, PlaceId], false)
      .then(result => {
        message({
          messagePromose: new Promise((resolve, reject) => {
            result
              .wait()
              .then(async (res: any) => {
                const { transactionHash } = res
                await txPromise(provider!, transactionHash)
                setBtnLoading(false)
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
  const handleCancelPlaces = (PlaceId: string) => {
    setBtnLoading(true)
    contractMethodOpswap(
      OpSwapContract!,
      'cancelPlace',
      [placeOfferData?.orderId?.id, PlaceId],
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
  const handleAcceptOffers = (PlaceId: string) => {
    setBtnLoading(true)
    contractMethodOpswap(
      OpSwapContract!,
      'acceptOffer',
      [placeOfferData?.user, placeOfferData?.orderId?.id, PlaceId],
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
  useEffect(() => {
    if (rows) {
      rows[0]?.user.toUpperCase() === String(account)?.toUpperCase()
        ? setIsOwner(true)
        : setIsOwner(false)
    } else {
      placeOfferData?.user.toUpperCase() === String(account)?.toUpperCase()
        ? setIsOwner(true)
        : setIsOwner(false)
    }
  }, [account, IsOwner])

  const UnCancelComponents = () => {
    return (
      <>
        {Number(placeOfferData.status) === 5 ? null : (
          <TableRow>
            <MTableCell component="th" scope="row" align="center">
              {BalanceToValue(placeOfferData?.strike)}WETH
            </MTableCell>
            <MTableCell align="center">{BalanceToValue(placeOfferData?.premium)}WETH</MTableCell>
            <MTableCell align="center">
              {Math.ceil(
                (Number(placeOfferData?.duration) - Number(placeOfferData?.createTime)) / 86400,
              )}
              days
            </MTableCell>
            <MTableCell className="from" align="center">
              {filterAddress(placeOfferData.user, 6, 8)}
            </MTableCell>
            <MTableCell className="from">
              {Number(placeOfferData?.status) === 4 ? (
                <div className="btn">
                  {placeOfferData?.user?.toUpperCase() === String(account)?.toUpperCase() ? (
                    <LoadingButton
                      disabled={BtnLoading}
                      text="Cancel Offer"
                      onClick={() => {
                        handleCancelPlaces(placeOfferData?.placeId)
                      }}
                    />
                  ) : (
                    ''
                  )}
                  {Creator ? (
                    <LoadingButton
                      text="Accept Offer"
                      disabled={BtnLoading}
                      onClick={() => handleAcceptOffers(placeOfferData?.placeId)}
                    />
                  ) : (
                    ''
                  )}
                </div>
              ) : (
                ''
              )}
            </MTableCell>
          </TableRow>
        )}
      </>
    )
  }
  const CancelComponents = () => {
    return (
      <>
        {rows?.map((row: any) => (
          <>
            {Number(row?.status) === 5 ? null : (
              <TableRow key={row?.placeId}>
                <MTableCell component="th" scope="row" align="center">
                  {BalanceToValue(row.strike)}WETH
                </MTableCell>
                <MTableCell align="center">{BalanceToValue(row.premium)}WETH</MTableCell>
                <MTableCell align="center">
                  {Math.ceil((Number(row.duration) - Number(row.createTime)) / 86400)}days
                </MTableCell>
                <MTableCell className="from" align="center">
                  {filterAddress(row.user, 6, 4)}
                </MTableCell>
                <MTableCell className="from" key={row?.placeId}>
                  {Number(row.status) === 4 ? (
                    <div className="btn">
                      {row.user?.toUpperCase() === String(account)?.toUpperCase() ? (
                        <LoadingButton
                          disabled={BtnLoading}
                          text="Cancel Offer"
                          key={row?.placeId}
                          onClick={() => {
                            handleCancelPlace(row?.placeId)
                          }}
                        />
                      ) : (
                        ''
                      )}
                      {Creator ? (
                        <LoadingButton
                          text="Accept Offer"
                          disabled={BtnLoading}
                          onClick={() => handleAcceptOffer(row?.placeId, row?.user)}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  ) : (
                    ''
                  )}
                </MTableCell>
              </TableRow>
            )}
          </>
        ))}
      </>
    )
  }
  return (
    <MTable sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
      <TableHead>
        <TableRow>
          <MTableCell align="center">
            <span>Strike</span>
          </MTableCell>
          <MTableCell align="center">
            <span>Premium</span>
          </MTableCell>
          <MTableCell align="center">
            <span> Duration</span>
          </MTableCell>
          <MTableCell align="center">
            <span>From</span>
          </MTableCell>
          <MTableCell align="center">{}</MTableCell>
        </TableRow>
      </TableHead>
      <TableBody>{rows ? CancelComponents() : UnCancelComponents()}</TableBody>
    </MTable>
  )
}
export default Tabs
