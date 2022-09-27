import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const OpenOrder = React.lazy(() => import('./pages/OpenOrder/OpenOrder'))
const FilledOrder = React.lazy(() => import('./pages/FilledOrder/FilledOrder'))
const MyOrder = React.lazy(() => import('./pages/MyOrder/MyOrder'))
const MyPositions = React.lazy(() => import('./pages/MyPositions/MyPositions'))
const CreateOrder = React.lazy(() => import('./pages/CreateOrder/CreateOrder'))
const Details = React.lazy(() => import('./pages/Details/Details'))
const Mint = React.lazy(() => import('./pages/Mint/Mint'))

const lazyFactory = (LazyComponent: React.LazyExoticComponent<React.FC<{}>>) => {
  return (
    <React.Suspense fallback={null}>
      <LazyComponent />
    </React.Suspense>
  )
}
const LazyOpenOrder = lazyFactory(OpenOrder)
const LazyFilledOrder = lazyFactory(FilledOrder)
const LazyMyOrder = lazyFactory(MyOrder)
const LazyMyPositions = lazyFactory(MyPositions)
const LazyCreateOrder = lazyFactory(CreateOrder)
const LazyDetails = lazyFactory(Details)
const LazyMint = lazyFactory(Mint)

export const routes: RouteObject[] = [
  { path: '/', element: LazyOpenOrder },
  { path: '/filledOrder', element: LazyFilledOrder },
  { path: '/myOrder', element: LazyMyOrder },
  { path: '/myPositions', element: LazyMyPositions },
  { path: '/createOrder', element: LazyCreateOrder },
  { path: '/detail/:status', element: LazyDetails },
  { path: '/mint', element: LazyMint },
  { path: '*', element: <Navigate to="/" /> },
]
export default routes
