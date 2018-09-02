import React, { Component } from 'react'
import { Layout, Menu, LocaleProvider } from 'antd'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'mobx-react'
import * as stores from '../stores'
import router, {getRouteConfig} from './router'
import styles from './base.less'

const { Header, Content, Sider } = Layout
const MenuItem = Menu.Item

const routerConfig = getRouteConfig(router)

console.log(routerConfig);
export default class Base extends Component {
    render() {
        return (
            <LocaleProvider locale={zhCN}>
                <Provider {...stores}>
                    <Router>
                        <Layout className={styles.layout}>
                            <Sider className={styles.nav}>
                                <div className={styles.logo}>我是logo</div>
                                <Menu>
                                    {
                                        router.map(item => (
                                            <MenuItem key={item.name}>
                                                <NavLink to={item.path}>{item.name}</NavLink>
                                            </MenuItem>
                                        ))
                                    }
                                </Menu>
                            </Sider>
                            <Layout>
                                <Header>我是头部</Header>
                                <Content>
                                    {
                                        routerConfig.map(item => (
                                            <Route key={item.path} path={item.path} exact component={item.component}/>
                                        ))
                                    }
                                </Content>
                            </Layout>
                        </Layout>
                    </Router>
                </Provider>
            </LocaleProvider>
        )
    }
}
