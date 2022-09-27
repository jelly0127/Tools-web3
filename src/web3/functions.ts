import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'
import { contractMethods_Mint, contractMethods_OpSwap, contractMethods_Weth } from './abi'

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

/**
 * 用于构造合约接口的方法
 * @param contract contract instance
 * @param method contract method
 * @param params params
 * @return Promise
 */
export const contractMethodMint = (
  contract: Contract,
  method: string,
  params: any[] | null,
  isWait?: boolean,
): Promise<any> => {
  if (!contractMethods_Mint.includes(method)) throw Error(`Invalid 'method' ${method} `)
  return new Promise((resolve, reject) => {
    const contractPromise = params?.length ? contract[method](...params) : contract[method]()
    contractPromise
      .then((result: any) => {
        if (isWait) {
          result
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
export const contractMethodOpswap = (
  contract: Contract,
  method: string,
  params: any[] | null,
  isWait?: boolean,
): Promise<any> => {
  if (!contractMethods_OpSwap.includes(method)) throw Error(`Invalid 'method' ${method} `)
  return new Promise((resolve, reject) => {
    const contractPromise = params?.length ? contract[method](...params) : contract[method]()
    contractPromise
      .then((result: any) => {
        if (isWait) {
          result
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
export const contractMethodWeth = (
  contract: Contract,
  method: string,
  params: any[] | null,
  isWait?: boolean,
): Promise<any> => {
  if (!contractMethods_Weth.includes(method)) throw Error(`Invalid 'method' ${method} `)
  return new Promise((resolve, reject) => {
    const contractPromise = params?.length ? contract[method](...params) : contract[method]()
    contractPromise
      .then((result: any) => {
        if (isWait) {
          result
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
    provider
      .getTransaction(txHash)
      .then(res => {
        res
          .wait()
          .then(txRes => {
            if (txRes.status === 1) {
              resolve()
            } else {
              reject()
            }
          })
          .catch(() => reject())
      })
      .catch(() => reject())
  })
}
