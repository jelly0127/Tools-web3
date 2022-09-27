interface TabDataProps {
  id: string
  maker: string
  user: string
  isCall: boolean
  status: string //  0 is unFill,1 is cancelled,2 is filled,3 is exercised
  strike: string
  premium: string
  duration: string
  tokenId: [{ id: string; tokenId: string; tokenName: string; tokenUri: string }] | undefined
  num: string
  tokenAddress: string
  tokenName: string
  flag: boolean
  createTime: string
  placeOffer: [
    {
      id: string
      placeId: string
      user: string
      status: boolean
      strike: string
      premium: string
      duration: string
      createTime: string
      update: string
    },
  ]
}

interface placeOfferOrderEntitiesProps {
  placeId: string
  user: string
  status: string
  strike: string
  premium: string
  duration: string
  isCall: boolean
  createTime: string
  updateTime: string
  tokenName: string
  orderId: {
    num: string
    duration: string
    createTime: string
    id: string
    isCall: boolean
    tokenId: [{ id: string; tokenId: string; tokenName: string; tokenUri: string }]
    flag: boolean
    status: number
    tokenName: string
    tokenAddress: string
    maker: string
    strike: string
    premium: string
  }
}
type ITabProp = Partial<placeOfferOrderEntitiesProps> & Partial<TabDataProps>

interface TabProps {
  rows: ITabProp[]
  showAll?: boolean
  next?: any
  TableLoading: boolean
  setShowAll?: (value?: boolean) => void
}

const tabInitData = [
  {
    id: '0',
    maker: '',
    user: '',
    isCall: true,
    status: '',
    strike: '0',
    premium: '0',
    duration: '',
    tokenId: [
      {
        id: '',
        tokenId: '',
        tokenName: '',
        tokenUri: '',
      },
    ],
    num: '',
    tokenAddress: '',
    tokenName: '',
    flag: true,
    createTime: '',
    placeOffer: [
      {
        id: '',
        placeId: '',
        user: '',
        status: true,
        strike: '',
        premium: '',
        duration: '',
        createTie: '',
        update: '',
      },
    ],
  },
  {
    placeId: '',
    user: '',
    status: '',
    strike: '',
    premium: '',
    duration: '',
    isCall: true,
    createTime: '',
    updateTime: '',
    orderId: {
      id: '',
      isCall: true,
      tokenId: [
        {
          id: '',
          tokenId: '',
          tokenName: '',
          tokenUri: '',
        },
      ],
      flag: true,
      status: 0,
    },
  },
]
interface collectionListProps {
  tokenName: string
  tokenSymbol: string
  id: string
}
const collectionReqBody = {
  query:
    'query($orderDirection: String){tokenInfos(orderBy: tokenName){tokenName, tokenSymbol, id}}',
  variables: {
    orderDirection: 'desc',
  },
}
const tokenInfos = {
  id: '0',
  tokenName: 'Filter by collection',
  tokenSymbol: 'Filter by collection',
}
export { TabProps, tabInitData, ITabProp, collectionListProps, collectionReqBody, tokenInfos }
