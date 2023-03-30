import { Web3ReactProvider } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { ReactNode, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../helpers/hooks'
import { getConnectorForWallet, injected, network, useConnectors } from './connectors'
import { ethers } from 'ethers'
import { updateProvider } from '../redux/reducer'

const connect = async (connector: Connector) => {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly()
    } else {
      await connector.activate()
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`)
  }
}

export default function Web3Provider({ children }: { children: ReactNode }) {
  const selectedWallet = useAppSelector(state => state.app.selectedWallet)
  const isDesktop = useAppSelector(state => state.app.isDesktop)
  const connectors = useConnectors(selectedWallet)
  const dispatch = useAppDispatch()

  const isMetaMask = !!window.ethereum?.isMetaMask

  useEffect(() => {
    connect(network)
    if (!isDesktop && isMetaMask) {
      injected.activate()
    } else if (selectedWallet) {
      connect(getConnectorForWallet(selectedWallet))
    } else {
      // if no wallet env
      const RPCURL = 'https://data-seed-prebsc-1-s1.binance.org:8545'
      const customProvider = new ethers.providers.JsonRpcProvider(RPCURL)
      dispatch(updateProvider({ provider: customProvider }))
    }
    // The dependency list is empty so this is only run once on mount
  }, []) 

  return <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
}
