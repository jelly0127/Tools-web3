/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { ethers } from 'ethers'
import { isDesktop } from '../helpers/utils'
import { DEFAULT_FONT_SIZE } from '../style'
import { Wallet } from '../web3/connectors'
import { tabInitData } from '../service'

interface AppState {
  selectedWallet?: Wallet
  isDesktop: boolean
  customProvider?: ethers.providers.JsonRpcProvider
  detailData: any
  defaultTokenUri: string
  showSwitchChainModal: boolean
}

const handleView = (desktopValue: boolean) => {
  // 如果是尺寸的设计稿在这里修改
  const WIDTH = 1280
  const IPHONE = 375
  // 设置html标签的fontSize
  document.documentElement.style.fontSize = desktopValue
    ? DEFAULT_FONT_SIZE
    : `${(100 * IPHONE) / WIDTH}px`
}

const initialState: AppState = {
  selectedWallet: undefined,
  isDesktop,
  detailData: tabInitData,
  defaultTokenUri:
    'https://ipfs.moralis.io:2053/ipfs/QmQxXbuoBvCCpmm1PgS67HaGkJMSa6aZS7FMSvdadALjHD',
  showSwitchChainModal: false,
}
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateSelectedWallet(state, { payload: { wallet } }) {
      state.selectedWallet = wallet
    },
    updateDesktop(state, { payload: { desktopValue } }) {
      handleView(desktopValue)
      state.isDesktop = desktopValue
    },
    updateProvider(state, { payload: { provider } }) {
      state.customProvider = provider
    },
    updateDetail: (state, action) => {
      state.detailData = action.payload
    },
    UpdateDefaultTokenUri: (state, action) => {
      state.defaultTokenUri = action.payload
    },
    showSwitchChain: (state, action) => {
      state.showSwitchChainModal = action.payload
    },
  },
})

export const {
  updateSelectedWallet,
  updateDesktop,
  updateProvider,
  updateDetail,
  UpdateDefaultTokenUri,
  showSwitchChain,
} = appSlice.actions
export default appSlice.reducer
