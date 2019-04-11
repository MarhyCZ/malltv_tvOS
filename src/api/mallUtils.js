import he from 'he'

const cleanText = (string) => {
  let stripHTML = string.replace(/<\/?[^>]+(>|$)/g, '')
  let utf8 = he.decode(stripHTML)
  return utf8
}

const highRes = (data) => {
  console.time('someFunction')
  let dataString = JSON.stringify(data)
  let retina = dataString.replace('standart.jpg', 'retina.jpg')
  let parsed = JSON.parse(retina)
  console.timeEnd('someFunction')
  return parsed
}

export default {
  cleanText,
  highRes
}
