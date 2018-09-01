import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const { Header, Content, Sider } = Layout
const MenuItem = Menu.Item

const router = [
    {
        name: '首页',
        link: '/'
    }, {
        name: '文章',
        link: '/posts'
    }, {
        name: '标签',
        link: '/tags'
    }, {
        name: '系统设置',
        link: 'system'
    }
]

export default class Base extends Component {
    render() {
        return (
            <Layout>
                <Sider>
                    <Menu>
                        <Router>
                            {
                                router.map(item => (
                                    <MenuItem>
                                        <Link to={item.link}>{item.name}</Link>                                    
                                    </MenuItem>
                                ))
                            }
                        </Router>
                    </Menu>
                </Sider>
                <Layout>
                    <Header></Header>
                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
