import request from '@/utils/request'

export function getMessage(params) {
  return request({
    url: '/showMessage',
    method: 'get',
    params
  })
}
export function deleteMessage(params) {
    return request({
      url: '/delOneMessage',
      method: 'get',
      params
    })
  }
  export function addMessage(data) {
    return request({
      url: '/insertAllMessage',
      method: 'post',
      data
    })
  }
