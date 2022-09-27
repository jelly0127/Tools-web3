import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { initializeConnector, Web3ReactHooks } from '@web3-react/core'
// import { EIP1193 } from '@web3-react/eip1193'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { Connector } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect'
import { useMemo } from 'react'
import CONFIG from '../config'

export enum Wallet {
  INJECTED = 'INJECTED',
  COINBASE_WALLET = 'COINBASE_WALLET',
  WALLET_CONNECT = 'WALLET_CONNECT',
  NETWORK = 'NETWORK',
}

export const BACKFILLABLE_WALLETS = [Wallet.COINBASE_WALLET, Wallet.WALLET_CONNECT, Wallet.INJECTED]
export const SELECTABLE_WALLETS = [...BACKFILLABLE_WALLETS]

function onError(error: Error) {
  console.debug(`web3-react error: ${error}`)
}

export function getWalletForConnector(connector: Connector) {
  switch (connector) {
    case injected:
      return Wallet.INJECTED
    case coinbaseWallet:
      return Wallet.COINBASE_WALLET
    case walletConnect:
      return Wallet.WALLET_CONNECT
    case network:
      return Wallet.NETWORK
    default:
      throw Error('unsupported connector')
  }
}

export function getConnectorForWallet(wallet: Wallet) {
  // eslint-disable-next-line default-case
  switch (wallet) {
    case Wallet.INJECTED:
      return injected
    case Wallet.COINBASE_WALLET:
      return coinbaseWallet
    case Wallet.WALLET_CONNECT:
      return walletConnect
    case Wallet.NETWORK:
      return network
  }
}

function getHooksForWallet(wallet: Wallet) {
    // eslint-disable-next-line default-case
  switch (wallet) {
    case Wallet.INJECTED:
      return injectedHooks
    case Wallet.COINBASE_WALLET:
      return coinbaseWalletHooks
    case Wallet.WALLET_CONNECT:
      return walletConnectHooks
    case Wallet.NETWORK:
      return networkHooks
  }
}

export const [network, networkHooks] = initializeConnector<Network>(
  actions => new Network({ actions, urlMap: {}, defaultChainId: 1 })
)

export const [injected, injectedHooks] = initializeConnector<MetaMask>(actions => new MetaMask({ actions, onError }))


export const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  actions =>
    new WalletConnect({
      actions,
      options: {
        rpc: { 1: CONFIG.REACT_APP_NETWORK_URL },
        qrcode: true,
      },
      onError,
    })
)

export const [coinbaseWallet, coinbaseWalletHooks] = initializeConnector<CoinbaseWallet>(
  actions =>
    new CoinbaseWallet({
      actions,
      options: {
        url: CONFIG.REACT_APP_NETWORK_URL,
        appName: 'gloria',
        // 需要替换成当前项目的logo
        appLogoUrl: '',
        reloadOnDisconnect: false,
      },
      onError,
    })
)

interface ConnectorListItem {
  connector: Connector
  hooks: Web3ReactHooks
}

function getConnectorListItemForWallet(wallet: Wallet) {
  return {
    connector: getConnectorForWallet(wallet),
    hooks: getHooksForWallet(wallet),
  }
}

export function useConnectors(selectedWallet: Wallet | undefined) {
  return useMemo(() => {
    const connectors: ConnectorListItem[] = []
    if (selectedWallet) {
      connectors.push(getConnectorListItemForWallet(selectedWallet))
    }
    connectors.push(
      ...SELECTABLE_WALLETS.filter(wallet => wallet !== selectedWallet).map(getConnectorListItemForWallet)
    )
    connectors.push({ connector: network, hooks: networkHooks })
    const web3ReactConnectors: Array<[Connector, Web3ReactHooks]> = connectors.map(({ connector, hooks }) => [
      connector,
      hooks,
    ])
    return web3ReactConnectors
  }, [selectedWallet])
}
