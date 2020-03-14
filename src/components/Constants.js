
export default function getColor (type) {
  let ret = ''
  switch (type) {
    case 'poison':
      ret = '#2db7f5'
      break
    case 'ground':
      ret = '#87d068'
      break
    case 'electric':
      ret = '#108ee9'
      break
    case 'fire':
      ret = '#FF0000'
      break
    case 'fairy':
      ret = '#CCFFCC'
      break
    case 'normal':
      ret = '#E5CCFF'
      break
    case 'flying':
      ret = '#f50'
      break
    default:
      break
  }
  return ret
};
