import { useWeb3React } from '@web3-react/core'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import message from '../../components/Message'
import toast from '../../components/Toast/Toast'
// import { ABI } from '../../web3/abi'
// import { contractMethod, txPromise, useContract } from '../../web3/functions'

const TEST_NFT = '0x4c3e87Add69CA7FE21D51B2507449de171725048'

// const Box = styled.div`
//   align-items: center;
//   justify-content: center;
//   padding: 0 22px;
// `
const Main: React.FC = () => {
  const { provider } = useWeb3React()
  // const testNFTContract = useContract(TEST_NFT, ABI, true)
  // demo
  // const handleTest = () => {
  //   contractMethod(testNFTContract!, 'mint', null, true).then(res => {
  //     res
  //       .wait()
  //       .then((txRes: { transactionHash: any }) => {
  //         const { transactionHash } = txRes
  //         message({ messagePromose: txPromise(provider!, transactionHash) })
  //       })
  //       .catch((err: { message: any }) => toast({ text: err.message, type: 'error' }))
  //   })
  // }
  const testMsg = () => {
    const pro = new Promise<void>(resolve => {
      setTimeout(() => {
        resolve()
      }, 3000)
    })
    message({ messagePromose: pro })
  }
  return (
    <>
      <Link to="/">
        <Button text="link to test page" />
      </Link>
      {/* <Button fullWidth onClick={handleTest} text="test" /> */}
      <Button fullWidth onClick={() => testMsg()} text="Message" />
    </>
  )
}

export default Main
