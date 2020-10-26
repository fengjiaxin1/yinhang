export function login(data) {
    return request({
      url: 'http://192.168.1.157:3000/login',
      method: 'post',
      data
    })
  }
  
  export function getInfo(token) {
    return request({
      url: 'http://192.168.1.157:3000/info',
      method: 'get',
      params: { token }
    })
  }