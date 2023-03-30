import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
const Buy =React.lazy(()=>import('./pages/ToolsPage/Buy/Buy'))
const Collection =React.lazy(()=>import('./pages/ToolsPage/Collection/Collection'))
const Sell =React.lazy(()=>import('./pages/ToolsPage/Sell/Sell'))
const CreateWallet =React.lazy(()=>import('./pages/ToolsPage/CreateWallet/CreateWallet'))
const Transfer =React.lazy(()=>import('./pages/ToolsPage/Transfer/Transfer'))
const OpenOrder = React.lazy(() => import('./pages/OpenOrder/OpenOrder'))
const Main=React.lazy(() => import('./pages/Main/Main'))
const lazyFactory = (LazyComponent: React.LazyExoticComponent<React.FC<{}>>) => {
  return (
    <React.Suspense fallback={null}>
      <LazyComponent />
    </React.Suspense>
  )
}
const LazyMain= lazyFactory(Main)
const LazyBuy= lazyFactory(Buy)
const LazyCollection= lazyFactory(Collection)
const LazySell= lazyFactory(Sell)
const LazyCreateWallet= lazyFactory(CreateWallet)
const LazyTransfer= lazyFactory(Transfer)


export const routes: RouteObject[] = [
  { path: '/', element: LazyMain },
  { path: '/buy', element: LazyBuy },
  { path: '/sell', element: LazySell },
  { path: '/collection', element: LazyCollection },
  { path: '/createWallet', element: LazyCreateWallet },
  { path: '/transfer', element: LazyTransfer },
  { path: '*', element: <Navigate to="/" /> },
]
export default routes
