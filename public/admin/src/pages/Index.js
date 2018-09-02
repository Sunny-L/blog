import React, { Component } from 'react'
import { List, Card } from 'antd'
import { observer, inject } from 'mobx-react'

const ListItem = List.Item
@inject('homeStore')
@observer
export default class componentName extends Component {
    componentDidMount() {
        this.props.homeStore.query()
    }
    render() {
        let { homeStore } = this.props
        const items = [
            {
                name: '文章数',
                counts: homeStore.data.posts,
            }, {
                name: '点击数',
                counts: homeStore.data.pv
            }, {
                name: '留言数',
                counts: homeStore.data.messages
            }
        ]
        return (
            <div>
                <List grid={{ gutter: 16, column: 3 }}
                    dataSource={items}
                    renderItem={
                        item => (
                            <ListItem key={item.name}>
                                <Card title={item.name}>{item.counts}</Card>
                            </ListItem>
                        )
                    }
                />
            </div>
        )
    }
}
