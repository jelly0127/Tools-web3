import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import LinkBar from '../components/LinkBar'
import Tab from '../components/Tab/Tab'
import { PostMethod } from '../../http'
import Create from '../components/createButton/CreateButton'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Timestamp } from '../../helpers/utils'
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
const MyOrder: React.FC = () => {
  const { provider, account } = useWeb3React()

  const variables = {
    first: 10,
    orderDirection: 'desc',
    timestamp: Timestamp(),
    maker: account,
  }
  const reducer = (state: variablesData, action: actionType): variablesData => {
    switch (action.type) {
      case 'first':
        return { ...state, ...{ first: action.value } }
      case 'orderDirection':
        return { ...state, ...{ orderDirection: action.value } }
      case 'timestamp':
        return { ...state, ...{ timestamp: action.value } }
      case 'maker':
        return { ...state, ...{ maker: action.value } }
      default:
        return variables
    }
  }
  const [data, setData] = useState<any>('')
  const [showAll, setShowAll] = useState(true)
  const [hasMore, sethasMore] = useState(true)
  const [init, dispatch] = useReducer(reducer, variables)
  const [TableLoading, setTableLoading] = useState(false)
  const [options, setOptions] = useState<any>('')
  const query =
    'query($first:Int, $orderDirection: String,$timestamp:Int, $maker:String){orderEntities(first:$first, orderBy: updateTime, orderDirection: $orderDirection, where:{updateTime_lt:$timestamp,maker:$maker}){id,maker, user, isCall, status, strike, premium, duration, tokenId{id,tokenId,tokenName, tokenUri}, num, tokenAddress, flag,createTime, tokenName, placeOffer{id,placeId,user,status,strike,premium,duration,createTime,updateTime}}}'
  const optionsQuery =
    'query($first:Int, $orderDirection: String,$timestamp:Int, $maker:String, $nowTime:Int){orderEntities(first:$first, orderBy: updateTime, orderDirection: $orderDirection, where:{status_in:[0,2],updateTime_lt:$timestamp,maker:$maker}){id,maker, user, isCall, status, strike, premium, duration, tokenId{id,tokenId,tokenName, tokenUri}, num, tokenAddress, flag,createTime, tokenName, placeOffer{id,placeId,user,status,strike,premium,duration,createTime,updateTime}}}'
  const changeShow = () => {
    setShowAll(!showAll)
  }
  const removeDuplicate = (arr: any) => {
    let len = arr.length
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        if (arr[i].id === arr[j].id) {
          arr.splice(j, 1)
          len--
          j--
        }
      }
    }
    return arr
  }
  const filterOptions = (list: any) => {
    const arr = []
    for (const i of list) {
      if (Math.round(Date.now() / 1000) < Number(i.duration)) {
        arr.push(i)
      }
    }
    return arr
  }
  const getList = async (Data: any, initType: boolean) => {
    setTableLoading(true)
    await PostMethod(Data)
      .then(res => {
        if (initType) {
          setData(removeDuplicate(res.data.orderEntities))
        } else if (res.data.orderEntities === 0) {
          setData(removeDuplicate([...data, ...res.data.orderEntities]))
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
  const getOptionList = async (Data: any, initType: boolean) => {
    setTableLoading(true)
    await PostMethod(Data)
      .then(res => {
        if (initType) {
          setOptions(removeDuplicate(filterOptions(res.data.orderEntities)))
        } else if (res.data.orderEntities === 0) {
          setOptions(removeDuplicate([...options, ...filterOptions(res.data.orderEntities)]))
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
  const nextFunc = async () => {
    if (data[data.length - 1]?.createTime) {
      await dispatch({ type: 'timestamp', value: Number(data[data.length - 1].createTime) })
    }
  }
  useEffect(() => {
    if (showAll) {
      getList({ query, variables: { ...init, maker: account } }, false)
    } else {
      getOptionList({ query: optionsQuery, variables: { ...init, maker: account } }, false)
    }
  }, [init.timestamp, showAll])

  useEffect(() => {
    if (!account) {
      setData('')
      setOptions('')
    }
    setShowAll(true)
    getList({ query, variables: { ...init, maker: account } }, true)
    getOptionList({ query: optionsQuery, variables: { ...init, maker: account } }, true)
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
          <Tab rows={showAll ? data : options} TableLoading={TableLoading} />
        </InfiniteScroll>
      </div>
    </Box>
  )
}
export default MyOrder
