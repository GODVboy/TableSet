import request from '@/utils/request'

// 表格数据
export function getTestList() {
  return request({
    url: `/api/testMock`,
    method: 'get'
  })
}


// 详情
export function getTestDetail(id) {
  return request({
    url: `/api/testMock/${id}`,
    method: 'get',
  })
}


// 添加
export function addTestInfo(data) {
  return request({
    url: `/api/testMock/xxx`,
    method: 'post',
    data
  })
}


// 删除
export function deleteTestMes(id) {
  return request({
    url: `/api/testMock/${id}`,
    method: 'delete'
  })
}

// 编辑
export function editTestMes(data) {
  return request({
    url: `/api/testMock/xxx`,
    method: 'put',
    data
  })
}
