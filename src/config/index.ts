'use strict'
import config_dev from './config_dev'
import config_prod from './config_prod'

let CONFIG = config_dev
if (process.env.NODE_ENV === 'development') {
  CONFIG = config_dev
}
if (process.env.NODE_ENV === 'production') {
  CONFIG = config_prod
}
export default CONFIG
