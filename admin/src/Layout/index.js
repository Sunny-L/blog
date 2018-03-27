import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Route, Link } from 'react-router-dom'
import './index.less'
import { getRouteConfig } from '../router'

const { Header, Footer, Sider, Content } = Layout
const routeConfig = getRouteConfig()

export default class App extends Component {
  state = {
    collapsed: false
  }
  render() {
    return (
      <Layout>
        <Sider>
          <div className="logo-container">
            <div className="logo">Sunnyson's Blog 后台管理</div>
          </div>
          <nav>
            <Menu
              defaultSelectedKeys={['1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              {
                routeConfig.map((route, index) => (
                  <Menu.Item key={index}>
                    <Link to={route.path}>
                      <Icon type={route.icon} />
                      <span>{route.name}</span>
                    </Link>
                  </Menu.Item>
                ))
              }
            </Menu>
          </nav>
        </Sider>
        <Layout>
          <Header>header</Header>
          <Content className="content-container">
            {
              routeConfig.map((route, index) => (
                <Route strict exact path={route.path} key={index} component={route.component}>{route.name}</Route>
              ))
            }
          </Content>
        </Layout>
      </Layout>
    )
  }
}
