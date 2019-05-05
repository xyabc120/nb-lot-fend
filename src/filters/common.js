// 超出字符串长度 ... 显示
exports.substring = (value, len) => {
  if (value && value.length > len)
    value = value.substring(0, len) + '...';
  return value;
}

exports.toDeviceStatus = value => {
  switch (value) {
    case 0:
      return '未上电';
    case 1:
      return '在线';
    case 2:
      return '告警';
    default:
      return ''
  }
}

// 运营商
exports.formatPlatform = value => {
  switch (value) {
    case 0:
      return '中国电信';
    case 1:
      return '中国移动';
    case 2:
      return '中国联通';
    case 3:
      return '中消云';
    case 9:
      return '其他';
    default:
      return ''
  }
}

//合同状态
exports.toContractStatus = value => {
  switch (value) {
    case '1':
      return '试用';
    case '2':
      return '正式';
    default:
      return ''
  }
}
