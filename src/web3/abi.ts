import TestNFT from './abi/TestNFT.json'

import USDT_ABI from './abi/ERC20Abi.json'
import PANCAKE_ABI from './abi/pancakeAbi.json'
import TEST_ABI from './abi/test.json'
import CONFIG from '../config'

export const ABI_MAP = {
  test: [...TEST_ABI],
  PANCAKE: [...PANCAKE_ABI],
  USDT: [...USDT_ABI],

}
const contractMethods = (abi: any[]) => {
  return abi.reduce((pre, cur) => {
    if (cur?.name) {
      pre.push(cur.name)
    }
    return pre
  }, [] as string[])
}
// 'testNFT' | 'xxx'
export type ContractKey = keyof typeof ABI_MAP
export type ContractMethodsMap = Record<ContractKey, string[]>

export const contractAddressMap: Record<ContractKey, string> = {
  test: CONFIG.TEST_ADDRESS,
  PANCAKE: CONFIG.PANCAKE_ADDRESS,
  USDT: CONFIG.USDT
}

export const contractMethodMap: ContractMethodsMap = {
  test: contractMethods(ABI_MAP.test),
  PANCAKE: contractMethods(ABI_MAP.PANCAKE),
  USDT: contractMethods(ABI_MAP.USDT)
}