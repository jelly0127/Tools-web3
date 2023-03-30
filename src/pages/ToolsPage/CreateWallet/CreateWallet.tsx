import BackBar from '../../components/BackBar/BackBar'
import CardBox from '../../components/CardBox/CardBox'
import React, { FC, useState } from 'react';
import { Radio, Input, RadioChangeEvent, Button } from 'antd';
import copy from 'copy-to-clipboard';
import ExportJsonExcel from 'js-export-excel'
import ICON_COPY from '../../../images/icon-copy.svg'
import { BackBarBox, RootBox, TopCardBox } from './styles'
import toast from '../../../components/Toast/Toast';
const bip39 = require('bip39')
const HDWallet = require('ethereum-hdwallet');

//生成英文助记词
const mnemonic = bip39.generateMnemonic();

type WalletProps = {
  address: string | null
  privateKey: string | null
}


const CurrencyOptions = [
  { label: 'BSC', value: 'BSC' },
  { label: 'ETH', value: 'ETH' },
  { label: 'HECO', value: 'HECO', },
  { label: 'MATIC', value: 'MATIC', },
];

const handleCopyClick = (value: any) => {
  copy(value)
  toast({ text: 'copy success', type: 'success' })
}

const CreateWallet: FC = () => {

  const [Currency, setCurrency] = useState('BSC');
  const [WalletNum, setWalletNum] = useState(0)
  const [WalletDataList, setWalletDataList] = useState([])

  const handleCreateWallet = async (num: number) => {
    if (num < 1) return
    let walletObj: Array<WalletProps> | any = []
    for (var i = 0; i < num; i++) {
      const seed = await bip39.mnemonicToSeed(mnemonic); //生成种子
      const hdwallet = HDWallet.fromSeed(seed);
      const key = hdwallet.derive("m/44'/60'/0'/0/" + i); // 地址路径的最后一位设置为循环变量
      // console.log("PrivateKey = " + key.getPrivateKey().toString('hex')); // 私钥
      // console.log("PublicKey = " + key.getPublicKey().toString('hex')); // 公钥
      const Private = key.getPrivateKey().toString('hex')
      const EthAddress = key.getAddress().toString('hex'); //地址
      walletObj.push({ 'address': "0x" + EthAddress, 'privateKey': Private, })
    }

    setWalletDataList(walletObj)
  }

  const handleExportBtnClick = () => {
    if (WalletDataList.length < 1) return
    const data: Array<WalletProps> = WalletDataList //表格内部数据
    var option: any = {};
    let dataTable = [];
    if (data) {
      for (let i in data) {
        if (data) {
          let obj = {
            '地址': data[i].address,
            '私钥': data[i].privateKey,
          }
          dataTable.push(obj);
        }
      }
    }
    option.fileName = 'Tool'; //设置excel名称
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['地址', '私钥',],
        sheetHeader: ['地址', '私钥',],
      }
    ];
    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();

  }

  const topCard = () => {
    const onCurrencyChange = ({ target: { value } }: RadioChangeEvent) => {
      setCurrency(value);
    };
    return (
      <TopCardBox>
        <Radio.Group
          options={CurrencyOptions}
          onChange={onCurrencyChange}
          value={Currency}
          optionType="button"
          buttonStyle="solid"
        />
        <div className='text'>
          钱包生成全过程均在本地完成，请妥善保管您的私钥！
        </div>
        <div className='inputRow'>
          <Input placeholder="请输入生成钱包的数量" type={'number'} onChange={(e: any) => { setWalletNum(e.target.value) }} />
          <div className='btn_box'>
            <Button className='btn_box_left' onClick={() => handleCreateWallet(WalletNum)}>
              生成钱包</Button>
            <Button className='btn_box_right' onClick={handleExportBtnClick}>
              下载表格</Button>
          </div>
        </div>
      </TopCardBox>
    );
  }
  const bottomCard = () => {
    return <div className='bottomCard_box'>
      <div className='top_title'>已生成 {WalletDataList.length} 个</div>
      {
        WalletDataList.map((item: WalletProps, index: number) => {
          return (
            <div className='wallet_box' key={index + new Date().getTime()}>
              <div className='wallet_box_address'>
                钱包{index + 1}：{item.address}
                <img src={ICON_COPY} alt="" onClick={() => handleCopyClick(item.address)} />
              </div>
              <div className='wallet_box_key'>
                私钥{index + 1}：{item.privateKey}
                <img src={ICON_COPY} alt="" onClick={() => handleCopyClick(item.privateKey)} />
              </div>
            </div>)
        })

      }

    </div>
  }
  return (

    <RootBox>
      <BackBarBox>
        <BackBar msg={'批量生成钱包'} />
        <CardBox children={topCard()} />
        <div className='bottom_box'>
          <CardBox height={480} children={bottomCard()} />
        </div>
      </BackBarBox>
    </RootBox>
  )
}
export default CreateWallet