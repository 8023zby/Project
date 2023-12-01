import axios from 'axios';
const fs = require('fs')
function axiosDownloadFile(item, callback, downloadcallback) {
  console.log('文件下载参数--->', item)
  let url = item.fileurl;
  let filepath = item.filepath
  let filename = item.filename
  axios({
    method: 'get',
    url,
    responseType: 'blob',
    // headers: { Authorization: token },
    onDownloadProgress: (evt) => {
      // 对原生进度事件的处理
      const progress = parseInt((evt.loaded / evt.total) * 100)
      console.log('下载进度', progress)
      if (typeof downloadcallback === 'function') {
        downloadcallback(item, progress)
      }
    }
  }).then((res) => {
    console.log('axios-down-then', res)
    if (res.status !== 200) {
      console.log('axios down then error', res)
      item.state = 'fail'
      callback(item)
      return false
    }
    var reader = new FileReader()
    reader.onload = function() {
      var buffer = Buffer.from(reader.result)
      // temp文件夹应已存在
      console.log(filepath, filename)
      fs.writeFile(filepath + '//' + filename, buffer, {}, (err, res) => {
        if (err) {
          console.error(err)
          item.state = 'fail'
          callback(item)
        } else {
          item.state = 'success'
          callback(item)
        }
      })
    }
    reader.readAsArrayBuffer(res.data)
  }).catch(error => {
    console.log('axios down catch', error);
    item.state = 'fail'
    callback(item)
  })
}
function axiosUploadFile(item, callback, uploadcallback, cancelToken) {
  const filepath = item.filepath
  const filedata = fs.readFileSync(filepath)
  var configs = {
    cancelToken,
    onUploadProgress: function (evt) {
      const process = parseInt((evt.loaded / evt.total) * 100)
      console.log('进度：', process);
      if (typeof uploadcallback === 'function') {
        uploadcallback(process)
      }
    },
    headers: item.headers ? item.headers : {}
  };
  axios.put(item.fileurl, filedata, configs)
    .then(function (data) {
      console.log(item, data, '上传的状态来了');
      if (data.status !== 200) {
        console.log('axios upload then error', data)
        item.state = 'fail'
        callback(item)
        return false
      }
      if (data.status === 200) {
        item.state = 'success'
      }
      callback(item, data)
    })
    .catch(function (err) {
      console.log(err, '上传的稍候出现错误');
      item.state = 'fail'
      callback(item)
    });
}
export {axiosDownloadFile, axiosUploadFile}
