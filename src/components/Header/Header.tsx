import styled from 'styled-components'
import LOGO from './robotcat.png'
import { defaultTheme, flexCenter } from '../../style'
import Wallet from '../Wallet'
import { Link, useLocation } from 'react-router-dom'
import { useEffect,useState } from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu,ConfigProvider } from 'antd';

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  box-shadow: 0.05882rem 0.05882rem 0.05882rem #ccc;
  display: flex;
  z-index: 10;
  flex-direction: row;
  justify-content: flex-end;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
  padding: 10px 20px;
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
const MyMenu = styled(Menu)`
border-bottom: unset;
  width: 100%;
  font-size: ${props=>props.theme.fontSmall};
  ${flexCenter}
  color:#5d5b5b;
  span:hover {
    color: #F95997;
  }
`
const items: MenuProps['items'] = [
  {
    label: '赞助专区',
    key: '1',
    icon: <MailOutlined />,
     children: [
      {
        type: 'group',
        children: [
          {
            label: 'Option 1',
            key: '交易科技:1',
          },
          {
            label: 'Option 2',
            key: '交易科技:2',
          },
        ],
      },
     
    ],
  },
  {
    label: '预售科技',
    key: '2',
    icon: <AppstoreOutlined />,
     children: [
      {
        type: 'group',
        children: [
          {
            label: 'Option 1',
            key: '交易科技:1',
          },
          {
            label: 'Option 2',
            key: '交易科技:2',
          },
        ],
      },
     
    ],
  },
   {
    label: '交易科技',
    key: '3',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        children: [
          {
            label: 'Option 1',
            key: '交易科技:1',
          },
          {
            label: 'Option 2',
            key: '交易科技:2',
          },
        ],
      },
     
    ],
  },
 {
    label: '钱包工具',
    key: '4',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        children: [
          {
            label: 'Option 1',
            key: '钱包工具:1',
          },
          {
            label: 'Option 2',
            key: '钱包工具:2',
          },
        ],
      },
     
    ],
  },
  {
    label: 'Xen 批量 MINT',
    key: '5',
    icon: <SettingOutlined />,
 children: [
      {
        type: 'group',
        children: [
          {
            label: 'Option 1',
            key: 'Xen:1',
          },
          {
            label: 'Option 2',
            key: 'Xen:2',
          },
        ],
      },
     
    ],
  },
  {
    label: 'Aptos Nft 抢购',
    key: '6',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        children: [
          {
            label: 'Option 1',
            key: 'Aptos:1',
          },
          {
            label: 'Option 2',
            key: 'Aptos:2',
          },
        ],
      },
     
    ],
  },
  {
    label: '每日节目单',
    key: '7',
    icon: <SettingOutlined />,
  children: [
      {
        type: 'group',
        children: [
          {
            label: 'Option 1',
            key: '每日节目单:1',
          },
          {
            label: 'Option 2',
            key: '每日节目单:2',
          },
        ],
      },
     
    ],
  },
];


const Header: React.FC = () => {
  const { pathname } = useLocation()
 const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  useEffect(() => {}, [pathname])
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <a href="/">
        {/* <img src={LOGO} alt="" className="logo" /> */}
        </a>
      </LogoWrapper>
     {/* <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#F95997',
      },
    }}
      >
      <MyMenu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  </ConfigProvider> */}
      <Wallet />
    </HeaderWrapper>
  )
}

export default Header
