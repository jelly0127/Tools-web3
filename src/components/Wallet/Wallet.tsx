import { AccountDrawer, AccountModal, WalletModal, WalletWrapper } from './WalletStyle'
import { useCallback, useEffect, useState } from 'react'
import Modal from '../Modal'
import {
  DEFAULT_NETWORK,
  isChainAllowed,
  NETWORK_CONFIG,
  SUPPORTED_CHAIN_IDS,
  switchChain,
} from '../../web3/chain'
import toast from '../Toast/Toast'
import { shortAddress } from '../../helpers/utils'
import { useClipboard } from 'use-clipboard-copy'
import NetworkSelector from './NetworkSelector'
import WalletWarningIcon from './images/wallet-select.png'
import CopyIcon from '../../images/copy-icon.svg'
import AvatarIcon from '../../images/avatar-icon.png'
import Button from '../Button/Button'
import { useLoading } from '../Loading/Loading'
import Drawer from '../Drawer'
import { DEFAULT_WALLET, SUPPORTED_WALLETS } from '../../web3/wallet'
import StatusIcon from './StatusIcon'
import { useWeb3React } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { coinbaseWallet, getWalletForConnector, injected } from '../../web3/connectors'
import { showSwitchChain, updateSelectedWallet } from '../../redux/reducer'
import { useAppDispatch, useAppSelector } from '../../helpers/hooks'
import MModal from '../../pages/components/Modal'

const Wallet: React.FC = () => {
  const [showDisconnectModal, setShowDisconnectModal] = useState(false)
  const { account, chainId, connector, isActive } = useWeb3React()
  const clipboard = useClipboard()
  const [switchChainModal, setSwitchChainModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  const loading = useLoading()
  const dispatch = useAppDispatch()
  const isDesktop = useAppSelector(state => state.app.isDesktop)
  const showSwitchChainModal = useAppSelector(state => state.app.showSwitchChainModal)

  const handleConnect = useCallback(
    async (currentConnector: Connector) => {
      const wallet = getWalletForConnector(currentConnector)
      try {
        await currentConnector.activate()
        setShowDisconnectModal(false)
        dispatch(updateSelectedWallet({ wallet }))
      } catch (error) {
        console.debug(`web3-react connection error: ${error}`)
        // toast({ text: error.message, type: 'error' })
      }
    },
    [dispatch],
  )
  // useEffect(() => {
  //   console.log(chainId)
  // }, [chainId])
  useEffect(() => {
    if (showSwitchChainModal === undefined) return
    setSwitchChainModal(showSwitchChainModal)
  }, [showSwitchChainModal])

  const handleDisconnect = () => {
    if (connector.deactivate) {
      connector.deactivate()
      // Coinbase Wallet SDK does not emit a disconnect event to the provider,
      // which is what web3-react uses to reset state. As a workaround we manually
      // reset state.
      if (connector === coinbaseWallet) {
        connector.resetState()
      }
    } else {
      connector.resetState()
    }
    setShowAccountModal(false)
    dispatch(updateSelectedWallet({ wallet: undefined }))
  }

  const handleCopy = (value: string) => {
    if (clipboard.isSupported()) {
      clipboard.copy(value)
      setShowAccountModal(false)
      toast({ text: 'copy success' })
    }
  }

  const handleShowDisconnectModal = () => {
    if (chainId && !SUPPORTED_CHAIN_IDS.includes(chainId)) {
      setSwitchChainModal(true)
      return
    }
    setShowDisconnectModal(true)
  }

  const handleConnectNetwork = () => {
    loading.show()
    switchChain(DEFAULT_WALLET.connector!, DEFAULT_NETWORK)
      .then(() => {
        setSwitchChainModal(false)
        dispatch(showSwitchChain(false))
      })
      .catch(() => {
        toast({ text: 'Something Wrong.Please try again', type: 'error' })
      })
      .finally(() => loading.hide())
  }
  const getOptions = () => {
    const isMetaMask = !!window.ethereum?.isMetaMask
    const isCoinbaseWallet = !!window.ethereum?.isCoinbaseWallet
    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key]

      if (!isDesktop) {
        if (
          (!window.web3 && !window.ethereum && option.mobile) ||
          (isMetaMask && option.name === 'MetaMask') ||
          (isCoinbaseWallet && option.name === 'Coinbase Wallet')
        ) {
          return (
            <div className="walletSeletor" key={key}>
              <div
                className={connector === option.connector && isActive ? 'label current' : 'label'}
                onClick={() => {
                  if (!option.href && !!option.connector) {
                    handleConnect(option.connector)
                  }
                }}
              >
                {option.name}
                <img className="icon" src={option.iconName} />
              </div>
            </div>
          )
        }
        return null
      }
      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <a
                className="walletSeletor"
                key={key}
                href="https://metamask.io/"
                target="_blank"
                rel="noreferrer"
              >
                <div className="label">
                  Install MetaMask
                  <img className="icon" src={option.iconName} />
                </div>
              </a>
            )
          } else {
            return null // dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetaMask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetaMask) {
          return null
        }
      }
      return (
        <div className="walletSeletor" key={key}>
          <div
            className={connector === option.connector && isActive ? 'label current' : 'label'}
            onClick={() => handleConnect(option.connector!)}
          >
            <img className="icon" src={option.iconName} />
            {option.name}
          </div>
        </div>
      )
    })
  }
  const DisconnectModal = () => {
    return (
      <Modal
        open={showDisconnectModal}
        title="Connect a wallet"
        width={420}
        titleWidth={200}
        height={330}
        onClose={() => setShowDisconnectModal(false)}
      >
        <WalletModal>{getOptions()}</WalletModal>
      </Modal>
    )
  }

  const walletWrapper = () => {
    if (!isActive && !account) {
      return (
        <>
          {isDesktop && (
            <WalletWrapper onClick={handleShowDisconnectModal}>
              {/* <img className="logo" src={WalletIcon} /> */}
              Connect Wallet
            </WalletWrapper>
          )}
        </>
      )
    }
    return (
      <WalletWrapper onClick={() => setShowAccountModal(true)}>
        <div className="avatar">{connector && <img src={AvatarIcon} alt="" />}</div>
        {shortAddress(account!)}
      </WalletWrapper>
    )
  }
  return (
    <>
      <NetworkSelector
        onWalletDisconnect={!isActive && !account ? handleShowDisconnectModal : undefined}
      />
      {walletWrapper()}
      <Modal
        title=""
        width={420}
        height={330}
        open={showAccountModal && isDesktop}
        onClose={() => setShowAccountModal(false)}
      >
        <AccountModal>
          <div className="content">
            <div className="row">
              <div className="avatar">{connector && <img src={AvatarIcon} alt="" />}</div>
              <div className="address">
                {account && shortAddress(account)}
                <img src={CopyIcon} className="copy-icon" onClick={() => handleCopy(account!)} />
              </div>
            </div>
          </div>

          <div className="btnRow">
            <Button primary text="Change" onClick={() => setShowDisconnectModal(true)} />
            <Button primary text="Disconnect" onClick={handleDisconnect} />
          </div>
        </AccountModal>
      </Modal>
      <DisconnectModal />
      <MModal
        title="Wrong Network"
        open={switchChainModal}
        width={420}
        height={330}
        titleWidth={0}
        onClose={() => {
          setSwitchChainModal(false)
          dispatch(showSwitchChain(false))
        }}
      >
        <WalletModal>
          <div className="img_box">
            <img className="img" src={WalletWarningIcon} />
          </div>
          <div className="content_box">
            <div className="content">
              <span>Please switch to</span>
              <span>a currently supported network</span>
            </div>
          </div>
          <div className="btn_box">
            <Button primary onClick={handleConnectNetwork} text="Switch Network" />
          </div>
        </WalletModal>
      </MModal>
      {/* <Drawer open={showAccountModal && !isDesktop} onClose={() => setShowAccountModal(false)}>
        <AccountDrawer>
          <div className="content">
            <div className="row">
              <div className="avatar">
                {connector && <StatusIcon connector={connector} size="large" />}
              </div>
              {account && shortAddress(account)}
              <img src={CopyIcon} className="copy-icon" onClick={() => handleCopy(account!)} />
            </div>
          </div>
          {isChainAllowed(connector, chainId) && (
            <a
              className="label"
              href={`${NETWORK_CONFIG[chainId!].explorer}/address/${account}`}
              target="_blank"
              rel="noreferrer"
            >
              view on explorer
            </a>
          )}
        </AccountDrawer>
      </Drawer> */}
    </>
  )
}

export default Wallet
