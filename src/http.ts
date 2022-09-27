// 一般来说，Dapp很少需要跟后端交互，但也会存在向第三方供应商获取信息的时候
// 按需修改

import CONFIG from './config'
import { jsonToQuery } from './helpers/utils'

const API_KEY = 'Vzy7WEM499qcYXCXxn577sBO2X6reZ1Tw6NRvKDDOmAIYXmhT2iSohik1j7GEyto'
export const getMethods = (url: string): Promise<any> => {
  return new Promise((resolve, rejects) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
    })
      .then(response => response.json())
      .then(res => {
        resolve(res)
      })
      .catch(err => rejects(err))
  })
}
export const getMethod = (url: string, params?: {}): Promise<any> => {
  return new Promise((resolve, rejects) => {
    let finalUrl = ''
    if (params) {
      finalUrl = `${url}?${jsonToQuery(params)}`
    }
    fetch(`${CONFIG.INTERFACE_API_URL}${params ? finalUrl : url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // credentials: 'same-origin',
    })
      .then(response => response.json())
      .then(res => {
        resolve(res)
      })
      .catch(err => rejects(err))
  })
}
export const PostMethod = (body: {}): Promise<any> => {
  return new Promise((resolve, rejects) => {
    fetch(`${CONFIG.INTERFACE_API_URL}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(res => {
        resolve(res)
      })
      .catch(err => rejects(err))
  })
}
