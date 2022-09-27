import TestNFT from './abi/TestNFT.json'
import OpSwap from './abi/OpSwap.json'
import Weth from './abi/Weth.json'

export const TestNFT_ABI = [...TestNFT]
export const OpSwap_ABI = [...OpSwap]
export const Weth_ABI = [...Weth]

export const contractMethods_Mint = TestNFT_ABI.reduce((pre, cur) => {
  if (cur?.name) {
    pre.push(cur.name)
  }
  return pre
}, [] as string[])
export const contractMethods_OpSwap = OpSwap_ABI.reduce((pre, cur) => {
  if (cur?.name) {
    pre.push(cur.name)
  }
  return pre
}, [] as string[])

export const contractMethods_Weth = Weth_ABI.reduce((pre, cur) => {
  if (cur?.name) {
    pre.push(cur.name)
  }
  return pre
}, [] as string[])
