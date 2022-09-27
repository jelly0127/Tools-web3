import { Timestamp } from '../../helpers/utils'

interface variablesData {
  first: number
  orderDirection: string
  timestamp: number
  nowTime: number
}
interface RequestParams {
  query: string
}
interface actionType {
  type: keyof variablesData
  value?: any
}

const query =
  'query($first:Int, $orderDirection: String,$timestamp:Int,$nowTime:Int){orderEntities(first:$first, orderBy: updateTime, orderDirection: $orderDirection, where:{status_in:[2,3], updateTime_lt:$timestamp,duration_gt:$nowTime}){id,maker, user, isCall, status, strike, premium, duration, tokenId{id,tokenId,tokenName, tokenUri}, num, tokenAddress, flag,createTime, tokenName, placeOffer{id,placeId,user,status,strike,premium,duration,createTime,updateTime}}}'
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

export { variables, reducer, query }
