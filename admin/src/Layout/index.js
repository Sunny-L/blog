// import { getRouteConfig } from '../router'

import React, { Component } from 'react'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>header</Header>
          <Content>Content</Content>
        </Layout>
      </Layout>
    )
  }
}
