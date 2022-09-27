import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import LinkBar from '../components/LinkBar'
import Tab from '../components/Tab/Tab'
import { PostMethod } from '../../http'
import Create from '../components/createButton/CreateButton'
import toast from '../../components/Toast/Toast'
import { useLoading } from '../../components/Loading/Loading'
import InfiniteScroll from 'react-infinite-scroll-component'
import { query, variables, reducer } from './service'

const Box = styled.div`
  align-items: center;
  justify-content: center;
  padding: 0 22px;
  .scroll_box {
    margin-top: 27px;
  }
`
const FilledOrder = () => {
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

  const nextFunc = async () => {
    dispatch({ type: 'timestamp', value: Number(data[data.length - 1].createTime) })
  }
  useEffect(() => {
    getList({ query, variables: init })
  }, [init.timestamp])

  return (
    <Box>
      <LinkBar />
      <Create />
      <div className="scroll_box">
        <InfiniteScroll
          next={nextFunc}
          hasMore={hasMore}
          loader={null}
          dataLength={data.length}
          height={450}
          style={{ paddingBottom: '20px' }}
        >
          <Tab rows={data} TableLoading={TableLoading} />
        </InfiniteScroll>
      </div>
    </Box>
  )
}
export default FilledOrder
