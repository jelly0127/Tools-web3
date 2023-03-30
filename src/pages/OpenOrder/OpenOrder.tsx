import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import { PostMethod } from '../../http'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Timestamp } from '../../helpers/utils'

const Box = styled.div`
  align-items: center;
  justify-content: center;
  padding: 0 22px;
  .scroll_box {
    margin-top: 27px;
  }
`
interface variablesData {
  first: number
  orderDirection: string
  timestamp: number
  nowTime: number
}
interface actionType {
  type: keyof variablesData
  value?: any
}
const OpenOrder: React.FC = () => {
  const query =
    'query($first:Int, $orderDirection: String,$timestamp:Int,$nowTime:Int){orderEntities(first:$first, orderBy: createTime, orderDirection: $orderDirection, where:{status:0, createTime_lt:$timestamp,duration_gt:$nowTime}){id,maker, user, isCall, status, strike, premium, duration, tokenId{id,tokenId,tokenName, tokenUri}, num, tokenAddress, flag,createTime, tokenName, placeOffer{id,placeId,user,status,strike,premium,duration,createTime,updateTime}}}'
  const variables = {
    first: 10,
    orderDirection: 'desc',
    timestamp: Timestamp(),
    nowTime: Timestamp(),
  }

  const reducer = (state: variablesData, action: actionType): variablesData => {
    switch (action.type) {
      case 'first':
        return { ...state, ...{ first: action.value } }
      case 'orderDirection':
        return { ...state, ...{ orderDirection: action.value } }
      case 'timestamp':
        return { ...state, ...{ timestamp: action.value } }
      case 'nowTime':
        return { ...state, ...{ nowTime: action.value } }
      default:
        return variables
    }
  }

  const [data, setData] = useState<any>('')
  const [hasMore, sethasMore] = useState(true)
  const [init, dispatch] = useReducer(reducer, variables)
  const [TableLoading, setTableLoading] = useState(false)

  const getList = async (Data: any) => {
    setTableLoading(true)
    await PostMethod(Data)
      .then(res => {
        setData([...data, ...res.data.orderEntities])
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
    dispatch({ type: 'timestamp', value: Number(data[data.length - 1].createTime) })
  }
  useEffect(() => {
    getList({ query, variables: init })
  }, [init.timestamp])
  return (
    <Box>
      <div className="scroll_box">
        <InfiniteScroll
          next={nextFunc}
          hasMore={hasMore}
          loader={null}
          dataLength={data.length}
          height={450}
          style={{ paddingBottom: '20px' }}
        >
        </InfiniteScroll>
      </div>
    </Box>
  )
}
export default OpenOrder
