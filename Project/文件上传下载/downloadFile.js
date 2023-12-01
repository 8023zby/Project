/**
 *
 * @param {Blob} blob
 * @param {String} fileName
 * 传入blob对象和文件名，下载对应文件 - lonhon
 */

export function downloadFile(blob, fileName = new Date().toString) {
  if (!(blob instanceof Blob)) {
    // window.$Raven.captureException && window.$Raven.captureException(new Error('must Blob object'), {
    //   logger: 'utils'
    // })
  }
  try {
    if ('download' in document.createElement('a')) { // 非IE9+ 下载
      let url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      url = null
      link.setAttribute('download', fileName)
      document.body.removeChild(link)
    } else {
      navigator.msSaveBlob(blob, fileName)
    }
    blob = null
  } catch (err) {
    throw err
  }
}

export function downloadFileUrl(url, fileName = new Date().toString) {
  try {
    if ('download' in document.createElement('a')) {
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeAttribute(link)
    }
  } catch (error) {
    throw error
  }
}
