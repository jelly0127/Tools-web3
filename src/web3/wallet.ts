import MetamaskIcon from '../images/wallet-metamask-icon.png'
import WalletConnectIcon from '../images/wallet-connect-icon.png'
import CoinbaseWalletIcon from '../images/coinbase-wallet-icon .png'
import { Connector } from '@web3-react/types'
import { coinbaseWallet, injected, Wallet, walletConnect } from './connectors'

export interface WalletInfo {
  connector?: Connector
  wallet?: Wallet
  name: string
  iconName: string
  description: string
  href: string | null
  mobile: boolean
}

// 支持的钱包
export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    wallet: Wallet.INJECTED,
    name: 'Metamask',
    iconName: MetamaskIcon,
    description: 'Easy-to-use browser extension.',
    href: null,
    mobile: false,
  },
  // COINBASE_WALLET: {
  //   connector: coinbaseWallet,
  //   wallet: Wallet.COINBASE_WALLET,
  //   name: 'Coinbase Wallet',
  //   iconName: CoinbaseWalletIcon,
  //   description: 'Use Coinbase Wallet app on mobile device',
  //   href: null,
  //   mobile: true,
  // },
  // WALLET_CONNECT: {
  //   connector: walletConnect,
  //   wallet: Wallet.WALLET_CONNECT,
  //   name: 'WalletConnect',
  //   iconName: WalletConnectIcon,
  //   description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
  //   href: null,
  //   mobile: true,
  // },

  // COINBASE_LINK: {
  //   name: 'Open in Coinbase Wallet',
  //   iconName: CoinbaseWalletIcon,
  //   description: 'Open in Coinbase Wallet app.',
  //   href: 'https://go.cb-w.com/mtUDhEZPy1',
  //   mobile: true,
  // },
}

// 默认的钱包
export const DEFAULT_WALLET = SUPPORTED_WALLETS.METAMASK
