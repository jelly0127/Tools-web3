import React from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import styled from 'styled-components';
const MyTabs: any = styled(Table)`
th,td{
  background-color: ${props => props.theme.grey2}!important;
  color: ${props => props.theme.grey3}!important;
}
.ant-table-column-sorters{
  flex-direction: row;
  color: ${props => props.theme.grey3}!important;

}
`
interface DataType {
  key: React.Key;
  address: string;
  coin: string;
  balance: number;
  AuthQuantity: number;
  coinValue: number;
  action: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '账号',
    dataIndex: 'address',
  },
  {
    title: '代币名称',
    dataIndex: 'coin',
  },
  {
    title: '余额',
    dataIndex: 'balance',
    sorter: (a, b) => a.balance - b.balance,
  },
  {
    title: '授权数量',
    dataIndex: 'AuthQuantity',
    sorter: (a, b) => a.AuthQuantity - b.AuthQuantity,
  },
  {
    title: '账号代币价值',
    dataIndex: 'coinValue',
    sorter: (a, b) => a.coinValue - b.coinValue,
  },
  {
    title: '操作',
    dataIndex: 'action',
  },

];

const data = [
  {
    key: '1',
    address: '0x0111223',
    coin: 'BSC',
    balance: 1000,
    AuthQuantity: 200,
    coinValue: 666,
    action: '买入',
  }, {
    key: '2',
    address: '0x0111823',
    coin: 'eth',
    balance: 1990,
    AuthQuantity: 290,
    coinValue: 766,
    action: '买入',
  }, {
    key: '3',
    address: '0x0111220',
    coin: 'afk',
    balance: 8000,
    AuthQuantity: 300,
    coinValue: 686,
    action: '买入',
  }, {
    key: '4',
    address: '0x0111229',
    coin: 'BSC',
    balance: 6000,
    AuthQuantity: 900,
    coinValue: 166,
    action: '买入',
  }, {
    key: '5',
    address: '0x0111323',
    coin: 'BSC',
    balance: 1600,
    AuthQuantity: 3300,
    coinValue: 766,
    action: '买入',
  },
  {
    key: '6',
    address: '0x0111323',
    coin: 'BSC',
    balance: 1600,
    AuthQuantity: 3300,
    coinValue: 766,
    action: '买入',
  }, {
    key: '7',
    address: '0x0111323',
    coin: 'BSC',
    balance: 1600,
    AuthQuantity: 3300,
    coinValue: 766,
    action: '买入',
  }, {
    key: '8',
    address: '0x0111323',
    coin: 'BSC',
    balance: 1600,
    AuthQuantity: 3300,
    coinValue: 766,
    action: '买入',
  },
  {
    key: '9',
    address: '0x0111323',
    coin: 'BSC',
    balance: 1600,
    AuthQuantity: 3300,
    coinValue: 766,
    action: '买入',
  }, {
    key: '10',
    address: '0x0111323',
    coin: 'BSC',
    balance: 1600,
    AuthQuantity: 3300,
    coinValue: 766,
    action: '买入',
  }, {
    key: '11',
    address: '0x0111323',
    coin: 'BSC',
    balance: 1600,
    AuthQuantity: 3300,
    coinValue: 766,
    action: '买入',
  },
];
const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const Tables: React.FC = () =>
  <MyTabs
    pagination={{ position: ['bottomCenter'] }}
    columns={columns} dataSource={data} onChange={onChange} />;

export default Tables