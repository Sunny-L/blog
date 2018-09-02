import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { observer, inject } from 'mobx-react';
import { Form, Input, Row, Col, Button, Dropdown, Menu, Icon, Select } from 'antd';
import styles from './common.less'

const { TextArea } = Input
const FormItem = Form.Item
const MenuItem = Menu.Item
const DropdownButton = Dropdown.Button
const Option = Select.Option

@inject('postsStore', 'tagsStore')
@Form.create()
@observer
export default class componentName extends Component {
    componentDidMount() {
        this.props.postsStore.queryTags()
    }
    handleOperation(type) {

    }
    render() {
        const menu = (
            <Menu>
                <MenuItem>
                    <Button block icon="save">保存为草稿</Button>
                </MenuItem>
                <MenuItem>
                    <Button block icon="delete">删除</Button>
                </MenuItem>
            </Menu>
        )
        const { getFieldDecorator, getFieldsValue } = this.props.form
        const { content } = getFieldsValue()
        const tags = this.props.tagsStore.data.list
        return (
            <Row>
                <Row>
                    <Col span={4}>
                        <DropdownButton overlay={menu}>发布</DropdownButton>
                    </Col>
                    <Col span={4}>
                        <Select>
                            {
                                tags.map(item => (
                                    <Option key={item.value}></Option>
                                ))
                            }
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} className={styles.detailForm}>
                        <Form layout="vertical">
                            <FormItem label='标题'>
                                {
                                    getFieldDecorator('title')(
                                        <Input placeholder="标题" />
                                    )
                                }
                            </FormItem>
                            <FormItem label='简述'>
                                {
                                    getFieldDecorator('introduce')(
                                        <Input placeholder="简述" />
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                {
                                    getFieldDecorator('content')(
                                        <TextArea className={styles.detailContent} autosize={{ minRows: 26 }}></TextArea>
                                    )
                                }
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span={12} className={styles.preview}>
                        <ReactMarkdown source={content} />
                    </Col>
                </Row>
            </Row>
        )
    }
}
