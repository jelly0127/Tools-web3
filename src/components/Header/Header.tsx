import styled from 'styled-components'
import LOGO from './logo@3x.png'
import { defaultTheme, flexCenter } from '../../style'
import Wallet from '../Wallet'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const HeaderWrapper = styled.div`
  /* position: sticky; */
  top: 0;
  display: flex;
  z-index: 10;
  flex-direction: row;
  justify-content: flex-end;
  justify-content: space-between;
  align-items: center;
  width: 1024px;
  margin: auto;
  padding: 20px 14px 20px 0;
  background-color: ${props => props.theme.bgColor};
  /* border-bottom: 1px solid ${props => props.theme.borderColor}; */
  .row {
    ${flexCenter};
    flex-direction: row;
  }
  .icon {
    cursor: ${prop => (prop.theme.isDesktop ? 'pointer' : 'none')};
    border-radius: 8px;
    width: 24px;
    height: 24px;
    margin: 0 24px;
    :hover {
      background-color: ${props => props.theme.primaryColor};
      opacity: 0.2;
    }
  }
  .null {
    width: 100%;
  }
`
const LogoWrapper = styled.div`
  ${flexCenter};
  margin-left: -8px;
  flex-direction: row;
  align-items: center;
  color: ${props => props.theme.grey1};
  font-size: ${defaultTheme.fontLarge};
  font-weight: bold;
  cursor: ${prop => (prop.theme.isDesktop ? 'pointer' : 'none')};
  font-family: MiSans-Bold;
  .logo {
    width: 148px;
    height: 44px;
    margin-right: 10px;
  }
  .desktop-title-logo {
    width: 100px;
    height: auto;
  }
`
const RouterList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 500;
  justify-content: space-between;
  margin: 0 52px;
  color: ${props => props.theme.grey3};
  font-size: ${props => props.theme.fontNormal};
  .active {
    text-decoration: underline;
    color: ${props => props.theme.grey1};
  }
`
const linkList = [
  { path: '/', name: 'Open Order' },
  { path: '/filledOrder', name: 'Filled Order' },
  { path: '/myOrder', name: 'My Orders' },
  { path: '/myPositions', name: 'My Positions' },
]
const Header: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {}, [pathname])
  return (
    <HeaderWrapper>
      <LogoWrapper>
        Decenta
        {/* <img src={LOGO} alt="" className="logo" /> */}
      </LogoWrapper>
      {pathname !== '/mint' ? (
        <RouterList>
          {linkList.map(item => (
            <Link to={item.path} key={item.path} className={item.path === pathname ? 'active' : ''}>
              {item.name}
            </Link>
          ))}
        </RouterList>
      ) : (
        <div className="null">{}</div>
      )}
      <Wallet />
    </HeaderWrapper>
  )
}

export default Header
