import TestNFT from './abi/TestNFT.json'
import OpSwap from './abi/OpSwap.json'
import pancake from './abi/pancakeAbi.json'
import Test from './abi/test.json'
import ERC20s from './abi/ERC20Abi.json'


export const TestNFT_ABI = [...TestNFT]
export const OpSwap_ABI = [...OpSwap]

export const Pancake_ABI = [...pancake]
export const Test_ABI = [...Test]
export const ERC20_ABI = [...ERC20s]

export const contractMethods_Pancake = Pancake_ABI.reduce((pre, cur) => {
  if (cur?.name) {
    pre.push(cur.name)
  }
  return pre
}, [] as string[])
export const contractMethods_Test = Test_ABI.reduce((pre, cur) => {
  if (cur?.name) {
    pre.push(cur.name)
  }
  return pre
}, [] as string[])
export const contractMethods_Erc20 = ERC20_ABI.reduce((pre, cur) => {
  if (cur?.name) {
    pre.push(cur.name)
  }
  return pre
}, [] as string[])



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


