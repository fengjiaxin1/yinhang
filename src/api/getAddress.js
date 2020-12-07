import request from '@/utils/request'

export function getAddress(params) {
  return request({
    url: '/showAddresses',
    method: 'get',
    params
  })
}

export function deleteAddress(params) {
  return request({
    url: '/delOneAddress',
    method: 'get',
    params
  })
}
export function addAddress(data) {
  return request({
    url: '/insertOneAddress',
    method: 'post',
    data
  })
}
