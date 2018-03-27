import React, { Component } from 'react'
import { Button, Card, Table } from 'antd'

const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default class Tags extends Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="page-title">
            标签管理
          </div>
        </div>
        <div className="content">
          <Card bordered={false}>
            <div className="table-container">
              <div className="operations">
                <Button type="primary">新增</Button>
              </div>
              <Table columns={columns} dataSource={data} />
            </div>
          </Card>
        </div>
      </div>
    )
  }
}