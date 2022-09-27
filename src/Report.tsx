import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { isDesktop } from './helpers/utils'
import { Base64 } from 'js-base64'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { getMethod } from './http'

interface ReporterData {
  deviceCategory: string // 设备类别
  visitTime: number // 访问时间（秒）
  accessSourceInside: string // 内部访问源
  accessSource: string // 访问源
  accessEnvironment: string // 访问环境
  browser: string // 浏览器
  system: string // 操作系统
  resolution: string // 设备尺寸
  language: string // 语言
  country: string // 国家地区
  city: string // 国家地区
  pageBrowsingTime: Array<{
    [key: number]: {
      pageName: string
      stopTime: number
    }
  }>
  uuid: string
}
const WINDOW_URL = window.location.href
const CURL = 'http://ip-api.com/json'
const CURLS = 'https://ipinfo.io/json'
const VISIBILITY_CHANGE = 'visibilitychange'
// todo
const REQUEST_URL = ''
const PAGE_DATA = 'PageData'
const IP_INFO = 'IPInfo'
const { userAgent } = navigator
const getDeviceCategory = () => {
  const CategoryArr = [
    {
      name: 'Mobile',
      it: userAgent.indexOf('iPad') > -1 === false && userAgent.match(/Mobile/),
    },
    {
      name: 'Tablet',
      it: [480, 600, 720].includes(window.screen.width),
    },
    {
      name: 'Desktop',
      it: isDesktop,
    },
  ]
  for (const item of CategoryArr) {
    if (item.it) {
      return item.name
    }
  }
  return 'Else'
}
const getSystem = () => {
  const OSArr = [
    {
      name: 'Windows',
      it: !!userAgent.match(/compatible/i) || userAgent.match(/Windows/i),
    },
    {
      name: 'MacOS',
      it: !!userAgent.match(/Macintosh/i) || userAgent.match(/MacIntel/i),
    },
    {
      name: 'Ios',
      it: !!userAgent.match(/iphone/i) || userAgent.match(/Ipad/i),
    },
    {
      name: 'Android',
      it: !!userAgent.match(/android/i),
    },
    {
      name: 'Ubuntu',
      it: !!userAgent.match(/Ubuntu/i),
    },
    {
      name: 'Linux',
      it: !!userAgent.match(/Linux/i),
    },
  ]
  for (const item of OSArr) {
    if (item.it) {
      return item.name
    }
  }
  return 'Other'
}
const getBrowsers = () => {
  const n: any = window.navigator
  const bwsArr = [
    {
      name: 'sgssapp',
      it: /sogousearch/i.test(userAgent),
    },
    {
      name: 'wechat',
      it: /MicroMessenger/i.test(userAgent),
    },
    {
      name: 'weibo',
      it: !!userAgent.match(/Weibo/i),
    },
    {
      name: 'uc',
      it: !!userAgent.match(/UCBrowser/i) || userAgent.indexOf(' UBrowser') > -1,
    },
    {
      name: 'Brave',
      it: !!(
        !('mozInnerScreenX' in window) &&
        'chrome' in window &&
        'webkitStorageInfo' in window &&
        'brave' in n &&
        'isBrave' in n.brave
      ),
    },
    {
      name: 'sogou',
      it: userAgent.indexOf('MetaSr') > -1 || userAgent.indexOf('Sogou') > -1,
    },
    {
      name: 'xiaomi',
      it: userAgent.indexOf('MiuiBrowser') > -1,
    },
    {
      name: 'baidu',
      it: userAgent.indexOf('Baidu') > -1 || userAgent.indexOf('BIDUBrowser') > -1,
    },
    {
      name: '360',
      it: userAgent.indexOf('360EE') > -1 || userAgent.indexOf('360SE') > -1,
    },
    {
      name: '2345',
      it: userAgent.indexOf('2345Explorer') > -1,
    },
    {
      name: 'edge',
      it: userAgent.indexOf('Edge') > -1,
    },
    {
      name: 'ie11',
      it: userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1,
    },
    {
      name: 'ie',
      it: userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1,
    },
    {
      name: 'firefox',
      it: userAgent.indexOf('Firefox') > -1,
    },
    {
      name: 'safari',
      it: userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1,
    },
    {
      name: 'qqbrowser',
      it: userAgent.indexOf('MQQBrowser') > -1 && userAgent.indexOf(' QQ') === -1,
    },
    {
      name: 'qq',
      it: userAgent.indexOf('QQ') > -1,
    },
    {
      name: 'chrome',
      it: userAgent.indexOf('Chrome') > -1 || userAgent.indexOf('CriOS') > -1,
    },
    {
      name: 'opera',
      it: userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1,
    },
  ]
  for (const item of bwsArr) {
    if (item.it) {
      return item.name
    }
  }
  return 'Other'
}
const getAccessSource = () => {
  const index = WINDOW_URL.lastIndexOf('/')
  const str = WINDOW_URL.substring(index + 1, WINDOW_URL.length)
  const SourceArr = [
    {
      name: 'Twitter',
      it: !!str.match(/Twitter/i),
    },
    {
      name: 'Telegram',
      it: !!str.match(/Telegram/i),
    },
    {
      name: 'Discord',
      it: !!str.match(/Discord/i),
    },
    {
      name: 'Mirror',
      it: !!str.match(/Mirror/i),
    },
    {
      name: 'Blockbeats',
      it: !!str.match(/Blockbeats/i),
    },
  ]
  for (const item of SourceArr) {
    if (item.it) {
      return item.name
    }
  }
  if (document.referrer || document.referrer === '') return 'Search'
  return 'Others'
}
const getAccessSourceInside = () => {
  if (WINDOW_URL.includes('?' || '=' || '&')) return 'Unknown'
  return 'Jump with in the website'
}
// 获取手机端钱包软件
const getMobilePocket = () => {
  if (!isDesktop) {
    const startIndex = userAgent.lastIndexOf(' ')
    const application = userAgent.substring(startIndex + 1)
    const OSArr = [
      {
        name: 'TokenPocket',
        it: !!application.match(/TokenPocket/i),
      },
      {
        name: 'ImToken',
        it: !!application.match(/ImToken/i),
      },
      {
        name: 'CoinHub',
        it: !!application.match(/DBank/i),
      },
      {
        name: 'Brave',
        it: !!application.match(/Mobile\/15E148/i),
      },
      {
        name: 'MetaMask',
        it: !!application.match(/Safari\/605.1/i),
      },
    ]
    for (const item of OSArr) {
      if (item.it) {
        return item.name
      }
    }
    return application
  }
  return 'Direct'
}

const reqData = () => {
  const pageData = JSON.parse(localStorage.getItem(PAGE_DATA) || '') || []
  const arr: Array<{
    load?: string
    path: string
    stopTime: number
  }> = []
  const stopAllTime = pageData?.reduce((prev: number, cur: { path: string; stopTime: number }) => {
    if (cur.path === '/history' && cur.stopTime) {
      arr.push(cur)
    }
    return cur.stopTime + prev
  }, 0)

  const historyPage = arr?.reduce((prev: number, cur: { path: string; stopTime: number }) => {
    return cur.stopTime + prev
  }, 0)

  return `${JSON.stringify([
    { pageName: 'FunctionPage', stopTime: stopAllTime - historyPage },
    {
      pageName: 'HistoryPage',
      stopTime: historyPage,
    },
  ])}`
}

const getIpCountry = async () => {
  const record = localStorage.getItem(IP_INFO)
  if (!record) {
    await fetch(CURL, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(jsonResponse => {
        const info = {
          country: jsonResponse.countryCode,
          city: jsonResponse.city,
        }
        window.localStorage.setItem('IPInfo', JSON.stringify(info))
      })
      .catch(err => {
        console.log(err)
        fetch(CURLS, {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': 'curl/7.77.0',
          },
        })
          .then(response => response.json())
          .then(jsonResponse => {
            const info = {
              country: jsonResponse.country,
              city: jsonResponse.city,
            }
            window.localStorage.setItem('IPInfo', JSON.stringify(info))
          })
          .catch(error => {
            console.log(error)
          })
      })
  }
}
const getUserAgent = (): ReporterData => {
  const record = localStorage.getItem(IP_INFO)
  const IPInfo = record ? JSON.parse(record) : ''

  return {
    deviceCategory: getDeviceCategory(),
    visitTime: Math.floor(window.performance.timeOrigin / 1000),
    accessSourceInside: getAccessSourceInside(),
    accessSource: getAccessSource(),
    accessEnvironment: getMobilePocket(),
    browser: getBrowsers(),
    system: getSystem(),
    resolution: `${window.screen.width}×${window.screen.height}`,
    language: navigator.language,
    country: IPInfo?.country || 'Unknown',
    city: IPInfo?.city || 'Unknown',
    pageBrowsingTime: JSON.parse(reqData()),
    uuid: document.cookie.split(';')[0].split('uuid')[1].split('=')[1]
      ? document.cookie.split(';')[0].split('uuid')[1].split('=')[1]
      : `${new Date().getTime()}`,
  }
}
const getIp = async () => {
  await getMethod(`${REQUEST_URL}/getIP`)
    .then(res => {
      if (!res.data) {
        getIpCountry()
      }
      const info = {
        country: res.data.country,
        city: res.data.city,
      }
      window.localStorage.setItem('IPInfo', JSON.stringify(info))
    })
    .catch(err => {
      console.log(err)
    })
}
export default function Report() {
  const location = useLocation()
  const stopTimes = new Date().getTime()

  const handleCookies = () => {
    try {
      if (!document.cookie.includes('uuid')) {
        document.cookie = `uuid=${encodeURIComponent(uuidv4().replace(/-/g, ''))}`
      }
    } catch (e) {
      console.error(e)
    }
  }
  const pageListener = (Times: number) => {
    const Time = new Date().getTime() - Times
    const record = localStorage.getItem(PAGE_DATA)
    const data = (record && JSON.parse(record)) || []
    localStorage.setItem(
      PAGE_DATA,
      JSON.stringify([
        ...data,
        {
          load: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
          path: window.location.pathname,
          stopTime: Math.round(Time / 1000),
        },
      ]),
    )
  }

  const reportData = (url: string) => {
    handleCookies()
    pageListener(stopTimes)
    const formData = new FormData()
    formData.append('token', Base64.encode(JSON.stringify(getUserAgent())))
    navigator.sendBeacon(url, formData)
  }

  const listenerEvent = () => {
    if (document.visibilityState === 'hidden') {
      reportData(`${REQUEST_URL}/getData`)
      window.localStorage.removeItem(PAGE_DATA)
    }
  }
  useEffect(() => {
    getIp()
  }, [])
  useEffect(() => {
    document.addEventListener(VISIBILITY_CHANGE, listenerEvent)
    return () => {
      pageListener(stopTimes)
      document.removeEventListener(VISIBILITY_CHANGE, listenerEvent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return <></>
}
