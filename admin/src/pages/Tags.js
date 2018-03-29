import React, { Component } from 'react'
import { Button, Card, Table, Input, Form } from 'antd'

const FormItem = Form.Item

const data = [];
for (let i = 0; i < 4; i++) {
  data.push({
    key: i,
    title: `Edward King ${i}`,
  });
}

export default class Tags extends Component {
  constructor(props) {
    super(props)
    this.columns = [{
      title: '名称',
      dataIndex: 'title',
      render: (text, record) => (
        record.editing ? (<input defaultValue={record.title} />) : (<span>{record.title}</span>)
      )
    }, {
      title: '操作',
      dataIndex: '',
      render: (text, record, index) => (
        <div>
          {record.editing ? <div><Button type="primary" onClick={this.handleCancel(index)}>取消</Button><Button type="primary" onClick={this.handleSave(index)}>保存</Button></div> : <Button type="primary" onClick={e => this.handleEdit(record)}>编辑</Button>}
          <Button type="danger">删除</Button>
        </div>
      )
    }];
  }
  state = {
    items: data
  }
  renderColums() {

  }
  handleEdit = (record) => {
    record.editing = true
    this.setState({
      items: this.state.items
    })
    console.log(this.state.items);
  }
  handleCancel = index => {
    // this.state.items[index].editing = false
    this.setState({
      items: this.state.items
    })
  }
  handleSave = index => {
    // to do 
  }
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
              <Table columns={this.columns} dataSource={data} />
            </div>
          </Card>
        </div>
      </div>
    )
  }
}
