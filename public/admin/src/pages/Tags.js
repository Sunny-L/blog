import React, { Component } from 'react'
import { Modal, Form, List, Row, Col, Button, Input, message } from 'antd'
import { observer, inject } from 'mobx-react';
import { saveTag, delTag} from '../services/api';

const ListItem = List.Item
const FormItem = Form.Item
@inject('tagsStore')
@Form.create()
@observer
export default class componentName extends Component {
    componentDidMount() {
        this.props.tagsStore.query()
    }
    handleSubmit = e => {
        e.preventDefault();
        const { validateFields } = this.props.form
        validateFields(async (err, values) => {
            if (!err) {
                let result = await saveTag(values)
                if (result.code == 0) {
                    message.success('添加成功')
                    this.props.tagsStore.toggleStatus('model', false)
                }
            }
        })
    }
    handleDelete = async id => {
        let result = await delTag(id)
        if(result.code == 0) {
            message.success('删除成功')
        }
        await this.props.tagsStore.query()
    }
    render() {
        const { list } = this.props.tagsStore.data
        const status = this.props.tagsStore.status
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Row>
                    <Col span={4}>
                        <Button onClick={e => this.props.tagsStore.toggleStatus('model', true)}>新增</Button>
                    </Col>
                </Row>
                <List
                    dataSource={list}
                    renderItem={
                        item => (
                            <ListItem actions={[<a onClick={e => this.handleDelete(item._id)}>删除</a>]} key={item.title}>{item.title}</ListItem>
                        )
                    }
                >
                </List>

                <Modal
                    visible={status.model}
                    onCancel={e => this.props.tagsStore.toggleStatus('model', false)}
                >
                    <Form>
                        <FormItem label="标签名称">
                            {getFieldDecorator('title')(
                                <Input placeholder="标签名称" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button onClick={this.handleSubmit}>保存</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
