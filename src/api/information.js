// 添加信息
export function fileSave(data) {
    return request({
        url: '/resources/save',
        method: 'post',
        data:data
    })
}
//修改信息
export function updateFile(data) {
    return request({
        url: '/resources/update',
        method: 'post',
        data:data
    })
}
//删除信息
export function deleteFile(data) {
    return request({
        url: '/resources/delResourcesById/'+data.id,
        method: 'get',
    })
}
//查询信息
export function selectFile() {
    return request({
        url: '/showMessage',
        method: 'get',
    })
}
//等级信息
export function levelFile(data) {
    return request({
        url: '/resources/delResourcesById/'+data.id,
        method: 'get',
    })
}
//地址信息
export function addFile(data) {
    return request({
        url: '/resources/delResourcesById/'+data.id,
        method: 'get',
    })
}