import {
  wallCover_toWaringStarus
} from './wellCover'
import {
  substring,
  toDeviceStatus,
  formatPlatform,
  toContractStatus
} from './common'

const Filters = {
  wallCover_toWaringStarus,
  substring,
  toDeviceStatus,
  formatPlatform,
  toContractStatus
}

export default function install(Vue) {
  if (!Vue) {
    console.error('please install Vue')
  }
  // *** register filter
  Object.keys(Filters).forEach(k => Vue.filter(k, Filters[k]))
}
