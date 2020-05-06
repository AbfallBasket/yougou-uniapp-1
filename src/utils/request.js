// const BASE_URL = 'https://api-hmugo-web.itheima.net/api'
const BASE_URL = 'https://ugo.botue.com/api'

const request = (options) => {

  if (!options.Loading) {
    uni.showLoading({
      title: '数据加载中...',
      mask: true
    })
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method,
      data: options.data,
      header: options.header,
      success: (res) => {
        console.log(res)
        const {message, meta} = res.data
        if (meta.status === 200) {
          //  数据获取成功
          resolve(message)
        } else {
          reject(meta.msg)
        }
      },
      fail: (err) => {
        reject(err)
      },
      complete () {
        if (!options.Loading) {
          uni.hideLoading()
        }
      }
    })
  })
}
export {
  request
}
