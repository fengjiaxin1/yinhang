//删除等级
export function deleteFile(data) {
    return request({
        url: '/resources/delResourcesById/'+data.id,
        method: 'get',
    })
}
// 添加等级
export function fileSave(data) {
    return request({
        url: '/resources/save',
        method: 'post',
        data:data
    })
}