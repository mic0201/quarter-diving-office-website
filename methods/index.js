/**
 * number comma
 * e.g. 14,562,123,752.1359192
 * @param {*} val
 * @returns
 */
export function addComma(val, type) {
  switch (type) {
    case 'space':
      return (val + "").replace(/\b(\d+)((\.\d+)*)\b/g, function (a, b, c) {
        return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1 ") : b) + c;
      });
    default:
      return (val + "").replace(/\b(\d+)((\.\d+)*)\b/g, function (a, b, c) {
        return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
      });
  }
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms))
}

export function downloadFile(blob, name = 'download') {
  let a = document.createElement('a'),
    url = window.URL.createObjectURL(blob)

  a.href = url
  a.download = name
  a.click()
  window.URL.revokeObjectURL(url)
}

// const PDFJS = require('pdfjs-dist')
// export async function getPdfs({ file, scale = 1 }) {
//   file.url = URL.createObjectURL(file.raw)
//   let pdf = await PDFJS.getDocument(file.url)
//   let total = pdf.numPages
//   let arr = new Array(total).fill('')
//   let output = []
//   let apis = arr.map(async (d, i) => {
//     let page = i + 1
//     let pageInstance = await pdf.getPage(Number(page))
//     let viewport = pageInstance.getViewport(scale)
//     let canvas = document.createElement('canvas')
//     let context = canvas.getContext("2d")
//     canvas.height = viewport.height
//     canvas.width = viewport.width
//     let renderContext = {
//       canvasContext: context,
//       viewport: viewport
//     }
//     let renderTask = await pageInstance.render(renderContext)
//     let url = canvas.toDataURL("image/png")
//     return {
//       url,
//       pages: { page, total }
//     }
//   })

//   let pdfs = await Promise.all(apis)
//   return pdfs
// }

export function formatPhone(str) {
  if (!str) return ''
  let output = str.toString()
  output = output.replace(/^(09\d{2})(\d{3})(\d{3})$/, '$1-$2-$3')
  output = output.replace(/^(0800)(\d{3})(\d{3})$/, '$1-$2-$3')
  return output
}

export function transformPhoneNumber(phone) {
  if (!phone) return ''
  if (typeof phone === 'number') return phone
  return phone.replace(/^(09)(\d{8})$/, '+8869$2')
}

export function recoverPhoneNumber(phone) {
  if (!phone) return ''
  if (typeof phone === 'number') return phone
  return phone.replace(/^(\+8869)(\d{8})$/, '09$2')
}

export function recoverNumberFromComma(number) {
  if (typeof number === 'number') return number
  return number.replace(/\,/g, '')
}

/**
 * 比對使用者輸入的資料是否與儲存的資料有差異
 * - 目前是適用於兩個單純的 key-value, 限制一層, 不接受 array, 且只比對單向 (a 比對 b, 沒有 b 比對 a)
 * a: 使用者填寫的資料
 * b: 存在 store (API 取回來的資料)
 */
export function compareTwoObject(a, b) {
  let pass = true
  //- 將 a 的 key 拿出來一個一個與確認 b 有沒有, 且確定 value 一不一樣
  pass = _checkObject(a, b)

  return pass
}

function _checkObject(a, b) {
  let pass = true
  Object.keys(a).forEach(fa => {
    if (!b.hasOwnProperty(fa)) {
      console.info(`Missing KEY：${fa}`)
      pass = false
    }
    if (b.hasOwnProperty(fa) && b[fa] !== a[fa]) {
      console.info(`Different KEY: ${fa}`)
      pass = false
    }
  })

  return pass
}

export function toTaiwanYear(epoch, noYearTitle) {
  if (!epoch) return ''
  let y = new Date(epoch).getFullYear() - 1911,
    m = new Date(epoch).getMonth() + 1,
    d = new Date(epoch).getDate()

  return noYearTitle
    ? `${y} 年 ${m} 月 ${d} 日`
    : `民國 ${y} 年 ${m} 月 ${d} 日`
}

// 繪製轉向後的圖片
export async function rotateImageReturnUrl(img) {
  await delay(300) // 不加 delay 會取不到 img.naturalWidth
  let width = img.naturalWidth,
    height = img.naturalHeight,
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    newUrl

  canvas.width = height
  canvas.height = width
  ctx.translate(height / 2, width / 2)
  ctx.rotate((Math.PI / 180) * 90)
  ctx.translate(-width / 2, -height / 2)
  ctx.drawImage(img, 0, 0, width, height)

  newUrl = canvas.toDataURL('image/jpeg', 0.8)
  return { canvas, newUrl }
}

/**
 * 乘
 * keys: Object
 */
export function multiply(params, keys, num = 1000) {
  keys.forEach(key => params[key] = params[key] * num)
}

/**
 * 除
 * keys: Object
 */
export function division(params, keys, num = 1000) {
  keys.forEach(key => params[key] = params[key] / num)
}

export function setDataToLocalStorage(name, data) {
  return localStorage.setItem(name, JSON.stringify(data))
}

export function getDataFromLocalStorage(name, defaultValue) {
  return tryToParseJSON(localStorage.getItem(name))
    ? tryToParseJSON(localStorage.getItem(name))
    : defaultValue
}

export function tryToParseJSON(data) {
  try {
    return JSON.parse(data)
  } catch (e) {
    console.error('Parse JSON failure: ', e)
    return null
  }
}

export function transformPhone(phone) {
  if (!phone) return ''
  if (phone.includes('+886')) return phone
  return phone.replace(/^(09)(\d{8})$/, '+8869$2')
}

export function recoverPhone(phone) {
  if (!phone) return ''
  if (!phone.includes('+886')) return phone
  return phone.replace(/^(\+8869)(\d{8})$/, '09$2')
}

export function createS3ImgPath(s3ImgPath, fileBucketInfo) {
  if (!fileBucketInfo) return
  let bucketInfo = tryToParseJSON(fileBucketInfo)
  if (!bucketInfo) return ''
  let path = s3ImgPath.replace('[object_bucket]', bucketInfo.object_bucket).replace('[object_key]', bucketInfo.object_key)

  return path
}

/**
 * cloneDeep form lodash library, use for clone file
 */
export function deepCloneFromLodash(data) {
  const _clone = require('lodash/clonedeep')
  try {
    return _clone(data)
  } catch (e) {
    console.error('Deep Clone From Lodash failure: ', e)
    return null
  }
}

export function flatten(arr) {
  return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])
}
