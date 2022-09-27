import styled from 'styled-components'
import Identicon from './Identicon'
import WalletConnectIcon from '../../images/wallet-connect-icon.svg'
import CoinbaseWalletIcon from '../../images/coinbase-wallet-icon.svg'
import { Connector } from '@web3-react/types'
import { coinbaseWallet, injected, walletConnect } from '../../web3/connectors'

type Size = 'normal' | 'large'
const IconWrapper = styled.div<{ size: Size }>``

interface StatusIconProps {
  size?: Size
  connector: Connector
}

const StatusIcon: React.FC<StatusIconProps> = ({ size = 'normal', connector }) => {
  if (connector === injected) {
    return <Identicon diameter={size === 'normal' ? 24 : 32} />
  }
  if (connector === walletConnect) {
    return (
      <IconWrapper size={size}>
        <img src={WalletConnectIcon} alt={''} />
      </IconWrapper>
    )
  }
  if (connector === coinbaseWallet) {
    return (
      <IconWrapper size={size}>
        <img src={CoinbaseWalletIcon} alt={''} />
      </IconWrapper>
    )
  }
  return <></>
}

export default StatusIcon
