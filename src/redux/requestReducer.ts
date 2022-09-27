import { createSlice } from '@reduxjs/toolkit'

const tokenInfosBody = {
  query:
    'query($orderDirection: String){tokenInfos(orderBy: tokenName){tokenName, tokenSymbol, id}}',
  variables: {
    orderDirection: 'desc',
  },
}
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    tokenInfosBody,
    tokenInfos: [
      {
        id: '',
        tokenName: '',
        tokenSymbol: '',
      },
    ],
  },
  reducers: {
    updateTokenInfos: (state, action) => {
      state.tokenInfos = action.payload
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { updateTokenInfos } = counterSlice.actions

export default counterSlice.reducer
