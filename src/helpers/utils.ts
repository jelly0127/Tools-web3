import { getAddress } from 'ethers/lib/utils'
import VConsole from 'vconsole'
import moment from 'moment'
import { BigNumber } from 'ethers'
import toast from '../components/Toast/Toast'

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}
// 获取短地址
const shortenAddress = (address: string, front = 6, behind = 4): string => {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, front)}...${parsed.substring(parsed.length - behind)}`
}
const shortAddress = (address: string, front = 4, behind = 4): string => {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, front)}...${parsed.substring(parsed.length - behind)}`
}
const filterAddress = (address: string, front: number, behind: number) => {
  if (address !== '') {
    return `${address.substring(0, front)}...${address.substring(address.length - behind)}`
  }
  return ''
}
const chunk = (arr: any[], num: number) => {
  const spliceArr = arr.slice(0)
  return Array.from({ length: Math.ceil(arr.length / num) }, () => {
    return spliceArr.splice(0, num)
  })
}
// 10进制转换16进制
const decimalToHex = (decimal: number) => {
  return `0x${decimal.toString(16)}`
}

export const DESKTOP_WIDTH = 0
export let isDesktop = false
if (typeof document !== 'undefined') {
  if (window.innerWidth > DESKTOP_WIDTH) {
    isDesktop = true
  }
}
// 用于H5 端调试
// e.g. vConsole.log.log(xxx)
export const vConsole = isDesktop ? null : new VConsole()

const jsonToQuery = (json: any) => {
  return Object.keys(json)
    .map((key: any) => {
      return `${key}=${json[key]}`
    })
    .join('&')
}
function BalanceToValue(
  value: string,
  decimalNum?: number,
  // noDevideEighth?: boolean,
) {
  // tranfer bignumer type
  if (!decimalNum) {
    // eslint-disable-next-line no-param-reassign
    decimalNum = 4
  }
  const num = Number(value) / 10 ** 18
  // eslint-disable-next-line no-mixed-operators
  const result = Math.floor(num * 10 ** decimalNum) / 10 ** decimalNum
  const resArr = String(result).split('.')
  if (resArr[1]) {
    if (resArr[1].length !== decimalNum) {
      const decimal = resArr[1].padEnd(decimalNum, '0')
      return `${resArr[0]}.${decimal}`
    }
    return result.toString()
  } else {
    // 没有小数点后的处理(整数)
    return `${resArr[0]}.${''.padEnd(decimalNum, '0')}`
  }
}

const filterDurationDays = (time: string, dateTime?: string) => {
  if (moment(Number(time)).diff(moment(Number(dateTime)), 'days') > 0) {
    return moment(Number(time)).diff(moment(Number(dateTime)), 'days')
  } else {
    return 0
  }
}
const Timestamp = () => {
  return Math.round(Date.now() / 1000)
}
const BigNumberFromDays = (day: number) => {
  return BigNumber.from(String(BigInt(Timestamp() + moment(day * 86400).valueOf())))
}
const BigNumberFrom = (data: number) => {
  return BigNumber.from(String(BigInt(data * 10 ** 18).valueOf()))
}
export const walletTips = () => {
  toast({ text: 'Please connect the wallet', type: 'warning' })
}
export {
  shortenAddress,
  chunk,
  decimalToHex,
  jsonToQuery,
  shortAddress,
  filterAddress,
  Timestamp,
  BalanceToValue,
  filterDurationDays,
  BigNumberFromDays,
  BigNumberFrom,
}
