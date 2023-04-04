import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useMemo } from 'react'
import CONFIG from '../config'
import {
  ABI_MAP,
  contractMethodMap,
  ContractMethodsMap,
  contractAddressMap,
  ContractKey,
} from './abi'
export const provider = new ethers.providers.JsonRpcProvider(CONFIG.REACT_APP_NETWORK_URL);

// returns the checksummed address if the address is valid, otherwise returns false
export const isAddress = (value: any): string | false => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}
// account is not optional
const getSigner = (provider: JsonRpcProvider, account: string): JsonRpcSigner => {
  return provider.getSigner(account).connectUnchecked()
}
// account is optional
const getProviderOrSigner = (
  provider: JsonRpcProvider,
  account?: string,
): JsonRpcProvider | JsonRpcSigner => {
  return account ? getSigner(provider, account) : provider
}

// account is optional
export const getContract = (
  address: string,
  ABI: any,
  provider: JsonRpcProvider,
  account?: string,
): Contract => {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(provider, account) as any)
}

// returns null on errors
export const useContract = <T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null => {
  const { provider, account, chainId } = useWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(
        address,
        ABI,
        provider,
        withSignerIfPossible && account ? account : undefined,
      )
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, account]) as T
}
    // 查看钱包余额
export const getBalance=async(address:string)=> {
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
}
//转账的 gas 费用
export async function getGasCost(from: string, to: [any], value: string) {
  let gas = 0
  
  for (let i = 0; i < to.length; i++) {
    const gasPrice = await provider.getGasPrice();
  const estimateGas = await provider.estimateGas({
    from,
    to:to[i].wallet,
    value,
  });
   return gas+=Number(ethers.utils.formatEther(gasPrice.mul(estimateGas)))
  //  ethers.utils.formatEther(gasPrice.mul(estimateGas));
    
  }
 
}

export interface ContractMethodProp {
  contract: Contract
  method: string
  params: any[] | null
  abiName: keyof ContractMethodsMap
  isWait?: boolean
}
/**
 * 用于构造合约接口的方法
 * @param contract contract instance
 * @param method contract method
 * @param params params
 * @param abiName
 * @return Promise
 */
export const contractMethod = ({
  contract,
  method,
  params,
  abiName,
  isWait = false,
}: ContractMethodProp): Promise<any> => {
  if (!contractMethodMap[abiName].includes(method)) throw Error(`Invalid 'method' ${method} `)
  return new Promise((resolve, reject) => {
    const contractPromise = params?.length ? contract[method](...params) : contract[method]()
    contractPromise
      .then(async (result: any) => {
        if (isWait) {
          await result
            .wait()
            .then(() => {
              resolve(result)
            })
            .catch((err: any) => reject(err))
        } else {
          resolve(result)
        }
      })
      .catch((err: any) => reject(err))
  })
}
// 交易回调
// 一般是搭配Message 组件来使用
export const txPromise = (provider: JsonRpcProvider, txHash: string) => {
  return new Promise<void>((resolve, reject) => {
    provider.getTransaction(txHash).then(res => {
      res.wait().then(txRes => {
        if (txRes.status === 1) {
          resolve()
        } else {
          reject()
        }
      }).catch(() => reject())
    }).catch(() => reject())
  })
}
