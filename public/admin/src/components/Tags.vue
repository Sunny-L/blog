<style scoped>

</style>
<template>
    <div class="page-view page-tags">
        <section>
            <h2 class="section-header">标签管理</h2>
            <a @click="handleAdd()">新增</a>
            <div class="section-body">
                <div class="card">
                    <div class="card-header">
                        <table>
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>value</th>
                                    <th>operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in tags" v-bind:key="index">
                                    <td>
                                        <span v-show="!item.is_edit">{{item.title}}</span>
                                        <input v-show="item.is_edit" type="text" v-model="item.title" />
                                    </td>
                                    <td>
                                        <span v-show="!item.is_edit">{{item.value}}</span>
                                        <input v-show="item.is_edit" type="text" v-model="item.value" />
                                    </td>
                                    <td>
                                        <a @click="handleEdit(item)" v-show="!item.is_edit">编辑</a>
                                        <a @click="handleCancle(item)" v-show="item.is_edit">取消</a>
                                        <a @click="handleSave(item)" v-show="item.is_edit">保存</a>
                                        <a @click="handleDel(index,item)">删除</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import Vue from 'vue'
    import querystring from 'querystring'
    export default {
        data: function() {
            return {
                tags: []
            }
        },
        created: function() {
            fetch('/admin/tags').
            then(res => res.json()).
            then(data => {
                this.tags = data.info.tags
            })
        },
        methods: {
            handleAdd: function() {
                this.tags.push({
                    is_edit: true
                })
            },
            handleEdit: function(item) {
                Vue.set(item, 'is_edit', true)
            },
            handleCancle: function(item) {
                Vue.set(item, 'is_edit', false)
            },
            handleDel: function(index, item) {
                if (confirm('确认删除吗？')) {
                    fetch('/admin/tags/del?_id=' + item._id)
                        .then(res => res.json())
                        .then(data => {
                            if (data.code == 0) {
                                this.tags.splice(index, 1)
                            } else {
                                alert(data.info.result)
                            }
                        })
                }
            },
            handleSave: function(item) {
                fetch('/admin/tags/save', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: querystring.stringify(item)
                    }).then(res => res.json())
                    .then(data => {
                        if (data.code === 0) {
                            item._id = data.info.tag._id
                            item.is_edit = false
                        }
                    })

            }
        }
    }
</script>