import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'

export default class Index extends Component {
  render() {
    return (
      <Row>
        <Col span={8}>
          <Card title="1" bordered={false} style={{ width: 300 }}>
            <p>文章数</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="1" bordered={false} style={{ width: 300 }}>
            <p>点击数</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="1" bordered={false} style={{ width: 300 }}>
            <p>留言数</p>
          </Card>
        </Col>
      </Row>
    )
  }
}
