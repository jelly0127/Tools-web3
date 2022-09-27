import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import LinkBar from '../components/LinkBar'
import Tab from '../components/Tab/Tab'
import { ITabProp } from '../../service'
import { PostMethod } from '../../http'
import Create from '../components/createButton/CreateButton'
import { Timestamp } from '../../helpers/utils'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useWeb3React } from '@web3-react/core'
import { actionType, variablesData } from './service'

const Box = styled.div`
  align-items: center;
  justify-content: center;
  padding: 0 22px;
  .scroll_box {
    margin-top: 27px;
  }
`

const MyPositions = () => {
  const { account } = useWeb3React()
  const query =
    'query($first:Int, $status: Int, $orderDirection: String,$timestamp:Int, $user:String) {orderEntities(first:$first, orderBy: updateTime, orderDirection: $orderDirection, where:{ updateTime_lt:$timestamp,user:$user}){id,maker, user, isCall, status, strike, premium, duration, tokenId{id,tokenId,tokenName, tokenUri}, num, tokenAddress, flag,createTime, tokenName, placeOffer{id,placeId,user,status,strike,premium,duration,createTime,updateTime}} placeOfferOrderEntities(first:$first, orderBy: updateTime, orderDirection: $orderDirection,where:{user:$user,updateTime_lt:$timestamp}){placeId, user, status, strike, premium, duration, createTime, updateTime, orderId{id,maker, user, isCall, status, strike, premium, duration, tokenId{id,tokenId,tokenName, tokenUri}, num, tokenAddress, flag,createTime, tokenName}}}'
  const placeQuery =
    'query($first:Int, $status: Int, $orderDirection: String,$timestamp:Int, $user:String) {placeOfferOrderEntities(first:$first, orderBy: updateTime, orderDirection: $orderDirection,where:{user:$user,updateTime_lt:$timestamp}){placeId, user, status, strike, premium, duration, createTime, updateTime, orderId{id,maker, user, isCall, status, strike, premium, duration, tokenId{id,tokenId,tokenName, tokenUri}, num, tokenAddress, flag,createTime, tokenName}}}'

  const variables = {
    first: 10,
    orderDirection: 'desc',
    timestamp: Timestamp(),
    user: account,
  }
  const reducer = (state: variablesData, action: actionType): variablesData => {
    switch (action.type) {
      case 'first':
        return { ...state, ...{ first: action.value } }
      case 'orderDirection':
        return { ...state, ...{ orderDirection: action.value } }
      case 'timestamp':
        return { ...state, ...{ timestamp: action.value } }
      default:
        return variables
    }
  }
  const [data, setData] = useState<any>('')
  const [hasMore, sethasMore] = useState(true)
  const [init, dispatch] = useReducer(reducer, variables)
  const [TableLoading, setTableLoading] = useState(false)
  const [showAll, setShowAll] = useState(true)
  const [MyPositionsList, setMyPositionsList] = useState<any>('')

  const changeShow = () => {
    setShowAll(!showAll)
  }
  const sortData = (dataList: ITabProp[]) => {
    return dataList.sort((a: any, b: any) => b.createTime.localeCompare(a.createTime))
  }

  const getList = async (Data: any, initType: boolean) => {
    setTableLoading(true)
    await PostMethod(Data)
      .then(res => {
        if (initType) {
          setData(sortData([...res.data.orderEntities, ...res.data.placeOfferOrderEntities]))
        } else if (
          res.data.orderEntities.length === 0 &&
          res.data.placeOfferOrderEntities.length === 0
        ) {
          sethasMore(false)
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setTableLoading(false)
      })
  }
  const getPlaceList = async (Data: any, initType: boolean) => {
    setTableLoading(true)
    await PostMethod(Data)
      .then(res => {
        if (initType) {
          setMyPositionsList(
            filterStatus([...MyPositionsList, ...res.data.placeOfferOrderEntities]),
          )
        } else if (res.data.placeOfferOrderEntities.length === 0) {
          sethasMore(false)
        }
      })
      .catch(err => {
        console.log(err)
        sethasMore(false)
      })
      .finally(() => {
        setTableLoading(false)
      })
  }
  const nextFunc = () => {
    if (data[data.length - 1]?.createTime) {
      dispatch({ type: 'timestamp', value: Number(data[data.length - 1].createTime) })
    }
  }
  const filterStatus = (List: any) => {
    const arr = []
    for (const i of List) {
      if (Number(i.status) === 4) {
        arr.push(i)
      }
    }
    return arr
  }
  useEffect(() => {
    if (showAll) {
      getList({ query, variables: { ...init, user: account } }, false)
    } else {
      getPlaceList({ query: placeQuery, variables: { ...init, user: account } }, false)
    }
  }, [init.timestamp, showAll])

  useEffect(() => {
    if (!account) {
      setData('')
      setMyPositionsList('')
    }
    getList({ query, variables: { ...init, user: account } }, true)
    getPlaceList({ query: placeQuery, variables: { ...init, user: account } }, true)
  }, [account])

  return (
    <Box>
      <LinkBar />
      <Create showAll={showAll} setShowAll={changeShow} />
      <div className="scroll_box">
        <InfiniteScroll
          next={nextFunc}
          hasMore={hasMore}
          loader={null}
          dataLength={data.length}
          height={450}
          style={{ paddingBottom: '20px' }}
        >
          <Tab rows={showAll ? data : MyPositionsList} TableLoading={TableLoading} />
        </InfiniteScroll>
      </div>
    </Box>
  )
}
export default MyPositions
