import { Timestamp } from '../../helpers/utils'

interface variablesData {
  first: number
  orderDirection: string
  timestamp: string | number
  user?: string
}
interface RequestParams {
  query: string
}
interface actionType {
  type: keyof variablesData
  value?: any
}

const body = {
  query:
    'query($first:Int, $status: Int, $orderDirection: String,$timestamp:Int, $user:String) {orderEntities(first:$first, orderBy: updateTime, orderDirection: $orderDirection, where:{status:2, updateTime_lt:$timestamp,user:$user}){id,maker, user, isCall, status, strike, premium, duration, tokenId{id,tokenId,tokenName, tokenUri}, num, tokenAddress, flag,createTime, placeOffer{id,placeId,user,status,strike,premium,duration,createTime,updateTime}} placeOfferOrderEntities(first:$first, orderBy: updateTime, orderDirection: $orderDirection,where:{user:$user,updateTime_lt:$timestamp}){placeId, user, status, strike, premium, duration, createTime, updateTime, orderId{id:id,isCall, tokenId{id,tokenId,tokenName, tokenUri}, status, flag, tokenAddress}}}',
  variables: {
    first: 5,
    orderDirection: 'desc',
    timestamp: Timestamp(),
    user: '0xC9564400a0a5f766F5A215ad1d6F3AfdF463BB1c',
  },
}
const reducer = (state: variablesData, action: actionType): variablesData => {
  switch (action.type) {
    case 'first':
      return { ...state, ...{ first: action.value } }
    case 'orderDirection':
      return { ...state, ...{ orderDirection: action.value } }
    case 'timestamp':
      return { ...state, ...{ timestamp: action.value } }
    case 'user':
      return { ...state, ...{ user: action.value } }
    default:
      return body.variables
  }
}

export { body, reducer, variablesData, RequestParams, actionType }
