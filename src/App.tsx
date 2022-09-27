import { useRoutes } from 'react-router-dom'
import { LoadingProvider } from './components/Loading/Loading'
import ToastContainer from './components/Toast/ToastContainer'
import Header from './components/Header'
// import Report from './Report'
import MessageContainer from './components/Message/MessageContainer'
import { ThemeProvider } from './ThemeProvider'
import routes from './routerConfig'
import { useAppSelector } from './helpers/hooks'
import { getMethods, PostMethod } from './http'
import { updateTokenInfos } from './redux/requestReducer'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { UpdateDefaultTokenUri } from './redux/reducer'
// import Main from './pages/Main'

function App() {
  const { account } = useWeb3React()
  const bodyData = useAppSelector(state => state.counter.tokenInfosBody)
  const dispatch = useDispatch()

  const getCollection = () => {
    const urls = `https://deep-index.moralis.io/api/v2/${account}/nft?chain=mumbai&format=decimal&token_addresses=${'0x8e910bd1abc20ff064cc8f889c40a5f7f591c47f'}`
    getMethods(urls).then(res => {
      if (
        res.result[0]?.token_uri !== null &&
        res.result[0]?.token_uri !== undefined &&
        res.result[0]?.token_uri !== ''
      ) {
        dispatch(UpdateDefaultTokenUri(String(res.result[0]?.token_uri)))
      }
    })
    PostMethod(bodyData!)
      .then(res => {
        dispatch(updateTokenInfos(res.data.tokenInfos[0]))
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (account) {
      getCollection()
    }
  }, [dispatch, account])
  return (
    <ThemeProvider>
      <LoadingProvider>
        {/* <Report /> */}
        <Header />
        {/* <Main /> */}
        {useRoutes(routes)}
        <ToastContainer />
        <MessageContainer />
      </LoadingProvider>
    </ThemeProvider>
  )
}

export default App
