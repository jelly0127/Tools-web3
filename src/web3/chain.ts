import OpIcon from './images/optimism-logo.svg'
import BscIcon from './images/bsc-logo.png'
import ETHIcon from './images/ethereum-logo.png'
import MumbaiIcon from '../images/mubi-icon.png'
import { Connector } from '@web3-react/types'
import { coinbaseWallet, injected, network, walletConnect } from './connectors'

export enum ChainId {
  // MAINNET = 1,
  // BSC_TEST = 97,
  // OPTIMISM = 10,
  MUMBAI = 80001,
}

export const CHAIN_IDS_TO_NAMES = {
  // [ChainId.MAINNET]: 'mainnet',
  // [ChainId.BSC_TEST]: 'BSC_Testnet',
  // [ChainId.OPTIMISM]: 'optimism',
  [ChainId.MUMBAI]: 'Mumbai Testnet',
}
/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS: ChainId[] = Object.values(ChainId).filter(
  id => typeof id === 'number',
) as ChainId[]

// 默认显示的链
export const DEFAULT_NETWORK = ChainId.MUMBAI
export const NetworkContextName = 'NETWORK'

export const SUPPORTED_CHAIN_IDS = [80001]
interface NetworkConfig {
  [key: number]: {
    chainId: typeof SUPPORTED_CHAIN_IDS
    chainName: string
    rpcUrls: string[]
    logo: string
    explorer: string
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
    }
  }
}
export const NETWORK_CONFIG: NetworkConfig = {
  // [ChainId.MAINNET]: {
  //   chainId: [ChainId.MAINNET],
  //   chainName: 'Ethereum',
  //   rpcUrls: ['https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7'],
  //   logo: ETHIcon,
  //   explorer: 'https://etherscan.io/',
  //   nativeCurrency: {
  //     name: 'ETH',
  //     symbol: 'ETH',
  //     decimals: 18,
  //   },
  // },
  // [ChainId.BSC_TEST]: {
  //   chainId: [ChainId.BSC_TEST],
  //   chainName: 'BSC_Testnet',
  //   rpcUrls: [
  //     'https://data-seed-prebsc-2-s3.binance.org:8545',
  //     'https://data-seed-prebsc-1-s3.binance.org:8545',
  //     'https://data-seed-prebsc-1-s2.binance.org:8545',
  //     'https://data-seed-prebsc-2-s1.binance.org:8545',
  //   ],
  //   logo: BscIcon,
  //   explorer: 'https://testnet.bscscan.com/',
  //   nativeCurrency: {
  //     name: 'tBNB',
  //     symbol: 'tBNB',
  //     decimals: 18,
  //   },
  // },
  // [ChainId.OPTIMISM]: {
  //   chainId: [ChainId.OPTIMISM],
  //   chainName: 'Optimism',
  //   rpcUrls: ['https://mainnet.optimism.io'],
  //   logo: OpIcon,
  //   explorer: 'https://optimistic.etherscan.io/',
  //   nativeCurrency: {
  //     name: 'ETH',
  //     symbol: 'ETH',
  //     decimals: 18,
  //   },
  // },
  [ChainId.MUMBAI]: {
    chainId: [ChainId.MUMBAI],
    chainName: 'Mumbai Testnet',
    rpcUrls: [
      'https://matic-testnet-archive-rpc.bwarelabs.com',
      'https://matic-mumbai.chainstacklabs.com',
      'https://rpc.ankr.com/polygon_mumbai',
      'https://polygontestapi.terminet.io/rpc',
    ],
    logo: MumbaiIcon,
    explorer: 'https://mumbai.polygonscan.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
}

export const isChainAllowed = (connector: Connector, chainId?: number) => {
  if (!chainId) return false
  switch (connector) {
    case injected:
    case coinbaseWallet:
    case walletConnect:
    case network:
      return ALL_SUPPORTED_CHAIN_IDS.includes(chainId)
    default:
      return false
  }
}

export const switchChain = async (connector: Connector, chainId: number) => {
  if (!isChainAllowed(connector, chainId)) {
    throw new Error(`Chain ${chainId} not supported for connector (${typeof connector})`)
  } else if (connector === walletConnect || connector === network) {
    await connector.activate(chainId)
  } else {
    const info = NETWORK_CONFIG[chainId]
    const addChainParameter = {
      chainId,
      chainName: info.chainName,
      rpcUrls: info.rpcUrls,
      nativeCurrency: info.nativeCurrency,
      blockExplorerUrls: [info.explorer],
    }
    await connector.activate(addChainParameter)
  }
}
