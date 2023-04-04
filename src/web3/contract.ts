import { ethers } from "ethers";
import CONFIG from '../config'
import pancakeAbi from './abi/pancakeAbi.json'
import usdtAbi from './abi/ERC20Abi.json'
import TestAbi from './abi/test.json'

let bscProvider = new ethers.providers.JsonRpcProvider(CONFIG.REACT_APP_NETWORK_URL);

let pancakeContract = new ethers.Contract(CONFIG.PANCAKE_ADDRESS, pancakeAbi, bscProvider);

let usdtContract = new ethers.Contract(CONFIG.USDT, usdtAbi, bscProvider)

let TESTContract = new ethers.Contract(CONFIG.TEST_ADDRESS, TestAbi, bscProvider)

//买路由
let buyPathU = [CONFIG.USDT, CONFIG.TOKEN] //交易路由
let buyPathB = [CONFIG.WETH, CONFIG.TOKEN]
let buyPathBU = [CONFIG.WETH, CONFIG.USDT, CONFIG.TOKEN]
let buyPathUB = [CONFIG.USDT, CONFIG.WETH, CONFIG.TOKEN]

//卖路由
let sellPathU = [CONFIG.TOKEN, CONFIG.USDT] //交易路由
let sellPathB = [CONFIG.TOKEN, CONFIG.WETH]
let sellPathBU = [CONFIG.TOKEN, CONFIG.WETH, CONFIG.USDT]
let sellPathUB = [CONFIG.TOKEN, CONFIG.USDT, CONFIG.WETH] //


export const Contract = {
  pancakeContract, usdtContract, TESTContract,
  buyPathU, buyPathB, buyPathBU, buyPathUB, sellPathU, sellPathB, sellPathBU, sellPathUB
}