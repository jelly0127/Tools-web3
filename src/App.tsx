import { useRoutes } from 'react-router-dom'
import { LoadingProvider } from './components/Loading/Loading'
import ToastContainer from './components/Toast/ToastContainer'
import Header from './components/Header'
// import Report from './Report'
import MessageContainer from './components/Message/MessageContainer'
import { ThemeProvider } from './ThemeProvider'
import routes from './routerConfig'
// import Main from './pages/Main'

import 'antd/dist/reset.css';
const App=() =>{

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
