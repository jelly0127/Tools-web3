import React, { useMemo } from 'react';
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
  key?: React.Key;
  wallet?: string;
  othersBalance?: number;
  balance?: number;
}
interface PropsData {
  data: Array<DataType>
  loading: Boolean,
  Token: string
}
const column: ColumnsType<DataType> = [
  {
    title: '钱包',
    dataIndex: 'wallet',
  },
  {
    title: '平台币余额',
    dataIndex: 'balance',
    sorter: {
      compare: (a: any, b: any) => a.balance - b.balance,
      multiple: 3,
    },
  },
]
const columns: ColumnsType<DataType> = [
  {
    title: '钱包',
    dataIndex: 'wallet',
  },

  {
    title: '代币余额',
    dataIndex: 'othersBalance',
    sorter: {
      compare: (a: any, b: any) => a.othersBalance - b.othersBalance,
      multiple: 3,
    },
  },
  {
    title: '平台币余额',
    dataIndex: 'balance',
    sorter: {
      compare: (a: any, b: any) => a.balance - b.balance,
      multiple: 3,
    },
  },


];





const Tables: React.FC<PropsData> = ({ data, loading, Token }) => {
  const sumDate = (data: Array<DataType>) => {
    return data.reduce(function (p: number, c: any) {
      return p + c.balance * 1;
    }, 0)
  }
  const sumDates = (data: Array<DataType>) => {
    return data.reduce(function (p: number, c: any) {
      return p + c.othersBalance * 1;
    }, 0)
  }

  return (
    <MyTabs
      loading={loading}
      pagination={{ position: ['bottomCenter'] }}
      columns={Token ? (column && columns) : column} dataSource={data} summary={() => (
        <Table.Summary fixed>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}>Sum</Table.Summary.Cell>
            {Token ? <Table.Summary.Cell index={1}>{Math.floor(sumDates(data) * 100) / 100}</Table.Summary.Cell> : null}

            <Table.Summary.Cell index={2}>{Math.floor(sumDate(data) * 100) / 100}</Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )} />)
}

export default Tables;
