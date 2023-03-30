import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import Web3Provider from './web3/Web3Provider'
import { Provider } from 'react-redux'
import store from './redux/store'
import {ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Web3Provider>
      <BrowserRouter>
        <ConfigProvider
          theme={{
           token: {
           colorPrimary: '#F95997',
      },
    }}>
            <App />
          
      </ConfigProvider>
          </BrowserRouter>
      </Web3Provider>
    </Provider>
  // </React.StrictMode>,
)
