import React, { Component } from 'react'
import {List, Button} from 'antd'
import { observer, inject } from 'mobx-react';
import {Link} from 'react-router-dom'

const ListItem = List.Item

@inject('postsStore')
@observer
export default class componentName extends Component {
    componentDidMount() {
        this.props.postsStore.query()
    }
    render() {
        let {data} = this.props.postsStore
        return (
            <div>
                <Link to='/posts/add'>
                    <Button type="primary" ghost>新增</Button>
                </Link>
                <List
                    dataSource={data}
                    renderItem={
                        item => (
                            <ListItem key={item._id}>
                                <Link to={`/posts/${item._id}`}>{item.title}</Link>
                            </ListItem>
                        )
                    }
                />
                    
            </div>
        )
    }
}
