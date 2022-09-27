import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useNavigate, useLocation } from 'react-router-dom'
import Frame from '../../../images/frame-icon.png'
import { Tabs, MTable, Wrapper } from './TabStyle'
import { ITabProp, TabProps } from '../../../service'
import { BalanceToValue } from '../../../helpers/utils'
import { useAppDispatch, useAppSelector } from '../../../helpers/hooks'
import { updateDetail } from '../../../redux/reducer'
import ReactLoading from 'react-loading'
import styled from 'styled-components'
import { IBMPlexSerifMaxs, IBMPlexSerifs } from '../../../style'

const MTableRow = styled(TableRow)`
  &.MuiTableRow-root {
    font-family: ${IBMPlexSerifMaxs} !important;
    /* border-bottom: 1px solid #000 !important; */
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
const MTableHead = styled(TableHead)`
  & .MuiTableHead-root {
    font-family: ${IBMPlexSerifs};
  }
`

const tabName = ['', 'Optioned Asset', 'Strike', 'Premium', 'Duration', 'Type', '']
const filterPlaceOffList = (row: ITabProp) => {
  const arr = []
  for (const i of row.placeOffer!) {
    if (Number(i.status) === 4) {
      arr.push(i)
    }
  }
  return arr.length > 1 ? <div className="offersBox">{arr.length}offers</div> : <></>
}
const filterStatus = (row: ITabProp) => {
  const array = [
    {
      status: 0,
      components: (
        <div>
          <div className="statusUnFilledBox">UnFilled</div>
          {Array.isArray(row.placeOffer) && row.placeOffer.length > 0
            ? filterPlaceOffList(row)
            : null}
        </div>
      ),
    },
    { status: 3, components: <div className="statusExercisedBox">Exercised</div> },
    { status: 2, components: <div className="statusActiveBox">Active</div> },
    { status: 1, components: <div className="statusUnFilledBox">Cancelled</div> },
    {
      status: 4,
      components: (
        <div>
          <div className="statusUnFilledBox">Placed Offer</div>
          <div className="offersBox">UnFilled</div>
        </div>
      ),
    },
    {
      status: 5,
      components: (
        <div>
          <div className="statusUnFilledBox">Placed Offer</div>
          <div className="offersBox">Canceled</div>
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

const Tab: React.FC<TabProps> = ({ rows, TableLoading }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const defaultTokenUri = useAppSelector(state => state.app.defaultTokenUri)
  const filterRouterName = () => {
    const arrList = [
      { name: '/', status: 0 },
      { name: '/filledOrder', status: 1 },
      { name: '/myOrder', status: 2 },
      { name: '/myPositions', status: 3 },
    ]
    for (const i of arrList) {
      if (i.name === pathname) return i.status
    }
  }
  const handleDetail = (row: ITabProp) => {
    navigate(`/detail/${filterRouterName()}`)
    dispatch(updateDetail(row))
  }

  const filterDataType = (row: ITabProp) => {
    if (!row.placeId) {
      if (!row.flag && row.isCall) {
        return (
          <div className="nftBox">
            <img src={defaultTokenUri} alt="" className="nftImg" />
            <>
              {row.num} {row.tokenName}
            </>
          </div>
        )
      }
      if (!row.flag && !row.isCall) {
        return (
          <div className="nftBox">
            <img src={defaultTokenUri} alt="" className="nftImg" />
            <>
              {row.num} {row.tokenName}
            </>
          </div>
        )
      }
      if (row.flag && row.isCall) {
        return (
          <div className="nftBox">
            <img src={row && row.tokenId![0].tokenUri} alt="" className="nftImg" />
            {row.tokenName ? row.tokenName : row.orderId?.tokenId[0]?.tokenName}{' '}
            {row.tokenId![0].tokenId ? row.tokenId![0].tokenId : row.orderId?.tokenId[0]?.tokenId}
          </div>
        )
      }
      if (row.flag && !row.isCall) {
        return (
          <div className="nftBox">
            <img src={row && row.tokenId![0].tokenUri} alt="" className="nftImg" />
            {row.tokenName}{' '}
            {row.tokenId![0].tokenId ? row.tokenId![0].tokenId : row.orderId?.tokenId[0]?.tokenId}
          </div>
        )
      }
    } else {
      if (!row.orderId?.isCall && !row.orderId?.flag) {
        return (
          <div className="nftBox">
            <img
              src={
                row.orderId?.tokenId[0]?.tokenUri
                  ? row.orderId?.tokenId[0]?.tokenUri
                  : defaultTokenUri
              }
              alt=""
              className="nftImg"
            />
            {row.orderId?.tokenId?.length} {row.orderId?.tokenId[0]?.tokenName}
          </div>
        )
      }
      if (!row.orderId?.isCall && row.orderId?.flag) {
        return (
          <div className="nftBox">
            <img
              src={
                row.orderId?.tokenId[0]?.tokenUri
                  ? row.orderId?.tokenId[0]?.tokenUri
                  : defaultTokenUri
              }
              alt=""
              className="nftImg"
            />
            {row.orderId?.tokenId[0]?.tokenName}
            {'  '}
            {row.orderId?.tokenId[0]?.tokenId}
          </div>
        )
      }
      if (row.orderId?.isCall && !row.orderId?.flag) {
        return (
          <div className="nftBox">
            <img
              src={
                row.orderId?.tokenId[0]?.tokenUri
                  ? row.orderId?.tokenId[0]?.tokenUri
                  : defaultTokenUri
              }
              alt=""
              className="nftImg"
            />
            {row.orderId?.num}
            {'  '}
            {row.orderId?.tokenName}
          </div>
        )
      }
      if (row.orderId?.isCall && row.orderId?.flag) {
        return (
          <div className="nftBox">
            <img
              src={
                row.orderId?.tokenId[0]?.tokenUri
                  ? row.orderId?.tokenId[0]?.tokenUri
                  : defaultTokenUri
              }
              alt=""
              className="nftImg"
            />
            {row.orderId?.tokenId[0]?.tokenName}
            {'  '}
            {row.orderId?.tokenId[0]?.tokenId}
          </div>
        )
      }
    }
  }
  return (
    <Tabs>
      <MTable sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <MTableHead>
          <MTableRow sx={{ '&th': { border: 0 } }}>
            {tabName.map((item, index) => (
              <MTableCell align={'center'} key={index} className="tabNameText">
                {item}
              </MTableCell>
            ))}
          </MTableRow>
        </MTableHead>
        {TableLoading ? (
          <Wrapper>
            <div className="mask">
              <ReactLoading type="spokes" className="icon" color="#777E90" />
            </div>
          </Wrapper>
        ) : (
          ''
        )}

        <TableBody>
          {rows.length === 0 ? (
            <div className="empty">No More !</div>
          ) : (
            <>
              {rows?.map(row => (
                <TableRow key={row.createTime}>
                  <MTableCell scope="row" className="txt">
                    <>
                      {pathname !== '/' ? (
                        <div className="statusBox_right">
                          {Math.round(Date.now() / 1000) >
                          Number(row.placeId ? row?.orderId?.duration : row?.duration) ? (
                            <div className="statusExpiredBox">Expired</div>
                          ) : (
                            filterStatus(row)
                          )}
                        </div>
                      ) : (
                        <div className="statusBox">{''}</div>
                      )}
                    </>
                  </MTableCell>
                  <MTableCell align="center" className="txt">
                    {filterDataType(row)}
                  </MTableCell>
                  <MTableCell align="center" className="txt">
                    {BalanceToValue(row.strike!)}WETH
                  </MTableCell>
                  <MTableCell align="center" className="txt">
                    {BalanceToValue(row.premium!)}WETH
                  </MTableCell>
                  <MTableCell align="center" className="txt">
                    {Math.ceil((Number(row.duration) - Number(row.createTime)) / 86400)}days
                  </MTableCell>
                  <MTableCell align="center" className="txt">
                    <div className="typeBox">
                      <div
                        className={
                          row.isCall || row?.orderId?.isCall ? 'typeBoxNormal' : 'typeBoxBlack'
                        }
                      >
                        {row.isCall || row?.orderId?.isCall ? 'Call' : 'Put'}
                      </div>
                    </div>
                  </MTableCell>
                  <MTableCell align="center" className="txt">
                    <div className="detailBox" onClick={() => handleDetail(row)}>
                      {row ? 'View Details' : ''}
                      <img src={Frame} alt="" className="detailBoxIcon" />
                    </div>
                  </MTableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </MTable>
    </Tabs>
  )
}
export default Tab
