import jazzicon from '@metamask/jazzicon'
import { useWeb3React } from '@web3-react/core'
import { useLayoutEffect, useRef } from 'react'

interface IdenticonProps {
  diameter?: number // 默认头像直径px
}
const Identicon: React.FC<IdenticonProps> = ({ diameter = 32 }) => {
  const { account } = useWeb3React()
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(jazzicon(diameter, parseInt(account.slice(2, 10), 16)))
    }
  }, [account, diameter])

  return <div ref={ref} />
}

export default Identicon
