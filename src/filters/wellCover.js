exports.wallCover_toWaringStarus = value => {
  switch (value) {
    case 0:
      return '正常';
    case 1:
      return '未上电';
    case 2:
      return '信号弱';
    case 3:
      return '倾斜大';
    case 4:
      return '水位高';
    case 5:
      return '亮度高';
    case 6:
      return '电量低';
    default:
      return ''
  }
}
